import { Map, MapMarker, CustomOverlayMap, ZoomControl } from 'react-kakao-maps-sdk';
import '../Css/Map.css'
import { useEffect,useContext, useState } from 'react'
import { FarmData } from '../Hooks/GetData';

const MapArea = () => {

  const [farms, setFarms] = useState([]);
  const data = useContext(FarmData)
  const keys =JSON.parse(sessionStorage.getItem('area'))
  
  // 사용자가 검색한 지역 리스트 만들기
  useEffect (()=>{
  console.log('ff',data, 'fdd',keys)

    if (keys.sigungu === '광산구'){
      setFarms(data[0].sector[0].info)
    }else if(keys.sigungu === '동구'){
      setFarms(data[0].sector[1].info)
    }else if(keys.sigungu === '서구'){
      setFarms(data[0].sector[2].info)
    }else if(keys.sigungu === '남구'){
      setFarms(data[0].sector[3].info)
    }else if(keys.sigungu === '북구'){
      setFarms(data[0].sector[4].info)
    }else if(keys.sigungu === '나주시'){
      setFarms(data[1].sector[0].info)
    }else if(keys.sigungu === '목포시'){
      setFarms(data[1].sector[1].info)
    }else if(keys.sigungu === '여수시'){
      setFarms(data[1].sector[2].info)
    }else if(keys.sigungu === '순천시'){
      setFarms(data[1].sector[3].info)
    }else if(keys.sigungu === '광양시'){
      setFarms(data[1].sector[4].info)
    }else if(keys.sigungu === '장성군'){
      setFarms(data[1].sector[5].info)
    }else if(keys.sigungu === '화순군'){
      setFarms(data[1].sector[6].info)
    }else{
      setFarms(data[0].sector[0].info)
    }

  },[keys])
  console.log(farms);
	const locations = [];

  farms.map((i)=> {
    locations.push({'title': i.farm_title, 'latlng': { 'lat': Number(i.lantitude), 'lng': Number(i.longitude) }});
    })
  console.log('위치',locations)

  const initialCenter = locations.length > 0 ? locations[0].latlng : { lat: 35.156669, lng: 126.835521 };
	


 
  
  return (
		<Map center={initialCenter} id ='map' level={3}>
			{locations.map((loc, idx) => (
				<MapMarker
					key={`${loc.title}-${loc.latlng}`}
					position={loc.latlng} onMouseOver={()=>{}}
					image={{
						src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
						size: { width: 64, height: 69 },
					}}
					title={loc.title}
				/>
			))}
      {locations.map((loc, idx) => (
        <CustomOverlayMap position={loc.latlng} xAnchor={0.5} yAnchor={1.1} >
        <div className="customoverlay">
          <a href={`https://localhost:3000/find/${farms[idx].farm_num}`} target="_blank">
            <span className="title">{farms[idx].farm_title}</span>
          </a>
        </div>
      </CustomOverlayMap>))}
      <ZoomControl />
		</Map>
	);
};
export default MapArea