import React from 'react'
import PageTitle from '../Components/PageTitle';
import '../Css/PredictPage.css'
import Carousel from 'react-bootstrap/Carousel';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MachineSlide from '../MachineSlide ';


const Machin = () => {

  const [priceList, setPriceList] = useState([])

  useEffect(()=>{
    const priceUrl = 'http://192.168.70.237:5022/price';
    axios.get(priceUrl, { responseType: 'json' })
    .then(response => {
      setPriceList(response.data);
      console.log('예측 페이지 들어왔을때 받은 데이터', response.data);
    })
    .catch(error => {
      console.error('보내기 에러');
    });
  },[])

  
  return (
    <div>
      <PageTitle data={'작물 가격 예측'} num={2}/>
      <div id='predictPage'>
        <p>여기에 꾸며주세요!</p>
      </div>
      <div>
        <MachineSlide slideData={priceList}/>
        
      </div>
    </div>
  )
}

export default Machin
