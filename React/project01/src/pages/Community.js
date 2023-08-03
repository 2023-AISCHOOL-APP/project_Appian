// Community.js
import React from 'react';


function Community() {
  return (
    
    <div className='infopage'>
      <div>
        <h1 className='infotitle'>정보 게시판</h1>
      </div>

      
      <h2 className='infotitle2'>영상으로 배우는 농사!(TITLE)</h2>
      <div className='info-vd-container' style={{ display: 'flex', justifyContent: 'space-around', marginTop: '5px' }}>
        <div className='big-video'>
          <a href="https://www.youtube.com/watch?v=A2FMU3kArDU">
          <img src="img/002.jpg" alt="이미지 3" style={{ width: '580px', height: '330px', marginRight: '20px' }} />
          </a>
        </div>
        <div className='small-video'>
          <div className='video'>
            <a href="https://www.youtube.com/watch?v=-xJZE82dxg4">
            <img src="img/003.jpg" alt="이미지 2" />
            </a>
          </div>
          <div className='video'>
            <a href="https://www.youtube.com/watch?v=NURb3Ypej6I">
            <img src="img/004.jpg" alt="이미지 3" />
            </a>
          </div>
          <div className='video'>
            <a href="https://www.youtube.com/watch?v=OSugRMlZxO4">
            <img src="img/005.jpg" alt="이미지 2" />
            </a>
          </div>
          <div className='video'>
            <a href="https://www.youtube.com/watch?v=cVpMzTdWxxE">
            <img src="img/001.jpg" alt="이미지 3" />
            </a>
          </div>
        </div>
      </div>
      
      

      
      <h2 className='infotitle2'>텃밭 이야기</h2>
      <div className='infoimg2' style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        
        <img src="https://news.tbs.seoul.kr/Upload/Image/20220913/00000000000001300307.jpg" alt="이미지 1" style={{ width: '330px', height: '220px' }} />
        
        <img src="https://img.sbs.co.kr/newimg/news/20230710/201805762_1280.jpg" alt="이미지 2" style={{ width: '330px', height: '220px' }} />
        <img src="https://img.seoul.co.kr/img/upload/2023/07/09/SSC_20230709165059_O2.jpg" alt="이미지 3" style={{ width: '330px', height: '220px' }} />
      </div>
      </div>
      
        
  );
}

export default Community;