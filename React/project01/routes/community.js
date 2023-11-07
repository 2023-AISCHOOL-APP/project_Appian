const express = require('express');
const multer = require('multer');
const conn = require('../database');
const router = express.Router();
const path = require('path');
const { timeStamp } = require('console');

// 파일 저장 경로 및 파일 이름 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // 저장할 경로 지정
        cb(null, path.join('public', 'img', 'contentImg'));
    },
    filename: (req, file, cb) => {
        // content_title을 파일 이름으로 사용
        const content_title = req.body.content_title;
        // 확장자 가져오기
        const extname = path.extname(file.originalname);
        // 현재 시간을 밀리초로 얻어와 파일 이름에 추가
        const timestamp = Date.now();
        // content_title + 밀리초 + 확장자로 이름 설정
        const filename = `${content_title}_${timestamp}${extname}`;
        cb(null, filename);
    }
})

const upload = multer({ storage: storage })


// 커뮤니티 자랑하기 게시판
router.get('/content', (req, res) => {
    console.log('커뮤니티 글 불러오기');
    let sql = `select content_num, content_title, user_nick, contents, content_img, DATE_FORMAT(content_day, '%Y-%m-%d') as content_day 
                from content 
                where del is null
                order by content_num desc`;
    conn.query(sql, (err, rows) => {
        if (err) {
            console.error('커뮤니티 글 불러오기 에러', err);
            res.status(500).send('커뮤니티 글 불러오기 실패');
        }
        else {
            if (rows.length > 0) {
                console.log('커뮤니티 글 불러오기 성공', rows);
                res.status(200).send(rows);
            }
            // else { // 프론트에 구현 안됨
            //     console.log('커뮤니티 글 데이터 없음');
            //     res.status(200).send('커뮤니티 글 데이터 없음');
            // }
        }
    })
});


// 커뮤니티 자랑하기 글 추가
router.post('/add_content', upload.single('content_img'), async (req, res) => {
    console.log('커뮤니티 자랑하기 글 추가 시도', req.body);
    const imgFile = req.file;
    const content_img = imgFile.filename;
    const {
        user_nick,
        content_title,
        contents
    } = req.body;

    console.log(user_nick, content_title, contents, content_img);

    let sql = `INSERT INTO content (user_nick, content_title, contents, content_img) 
                VALUES (?, ?, ?, ?)`;
    conn.query(sql, [user_nick, content_title, contents, content_img], (err, rows) => {
        if (err) {
            console.error('커뮤니티 자랑하기 글 추가 에러', err);
            res.status(500).send('커뮤니티 자랑하기 글 추가 실패');
        }
        else {
            if (rows.affectedRows > 0) {
                console.log('커뮤니티 자랑하기 글 추가 성공', content_title);
                res.status(200).send({ message: '커뮤니티 자랑하기 글 추가 성공' })
            }
            else {
                console.log('커뮤니티 자랑하기 글 삽입 실패', rows);
                res.status(500).send('커뮤니티 자랑하기 글 추가 실패')
            }
        }
    })

});


// 커뮤니티 댓글 불러오기/작성하기
router.get('/content_comment', (req, res) => {
    console.log('커뮤니티 댓글 불러오기', req.query);
    let { user_nick, content_num, content_comment } = req.query;
    if (content_comment) {
        console.log('댓글달기');
        let sql = `insert into content_comment (user_nick, content_num, content_comment)
                    values (?,?,?)`
        conn.query(sql, [user_nick, content_num, content_comment], (err, rows) => {
            if (err) {
                console.error('댓글 달기 에러', err);
                res.status(500).send('댓글 달기 실패');
            }
            else {
                if (rows.affectedRows > 0) {
                    console.log('댓글 달기 성공', content_num, user_nick);
                    let sql = `select user_nick, content_num, content_comment, date_format(content_comment_day, '%y-%m-%d %H:%i:%s') as content_comment_day
                    from content_comment where content_num = ? 
                    order by content_comment_num desc`
                    conn.query(sql, [content_num], (err, rows) => {
                        if (err) {
                            console.error('댓글 조회 에러', err);
                            res.status(500).send('댓글 조회 실패')
                        }
                        else {
                            if (rows.length > 0) {
                                console.log('댓글 조회 성공', rows);
                                res.status(200).send(rows)
                            }
                            // else { // 프론트 구현 안되어 있음
                            //     console.log('조회할 댓글 없음', content_num);
                            //     res.status(204).send('댓글 없음')
                            // }
                        }
                    })
                }
                else {
                    console.log('댓글 달기 실패', rows);
                    res.status(500).send('댓글 달기 실패');
                }
            }
        })
    }
    else {
        console.log('댓글 조회하기');
        let sql = `select user_nick, content_num, content_comment, date_format(content_comment_day, '%y-%m-%d %H:%i:%s') as content_comment_day
                    from content_comment where content_num = ? 
                    order by content_comment_num desc`
        conn.query(sql, [content_num], (err, rows) => {
            if (err) {
                console.error('댓글 조회 에러', err);
                res.status(500).send('댓글 조회 실패')
            }
            else {
                if (rows.length > 0) {
                    console.log('댓글 조회 성공', rows);
                    res.status(200).send(rows)
                }
                // else { // 프론트 구현 안되어 있음
                //     console.log('조회할 댓글 없음', content_num);
                //     res.status(204).send('댓글 없음')
                // }
            }
        })
    }
})


// 커뮤니티 글 삭제
// 기존과 다르게 content에 del 컬럼을 추가하여 db데이터를 삭제하지 않고, 
// del 컬럼에 데이터가 있으면 표시하지 않는 방식으로 변경
router.get('/delete', (req, res) => {
    console.log('커뮤니티 글 삭제', req.query.content_num);
    let { content_num } = req.query;
    let sql = `update content
               set del =  current_timestamp
               where content_num = ?`
    conn.query(sql, [content_num], (err, rows) => {
        if (err) {
            console.error('커뮤니티 글 삭제 에러', err);
            res.status(500).send('커뮤니티 글 삭제 실패')
        }
        else {
            if (rows) {
                console.log('커뮤니티 글 삭제 성공', content_num);
                res.status(200).send({ message: '커뮤니티 글 삭제 성공' })
            }
            // else { // font 구현 안되어 있음
            //     console.log('커뮤니티 글 삭제 실패', content_num);
            //     res.status(500).send('커뮤니티 글 삭제 실패')
            // }
        }
    })
})


// 커뮤니티 이미지 불러오기
router.get('/content_img/:name', (req, res) => {
    const imagePath = path.join(__dirname, '..', 'public', 'img', 'contentImg', req.params.name);

    res.sendFile(imagePath, (err) => {
        if (err) {
            console.error('커뮤니티 이미지 전송 오류 발생:', err);
            res.status(500).send('커뮤니티 이미지 전송 오류 발생');
        } else {
            console.log('커뮤니티 이미지 전송 완료', req.params.name);
        }
    });
})

module.exports = router;