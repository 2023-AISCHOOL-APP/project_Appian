import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import MapStatic from './MapStatic';
import '../Css/FarmDetail.css'
import axios from 'axios';
import CalendarRange from './CalendarRange'


const FindDetail = () => {
  const farms = useLocation().state.data


 console.log('farms데이터확인',farms)


  const { id } = useParams();
  console.log('번호',id, '받은데이터',farms)


  const loca = {lat : farms.lantitude, lng : farms.longitude}
  console.log(loca)

  const appDate = {startDate : farms.startDate, endDate : farms.endDate} // 캘린더 표시 값
  // const [farms, setFarms] = useState([]);
  // useEffect(()=>{
  //   const apiUrl = 'http://192.168.70.237:5022/detail2';
  //   axios.get(apiUrl, { responseType: 'json', params: { farm_num : id }})
  //     .then(response => {
  //       setFarms(response.data)
  //       console.log('test', response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // },[]);

  // 캘린더 적용 코드 (DB랑 연동 필요)
  const startDate = new Date(farms.startDate); // 시작일
  const endDate = new Date(farms.endDate);
  console.log(startDate, endDate)



  const userId = sessionStorage.getItem('user_id')
  const [showSuccessMessage, setShowSuccessMessage]=useState(false);
  const nav = useNavigate();


  const farm_apply = ()=>{
    const applyUrl = 'http://192.168.70.237:5022/farm_apply';
    if (userId === farms.user_id){
      alert('본인의 텃밭엔 신청할 수 없어요!')
    }else{
      axios
        .get(applyUrl, { responseType: 'json', params: { user_id : userId, farm_num : farms.farm_num } })
        .then(response => {
          console.log('Response from server:', response.data);
          if (response.data.message === 'success') {
            setShowSuccessMessage(true);
            // 여기서 바로 리디렉션을 수행
            setTimeout(() => {
              setShowSuccessMessage(false);
              alert('분양 신청이 완료되었습니다. mypage로 이동합니다.');
              // 작성 완료 메시지가 표시된 후  페이지로 이동
              nav('/mypage/mylist')
              
            }, 10);
          } else {
            alert(response.data.message);
          }
        })
        .catch(error => {
          console.error('Error sending data:', error);
          alert('분양 신청 중 오류가 발생했습니다.');
        });
      }
    }
  

 
  return (

    
    <div className='farmDetailAll'>
      
      
      <img src='/img/farmdetail/farmdetailimg1.jpg' className='farmdetail_img1'/>
      <div className='Fdetail_title-container'>
        <span className='farmdetail_Maintitle'>{farms.farm_title}</span>
        <div className='lental_border'>
          <span className='lental_type'>{farms.lental_type}</span>
        </div>
        <div className='type_border'>
          <span className='farm_type'>{farms.farm_type}</span>
        </div>
        <div className='textbox'>
          <span className='description'>
            
          {farms.description}</span>
          <div className='desc_hr2'></div>
         
        </div>
      </div>
     
      <p className='border_title'>분양 정보</p>
      <p className='farmdetailmaintitle'>텃밭 신청하기</p>
      <div className='part2'>
        
        <img src={`http://192.168.70.237:5022/farm_img/${farms.farm_img}`} className='farm_imgsmall'/>
        <div className='address_border'>
          <img src='/img/mapPin.png' className='address_mappin'/>
          <span className='address'>텃밭 주소</span>
          <span className='farm_address'>{farms.farm_address}</span>
        </div>
       
        <div className='farmapply_border'>
          <span className='farmapply_btn' onClick={farm_apply}>분양 신청하기</span>
        </div>

      </div>
      <div className='part2_sub'>
      <div className='detailAll'>
        <div className='use_id'>
          <span>작성자 :</span><span> {farms.user_nick}</span>
        </div>
        <div className='detail_date'>
          <span>등록일 :</span><span> {farms.farm_date}</span>
        </div>
        </div>
        <div className='lental_all'>
          <img src='/img/calendericon.png' className='calendericon'/>
          <span className='lental_title'>분양기간</span>
          <div className='lentalborderall'>
          <div className='lental_border1'>
            <span className='lental_startDate'>{farms.lental_startDate}</span>
          </div>
          <span className='lental_date'>~</span>
          <div className='lental_border2'>
            <span className='lental_endDate'>{farms.lental_endDate}</span>
          </div>
          </div>
        </div>
  
        <div className='areaAll'>
          <img src='/img/longitude.png' className='lental_areaicon'/>
          <span className='lental_areaTitle'>분양면적</span>
          <div className='area_border1'>
            <span className='lental_area'>{farms.lental_area}</span>
          </div>
        </div>
     
        <div className='priceAll'>
          <img src='/img/moneyicon.png' className='moneyicon'/>
          <span className='price_title'>희망분양가</span>
          <div className='price_border1'>
            <span className='price'>{farms.farm_price}</span>
          </div>
        </div>

      
        <div className='call_border'>
          <span className='call_btn'>문의 연락처</span>
          <div className='call_subtitle'>
              <p>{farms.user_name}</p>
              <p>전화 : {farms.user_phone}</p>
              <p>이메일 : {farms.user_email}</p>
          </div>
        </div>
        <MapStatic className='farmmap' data={loca}/>
      </div>
      <div className='calender'>
          <CalendarRange startDate={startDate} endDate={endDate}/>
        </div>  
      </div>
  )
}

export default FindDetail