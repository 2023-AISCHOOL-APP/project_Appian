import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


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



  // 사용자 정보 가져오기
  const userNick = sessionStorage.getItem('user_nick')


  const newContent = data.filter((c)=>c.content_num === Number(cardId));
  console.log('글:',newContent[0].content_title)
   const handleGoBackToList = () => {
     navigate('/cone');
   };

   const [comments, setComments] = useState([]); // 댓글 목록 상태 변수
   const [newComment, setNewComment] = useState('');

   const handleAddComment = () => {
    if (newComment.trim() !== '') {
      // setComments([...comments, newComment]); // 새 댓글을 댓글 목록에 추가
      // setNewComment(''); // 새 댓글 내용 초기화

      // 서버에 데이터 보내기 : 
      const apiUrl = 'http://192.168.70.237:5022/content_comment';
      axios.get(apiUrl, { responseType: 'json', params: { user_nick : userNick , content_num : newContent[0].content_num, content_comment : newComment } })
      .then(response => {
        console.log('댓글쓰고 받아온거', response.data);
        setComments(response.data)
      })
      .catch(error => {
        console.error('보내기 에러');
      });
    }
  };
  
  // 게시물 번호 -> 댓글 데이터 가져오고 -> 뿌려주고
  
  useEffect(()=>{
  
    const apiUrl = 'http://192.168.70.237:5022/content_comment';
    axios.get(apiUrl, { responseType: 'json', params: { user_nick : userNick , content_num : newContent[0].content_num, content_comment : newComment } })
    .then(response => {

      setComments(response.data);

      console.log('댓글 처음에 받아온 데이터', response.data);

    })
    .catch(error => {
      console.error('보내기 에러');
    });

  },[])
  
  

  
  return (

 <div className='card-details'>
                  <span className='conetitle'>텃밭 자랑하기</span>
    
    <img src='/img/titlebg2.png' className='c1titlebg'/>
      
    <div className='card-details-container'>

     

      <div className='card-details'>
      
        

        <h2 className='card-details-title'>{newContent[0].content_title}</h2>
        <p className='card-details-content'>{newContent[0].contents}</p>
        <img className='card-details-image' src={`http://192.168.70.237:5022/content_img/${newContent[0].content_img}`} alt={newContent[0].content_title} />
        
         <div className='card-details-buttons'>
          <button className='card-details-button-delete'>삭제</button>
          <button className='card-details-button-list' onClick={handleGoBackToList}>목록</button>
        </div> 

        <hr className='commenthr'/>
            <textarea
            className='carddetailarea'
              placeholder='댓글을 작성하세요'
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
           
            <button onClick={handleAddComment} className='commentname'>댓글작성</button>
            <div className='comment-list'>
              <h3 className='commentlist'>댓글 목록</h3>
              <ul>
                {comments.map((comment, index) => (
                  <li key={index} >
                    <p className='comment'> {comment} </p>
                  
                    <span  className='commentnickname'>닉네임</span>
                    </li>
                  
                ))}
              </ul>

            </div>
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
          {comments?.map((comment, index) => (
            
            <li key={index}>
              <div className='commentnick'>{comment.user_nick}</div>{comment.content_comment} 
              </li>
            
          ))}
        </ul>
      </div>

    </div>
  );
};

export default CardDetailsPage;