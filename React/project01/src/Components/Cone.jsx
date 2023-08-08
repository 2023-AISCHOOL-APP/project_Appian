import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import CardDetailsPage from './CardDetailsPage';
import axios from 'axios';


const WritingPage = ({ onAddCard, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleAddCard = () => {
    if (title.trim() !== '' && content.trim() !== '' && imageFile) {
      const imageURL = URL.createObjectURL(imageFile);
      onAddCard({ title, content, imageURL });
      setTitle('');
      setContent('');
      setImageFile(null);
    }
  };

  return (
    <div className='writing-page'>
      <h1>글 작성</h1>
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        rows="5"
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
      />
      <button onClick={handleAddCard}>작성하기</button>
      <button onClick={onCancel}>취소</button>
    </div>
  );
};

const Cone = () => {
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


  // const [data, setData] = useState([]);

  useEffect(() => {
    // Flask 서버의 주소
    const apiUrl = 'http://192.168.70.147:5022/content';
    console.log("test")
    // Axios를 사용하여 GET 요청 보내기
    axios.get(apiUrl, { responseType: 'json'})
      .then(response => {
        // setData(response.data);
        console.log('db로부터받음', response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  
  const handleCardClick = (cardId) => {
    const updatedCards = cards.map((card) => {
      if (card.id === cardId) {
        return { ...card, expanded: !card.expanded };
      }
      return { ...card, expanded: false };
    });
    setCards(updatedCards);
    localStorage.setItem('cards', JSON.stringify(updatedCards));
  };

  const handleDeleteCard = (cardId) => {
    const updatedCards = cards.filter((card) => card.id !== cardId);
    setCards(updatedCards);
    localStorage.setItem('cards', JSON.stringify(updatedCards));
  };


  


  return (
    <div>
      <h1 className='conetitle'>텃밭 자랑하기</h1>
      {!isWriting && <button className='write-button' onClick={() => setIsWriting(true)}>글 작성</button>}
      {isWriting && (
        <WritingPage
          onAddCard={handleAddCard}
          onCancel={() => setIsWriting(false)}
        />
      )}
      <div className='card-list'>
        <h2 className='ctexttitle'>게시판</h2>
        <table className='card-container'>
          <tbody>
            
              <tr>
                <th>순번</th>
                <th>제목</th>
                <th>유저아이디</th>
                
              </tr>
            {cards.map((card) => (
              
              <tr key={card.id} className='card' onClick={() => handleCardClick(card.id)}>
                <td>{card.id}</td>
                <td>
                  <Link to={`/cardpage/${card.id}`}>{card.title}</Link>
                </td>
                <td>
                  ID
                </td>
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default Cone;
