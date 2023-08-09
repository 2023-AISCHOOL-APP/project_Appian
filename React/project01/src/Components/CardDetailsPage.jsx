import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CardDetailsPage = ({ cards }) => {
  console.log('detail:',cards)

  const data = cards;

  // const cardDetail = data.filter()
  const { cardId } = useParams();
  const navigate = useNavigate();
  // const selectedCard = cards.find((card) => card.id === parseInt(cardId));
  console.log('check',cardId);
  //  console.log('sd:'selectedCard)
  // if (!selectedCard) {
  //   return <div> </div>;
  // }

  const newContent = data.filter((c)=>c.content_num === Number(cardId));
  console.log('글:',newContent[0].content_title)
  // const handleGoBackToList = () => {
  //   navigate('/cone');
  // };

  return (
    <div>


      <h2>xcvxv{newContent[0].content_title}</h2>
      <p>{newContent[0].contents}</p>
      <img src={`http://192.168.70.165:5022/content_img/${newContent[0].content_img}`} alt={newContent[0].content_title} />
       
      {/* <div>
        <button>삭제</button>
        <button onClick={handleGoBackToList}>목록</button>
      </div> */}
    </div>
  );
};

export default CardDetailsPage;