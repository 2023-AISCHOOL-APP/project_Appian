import React from 'react';
import PageTitle from '../Components/PageTitle';

const Notice = () => {
  const notices = [
    { id: 1, title: '자 오늘의 점심 메뉴 공지에요', date: '2023-08-01' },
    { id: 2, title: '휴가 일정 공유 입니다', date: '2023-08-05' },
    { id: 3, title: '텃밭에서 황금호박을 찾아라 이벤트 당첨자 입니다', date: '2023-08-10' },
    
  ];

  return (
    <>
    <PageTitle name={'공지사항'} num={1}/>
    <div className="notice-container">
      <h2>공지사항</h2>
      <table className="notice-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice) => (
            <tr key={notice.id}>
              <td>{notice.id}</td>
              <td>{notice.title}</td>
              <td>{notice.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default Notice;