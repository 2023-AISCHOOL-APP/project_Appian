import React, { useState } from 'react';

const WritingPage = ({ onAddCard }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageURL, setImageURL] = useState('');

  const handleAddCard = () => {
    if (title.trim() !== '' && content.trim() !== '' && imageURL.trim() !== '') {
      onAddCard({ title, content, imageURL });
      setTitle('');
      setContent('');
      setImageURL('');
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
        type="text"
        placeholder="사진 URL"
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)}
      />
      <button onClick={handleAddCard}>카드 추가</button>
    </div>
  );
};

const Cone = () => {
  const [isWriting, setIsWriting] = useState(false);
  const [cards, setCards] = useState([]);

  const handleAddCard = (card) => {
    setCards([...cards, card]);
    setIsWriting(false);
  };

  return (
    <div>
      <h1 className='conetitle'>텃밭 자랑하기</h1>
      {!isWriting && <button className='write-button' onClick={() => setIsWriting(true)}>글 작성</button>}
      {isWriting && <WritingPage onAddCard={handleAddCard} />}
      <div className='card-list'>
        <h2 className='ctexttitle'>게시판</h2>
        <div className='card-container'>
          {cards.map((card) => (
            <div key={card.id} className='card'>
              <img src={card.imageURL} alt={card.title} />
              <h3>{card.title}</h3>
              <p>{card.content.split('\n').map((line, index) => <span key={index}>{line}<br /></span>)}</p>
            </div>
          ))}
        </div>
      </div>
    
    </div>
  );
};

export default Cone;