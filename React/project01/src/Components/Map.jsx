
import '../Css/Map.css';
import { useEffect } from 'react';
import result from '../result.json';


const {kakao} = window;

function Map ({uSido, uSigungu}) {

  const farm = result;

  console.log('받았어!', uSido, uSigungu )
  


  /* 통신을 통해 데이터베이스에서 데이터 받아오기
  1) props로 사용자가 선택한 데이터에 맞는 데이터만 가져오기
    sql = select * from farm where sido== userSido and sigungu == userSigungu 

    */ 
 


  useEffect(()=>{
    const container = document.getElementById('map'); // 지도를 표시할 div 
    const mapCenter = new kakao.maps.LatLng(farm.lantitude[0],farm.longitude[0]); // 지도의 중심좌표
    const mapOption = {
          center: mapCenter, // 지도의 중심좌표
          level: 5 // 지도의 확대 레벨
      };
    const map = new kakao.maps.Map(container, mapOption);

    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다    
        imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기입니다
        imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
      
    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
    markerPosition = new kakao.maps.LatLng(farm.lantitude[0],farm.longitude[0]); // 마커가 표시될 위치입니다

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
    position: markerPosition,
    image: markerImage // 마커이미지 설정 
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);  

    // 커스텀 오버레이에 표시할 내용
    var content = `<div class="customoverlay">
      <a href="https://map.kakao.com/link/map/${farm.farm_num[0]}" target="_blank"><span class="title">${farm.farm_title[0]}</span></a></div>`;


    // 커스텀 오버레이에 표시될 위치
    var position = new kakao.maps.LatLng(farm.lantitude[0],farm.longitude[0]);
    
    // 커스텀 오버레이 생성
    var mapCustomOverlay = new kakao.maps.CustomOverlay({
      position: position,
      content: content,
      xAnchor: 0.5, // 커스텀 오버레이의 x축 위치입니다. 1에 가까울수록 왼쪽에 위치합니다. 기본값은 0.5 입니다
      yAnchor: 1.1 // 커스텀 오버레이의 y축 위치입니다. 1에 가까울수록 위쪽에 위치합니다. 기본값은 0.5 입니다
    });
  
    // 커스텀 오버레이를 지도에 표시합니다
    mapCustomOverlay.setMap(map);
  
  })


  return (
    <div className='map-container'>
  
      <div id="map"></div>
    </div>
  );
}

export default Map;
