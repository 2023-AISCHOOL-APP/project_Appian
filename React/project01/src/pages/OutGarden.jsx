// OutGarden.js
import React, { useState } from 'react';
import '../Css/OutGarden.css'
import Calendar from '../Components/CalendarDatePick'
import PageTitle from '../Components/PageTitle';import axios from 'axios';

function OutGarden() {
  // 텃밭 등록 페이지를 위한 상태
  const [isLogin, setIsLogin] = useState(false); // isLogin 상태 추가
  const [gardenName, setGardenName] = useState('');
  const [gardenImages, setGardenImages] = useState([]);
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('');
  const [areanum, setAreaNum] = useState('');
  const [type, setType] = useState('');
  const [farmtype, setFarmType] = useState('');
  const [price, setPrice] = useState('');
  const [rentalPeriod, setRentalPeriod] = useState('');
  const [recruitmentPeriod, setRecruitmentPeriod] = useState('');
  const [description, setDescription] = useState('');


  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  // 텃밭 등록 페이지 이벤트 핸들러
  const handleGardenNameChange = (e) => {
    console.log(e.target.value)
    setGardenName(e.target.value);
  };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setGardenImages(files);
  };
  const handleAddressChange = (e) => {
    console.log(e.target.value)
    setAddress(e.target.value);
    
  };

  const handleAreaChange = (e) => {
    setArea(e.target.value);
  };
  const handleAreaNumChange = (e) => {
    setAreaNum(e.target.value);
  };


  const handleTypeChange = (e) => {
    setType(e.target.value);
  };
  const handleFarmTypeChange = (e) => {
    setFarmType(e.target.value);
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

  const formData = new FormData();

  const handleGardenSubmit = () => {
    console.log('신청하기 클릭');
    formData.append('gardenName', gardenName);
    formData.append('gardenImages', gardenImages);
    formData.append('address', address);
    formData.append('area', area);
    formData.append('areanum', areanum);
    formData.append('type', type);
    formData.append('farmtype', farmtype);
    formData.append('price', price);
    formData.append('rentalPeriod', rentalPeriod);
    formData.append('recruitmentPeriod', recruitmentPeriod);
    formData.append('description', description);
  
    console.log('데이터 폼',formData)
    // const apiUrl = 'http://192.168.70.237:5022/add_content';
    // axios
    //   .post(apiUrl, formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   })
    //   .then(response => {
    //     console.log('Response from server:', response.data);
  
    //     if (response.data.message === 'Content added successfully') {
    //       setShowSuccessMessage(true);
    //       setTimeout(() => {
    //         setShowSuccessMessage(false);
    //         alert('소중한 게시물이 심어졌습니다');
    //         window.location.reload();
    //       }, 10);
    //     }
    //   })
    //   .catch(error => {
    //     console.error('Error sending data:', error);
    //   });
  };






  // // 텃밭 등록 폼 제출 핸들러
  // const handleGardenSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('텃밭 등록 시도:', {
  //     gardenName,
  //     gardenImages,
  //     address,
  //     area,
  //     areanum,
  //     type,
  //     farmtype,
  //     price,
  //     rentalPeriod,
  //     recruitmentPeriod,
  //     description,
  //   });
  // };



  const [selectedType, setSelectedType] = useState('');
  const [selectedFarmType, setSelectedFarmType] = useState('');

  // ... (기존 이벤트 핸들러들) ...

  const handleTypeButtonClick = (type) => {
    setSelectedType(type);
    setType(type);
  };

  const handleFarmTypeButtonClick = (type) => {
    setSelectedFarmType(type);
    setFarmType(type);
  };


  return (

    <>
    <PageTitle data={'텃밭 등록'} num={2}/>

    
              <div className="out-container">
               <img src='/img/leaves1.png' className='leaves1'/>
              {isLogin ? (
                <div >
                  {/* ... (로그인 폼) ... */}
                </div>
              ) : (
                
                <div className='outgarden-container'>
                  <h1 className='out_maintitle'>텃밭등록하기</h1>
                  <form>
                    <div className="form1">
                      <label htmlFor="gardenName">텃밭 이름:</label>
                      <input
                        type="text"
                        id="gardenName"
                        placeholder='이름을 입력해주세요'
                        value={gardenName}
                        onChange={handleGardenNameChange}
                        required
                      />
                    </div>

                    <div className="form2">
                      <label htmlFor="gardenImages">이미지 업로드 :<br />(최대 1장)</label>
                      <input
                        type="file"
                        id="gardenImages"
                        
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </div>

                    <div className="form3">
                      <label htmlFor="address">주소:</label>
                      <input
                        type="text"
                        id="out_address"
                        placeholder='주소를 입력해주세요'
                        value={address}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>

                    <div className="form4">
                      <label htmlFor="area">면적:</label>
                      <input
                        type="text"
                        placeholder='면적을 입력해주세요'
                        id="out_area"
                        value={area}
                        onChange={handleAreaChange}
                        required
                      />
                    </div>
                    <div className="form4_1">
                      <label htmlFor="area_num">개수:</label>
                      <input
                        type="text"
                        placeholder='분양할 텃밭의 개수를 입력하세요.'
                        id="out_areanum"
                        value={areanum}
                        onChange={handleAreaNumChange}
                        required
                      />
                    </div>

                    {/* 라디오 버튼 : 소형, 중형, 대형 */}
                    <div className="form5"> 
                      <label htmlFor="type">텃밭 유형:</label>
                    <div className='outtype_btn'>
                    <button
                      onClick={() => handleTypeButtonClick('대형')}
                      className={`type_button ${selectedType === '대형' ? 'selected' : ''}`}>
                      대형
                    </button>
                    <button
                      onClick={() => handleTypeButtonClick('중형')}
                      className={`type_button ${selectedType === '중형' ? 'selected' : ''}`}>
                      중형
                    </button>
                    <button
                      onClick={() => handleTypeButtonClick('소형')}
                      className={`type_button ${selectedType === '소형' ? 'selected' : ''}`}>
                      소형
                    </button>
                        
                        </div>
                        
                    </div>

                    {/* 라디오 버튼 : 개인, 민간단체, 지자체 */}
                    <div className="form6"> 
                      <label htmlFor="farmtype">운영 주체:</label>
                      <div className='outtype_btn1'>
                      <button
                      onClick={() => handleFarmTypeButtonClick('개인')}
                      className={`type1_button ${selectedFarmType === '개인' ? 'selected' : ''}`}
                    >
                      개인
                    </button>
                    <button
                      onClick={() => handleFarmTypeButtonClick('민간')}
                      className={`type1_button ${selectedFarmType === '민간' ? 'selected' : ''}`}
                    >
                    민간
                    </button>
                    <button
                      onClick={() => handleFarmTypeButtonClick('공공')}
                      className={`type1_button ${selectedFarmType === '공공' ? 'selected' : ''}`}
                    >
                      공공
                    </button>
                  </div>
                
                    </div>


                    <div className="form7">
                      <label htmlFor="price">분양희망가:</label>
                      <input
                        type="text"
                        id="out_price"
                        placeholder='분양 희망 가격을 입력해주세요'
                        value={price}
                        onChange={handlePriceChange}
                        required
                      />
                    </div>

                    {/* 캘린더 위젯 수정 */}
                    <div className="form8">
                      <label htmlFor="rentalPeriod">임대기간:</label>
                      {/* <Calendar /> */}
                      {/* <input
                        type="text"
                        id="rentalPeriod"
                        value={rentalPeriod}
                        onChange={handleRentalPeriodChange}
                        required
                      /> */}
                    </div>
                      
                    {/* 캘린더 위젯 수정 */}
                    <div className="form9">
                      <label htmlFor="recruitmentPeriod">분양신청 모집기간:</label>
                      {/* <Calendar/> */}
                      {/* <input
                        type="text"
                        id="recruitmentPeriod"
                        value={recruitmentPeriod}
                        onChange={handleRecruitmentPeriodChange}
                        required
                      /> */}
                    </div>

                    <div className="form10">
                      <label htmlFor="description">본문내용:</label>
                      <textarea
                        id="out_description"
                        value={description}
                        onChange={handleDescriptionChange}
                        required
                      />
                    </div>

                    <button  className="submit-btn" onClick={handleGardenSubmit}>
                      등록하기
                    </button>
                   
                  </form>
                </div>
              )}
            </div>
            
  </>
  );
}

export default OutGarden;
