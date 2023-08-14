import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';

const Mypage = () => {

  const info = useLocation().state.responseData;
  const changeUrl = 'http://192.168.70.237:5022/change';
  const userId = sessionStorage.getItem('user_id')
  const [message, setMessage] = useState('');

  console.log(info)

  useEffect (() => {
    try {
      const response = axios.post(changeUrl, { user_id : userId});
      const responseData = response.data;
      console.log('응답 데이터:', responseData); 
      setMessage(responseData);
    } catch (error) {
      console.error('통신 실패:', error);
      alert('서버에 문제가 발생하였습니다. 다시 한 번 시도해주세요!')
    }
  },[])
  console.log('정보',message)


  return (
    <div>Mypage</div>
  )
}

export default Mypage