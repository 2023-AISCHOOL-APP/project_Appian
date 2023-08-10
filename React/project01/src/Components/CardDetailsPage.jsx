import React, {useState} from 'react';
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

   const [comments, setComments] = useState([]); // 댓글 목록 상태 변수
   const [newComment, setNewComment] = useState('');

   const handleAddComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]); // 새 댓글을 댓글 목록에 추가
      setNewComment(''); // 새 댓글 내용 초기화
    }
  };




  return (
    <div className='card-details-container'>
      <div className='card-details'>


        <h2 className='card-details-title'>{newContent[0].content_title}</h2>
        <p className='card-details-content'>{newContent[0].contents}</p>
        <img className='card-details-image' src={`http://192.168.70.237:5022/content_img/${newContent[0].content_img}`} alt={newContent[0].content_title} />
      
         <div className='card-details-buttons'>
          <button className='card-details-button-delete'>삭제</button>
          <button className='card-details-button-list' onClick={handleGoBackToList}>목록</button>
        </div> 
      </div>
      <textarea
        placeholder='댓글을 작성하세요'
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleAddComment}>댓글작성하기</button>
      <div className='comment-list'>
        <h3>댓글 목록</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CardDetailsPage;