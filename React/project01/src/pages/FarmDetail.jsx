
import React from 'react'
import '../Css/FarmDetail.css'
import '../Components/MapStatic'
import MapStatic from '../Components/MapStatic'


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

      <div className='address_border'>
        <img src='/img/mapPin.png' className='address_mappin'/>
      <span className='address'>텃밭 주소</span>
      <span className='farm_address'>광주광역시 광산구 삼도동 586</span>
        
      </div>

      <div>
        {/* <div className='desc_hr'/> */}
        <div className='desc_hr2'/>
        <span className='description'>
            푸른 언덕과 신선한 공기가 여러분을 맞이하는 곳, 삼연 주말 농장에서 근사한 휴식을 경험해보세요.<br/> 
            자연과의 소중한 만남을 농장 체험과 다채로운 야외 활동으로 만끽하며, 가족과 함께하는 특별한 시간을 펼쳐보세요.<br/> 
            삼연 주말 농장에서 오롯이 행복과 여유를 만끽할 수 있습니다.</span>
      </div>

    <div className='detail_all'>
              <div>
                <img src='/img/farmdetail/farmdetailimg1.jpg' className='farm_imgsmall'/>
              </div>
              <div className='use_id'>
                <span>작성자 :</span><span> 홍길동</span>
              </div>
              <div className='detail_date'>
                <span>등록일 :</span><span> 2023.08.08</span>
              </div>

              <div >
                    <img src='/img/calendericon.png' className='calendericon'/>
                      <span className='lental_title'>분양기간</span>
                    <div className='lental_all'>
                      <div className='lental_border1'>
                            <span className='lental_startdate'>2023-09-01</span>
                        </div>
                        <span className='lental_date'>~</span>
                        <div className='lental_border2'>
                            <span className='lental_endDate'>2024-09-01</span>
                      </div>
                      </div>
              </div>

              <div className='areaAll'>
                  <img src='/img/longitude.png' className='lental_areaicon'/>
                    <span className='lental_areaTitle'>면적</span>
                    <div className='area_border1'>
                          <span className='lental_area'>5</span>
                      </div>
                      </div>
              </div>

              <div className='priceAll'>
                <img src='/img/moneyicon.png' className='moneyicon'/>
                <span className='price_title'>희망분양가</span>
                <div className='price_border1'>
                          <span className='price'>120000</span>
                      </div>
              </div>

              <div className='calender_border'></div>
              <div className='farmapply_border'>
                <span className='farmapply_btn'>분양 신청하기</span>
              </div>

              <div className='Q_border'>
                <span className='Q_btn'>문의 글 남기기</span>
              </div>

              <div className='call_border'>
                <span className='call_btn'>문의 연락처</span>
              </div>

              

              < MapStatic className='farmmap'/>
            </div>
            </div>
  )
}

export default FarmDetail