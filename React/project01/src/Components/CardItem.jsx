import React, {useEffect, useState} from 'react'
import '../Css/Card.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CardItem = ({name, addr, num}) => {

  console.log(num,name)

  const nav = useNavigate();
  const imgUrl = "../img/farmImg/"+num+".png"

  
  const [farms, setFarms] = useState([]);
  useEffect(()=>{
    const apiUrl = 'http://192.168.70.237:5022/detail2';
    axios.get(apiUrl, { responseType: 'json', params: { farm_num : num }})
      .then(response => {
        setFarms(response.data)
        console.log('test', response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    },[])

    const sendData = ()=>{
      nav(`/find/${num}`, {state: farms})
    }
  return (
    <div className='searchcard' onClick={sendData}>


      {/* <a href={`/find/${num}`} className='link'>  */}
      <div className='imageArea'>

        <img src={imgUrl} alt={name}></img>
      </div>
        <h3 className='stitle'>🌱 {name}</h3>
        <p className='ssubtitle'>{addr}</p>
    </div>
  )
}

export default CardItem