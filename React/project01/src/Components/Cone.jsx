import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CardDetailsPage from './CardDetailsPage';
import axios from 'axios';
import { useLocation, useNavigate} from 'react-router-dom'
import { Dialog } from '@mui/material';

const WritingPage = ({ onAddCard, onCancel }) => {
  // const [user_id, setUser_id] = useState('');
  const [showSuccessMessage, setShowSuccessMessage]=useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    console.log('보내기클릭');
    const formData = new FormData();
    // formData.append('user_id', user_id);
    formData.append('content_title', title);
    formData.append('contents', content);
    formData.append('content_img', imageFile);

    const apiUrl = 'http://192.168.70.165:5022//add_content';
    axios.post(apiUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log('Response from server:', response.data);
        if (response.data.message === 'Content added successfully'){
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
            alert("소중한 게시물이 심어졌습니다")
            // 작성 완료 메시지가 표시된 후 화면을 새로고침
             window.location.reload();
          }, 10);
        }
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
  };

  return (
    <div className='writing-page'>
      <h1 style={{textAlign:'center'}}>글 작성</h1>
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
      
      <input type="file" onChange={handleImageChange} />

      <button onClick={handleSubmit}>작성하기</button>
      <button onClick={onCancel}>취소</button>
    </div>
  );
};

const Cone = ({data}) => {
  const [isWriting, setIsWriting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage]=useState(false);
  const [cards, setCards] = useState([]);



  const handleCardClick = (cardId) => {
    // handleCardClick 함수의 내용 추가
    // 해당 카드 클릭 시 동작 정의
  };

  const handleAddCard = (newCard) => {
    newCard.id = cards.length + 1; // 새로운 카드의 ID 설정
    setCards([...cards, newCard]); // 새로운 카드 추가
    setIsWriting(false);
    setShowSuccessMessage(true);
  };


  console.log('sdkfs;',data)


//  useEffect(() => {
//   // Flask 서버의 주소
//   const apiUrl = 'http://192.168.70.147:5022/content';
// console.log("test")
//   // Axios를 사용하여 GET 요청 보내기
//   axios.get(apiUrl, { responseType: 'json'})
//     .then(response => {
//        setData(response.data); //요기
//       console.log('db로부터받음', response.data);
//     })
//     .catch(error => {
//       console.error('Error fetching data:', error);
//     });
// }, []);
const [currentPage, setCurrentPage]=useState(1);
  const postsPerPage =10;
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  
  

  const totalPages = Math.ceil(data.length / postsPerPage);
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  const newlist = currentPosts.map((d)=>{
    return (<tr key={d.content_num} className='card' onClick={() => handleCardClick(d.content_num)}>
    <td className='content_num' style={{textAlign:'center'}}>{d.content_num}</td>
    <td style={{ textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',color:'pink' }}>
    <Link  to={`/cardpage/${d.content_num}`}>{d.content_title}</Link></td>
    <td>{d.user_id}</td>
    <td>{d.write_time}</td>
  </tr>)}   
  )
  

  

  const paginationButtons = (
    <div className='pagination'>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </button>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </button>
    </div>
  );

  

 
  const title = data.map((d)=>d.content_title)
  console.log('title:',title)
  
  return (
    <div>
      <h1 className='conetitle'>텃밭 자랑하기</h1>
      {!isWriting && <button className='write-button' onClick={() => setIsWriting(true)}>➡➡➡게시물 작성하기 click😚</button>}
      {isWriting && (
        <WritingPage
          onAddCard={handleAddCard}
          onCancel={() => setIsWriting(false)}
        />
      )}
      <div className='card-list'>
        <h2 className='ctexttitle'>게시판</h2>
        <table className='card-container'>
          <tbody >
            
            <tr >
              <th>게시글번호</th>
              <th>제목</th>
              <th>유저아이디</th>
              <th>작성일시</th>
            </tr>

            {newlist}
            {paginationButtons}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cone;