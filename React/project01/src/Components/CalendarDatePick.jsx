import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import '../Css/CalendarDatePick.css';
import { ko } from "date-fns/esm/locale";

const CalendarDatePick = ({value , onChange}) => {
  const [startDate, setStartDate] = useState(new Date());

  // 게시물 작성 시 날짜를 선택하는 기능입니다. 
  // input field 클릭 -> 하단에 캘린더 위젯 생성 -> 날짜 선택 -> 위젯 소멸 및 날짜 입력 


  
  
	return (
		<div>
		 <DatePicker
        locale={ko}
        selected={value}
        onChange={date => {
          if (date) {
            onChange(date);
          }
        }}
        dateFormat="yyyy-MM-dd"
      />
		</div>
  );
};


export default CalendarDatePick