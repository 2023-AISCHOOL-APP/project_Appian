const express = require('express');
const router = express.Router();

// 작물 예측 데이터
    // 작물 이미지는 react 서버에 있음
    // react랑 node 같이 쓰니 둘이 서버 폴더에 접근 가능하므로 
    // 만약 react랑 node 같이 쓰면 굳이 이미지 api만들필요 없을듯
router.get('/crop_price', (req,res)=>{
    console.log('가격 예측 데이터 조회');
})


module.exports = router;