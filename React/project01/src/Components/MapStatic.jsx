import { margin } from '@mui/system';
import React, { useState } from 'react'
import { Map, MapMarker, Roadview } from 'react-kakao-maps-sdk';



// 개별 농장의 정보 
const MapStatic = () => {

  // 수정내역
  // 1) 로드뷰 위경도
  // 2) 맵 위경도 

  const [isError, setIsError] = useState(false)
  const [center, setCenter] = useState({
    lat: 35.13253602,
    lng: 126.6866741
  })

  return (
    <div style={{ display: "flex" ,marginLeft:'320px' , marginRight:'320px' ,marginTop:'-90px'}}>
      <Map // 로드뷰를 표시할 Container // 농장 정보 수정 필요!!
        center={{
          lat: 35.13253602,
          lng: 126.6866741
        }}
        style={{
          // 지도의 크기
          width: isError ? "100%" : "50%",
          height: "400px",
        }}
        level={3}
        onClick={(_, mouseEvent) => {
          setCenter({
            // @ts-ignore
            lat: mouseEvent.latLng.getLat(),
            // @ts-ignore
            lng: mouseEvent.latLng.getLng(),
          })
          setIsError(false)
        }}
      >
        <MapMarker
          position={center}
          draggable={true}
          onDragEnd={(marker) => {
            setCenter({
              // @ts-ignore
              lat: marker.getPosition().getLat(),
              // @ts-ignore
              lng: marker.getPosition().getLng(),
            })
            setIsError(false)
          }}
          image={{
            src: "/img/mapPin.png",
            size: { width: 60, height: 90 },
            
          }}
        />
      </Map>
      <Roadview // 로드뷰를 표시할 Container
        position={{ ...center, radius: 50 }}
        style={{
          // 지도의 크기
          width: isError ? "0" : "50%",
          height: "400px",
        }}
        onErrorGetNearestPanoId={() => setIsError(true)}
      ></Roadview>
    </div>
  )
}
export default MapStatic