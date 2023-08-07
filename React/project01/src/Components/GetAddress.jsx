import React from 'react'
import { useState, useContext, useEffect } from 'react';
import '../Css/GetAddress.css';
import MapArea from './MapArea'
import Card from './Card';
import { FarmData } from '../Hooks/GetData';
import axios from 'axios';



const GetAddress = () => {

  // const data = useContext(FarmData)
  // console.log(data)
  const sidos = [
    {
      name: '광주광역시',
      sigungus : [
        { name : '광산구'}, 
        { name : '동구'},
        { name : '서구'},
        { name : '남구'},
        { name : '북구'}]
    },
    {
      name: '전라남도',
      sigungus : [
        { name : '나주시'}, 
        { name : '목포시'},
        { name : '여수시'},
        { name : '순천시'},
        { name : '광양시'},
        { name : '화순군'},
        { name : '장성군'}]
    }
  ];


  const [sido, setSido] = useState(['광주광역시']);
  const [sigungu, setSigungu] = useState(['광산구']);
  const [sigungus, setSigungus] = useState(['광산구']);
  const [message, setMessage] = useState('');

  
  
  const changeSido = (event)=>{
    setSido(event.target.value);
    const siItem = sidos.find((item)=> item.name === event.target.value);
    return setSigungus(siItem.sigungus);
  }

  const changeSigungu = (event)=>{
    setSigungu(event.target.value);
  }


  useEffect(() => {
    // Flask 서버의 주소
    const apiUrl = 'http://192.168.70.147:5022/test';

    // Axios를 사용하여 GET 요청 보내기
    axios.get(apiUrl, { params: { sidos: sido, sigungu: sigungu } })
      .then(response => {
        setMessage(response.data);
        console.log('sql', response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [sidos, sigungus]);

  // 사용자가 값을 선택했을 때! 통신을 통해 서버에 데이터 보내기




  // 통신을 통해 서버에서 데이터 받아오기
  // const url = 'http://192.168.70.65:5022/result'

  // const [resdata, setResdata] = useState([]);


  // const getData = () => {
  //   console.log('getDataWithAxios')
  //   axios(url, {responseType: 'json'})
  //   .then(result =>{
  //     console.log("서버로 받은 값:", result.data)
  //     setResdata(result.data)
  //   })
  // }

  // useEffect(() =>{
  //   getData()
  //   console.log('타이밍테스트')
  // },[sigungu])
  
  

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

        {sessionStorage.setItem('area', JSON.stringify({sido,sigungu}))}
      </select>
      
      <MapArea />
      <Card />
    </div>
    
  )
}

export default GetAddress