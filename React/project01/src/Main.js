import './Main.css';
import { Link, Routes, Route, BrowserRouter as Router } from 'react-router-dom'; // BrowserRouter as Router를 사용하여 라우터 컴포넌트로 설정
import React from 'react';
import FindGarden from './pages/FindGarden';
import Community from './pages/Community';
import Mypage from './pages/Mypage';
import OutGarden from './pages/OutGarden';
import Mainpage from './Mainpage'
import Join from './pages/Join';
import Login from './pages/Login';
import Machin from './pages/Machin';


function Main() {
  return (
    <Router>
      <div className='main_grid'>
        <Link to={'/'} className='logo'>
          <img src="img/logo.png" alt="Logo" />
        </Link>

        <div className='navbar1'> 
        <Link to={'/login'} className='navbarlogin'>로그인</Link>
          <Link to={'/join'} className='navbarlogin'>회원가입</Link>
        </div>

        <div className='navbar'>
          <Link to={'/find'} className='navbarMenu'>텃밭구하기</Link>
          <Link to={'/out'} className='navbarMenu' >텃밭내놓기</Link>
          <Link to={'/community' } className='navbarMenu'>커뮤니티</Link>
          <Link to={'/mypage'} className='navbarMenu'>마이페이지 </Link>
        </div>
       
        <Routes>
          <Route path='/' element={<Mainpage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/join' element={<Join />} />
          <Route path='/find' element={<FindGarden />} />
          <Route path='/out' element={<OutGarden />} />
          <Route path='/community' element={<Community />} />
          <Route path='/mypage' element={<Mypage />} />

          <Route path='/machin' element={<Machin />} />

        </Routes>
       
      </div>
      </Router>
  );
}

export default Main;
