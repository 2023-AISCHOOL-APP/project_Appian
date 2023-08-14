import React, { useState } from 'react';
import '../Css/PredictPage.css'


const Recommendation = () => {
  const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const managementPeriods = ['거의 매일', '주 1~2회', '월 1~2회'];
  const cropLifespans = ['일년생', '이년생', '다년생'];

  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedManagementPeriod, setSelectedManagementPeriod] = useState('');
  const [selectedCropLifespan, setSelectedCropLifespan] = useState('');
  const [filteredCrops, setFilteredCrops] = useState([]);

  // Simulated crop data
  const allCrops = [
    { name: '가지', month: ['4월', '5월'], managementPeriod: '주 1~2회', lifespan: '일년생' },
    { name: '토마토', month: ['5월'], managementPeriod: '거의 매일', lifespan: '일년생' },
    { name: '양파', month: ['8월', '9월'], managementPeriod: '주 1~2회', lifespan: '이년생' },
    { name: '고추', month: 'May', managementPeriod: '거의 매일', lifespan: '일년생' },
    { name: '상추', month: 'May', managementPeriod: '주 1~2회', lifespan: '일년생' },
    { name: '마늘', month: 'May', managementPeriod: '주 1~2회', lifespan: '이년생' },
    { name: '당근', month: 'May', managementPeriod: '주 1~2회', lifespan: 'Medium' },
    { name: '감자', month: 'May', managementPeriod: '주 1~2회', lifespan: 'Medium' },
    { name: '고구마', month: 'May', managementPeriod: '월 1~2회', lifespan: 'Medium' },
    { name: 'Tomato', month: 'May', managementPeriod: 'Weekly', lifespan: 'Medium' },
  ];

  // Handle user input changes
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    filterCrops();
  };

  const handleManagementPeriodChange = (event) => {
    setSelectedManagementPeriod(event.target.value);
    filterCrops();
  };

  const handleCropLifespanChange = (event) => {
    setSelectedCropLifespan(event.target.value);
    filterCrops();
  };

  // Filter crops based on selected criteria
  const filterCrops = () => {
    const filtered = allCrops.filter(crop =>
      (!selectedMonth || crop.month.includes(selectedMonth)) &&
      (!selectedManagementPeriod || crop.managementPeriod === selectedManagementPeriod) &&
      (!selectedCropLifespan || crop.lifespan === selectedCropLifespan)
    );
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
          <option value="">작물 수명</option>
          {cropLifespans.map((lifespan, index) => (
            <option key={index} value={lifespan}>
              {lifespan}
            </option>
          ))}
        </select>
        <button onClick={filterCrops} className='rec_btn'>찾기</button>
      </div>
      <h2 className='rec_subtitle'>이 작물은 어때요?</h2>
      <ul className='rec_vege'>
        {filteredCrops.map((crop, index) => (
          <li key={index}>{crop.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendation;