import React from 'react'
import DaumPostCode from 'react-daum-postcode'
import { useState } from 'react';

const DaumPost2 = (props) => {
  const [openPostcode, setOpenPostcode] = useState(false);

    /**
     * handler
     */
    const handle = {
        // 버튼 클릭 이벤트
        clickButton: () => {
            setOpenPostcode(current => !current);
        },

        // 주소 선택 이벤트
        selectAddress: (data) => {
            console.log('주소데이터',data)
            // console.log(`
            //     주소: ${data.address},
            //     우편번호: ${data.zonecode}
            // `)
            setOpenPostcode(false);
            props.setForm({...props.form,farm_address:data.address})
        },
    }

    return (
        <div>
            <button onClick={handle.clickButton}>주소찾기</button>
        
            {openPostcode && 
                <DaumPostCode 
                    onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                    autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                    defaultQuery='' // 팝업을 열때 기본적으로 입력되는 검색어 
                    />}
        </div>
    )
}

export default DaumPost2