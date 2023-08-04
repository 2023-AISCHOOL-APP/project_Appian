import { useState } from 'react';
import '../Css/Map.css';


const {kakao} = window;

function Map (data) {
  console.log('Map 받은 프랍확인:', data.data)

  const [resList, setResList] = useState(data.data);
  




  console.log('데이터확인', resList[0].lantitude, resList[0].longitude)
 
  const container = document.getElementById('map'); // 지도를 표시할 div 
  const mapCenter = new kakao.maps.LatLng(); // 지도의 중심좌표
  const mapOption = {
      center: mapCenter, // 지도의 중심좌표
      level: 8 // 지도의 확대 레벨
  };

  const map = new kakao.maps.Map(container, mapOption);

  // let positions = [];
  
  // // 여러개의 마커를 표시할 위치와 title 객체 배열

  // for (let i =0 ; i < resList.length ; i++){
  //   positions.push({
  //     content : `<div class="customoverlay">
  //     <a href="https://map.kakao.com/link/map/${resList[i].farm_num}" target="_blank"><span class="title">${resList[i].farm_title}</span></a></div>`,
  //     lanlng : new kakao.maps.LatLng(Number(resList[i].lantitude), Number(resList[i].longitude))
  //   })
  // }
  
  // console.log('장소 정보 : ' , positions)

  // for (let i = 0; i < positions.length; i++) {     
  //   let imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소 
  //   imageSize = new kakao.maps.Size(64, 69), // 마커이미지의 크기
  //   imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션(마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정)
    
  //   // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
  //   let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
  //   markerPosition = positions[i].lanlng; // 마커가 표시될 위치입니다
  //   // 마커를 생성합니다
  //   let marker = new kakao.maps.Marker({
  //     position: markerPosition,
  //     image: markerImage // 마커이미지 설정 
  //     });
    
  //   // 커스텀 오버레이에 표시될 위치
  //   let coposition = positions[i].lanlng;  
  //   let mapCustomOverlay = new kakao.maps.CustomOverlay({
  //     position: coposition,
  //     content: positions[i].content,
  //     xAnchor: 0.5, // 커스텀 오버레이의 x축 위치입니다. 1에 가까울수록 왼쪽에 위치합니다. 기본값은 0.5 입니다
  //     yAnchor: 1.1 // 커스텀 오버레이의 y축 위치입니다. 1에 가까울수록 위쪽에 위치합니다. 기본값은 0.5 입니다
  //   });
    
  //   mapCustomOverlay.setMap(map);
  //   marker.setMap(map); 
  // }

  


  console.log('반복문 끝!')

  


  return (
    <div className='map-container'>
      <div id="map"></div>
    </div>
  )
}


export default Map;
