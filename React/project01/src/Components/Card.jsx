import React from 'react'
import '../Css/Card.css'
import CardItem from './CardItem'
import { useState, useEffect } from 'react'

const Card = ({uSido, uSigungu}) => {

  const [areaName,setAreaName] = useState('근처');

  useEffect (()=>{
    setAreaName(uSigungu)
  },[]);



  return (
    <div >
      <h2>{areaName} 분양 중인 텃밭 🥕</h2>

    <div className='cardContainer'>

      
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
      
      


    </div>
    </div>
  )
}

export default Card