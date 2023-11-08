const axios = require('axios');

const REST_API_KEY = 'c5c2303d554f2b751de1c8d03bab50bd'
// 주소를 좌표로 변환하는 함수
async function getLatLng(address) {
    try {
        const geoCodingResponse = await axios.get('https://dapi.kakao.com/v2/local/search/address.json', {
            params: {
                query: address,
            },
            headers: {
                Authorization: `KakaoAK ${REST_API_KEY}`, // 여기에 Kakao Developers에서 발급받은 REST API 키를 넣어주세요.
            },
        });

        const coordinates = geoCodingResponse.data.documents[0].address;
        const latitude = coordinates.y; // 위도
        const longitude = coordinates.x; // 경도

        return { latitude, longitude };
    } catch (error) {
        console.error('에러 발생:', error);
        throw new Error('주소를 좌표로 변환하는 중 에러 발생');
    }
}

module.exports = {
    getLatLng,
};
