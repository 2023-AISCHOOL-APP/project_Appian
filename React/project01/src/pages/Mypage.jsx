
import React, { useState, useEffect } from 'react';
import axios from 'axios';



const Mypage = () => {
  
  const initialApplicationList = [
    { num: 1, list: '첫 번째 신청텃밭',area : '15' , price : '200,000', rental : '~24.12.31', date : "2023-08-11"},
    { num: 2, list: '두 번째 신청텃밭',area : '12' , price : '180,000', rental : '~25.12.31', date : "2023-08-10"},
     { num: 3, list: '세 번째 신청텃밭',area : '24', price : '240,000', rental : '~23.12.31', date : "2023-08-09"},
     { num: 4, list: '네 번째 신청텃밭',area : '10', price : '200,000', rental : '~24.06.30', date : "2023-08-07"},
     { num: 5, list: '다섯 번째 신청텃밭',area : '12', price : '150,000', rental : '~24.12.31', date : "2023-08-05"},
     { num: 6, list: '여섯 번째 신청텃밭',area : '18', price : '135,000', rental : '~24.12.31', date : "2023-08-02"}
  ];

  const [applicationList, setApplicationList] = useState(initialApplicationList);


  // useEffect(()=>{
  
  //   const apiUrl = 'http://192.168.70.237:5022/content_comment';
  //   axios.get(apiUrl, { responseType: 'json', params:{} })
  //   .then(response => {

  //     setApplicationList(response.data);

  //     console.log('댓글 처음에 받아온 데이터', response.data);

  //   })
  //   .catch(error => {
  //     console.error('보내기 에러');
  //   });

  // },[])



  return (
    <div className="mypage-container">
      <h1 className='mypage-title'>텃밭신청내역</h1>
      <table className="application-table">
        <thead>
          <tr>
            <th className='aaa'>번호</th>
            <th className='bbb'>신청내역</th>
            <th className='ccc'>신청일</th>
            <th>취소</th>
            
            
          </tr>
        </thead>
        <tbody>
          {applicationList.map((application) => (
            <tr>
            <td key={application.num} className='mycard'>
              <p>{application.num}</p>
              
            </td>
            <td>
              <h2>{application.list}</h2>
              <p>텃밭 면적 : {application.area}m²</p>
              <p>분양가 : {application.price}원</p>
              <h3>임대기간 : {application.rental}</h3>
            </td>
            <td>
              <p> {application.date}</p>
            </td>
            <td>
              <button className='ddd'> 취소하기 </button>
            </td>
            </tr>
                        

            
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default Mypage;