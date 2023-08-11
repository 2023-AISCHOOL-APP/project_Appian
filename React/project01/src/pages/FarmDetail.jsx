
import React, { useContext } from 'react'
import '../Css/FarmDetail.css'
import '../Components/MapStatic'
import MapStatic from '../Components/MapStatic'
import { AllFarm } from '../Contexts/FarmContext'
import { useParams } from 'react-router-dom';

const FarmDetail = () => {

  const { farmId } = useParams();
  console.log('굿',farmId)


  return (
    <div>
      <p>what?</p>
    </div>
  )
}

export default FarmDetail