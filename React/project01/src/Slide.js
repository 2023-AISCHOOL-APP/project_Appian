import React from 'react'
import  { Component } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class Slide extends Component {
  
    render() {
        
        const settings = {  
            // 슬라이드 옵션설정 
            arrows: false,  // 화살표 표시 > false 로 설정해서 화살표를 숨긴다
            dots: true,  // 밑에 현재 페이지와 나머지 페이지 점으로 표시 > true로 설정하여 페이지 점을 보여준다
            infinite: true,  // 무한 반복여부 (true로 설정해서 무한반복)
            speed: 500,  // 넘기는 속도
            slidesToShow: 1,  // 슬라이드에 보여지는 아이템 개수
            slidesToScroll: 1,  // 슬라이드 넘기는 아이템 개수
            autoplay: true,  // 자동 재생여부
            autoplaySpeed: 3000,  // 자동 재생 속도
        };
        
        return (
          <div>
              {/* 슬라이더 컴포넌트 */}
                <Slider {...settings}>
                    {/* div에 슬라이드 각 아이템 구현 */}
                  <div>
                    <img src=''/>
                    <span>솔머리 행복 텃밭</span>
                  </div>
                  <div>
                    <img src=''/>
                  </div>
                  <div>
                   <img src=''/>
                  </div>
                  <div>
                   <img src=''/>
                  </div>
                </Slider>
            </div>
        );
    }
  }
  
  
  

export default Slide