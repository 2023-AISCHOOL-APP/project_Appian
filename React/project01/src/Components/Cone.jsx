import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CardDetailsPage from './CardDetailsPage';
import axios from 'axios';
import { useLocation, useNavigate} from 'react-router-dom'


const WritingPage = ({ onAddCard, onCancel }) => {
  // const [user_id, setUser_id] = useState('');
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
      })
      .catch(error => {
        console.error('Error sending data:', error);
      });
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
      
      <input type="file" onChange={handleImageChange} />

      <button onClick={handleSubmit}>작성하기</button>
      <button onClick={onCancel}>취소</button>
    </div>
  );
};

const Cone = ({data}) => {
  const [isWriting, setIsWriting] = useState(false);
  const [cards, setCards] = useState([]);



  const handleCardClick = (cardId) => {
    // handleCardClick 함수의 내용 추가
    // 해당 카드 클릭 시 동작 정의
  };

  const handleAddCard = (newCard) => {
    newCard.id = cards.length + 1; // 새로운 카드의 ID 설정
    setCards([...cards, newCard]); // 새로운 카드 추가
    setIsWriting(false);
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

  
  const newlist = data.map((d)=>{
    return (<tr key={d.content_num} className='card' onClick={() => handleCardClick(d.content_num)}>
    <td className='content_num'>{d.content_num}</td>
    <td style={{ textAlign: 'left' }}>
    <Link  to={`/cardpage/${d.content_num}`}>{d.content_title}</Link></td>
    <td>{d.user_id}</td>
    <td>{d.write_time}</td>
  </tr>)}   
  )

 

 
  const title = data.map((d)=>d.content_title)
  console.log('title:',title)

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
              <th>게시글번호</th>
              <th>제목</th>
              <th>유저아이디</th>
              <th>작성일시</th>
            </tr>

            {newlist}
            {/* {cards.map((card) => (
              <tr key={card.id} className='card' onClick={() => handleCardClick(card.id)}>
                <td>{card.id}</td>
                <td>
                  <Link to={`/cardpage/${card.id}`}>{card.title}</Link>
                </td>
                <td>ID</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cone;