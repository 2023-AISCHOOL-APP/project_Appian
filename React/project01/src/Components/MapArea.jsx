import { Map, MapMarker, CustomOverlayMap, ZoomControl } from 'react-kakao-maps-sdk';
import '../Css/Map.css'
import { useState } from 'react'

const MapArea = (data) => {

  console.log('받아온 값:',data);

  const farmList = data.list;
  console.log(farmList)
 
	const locations = [];

  farmList.map((i)=> {
    locations.push({'title': i.farm_title, 'latlng': { 'lat': Number(i.lantitude), 'lng': Number(i.longitude) }, 'num': i.farm_num});
    })
  console.log('위치',locations)

  const locaInfo = locations.map((l)=>
    <MapMarker
					key={`${l.title}-${l.latlng}`}
					position={l.latlng} onClick={()=>setLevel(5)}
					image={{
						src: 'img/mapPin.png',
						size: { width: 100, height: 120 }
					}}
					title={l.title}
				/>
        
  )
  
  const initialCenter = locations.length > 0 ? locations[0].latlng : { lat: 35.156669, lng: 126.835521 };
  const [level, setLevel] = useState(5);
 
  return (
		<Map center={initialCenter} id ='map' level={5} onZoomChanged={(map) => setLevel(map.getLevel())}>
      {locaInfo}
      {locations.map((loc, idx) => (
        level < 6 ? (
        <CustomOverlayMap key={loc.num} position={loc.latlng} xAnchor={0.5} yAnchor={1.1} >
        <div className="customoverlay">
          <a href={`/find/${loc.num}`} target="_blank" >
            <span className="title">{loc.title}</span>
          </a>
        </div>
      </CustomOverlayMap> ) : null ))}
      
      <ZoomControl />
      
		</Map>
	);
};
export default MapArea