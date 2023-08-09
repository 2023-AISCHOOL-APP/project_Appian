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
   const handleGoBackToList = () => {
     navigate('/cone');
   };

  return (
    <div className='card-details-container'>
      <div className='card-details'>


        <h2 className='card-details-title'>{newContent[0].content_title}</h2>
        <p className='card-details-content'>{newContent[0].contents}</p>
        <img className='card-details-image' src={`http://192.168.70.165:5022/content_img/${newContent[0].content_img}`} alt={newContent[0].content_title} />
      
        { <div className='card-details-buttons'>
          <button className='card-details-button-delete'>삭제</button>
          <button className='card-details-button-list' onClick={handleGoBackToList}>목록</button>
        </div> }
      </div>
    </div>
  );
};

export default CardDetailsPage;