import React, { useState } from 'react';

const Notice = () => {
  const [notices, setNotices] = useState([
    // 공지사항 데이터
  ]);

  const [selectedNotice, setSelectedNotice] = useState(null);
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeContent, setNewNoticeContent] = useState('');
  const [isCreatingNotice, setIsCreatingNotice] = useState(false); // 공지글 작성 페이지 표시 여부 상태

  const handleNoticeClick = (notice) => {
    if (selectedNotice && selectedNotice.id === notice.id) {
      setSelectedNotice(null);
    } else {
      setSelectedNotice(notice);
    }
  };

  const handleNewNotice = () => {
    if (newNoticeTitle && newNoticeContent) {
      const newNotice = {
        id: Date.now(),
        title: newNoticeTitle,
        content: newNoticeContent,
      };
      setNotices([...notices, newNotice]);
      setNewNoticeTitle('');
      setNewNoticeContent('');
      setIsCreatingNotice(false); // 공지글 작성 완료 후 작성 페이지 닫기
    }
  };

  const handleDeleteNotice = (noticeId) => {
    const updatedNotices = notices.filter((notice) => notice.id !== noticeId);
    setNotices(updatedNotices);
    setSelectedNotice(null);
  };

  return (
    <div className="notice-container">
      <h1 className="notice-title">공지사항</h1>
      <div className="notices-list">
        <ul>
          {notices.map((notice) => (
            <li key={notice.id} onClick={() => handleNoticeClick(notice)}>
              💨 {notice.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="notice-details">
        {selectedNotice && (
          <div>
            <h2>{selectedNotice.title}</h2>
            <p>
              {selectedNotice.content.split('\n').map((paragraph, index) => (
                <React.Fragment key={index}>
                  {paragraph}
                  <br />
                </React.Fragment>
              ))}
            </p>
            <button onClick={() => handleDeleteNotice(selectedNotice.id)}>삭제</button>
          </div>
        )}
      </div>
      {isCreatingNotice ? (
        <div className="new-notice">
          <h2>새로운 공지 작성</h2>
          <input
            type="text"
            placeholder="제목"
            value={newNoticeTitle}
            onChange={(e) => setNewNoticeTitle(e.target.value)}
          />
          <textarea
            placeholder="내용"
            value={newNoticeContent}
            onChange={(e) => setNewNoticeContent(e.target.value)}
          />
          <button onClick={handleNewNotice}>추가</button>
          <button onClick={() => setIsCreatingNotice(false)}>취소</button>
        </div>
      ) : (
        <button onClick={() => setIsCreatingNotice(true)}>공지글 작성하기</button>
      )}
    </div>
  );
};

export default Notice;
