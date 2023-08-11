import React, {useEffect, useState} from 'react'
import '../Css/Card.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CardItem = ({name, addr, num, value}) => {

  console.log('데이터:',value)

  const data = value ;

  console.log('저장', data)
  const imgUrl = "../img/farmImg/"+num+".png"

  const nav = useNavigate();

  // const pick = value.filter((i)=> i.farm_num === num);

  // console.log('필터:', pick)


  const send = () =>{
    nav(`/find/${num}` , {state : {data}} )
  }


    
  return (
    <div className='searchcard' onClick={send}>
      <a href={`/find/${num}`} className='link'> 
      <div className='imageArea'>
        <img src={imgUrl} alt={name}></img>
      </div>
        <h3 className='stitle'>🌱 {name}</h3>
        <p className='ssubtitle'>{addr}</p>
      </a>
    </div>
  )
}

export default CardItem