// FindGarden.js
import React from 'react';
import GetAddress from '../Components/GetAddress';
import '../Css/GetAddress.css';

function FindGarden() {
  const style={
    backgroundColor : 'white'
  }
  return (
    <>
    <div className='infopage'>
      <div>
        <span className='infotitle'>텃밭 검색하기</span>
        <hr className='infohr'/>
        <img src='/img/titlebg.png' className='infotitle_bg'/>
      </div>
    </div>
    <div style={style}>
      <div className='find'>
      <GetAddress/>
      </div>
    </div>
    </>
  );
}

export default FindGarden;
