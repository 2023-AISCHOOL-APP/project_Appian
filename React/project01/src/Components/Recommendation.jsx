import React, { useState } from 'react';
import '../Css/PredictPage.css'
import { Link } from 'react-router-dom';


const Recommendation = () => {
  const months = ['3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월'];
  const managementPeriods = ['거의 매일', '주 1~2회', '월 1~2회'];
  const cropLifespans = ['파종', '모종'];

  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedManagementPeriod, setSelectedManagementPeriod] = useState('');
  const [selectedCropLifespan, setSelectedCropLifespan] = useState('');
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [noMatchingCrops, setNoMatchingCrops] = useState(false);
  

  // Simulated crop data
  const allCrops = [
    { name: '딸기(모종)', month: ['3월'], managementPeriod: '거의 매일', lifespan: '모종' , url :'https://ko.wikihow.com/%EB%94%B8%EA%B8%B0-%ED%82%A4%EC%9A%B0%EB%8A%94-%EB%B2%95'},
    { name: '참외(파종)', month: ['3월', '4월'], managementPeriod: '거의 매일', lifespan: '파종',url :'https://blog.naver.com/rladlrjs101/222703962852' },
    { name: '참외(모종)', month: ['5월'], managementPeriod: '거의 매일', lifespan: '모종',url :'' },
    { name: '토마토(파종)', month: ['3월'], managementPeriod: '거의 매일', lifespan: '파종' ,url :''},
    { name: '토마토(모종)', month: ['5월'], managementPeriod: '거의 매일', lifespan: '모종',url :'' },
    { name: '고추(파종)', month: ['3월'], managementPeriod: '거의 매일', lifespan: '파종',url :'' },
    { name: '고추(모종)', month: ['5월'], managementPeriod: '거의 매일', lifespan: '모종',url :'' },
// 
    { name: '가지(파종)', month: ['4월'], managementPeriod: '주 1~2회', lifespan: '파종' },
    { name: '가지(모종)', month: ['5월','6월'], managementPeriod: '주 1~2회', lifespan: '모종' },
    { name: '배추(파종)', month: ['8월'], managementPeriod: '주 1~2회', lifespan: '파종' },
    { name: '배추(모종)', month: ['8월'], managementPeriod: '주 1~2회', lifespan: '모종' },
    { name: '양파(파종)', month: ['8월'], managementPeriod: '주 1~2회', lifespan: '파종' },
    { name: '마늘(파종)', month: ['10월'], managementPeriod: '주 1~2회', lifespan: '파종' },
    { name: '당근(파종)', month: ['4월','7월','8월'], managementPeriod: '주 1~2회', lifespan: '파종' },
    { name: '감자(파종)', month: ['3월','4월'], managementPeriod: '주 1~2회', lifespan: '파종' },
    { name: '상추(파종)', month: ['3월','4월','5월','6월','8월','9월'], managementPeriod: '주 1~2회', lifespan: '파종' },
    { name: '상추(모종)', month: ['4월','5월','6월','8월','9월'], managementPeriod: '주 1~2회', lifespan: '모종' },

    { name: '오이(파종)', month: ['3월', '4월'], managementPeriod: '주 1~2회', lifespan: '파종' },
    { name: '오이(모종)', month: ['5월', '6월'], managementPeriod: '주 1~2회', lifespan: '모종' },
    { name: '대파(파종)', month: ['3월','4월','9월'], managementPeriod: '주 1~2회', lifespan: '파종' },
    { name: '대파(모종)', month: ['5월','6월','10월','11월'], managementPeriod: '주 1~2회', lifespan: '모종' },
    { name: '애호박(파종)', month: ['4월'], managementPeriod: '주 1~2회', lifespan: '파종' },
    { name: '애호박(모종)', month: ['4월'], managementPeriod: '주 1~2회', lifespan: '모종' },
    { name: '방울토마토(파종)', month: ['3월'], managementPeriod: '주 1~2회', lifespan: '파종' },
    { name: '방울토마토(모종)', month: ['5월'], managementPeriod: '주 1~2회', lifespan: '모종' },
    { name: '양배추(파종)', month: ['4월'], managementPeriod: '주 1~2회', lifespan: '파종' },
    { name: '양배추(모종)', month: ['5월'], managementPeriod: '주 1~2회', lifespan: '모종' },
// 
    { name: '고구마(모종)', month: ['5월','6월','7월'], managementPeriod: '월 1~2회', lifespan: '모종' },
    { name: '옥수수(파종)', month: ['3월','4월'], managementPeriod: '월 1~2회', lifespan: '파종' },
    { name: '옥수수(모종)', month: ['5월','6월'], managementPeriod: '월 1~2회', lifespan: '모종' },
    { name: '호박(파종)', month: ['4월'], managementPeriod: '월 1~2회', lifespan: '파종' },
    { name: '호박(모종)', month: ['5월'], managementPeriod: '월 1~2회', lifespan: '모종' },
    { name: '부추(파종)', month: ['4월','5월','9월'], managementPeriod: '월 1~2회', lifespan: '파종' },
  ];

  // Handle user input changes
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleManagementPeriodChange = (event) => {
    setSelectedManagementPeriod(event.target.value);
  };

  const handleCropLifespanChange = (event) => {
    setSelectedCropLifespan(event.target.value);
  };

  // Filter crops based on selected criteria
  const filterCrops = () => {
    const filtered = allCrops.filter(crop =>
      (!selectedMonth || crop.month.includes(selectedMonth)) &&
      (!selectedManagementPeriod || crop.managementPeriod === selectedManagementPeriod) &&
      (!selectedCropLifespan || crop.lifespan === selectedCropLifespan)
    );

    if (filtered.length === 0) {
      setNoMatchingCrops(true); // Set state to show "No matching crops" message
    } else {
      setNoMatchingCrops(false); // Reset state if there are matching crops
    }

    setFilteredCrops(filtered);
  };

  return (
    <div>
      <h1 className='recommend_maintitle'>작물 추천해주세요!</h1>
      <div >
        <select value={selectedMonth} onChange={handleMonthChange} className='rec_subbtn1'>
          <option value="" >농작 시기</option>
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
        <select value={selectedManagementPeriod} onChange={handleManagementPeriodChange} className='rec_subbtn1'>
          <option value="">관리 주기</option>
          {managementPeriods.map((period, index) => (
            <option key={index} value={period}>
              {period}
            </option>
          ))}
        </select>
        <select value={selectedCropLifespan} onChange={handleCropLifespanChange} className='rec_subbtn1'>
          <option value="">파종/모종</option>
          {cropLifespans.map((lifespan, index) => (
            <option key={index} value={lifespan}>
              {lifespan}
            </option>
          ))}
        </select>
        <button onClick={filterCrops} className='rec_btn'>찾기</button>
      </div>
      {noMatchingCrops ? (
        <div className='rec-vege-border'>
            <p className='rec_vege'>조건에 맞는 작물이 없습니다.</p>
        </div>
      ) : (
        <div>
          <h2 className='rec_subtitle'>이 작물은 어때요?</h2>
          <div className='rec-vege-border' >
            {filteredCrops.map((crop, index) => (
              <Link to='crop.url' className='rec_vege'>{crop.name}</Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommendation;