// OutGarden.js
import React, { useState } from 'react';
import '../Css/OutGarden.css'
import Calendar from '../Components/CalendarDatePick'
import PageTitle from '../Components/PageTitle';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataObject } from '@mui/icons-material';

function OutGarden() {
  // 텃밭 등록 페이지를 위한 상태
  const [isLogin, setIsLogin] = useState(sessionStorage.getItem('user_id')); // isLogin 상태 추가
  const user = sessionStorage.getItem('user_id')


  const [form, setForm] = useState({ farm_title : '', farm_address :'', lental_area : '', farm_sector: '', lental_type: '소형', 
    farm_type:'개인', price: '', lental_startDate:'', lental_endDate:'', startDate:'', endDate:'', description:'', user_id: user});
  const nav = useNavigate();
  
  
 

  // 로그인 확인
  // if (isLogin !== null){
  //   setIsLogin(true)
  //   setForm({...form, user_id : sessionStorage.getItem('user_id')})
  // } else {
  //   alert('로그인이 필요한 서비스입니다.');
  //   nav('/login')
  // }

  const [selectedType, setSelectedType] = useState('');
  const [selectedFarmType, setSelectedFarmType] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const formData = new FormData ();

  const handleTypeButtonClick = (e) => {
    setSelectedType(e);
    setForm({...form, lental_type : e});
  };

  const handleFarmTypeButtonClick = (e) => {
    setSelectedFarmType(e);
    setForm({...form, farm_type : e});
  };
   
  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
    formData.append('farm_img', imageFile)
  };

  const blob = new Blob([JSON.stringify(form)],{type : 'application/json'});
  
  const apiUrl = '';//여기 주소 추가 필요
  
  const infoSending = ()=>{
    formData.append('farm', blob)
    console.log('등록내용확인',form)
    
    // axios.get(apiUrl, { responseType: 'json', params: { form } })
    // .then(response => {
    //   alert('소중한 텃밭 정보가 등록되었습니다!')
    //   nav('/find');
    // })
    // .catch(error => {
    //   console.error('Error fetching data:', error);
    // });
  }

  return (

    <>
    <PageTitle data={'텃밭 등록'} num={2}/>

    
              <div className="out-container">
               
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
                        value={form.farm_title}
                        onChange={(e)=>{
                          setForm({...form, farm_title : e.target.value})
                        }}
                        required
                      />
                    </div>

                    <div className="form2">
                      <label htmlFor="gardenImages">이미지 업로드 :<br />(최대 1장)</label>
                      <input type="file" id="gardenImages" onChange={handleImageChange} className='photo'/>
                    
                    </div>

                    <div className="form3">
                      <label htmlFor="address">주소:</label>
                      <input
                        type="text"
                        id="out_address"
                        placeholder='주소를 입력해주세요'
                        value={form.farm_address}
                        onChange={(e)=>{
                          setForm({...form, farm_address : e.target.value})
                        }}
                        required
                      />
                    </div>

                    <div className="form4">
                      <label htmlFor="area">면적:</label>
                      <input
                        type="text"
                        placeholder='면적을 입력해주세요'
                        id="out_area"
                        value={form.lental_area}
                        onChange={(e)=>{
                          setForm({...form, lental_area : e.target.value})
                        }}
                        required
                      />
                    </div>
                    <div className="form4_1">
                      <label htmlFor="area_num">개수:</label>
                      <input
                        type="text"
                        placeholder='분양할 텃밭의 개수를 입력하세요.'
                        id="out_areanum"
                        value={form.farm_sector}
                        onChange={(e)=>{
                          setForm({...form, farm_sector : e.target.value})
                        }}
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
                      value={form.farm_type}
                      onClick={() => handleFarmTypeButtonClick('개인')}
                      className={`type1_button ${selectedFarmType === '개인' ? 'selected' : ''}`}
                    >
                      개인
                    </button>
                    <button
                      value={form.farm_type}
                      onClick={() => handleFarmTypeButtonClick('민간')}
                      className={`type1_button ${selectedFarmType === '민간' ? 'selected' : ''}`}
                    >
                    민간
                    </button>
                    <button
                      value={form.farm_type}
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
                        value={form.price}
                        onChange={(e)=>{
                          setForm({...form, price : e.target.value})
                        }}
                        required
                      />
                    </div>

                    {/* 캘린더 위젯 수정 */}
                    <div className="form8">
                      <label htmlFor="rentalPeriod">임대기간 시작일:</label>
                        <input
                        type="data"
                        id="lental_startDate"
                        value={form.lental_startDate}
                        onChange={(e)=>{
                          setForm({...form, lental_startDate : e.target.value })
                        }}
                        required
                      />
                    </div>
                     {/* 캘린더 위젯 수정 */}
                     <div className="form8">
                     <label htmlFor="rentalPeriod">임대기간 종료일:</label>
                        <input
                        type="data"
                        id="lental_startDate"
                        value={form.lental_endDate}
                        onChange={(e)=>{
                          setForm({...form, lental_endDate : e.target.value })
                        }}
                        required
                      />
                    </div>
                      
                    {/* 캘린더 위젯 수정 */}
                    <div className="form9">
                      <label htmlFor="recruitmentPeriod">분양신청 시작일:</label>
                      <input
                        type="data"
                        id="lental_startDate"
                        value={form.startDate}
                        onChange={(e)=>{
                          setForm({...form, startDate : e.target.value })
                        }}
                        required
                      />
                    </div>
                      {/* 캘린더 위젯 수정 */}
                      <div className="form9">
                      <label htmlFor="recruitmentPeriod">분양신청 마감일:</label>
                      <input
                        type="data"
                        id="lental_startDate"
                        value={form.endDate}
                        onChange={(e)=>{
                          setForm({...form, endDate : e.target.value })
                        }}
                        required
                      />
                    </div>

                    <div className="form10">
                      <label htmlFor="description">본문내용:</label>
                      <textarea
                        id="out_description"
                        value={form.description}
                        onChange={(e)=>{setForm({...form, description : e.target.value})}}
                        required
                      />
                    </div>

                    <button type='button' className="submit-btn" onClick={infoSending}>
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
