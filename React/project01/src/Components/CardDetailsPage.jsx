import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CardDetailsPage = ({ cards }) => {
  console.log('detail:',cards)

  const data = cards;

  // const cardDetail = data.filter()
  const { cardId } = useParams();
  const navigate = useNavigate();
  // const selectedCard = cards.find((card) => card.id === parseInt(cardId));
  console.log(cardId);
  //  console.log('sd:'selectedCard)
  // if (!selectedCard) {
  //   return <div> </div>;
  // }

  
  // const handleGoBackToList = () => {
  //   navigate('/cone');
  // };

  return (
    <div>
       <h2>{data[cardId-1].content_title}</h2>
      <pre>{data[cardId-1].contents}</pre>
      <img src={data[cardId-1].imageURL}  />
       
      {/* <div>
        <button>삭제</button>
        <button onClick={handleGoBackToList}>목록</button>
      </div> */}
    </div>
  );
};

export default CardDetailsPage;