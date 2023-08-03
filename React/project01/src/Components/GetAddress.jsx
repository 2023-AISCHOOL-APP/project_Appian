import React from 'react'
import { useState } from 'react';
import '../Css/GetAddress.css';
import Map from './Map';
import Card from './Card';


const GetAddress = () => {

  const sidos = [
    {
      name: '광주광역시',
      sigungus : [
        { name : '광산구'}, 
        { name : '동구'},
        { name :'서구'},
        { name :'남구'},
        { name : '북구'}]
    },
    {
      name: '전라남도',
      sigungus : [
        { name : '화순군'}, 
        { name : '나주시'},
        { name : '서구'},
        { name : '순천시'},
        { name : '장성군'}]
    }
  ];


  const [sido, setSido] = useState([]);
  const [sigungu, setSigungu] = useState([]);
  const [sigungus, setSigungus] = useState([]);
  
  
  const changeSido = (event)=>{
    setSido(event.target.value);
    const siItem = sidos.find((item)=> item.name === event.target.value);
    return setSigungus(siItem.sigungus);
  }

  const changeSigungu = (event)=>{
    setSigungu(event.target.value);
  }
  

  return (
    <div className='form'>
      <select className='form-control' value={sido} onChange={changeSido}>
        <option>시/도 선택</option>
        {sidos.map(item=>(
          <option value={item.name}>{item.name}</option>
        ))}

      </select>
      <select className='form-control' value={sigungu} onChange={changeSigungu}>
        <option>시/군/구 선택</option>
        {sigungus.map(item=>(
          <option value={item.name}>{item.name}</option>
        ))}
      </select>
      {console.log('작동!',sido,sigungu)}
      <Map uSido={sido} uSigungu={sigungu}/>
      <Card uSido={sido} uSigungu={sigungu}/>
    </div>
    
  )
}

export default GetAddress