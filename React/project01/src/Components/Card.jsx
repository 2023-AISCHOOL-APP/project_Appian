import React from 'react'
import '../Css/Card.css'
import CardItem from './CardItem'



const Card = (data) => {

  
  console.log('받아온 값:',data);

  const farmList = data.list;
  console.log(farmList)
  const cards = farmList.map((v)=>{
    return <CardItem key={v.farm_num} name={v.farm_title} addr={v.farm_address} num={v.farm_num}/>
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