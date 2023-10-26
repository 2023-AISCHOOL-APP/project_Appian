const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    res.send('login main')
    console.log('login main');
})

router.post('/login', (req,res)=>{
    console.log('express - post', req.body);

    res.send([{"user_id" : "qwer", "user_nick" : "asdf", "user_type":1}])


})

module.exports = router