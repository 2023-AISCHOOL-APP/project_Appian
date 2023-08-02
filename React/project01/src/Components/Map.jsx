
import './Map.css';
import { useEffect} from 'react';
import farmdata from './farmdata.json';



const {kakao} = window;

function Map() {

  const farm = farmdata;
 
  

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
      <a href="https://map.kakao.com/link/map/${farm.farmNum[0]}" target="_blank"><span class="title">${farm.farmName[0]}</span></a></div>`;


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

  const areaName = [];


  return (
    <div className='map-container'>
      <form>
        <select name="지역선택">
        </select>
      </form>

      <div id="map"> </div>
    </div>
  );
}

export default Map;
