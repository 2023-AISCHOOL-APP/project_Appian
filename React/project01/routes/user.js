const express = require('express')
const router = express.Router()
const conn = require('../database') // BD연결



// 로그인
router.post('/login', (req,res)=>{
    console.log('로그인 시도', req.body.form)
    // console.log(req.body.form.user_id);
    let {user_id, user_password} = req.body.form
    // console.log(user_id);
    let sql = "select user_id, user_nick from user where USER_ID = ? and USER_PASSWORD = ?"
    conn.query(sql, [user_id, user_password], (err, rows)=>{
        console.log('로그인 로직', rows)
        if(rows.length > 0){
            console.log('로그인 성공')
            res.send(rows)
        } else {
            console.log('로그인 실패')
            res.send('로그인 실패')
        }
    })
})

// 회원가입 중복 체크
router.post('/check', (req,res)=>{
    // console.log('회원가입 중복 체크', req.body)
    if (req.body.user_id){
        console.log('회원가입 아이디 중복 체크', req.body)
        let {user_id} = req.body
        // console.log(user_id);
        let sql = "select user_id from user where user_id = ?"
        conn.query(sql, [user_id], (err, rows)=>{
            // console.log('아이디 체크 로직', rows)
            if(rows.length>0){
                console.log('아이디 있음')
                res.send('아이디 있음')
            }else{
                console.log('아이디 없음')
                res.send('아이디 없음')
            }
        })
    }else if(req.body.user_nick){
        console.log('회원가입 닉네임 중복 체크', req.body)
        let {user_nick} = req.body
        // console.log(user_nick);
        let sql = "select user_nick from user where user_nick = ?"
        conn.query(sql, [user_nick], (err, rows)=>{
            if(rows.length>0){
                console.log('닉네임 있음')
                res.send('닉네임 있음')
            }else{
                console.log('닉네임 없음')
                res.send('닉네임 없음')
            }
        })
    }else if(req.body.user_email){
        console.log('회원가입 이메일 중복 체크', req.body)
        let {user_email} = req.body
        let sql = "select user_email from user_info where user_email =?"
        conn.query(sql, [user_email], (err, rows)=>{
            if(rows.length>0){
                console.log('이메일 있음');
                res.send('이메일 있음')
            }else{
                console.log('이메일 없음');
                res.send('이메일 없음')
            }
        })
    }
})

// // 회원가입
// router.post('/join', (req,res)=>{
//     console.log('회원 가입')
//     console.log(req.body.form);
//     let {user_id, user_password, user_email, user_name, user_nick, user_phone, user_address} = req.body.form
    
//     let sql1 = "insert into user (user_id, user_password, user_nick) values(?, ?, ?)"
//     conn.query(sql1, [user_id, user_password, user_nick], (err, rows1)=>{
//         if(rows1.length>0){
//             let sql2 = "insert into user_info (user_id, user_name, user_email, user_phone, user_address) values(?,?,?,?,?)"
//             conn.query(sql2, [user_id, user_name, user_email, user_phone, user_address], (err,rows2)=>{
//                 if(rows2.length>0){
//                     console.log('회원가입 성공');
//                     res.send('회원가입 성공')
//                 } else{
//                     console.log('회원가입 실패2');
//                     console.error(err);
//                     res.send('회원가입 실패')
//                 }
//             })
//         } else{
//             console.log('회원가입 실패 1');
//             console.error(err);
//             res.send('회원가입 실패')
//         }
//     }) 
// })


// 회원가입
router.post('/join', (req, res) => {
    console.log('회원 가입');
    console.log(req.body.form);
    const { user_id, user_password, user_email, user_name, user_nick, user_phone, user_address } = req.body.form;

    let sql1 = "INSERT INTO user (user_id, user_password, user_nick) VALUES (?, ?, ?)";
    conn.query(sql1, [user_id, user_password, user_nick], (err, rows) => {
        if (err) {
            console.error(err);
            console.log('회원가입 실패 1');
            res.status(500).send('회원가입 실패');
        } else {
            let sql2 = "INSERT INTO user_info (user_id, user_name, user_email, user_phone, user_address) VALUES (?, ?, ?, ?, ?)";
            conn.query(sql2, [user_id, user_name, user_email, user_phone, user_address], (err, rows) => {
                if (err) {
                    console.error(err);
                    console.log('회원가입 실패 2');
                    res.status(500).send('회원가입 실패');
                } else {
                    console.log('회원가입 성공');
                    res.send('회원가입 성공');
                }
            });
        }
    });
});


module.exports = router