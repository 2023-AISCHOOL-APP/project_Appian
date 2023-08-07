import React, { useRef, useState, useEffect } from 'react';
import { NavLink,Link, Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import FindGarden from './pages/FindGarden';
import Community from './pages/Community';
import Mypage from './pages/Mypage';
import OutGarden from './pages/OutGarden';
import Mainpage from './Mainpage';
import Join from './pages/Join';
import Card from './Components/Card';
import Login from './pages/Login';
import Machin from './pages/Machin';
import Cone from './Components/Cone';
import Ctwo from './Components/Ctwo';
import Cthree from './Components/Cthree';
import CardDetailsPage from './Components/CardDetailsPage';
import Notice from './pages/Notice';

function Main() {
  const dropDownRef = useRef(null);
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const handleOutsideClick = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setActiveMenu(null);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const savedCards = JSON.parse(localStorage.getItem('cards')) || [];

  const [isWriting, setIsWriting] = useState(false);
  const [cards, setCards] = useState(savedCards);
  const [cardCounter, setCardCounter] = useState(savedCards.length + 1);

  const handleAddCard = (card) => {
    const newCard = { ...card, id: cardCounter, expanded: false };
    setCards([...cards, newCard]);
    setCardCounter(cardCounter + 1);
    setIsWriting(false);
  };

  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

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


  // 스크롤이 내려갔을대 메인버튼이 움직이도록 구현되게 하는 코드

  const [animate, setAnimate] = useState(false);

  const animationTriggerPosition = 500; // 스크롤이 이 위치보다 아래로 내려갔을 때 애니메이션 실행

  const handleScroll = () => {
    if (window.scrollY > animationTriggerPosition) {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  return (


    
    <Router>
      
      
      <div className='main_col'>
        <div className='main_grid'>
          <NavLink to={'/'} className='logo'>
            <img src="img/logo.png" alt="Logo" />
          </NavLink>

          <div className='navbar1'>
            <NavLink to={'/login'} id='navbarlogin'>로그인</NavLink>
            <NavLink to={'/join'} id='navbarlogin'>회원가입</NavLink>
          </div>

          <div className='navbar'>
            <ul ref={dropDownRef} className={`menu ${activeMenu ? 'active' : ''}`}>
              <NavLink
                className='navbarMenu'
                activeClassName='activeLink'
                onClick={() => handleMenuClick('find')}
              >
                텃밭구하기
              </NavLink>
              {activeMenu === 'find' && (
                <div className='navbarSubMenu1'>
                  <NavLink to='/find' className='navbarSubMenuLink'>
                    텃밭 검색
                  </NavLink>
                </div>
              )}
              <NavLink
                className='navbarMenu'
                activeClassName='activeLink'
                onClick={() => handleMenuClick('out')}
              >
                텃밭내놓기
              </NavLink>
              {activeMenu === 'out' && (
                <div className='navbarSubMenu2'>
                  <NavLink to='/out' className='navbarSubMenuLink'>
                    텃밭 등록
                  </NavLink>
                </div>
              )}
              <NavLink
                className='navbarMenu'
                activeClassName='activeLink'
                onClick={() => handleMenuClick('community')}
              >
                커뮤니티
              </NavLink>
              {activeMenu === 'community' && (
                <div className='navbarSubMenu3'>
                  <NavLink to='/notice' className='navbarSubMenuLink'>
                    공지사항
                  </NavLink>
                  <br/>
                  <br/>
                  <NavLink to='/community' className='navbarSubMenuLink'>
                    정보게시판
                  </NavLink>
                  <br/>
                  <br/>
                  <NavLink to='/machin' className='navbarSubMenuLink'>
                    작물가격예측
                  </NavLink>
                </div>
              )}
              <NavLink
                className='navbarMenu'
                activeClassName='activeLink'
                onClick={() => handleMenuClick('mypage')}
              >
                마이페이지
              </NavLink>
              {activeMenu === 'mypage' && (
                <div className='navbarSubMenu4'>
                  <NavLink to='/machin' className='navbarSubMenuLink'>
                    신청 내역
                  </NavLink>
                  <br/>
                  <br/>
                  <NavLink to='/machin' className='navbarSubMenuLink'>
                    문의 내역
                  </NavLink>
                  <br/>
                  <br/>
                  <NavLink to='/machin' className='navbarSubMenuLink'>
                    내 정보 수정
                  </NavLink>

                  <div className='headerhr'></div>
                 
                  {/* 다른 서브 메뉴 추가 */}
                   

                </div>
              )}
            </ul>
          </div>  
        </div>



          <Routes>
            <Route path='/' element={<Mainpage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/join' element={<Join />} />
            <Route path='/card' element={<Card />} />
            <Route path='/find' element={<FindGarden />} />
            <Route path='/out' element={<OutGarden />} />
            <Route path='/community' element={<Community />} />
            <Route path='/mypage' element={<Mypage />} />
            <Route path='/cone' element={<Cone />} />
            <Route path='/ctwo' element={<Ctwo />} />
            <Route path='/cthree' element={<Cthree />} />
            <Route path='/machin' element={<Machin />} />
            <Route path="/cardpage/:cardId" element={<CardDetailsPage cards={cards} />} />
            <Route path='/notice' element={<Notice />} />
            
          </Routes>




            
          </div>
          

    

    </Router>
  );
}

export default Main;
