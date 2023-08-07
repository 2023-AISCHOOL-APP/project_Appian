// OutGarden.js
import React, { useState } from 'react';
import '../Css/OutGarden.css'
import Calendar from '../Components/CalendarDatePick'
import { CalendarContainer } from 'react-datepicker';

function OutGarden() {
  // 텃밭 등록 페이지를 위한 상태
  const [isLogin, setIsLogin] = useState(false); // isLogin 상태 추가
  const [gardenName, setGardenName] = useState('');
  const [gardenImages, setGardenImages] = useState([]);
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [rentalPeriod, setRentalPeriod] = useState('');
  const [recruitmentPeriod, setRecruitmentPeriod] = useState('');
  const [description, setDescription] = useState('');

  // 텃밭 등록 페이지 이벤트 핸들러
  const handleGardenNameChange = (e) => {
    setGardenName(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setGardenImages(files);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleAreaChange = (e) => {
    setArea(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleRentalPeriodChange = (e) => {
    setRentalPeriod(e.target.value);
  };

  const handleRecruitmentPeriodChange = (e) => {
    setRecruitmentPeriod(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // 텃밭 등록 폼 제출 핸들러
  const handleGardenSubmit = (e) => {
    e.preventDefault();
    console.log('텃밭 등록 시도:', {
      gardenName,
      gardenImages,
      address,
      area,
      type,
      price,
      rentalPeriod,
      recruitmentPeriod,
      description,
    });
  };

  return (
    <div className="container">
    {isLogin ? (
      <div className="card">
        {/* ... (로그인 폼) ... */}
      </div>
    ) : (
      <div className="card">
        <h1>텃밭 등록 페이지</h1>
        <form onSubmit={handleGardenSubmit}>
          <div className="form">
            <label htmlFor="gardenName">텃밭 이름:</label>
            <input
              type="text"
              id="gardenName"
              value={gardenName}
              onChange={handleGardenNameChange}
              required
            />
          </div>

          <div className="form">
            <label htmlFor="gardenImages">이미지 업로드 (최대 1장):</label>
            <input
              type="file"
              id="gardenImages"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <div className="form">
            <label htmlFor="address">주소:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={handleAddressChange}
              required
            />
          </div>

          <div className="form">
            <label htmlFor="area">면적:</label>
            <input
              type="text"
              id="area"
              value={area}
              onChange={handleAreaChange}
              required
            />
          </div>

          {/* 라디오 버튼 : 소형, 중형, 대형 */}
          <div className="form"> 
            <label htmlFor="type">텃밭 유형:</label>
            <input
              type="text"
              id="type"
              value={type}
              onChange={handleTypeChange}
              required
            />
          </div>

          {/* 라디오 버튼 : 개인, 민간단체, 지자체 */}
          <div className="form"> 
            <label htmlFor="type">운영 주체:</label>
            <input
              type="text"
              id="type"
              value={type}
              onChange={handleTypeChange}
              required
            />
          </div>


          <div className="form">
            <label htmlFor="price">분양희망가:</label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={handlePriceChange}
              required
            />
          </div>

          {/* 캘린더 위젯 수정 */}
          <div className="form">
            <label htmlFor="rentalPeriod">임대기간:</label>
            <Calendar/>
            {/* <input
              type="text"
              id="rentalPeriod"
              value={rentalPeriod}
              onChange={handleRentalPeriodChange}
              required
            /> */}
          </div>
            
          {/* 캘린더 위젯 수정 */}
          <div className="form">
            <label htmlFor="recruitmentPeriod">분양 신청모집기간:</label>
            <Calendar/>
            {/* <input
              type="text"
              id="recruitmentPeriod"
              value={recruitmentPeriod}
              onChange={handleRecruitmentPeriodChange}
              required
            /> */}
          </div>

          <div className="form">
            <label htmlFor="description">본문내용:</label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            등록하기
          </button>
          <button type="button" className="preview-btn">
            미리보기
          </button>
        </form>
      </div>
    )}
  </div>
  );
}

export default OutGarden;
