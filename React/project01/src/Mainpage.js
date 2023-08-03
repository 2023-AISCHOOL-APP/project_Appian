import React from 'react'
import './Main.css';
import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slide from './Slide';



const Mainpage = () => {


  // 이미지 슬라이더 
  const myRef = React.createRef();



  const [showBanner, setShowBanner] = useState(false);
  // showBanner라는 상태 변수를 선언 , 초기값으로 'false'를 설정 => 플로팅 배너의 보이기/숨기기 여부를 제어할 때 사용 

  useEffect(() => {


    const handleScroll = () => { // 스크롤 이벤트를 처리하는 함수
      // 스크롤 위치가 300px 이상이면 배너를 보여줌
      setShowBanner(window.scrollY >= 0); //0이상이면 true가 되도록,
    };

    window.addEventListener('scroll', handleScroll); 
    //handleScroll 함수를 스크롤 이벤트에 연결

    // cleanup 함수
    return () => {
      window.removeEventListener('scroll', handleScroll); 
      //컴포넌트가 언마운트 될때 handleScroll 함수를 스크롤 이벤트에 연결 해제

    };
  }, []);


  return (
    <div>

       {/* 플로팅 배너 */}
       <div className={`floating-banner ${showBanner ? 'show' : ''}`}>
        {/* showBanner 변수의 값에 따라 플로팅 배너에 show 클래스를 추가하거나 제거 */}
        {/* 배너 내용 */}
        <Link to='/machin'>
            <img src='/img/main_banner.png' alt="banner" />
        </Link>
      </div>


      <Slide />

      <div className='girl1'>
        <img src="/img/girl1.png" alt="girl1" />
      </div>
      <div className='girl2'>
        <img src="/img/girlbott.png"/>
      </div>
      
      <div className='bg2'>
        <img src="/img/bg2.png"/>
      </div>

      <div className='mainTitle'>
        <span>소중한 땅 한조각</span>
        <br/>
        <span>행복을 키우는</span>
        <br/>
        <span>팜팜을 만나보세요!</span>
      </div>

      <div className='sub'>
        <span>텃밭을 나누고 받으며, 자연과 소통하는 특별한 공간을 경험해보세요.</span>
          <br/>
        <span>지금 내 텃밭을 내놓거나 특별한 나만의 공간을 구해보세요!</span>
      </div>

      
        <span className='mainTitle2'>팜팜탐험</span>
        <br/>
        <span className='sub2'>작은 행복과 자연의 만남을 기다려요~</span>

        <div className='brocol'>
           <img src="/img/brocol.png"/>
        </div>
        


        <div className='MAINBUTTON'>
          <div className='mainbutton1'>
            <img src="/img/mainbutton1.png"/>
          </div> 
          {/* mainbutton1에 버튼으로 사용할 것 만들기 */}
          
            <div className='findbtn'>
            <Link to='/find' className='findname'>
              <span >바로가기→</span>
              </Link>
            </div>
          

            <div className='findbtn2'>
            <Link to='/out' className='findname'>
              <span >바로가기→</span>
              </Link>
            </div>


          <div className='mainbutton2'>
            <img src="/img/mainbutton2.png"/>
          </div> 
          </div>



        <div className='yellowtop'>
          <img src="/img/yellowtop.png"/>
        </div>

        <span className='mainTitle3'>텃밭소식</span>
        <br/>
        <span className='sub3'>지금 바로 나만의 텃밭을 만나보세요!</span>

        <div className='yellowbott'>
          <img src="/img/yellowbott.png"/>
        </div>

        <div className='yellowbutton'>
          <img src="/img/yellowbutton.png"/>
        </div>

        <div className='main_bottom'>
          <img src='/img/main_bottom.png'/>
        </div>

        <div className='yellow_fence'>
          <img src='/img/yellowbg.png'/>
        </div>

        <div className='yellow_leaves'>
          <img src='/img/yellowbg2.png'/>
        </div>

        <div className='yellow_soil'>
          <img src='/img/yellowbg3.png'/>
        </div>

        <div className='yellow_shovel'>
          <img src='/img/yellowbg4.png'/>
        </div>
    </div>
  )
}

export default Mainpage