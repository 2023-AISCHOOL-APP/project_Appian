const express = require('express');
const conn = require('../database');
const router = express.Router();

// 커뮤니티 자랑하기 게시판
router.get('/content', (req, res) => {
    console.log('커뮤니티 글 불러오기');
    let sql = "select * from content order by content_num desc";
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
            else {
                console.log('커뮤니티 글 데이터 없음');
                res.status(200).send('커뮤니티 글 데이터 없음');
            }
        }
    })
});


// 커뮤니티 자랑하기 글 추가
router.get('/add_content', (req, res) => {
    console.log('커뮤니티 자랑하기 글 추가', req.query);

});


// 커뮤니티 댓글 불러오기
router.get('/content_comment', (req,res)=>{
    console.log('커뮤니티 댓글 불러오기', req.query);
})


// 커뮤니티 댓글 삭제
router.get('/delete', (req,res)=>{
    console.log('커뮤니티 댓글 삭제');
})


// 커뮤니티 이미지 불러오기
router.get('/content_img', (req,res)=>{
    const imagePath = path.join(__dirname, '..', 'public', 'img', 'communityImg', req.params.name);

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