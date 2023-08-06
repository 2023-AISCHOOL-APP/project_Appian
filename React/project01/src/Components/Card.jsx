import React, {useContext, useEffect, useState} from 'react'
import '../Css/Card.css'
import CardItem from './CardItem'
import { FarmData } from '../Hooks/GetData'


const Card = () => {


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
  const cards = farms.map((v)=>{
    return <CardItem key={v.farm_num} name={v.farm_title} addr={v.farm_Address} num={v.farm_num}/>
  })
  
  return (
    <div>
      <h2 id='ct'>분양 중인 텃밭 🥕</h2>

    <div className='cardContainer'>   
      {cards}
    </div>
    </div>
  )
}

export default Card