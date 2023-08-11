import React, {useState, useEffect, useRef} from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
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
import axios from 'axios';

import './Header.css'
import FarmDetail from './pages/FarmDetail';


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




  const [data, setData] = useState([]); //요기2

  useEffect(() => {
   // Flask 서버의 주소
   const apiUrl = 'http://192.168.70.237:5022/content';
 console.log("test")
   // Axios를 사용하여 GET 요청 보내기
   axios.get(apiUrl, { responseType: 'json'})
     .then(response => {
        setData(response.data); //요기
       console.log('testdb로부터받음', response.data);
     })
     .catch(error => {
       console.error('Error fetching data:', error);
     });
 }, []);
 
 

  const savedCards = data;
  const [isWriting, setIsWriting] = useState(false);
  const [cards, setCards] = useState(savedCards);
  const [cardCounter, setCardCounter] = useState(savedCards.length + 1);

  const handleAddCard = (card) => {
    const newCard = { ...card, id: cardCounter, expanded: false };
    setCards([...cards, newCard]);
    setCardCounter(cardCounter + 1);
    setIsWriting(false);
  };


  return (
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
          
          
              <NavLink to='/mypage' className='navbarSubMenuLink'>
                신청 내역
              </NavLink>
              <br/>
              <br/>
              <NavLink to='/mypage' className='navbarSubMenuLink'>
                내 정보 수정
              </NavLink>
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
        <Route path='/find/1' element={<FarmDetail/>} />
        <Route path='/out' element={<OutGarden />} />
        <Route path='/community' element={<Community />} />
        <Route path='/mypage' element={<Mypage />} />
        <Route path='/cone' element={<Cone data={savedCards}/>} />
        <Route path='/ctwo' element={<Ctwo />} />
        <Route path='/cthree' element={<Cthree />} />
        <Route path='/machin' element={<Machin />} />
        <Route path="/cardpage/:cardId" element={<CardDetailsPage cards={savedCards} />} />
        <Route path='/notice' element={<Notice />} />
      </Routes>

    </div>
  );
}

export default Main;
