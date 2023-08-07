import React from 'react';
import { useParams } from 'react-router-dom';

const CardDetailsPage = ({ cards }) => {
  const { cardId } = useParams();
  const selectedCard = cards.find((card) => card.id === parseInt(cardId));

  if (!selectedCard) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <h2>{selectedCard.title}</h2>
      
      <pre>{selectedCard.content}</pre>
      <img src={selectedCard.imageURL} />
    </div>
  );
};

export default CardDetailsPage;