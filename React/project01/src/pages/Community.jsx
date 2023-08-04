// Community.js
import React from 'react';
import { Link} from 'react-router-dom';

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
      <Link to={'/cone'}>
        <img src="img/one.jpg" alt="이미지 1" style={{ width: '330px', height: '220px' }} />
      </Link>
      <Link to={'/ctwo'}>
        <img src="img/two.jpg" alt="이미지 2" style={{ width: '330px', height: '220px' }} />
      </Link>
      <Link to={'/cthree'}>  
        <img src="img/three.jpg" alt="이미지 3" style={{ width: '330px', height: '220px' }} />
      </Link>
      </div>
      </div>
      
        
  );
}

export default Community;