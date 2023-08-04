import React from 'react'
import '../Css/Card.css'


const CardItem = ({name, addr, num}) => {

  console.log(num,name)

  const imgUrl = "../img/farmImg/"+num+".png"
  return (
    <div className='searchcard'>
      <div className='imageArea'>
        <img src={imgUrl} alt={name}></img>
      </div>
        <h3 className='stitle'>🌱 {name}</h3>
        <p className='ssubtitle'>{addr}</p>
    </div>
  )
}

export default CardItem