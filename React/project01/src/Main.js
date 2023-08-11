import React, {useState, useEffect, useRef, useContext } from 'react';
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
import FindDetail from './Components/FindDetail';
import { AllFarm } from './Contexts/FarmContext';
import { AllContent } from './Contexts/ContentContext';


function Main() {

  // 하위 메뉴 이벤트 
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


  // 로그인 상태에 따라 접근 권한 다르게 하기 
  const [user, setUser] = useState('');
  const authenticated = user != null;
  
  useEffect (()=>{
    setUser(sessionStorage.getItem('user_id'))
    console.log('로그인확인:',user)
  },[])

  //로그아웃 하기
  const Logout = (e)=>{
    sessionStorage.removeItem('user_id')
    sessionStorage.removeItem('user_nick')
    sessionStorage.removeItem('user_type')
    setUser(null)
    alert('로그아웃 되었습니다.')
  }


  const { farms } = useContext(AllFarm);
  const { content } = useContext(AllContent);

  console.log('텃밭 컨텍스트', farms)
  console.log('게시물 컨텍스트', content)


  // 게시판 데이터 자동으로 추가 생성하기
  const savedCards = content;
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
        {authenticated ? 
        <NavLink to={'/'} id='navbarlogin' onClick={Logout}>로그아웃</NavLink>:
        <NavLink to={'/login'} id='navbarlogin'>로그인</NavLink>}
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
          <Route path='/logout' element={<Logout />} />
          <Route path='/join' element={<Join />} />
          <Route path='/card' element={<Card />} />
          <Route path='/find' element={<FindGarden />} />
          <Route path='/find/:id' element={<FindDetail />} />
          <Route path='/out' element={<OutGarden />} />
          <Route path='/community' element={<Community />} />
          <Route path='/mypage' element={<Mypage />} />
          <Route path='/cone' element={<Cone value={savedCards}/>} />
          <Route path='/ctwo' element={<Ctwo />} />
          <Route path='/cthree' element={<Cthree />} />
          <Route path='/machin' element={<Machin />} />
          <Route path="/cardpage/:cardId" element={<CardDetailsPage value={savedCards}/>} />
          <Route path='/notice' elemenft={<Notice />} />
        </Routes>
  
    </div>
  );
}


export default Main;