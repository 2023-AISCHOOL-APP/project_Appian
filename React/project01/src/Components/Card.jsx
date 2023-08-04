import React from 'react'
import '../Css/Card.css'
import CardItem from './CardItem'


const Card = () => {

  const ex = [{"farm_num": 27, "farm_title": "행복한텃밭", "farm_Address": "광주광역시 광산구 도산동631,632", "lantitude": "35.12530834", "longitude": "126.7930857"}, {"farm_num": 28, "farm_title": "무명텃밭(광주 신촌동)", "farm_Address": "광주광역시 광산구 신촌동 1072-8", "lantitude": "35.14671756", "longitude": "126.8017624"}, {"farm_num": 29, "farm_title": "무명텃밭(광주 월곡동)", "farm_Address": "광주광역시 월곡동 490-7", "lantitude": "35.17437024", "longitude": "126.8078735"}, {"farm_num": 30, "farm_title": "친환경서송옥상텃밭", "farm_Address": "광주광역시 광산구 월곡동 52-12", "lantitude": "35.16843252", "longitude": "126.8104209"}, {"farm_num": 31, "farm_title": "행복둥지텃밭 1호", "farm_Address": "광주광역시 광산구 도천동 522", "lantitude": "35.22021435", "longitude": "126.8161993"}, {"farm_num": 1, "farm_title": "삼연주말농장", "farm_Address": "광산구 삼도동 586", "lantitude": "35.13253602", "longitude": "126.6866741"}, {"farm_num": 8, "farm_title": "솔머리행복텃밭", "farm_Address": "광주광역시 광산구 소촌동 420", "lantitude": "35.14628583", "longitude": "126.7930446"}, {"farm_num": 9, "farm_title": "행복둥지텃밭 2호", "farm_Address": "광주광역시 광산구 비아동 441", "lantitude": "35.21565732", "longitude": "126.8177204"}, {"farm_num": 25, "farm_title": "반월공동체텃밭", "farm_Address": "광주광역시 광산구 월곡동 110-7, 산105-12", "lantitude": "35.16583095", "longitude": "126.816104"}, {"farm_num": 26, "farm_title": "인계마을공동체희망텃밭", "farm_Address": "광주광역시 광산구 우산동 1601-7/889-3", "lantitude": "35.16022481", "longitude": "126.8070287"}];
  const bannerList = ex.map(item=>{
    return <CardItem key={item.farm_num} name ={item.farm_title} addr={item.farm_Address} num={item.farm_num}/>
   });


  return (
    <div >
      <h2>분양 중인 텃밭 🥕</h2>

    <div className='cardContainer'>   
     {bannerList}

    </div>
    </div>
  )
}

export default Card