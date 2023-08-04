import React from 'react'
import  { Component } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

class Slide extends Component {
  
    render() {
        
        const settings = {  
            // 슬라이드 옵션설정 
            arrows: false,  // 화살표 표시 > false 로 설정해서 화살표를 숨긴다
            dots: true,  // 밑에 현재 페이지와 나머지 페이지 점으로 표시 > true로 설정하여 페이지 점을 보여준다
            infinite: true,  // 무한 반복여부 (true로 설정해서 무한반복)
            speed: 80,  // 넘기는 속도
            slidesToShow: 2,  // 슬라이드에 보여지는 아이템 개수
            slidesToScroll: 1,  // 슬라이드 넘기는 아이템 개수
            autoplay: true ,  // 자동 재생여부
            autoplaySpeed: 2000,  // 자동 재생 속도
            
        };
        
        return (
          <div > 
              {/* 슬라이더 컴포넌트 */}
                <Slider {...settings} className='slider-container'>
                    {/* div에 슬라이드 각 아이템 구현 */}
                    
                  <div className='slider1'>
                    <Link to='/find'>
                      <img src='https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/3yvw/image/Rbv3OUNfg5pUKr2nthgd6nuHcHo.PNG'
                          className='slideimg1'/>
                      <span className='slide_sub1'>안녕하세요 행복이 가득한 솔머리 행복 텃밭입니다!</span>
                      <span className='slide1'>솔머리 행복 텃밭</span>
                      <span className='slide_sub1_1'>2023.08.01 ~ 2023.12.31</span>
                    </Link>
                  </div>
                  <div className='slider2'>
                  <Link to='/find'>
                    <img src='https://www.ccnnews.co.kr/news/photo/202203/250219_312295_1743.jpg'
                        className='slideimg2'/>
                    <span className='slide_sub2'>안녕하세요! 해피해피팜 주말농장 입니다 ~</span>
                    <span className='slide2'>해피팜 주말농장</span>
                    <span className='slide_sub1_1'>2023.08.01 ~ 2023.12.31</span>
                    </Link>
                  </div>
                  <div className='slider3'>
                  <Link to='/find'>
                   <img src='https://image.ajunews.com/content/image/2022/07/12/20220712103757800281.jpg'
                        className='slideimg3'/>
                   <span className='slide3'>건강희망텃밭</span>
                   <span className='slide_sub3'>건강하고 희망찬 텃밭~ 건강희망 텃밭입니다!</span>
                   </Link>
                  </div>
                  <div className='slider4'>
                    <Link to='/find'>
                    <img src='https://cityfarmer.seoul.go.kr/fileManager/www/editorUpload/9999/1676279412768.jpeg'
                          className='slideimg4'/>
                    <span className='slide4'>나무향기 현천골농장</span>
                    <span className='slide_sub4'>나무향이 솔솔 나는 현천골로 오세요~</span>
                    </Link>
                  </div>
                </Slider>
            </div>
        );
    }
  }
  
  
  

export default Slide