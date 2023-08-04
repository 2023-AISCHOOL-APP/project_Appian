import React from 'react'
import { useState, useEffect } from 'react';
import '../Css/GetAddress.css';
import Map from './Map';
import Card from './Card';
import axios from 'axios';


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

  // 사용자가 값을 선택했을 때! 통신을 통해 서버에 데이터 보내기




  // 통신을 통해 서버에서 데이터 받아오기
  const url = 'http://192.168.70.65:5022/result'

  const [resdata, setResdata] = useState([]);


  const getData = () => {
    console.log('getDataWithAxios')
    axios(url, {responseType: 'json'})
    .then(result =>{
      console.log("서버로 받은 값:", result.data)
      setResdata(result.data)
    })
  }

  useEffect(() =>{
    getData()
    console.log('타이밍테스트')
  },[sigungu])
  
  

  return (
    <div className='form'>
      <select className='form-control' kvalue={sido} onChange={changeSido}>
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
      {console.log('잘뿌려졌어!',sido,sigungu)}
      {console.log('프랍전',resdata)}
      {/* <Map data={resdata}/> */}
      <Card />
    </div>
    
  )
}

export default GetAddress