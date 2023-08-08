import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CardDetailsPage = ({ cards }) => {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const selectedCard = cards.find((card) => card.id === parseInt(cardId));

  if (!selectedCard) {
    return <div> </div>;
  }

  

  const handleGoBackToList = () => {
    navigate('/cone');
  };

  return (
    <div>
      <h2>{selectedCard.title}</h2>
      <pre>{selectedCard.content}</pre>
      <img src={selectedCard.imageURL}  />
      
      <div>
        <button>삭제</button>
        <button onClick={handleGoBackToList}>목록</button>
      </div>
    </div>
  );
};

export default CardDetailsPage;