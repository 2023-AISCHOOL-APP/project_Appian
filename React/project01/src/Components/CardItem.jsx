import React from 'react'
import '../Css/Card.css'


const CardItem = ({name, addr, num}) => {

  console.log(num,name)

  const imgUrl = "../img/farmImg/"+num+".png"
  return (
    <div className='searchcard'>
      <a href={`http://locallhost:3000/find/${num}`} target="_blank" className='link'> 
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