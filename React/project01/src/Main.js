import './Main.css';
import './Header.css';
import React, { useRef, useState, useEffect } from 'react';
import { NavLink, Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import FindGarden from './pages/FindGarden';
import Community from './pages/Community';
import Mypage from './pages/Mypage';
import OutGarden from './pages/OutGarden';
import Mainpage from './Mainpage';
import Join from './pages/Join';
import Card from './Components/Card';
import Login from './pages/Login';
import Machin from './pages/Machin';
import Cone from './Components/Cone.jsx';
import Ctwo from './Components/Ctwo.jsx';
import Cthree from './Components/Cthree.jsx';


import GetData from './Hooks/GetData';

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
                  {/* 다른 서브 메뉴 추가 */}
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
                  {/* 다른 서브 메뉴 추가 */}
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
                  <NavLink  className='navbarSubMenuLink'>
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



        
        <GetData>

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
        </Routes>

        </GetData>

            
          
          </div>

    
    </Router>
  );
}

export default Main;
