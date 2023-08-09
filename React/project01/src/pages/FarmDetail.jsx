
import React from 'react'
import '../Css/FarmDetail.css'


const FarmDetail = () => {
  return (
    <div className='farmDetailAll'>
      
      <img src='/img/farmdetail/farmdetailimg1.jpg' className='farmdetail_img1'/>
      <div className='Fdetail_title-container'>
      <span className='farmdetail_Maintitle'>삼연주말농장</span>
      </div>


      <div className='borderAll'>
          <div className='lental_border'>
              <span className='lental_type'>중형</span>
          </div>
          <div className='type_border'>
              <span className='farm_type'>개인</span>
          </div>

          <div className='calender'>

          </div>  

      <div>
        <span className='farm_address'>광주광역시 광산구 삼도동 586</span>
      </div>

      <div>
        <div className='desc_hr'/>
        <div className='desc_hr2'/>
        <span className='description'>
            푸른 언덕과 신선한 공기가 여러분을 맞이하는 곳, 삼연 주말 농장에서 근사한 휴식을 경험해보세요.<br/> 
            자연과의 소중한 만남을 농장 체험과 다채로운 야외 활동으로 만끽하며, 가족과 함께하는 특별한 시간을 펼쳐보세요.<br/> 
            삼연 주말 농장에서 오롯이 행복과 여유를 만끽할 수 있습니다.</span>
      </div>

      <div className='use_id'>
        <span>작성자 :</span><span> 홍길동</span>
      </div>
      <div className='detail_date'>
        <span>등록일 :</span><span> 2023.08.08</span>
      </div>

      <div>
        <span className='lental_startdate'>2023-09-01</span>
        <span className='lental_endDate'>2024-09-01</span>

      </div>

    
      </div>
    </div>
  )
}

export default FarmDetail