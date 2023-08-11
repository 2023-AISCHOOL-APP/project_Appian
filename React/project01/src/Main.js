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
import Header from './Components/Header';


function Main() {

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
    <div>
      <Header />
        <Routes>
          <Route path='/' element={<Mainpage />} />
          <Route path='/login' element={<Login />} />
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