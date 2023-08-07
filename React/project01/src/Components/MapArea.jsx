import { Map, MapMarker, CustomOverlayMap, ZoomControl } from 'react-kakao-maps-sdk';
import '../Css/Map.css'
import { useEffect, useState } from 'react'
import MarkerTest from './MarkerTest';

const MapArea = (data) => {

  console.log('받아온 값:',data);

  const farmList = data.list;
  console.log(farmList)
 
	const locations = [];

  farmList.map((i)=> {
    locations.push({'title': i.farm_title, 'latlng': { 'lat': Number(i.lantitude), 'lng': Number(i.longitude) }});
    })
  console.log('위치',locations)

  const locaInfo = locations.map((l)=>
    <MapMarker
					key={`${l.title}-${l.latlng}`}
					position={l.latlng} onClick={()=>setIsOpen(true)}
					image={{
						src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
						size: { width: 64, height: 69 },
					}}
					title={l.title}
				/>
  )

  const initialCenter = locations.length > 0 ? locations[0].latlng : { lat: 35.156669, lng: 126.835521 };

  const [level, setLevel] = useState();
  const [isOpen, setIsOpen] = useState(false);
 
  return (
		<Map center={initialCenter} id ='map' level={5} onZoomChanged={(map) => setLevel(map.getLevel())}>
      {locaInfo}
      <MarkerTest/>
      {/* {locations.map((loc, idx) => (
        level < 5 ? (
        <CustomOverlayMap position={loc.latlng} xAnchor={0.5} yAnchor={1.1} >
        <div className="customoverlay">
          <a href={`https://localhost:3000/find/${farms[idx].farm_num}`} target="_blank" >
            <span className="title">{farms[idx].farm_title}</span>
          </a>
        </div>
      </CustomOverlayMap> ) : null ))} */}
      <ZoomControl />
      현재 레벨 {level}입니다.
		</Map>
	);
};
export default MapArea