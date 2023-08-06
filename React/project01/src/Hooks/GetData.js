import React from 'react'
import { createContext } from 'react'

export const FarmData = createContext()

const GetData = (props) => {

  const sidos =[
    {
      name: '광주광역시',
      sector : [
        { name : '광산구', info : [{"farm_num": 27, "farm_title": "행복한텃밭", "farm_Address": "광주광역시 광산구 도산동631,632", "lantitude": "35.12530834", "longitude": "126.7930857"}, {"farm_num": 28, "farm_title": "무명텃밭(광주 신촌동)", "farm_Address": "광주광역시 광산구 신촌동 1072-8", "lantitude": "35.14671756", "longitude": "126.8017624"}, {"farm_num": 29, "farm_title": "무명텃밭(광주 월곡동)", "farm_Address": "광주광역시 월곡동 490-7", "lantitude": "35.17437024", "longitude": "126.8078735"}, {"farm_num": 30, "farm_title": "친환경서송옥상텃밭", "farm_Address": "광주광역시 광산구 월곡동 52-12", "lantitude": "35.16843252", "longitude": "126.8104209"}, {"farm_num": 31, "farm_title": "행복둥지텃밭 1호", "farm_Address": "광주광역시 광산구 도천동 522", "lantitude": "35.22021435", "longitude": "126.8161993"}, {"farm_num": 1, "farm_title": "삼연주말농장", "farm_Address": "광산구 삼도동 586", "lantitude": "35.13253602", "longitude": "126.6866741"}, {"farm_num": 8, "farm_title": "솔머리행복텃밭", "farm_Address": "광주광역시 광산구 소촌동 420", "lantitude": "35.14628583", "longitude": "126.7930446"}, {"farm_num": 9, "farm_title": "행복둥지텃밭 2호", "farm_Address": "광주광역시 광산구 비아동 441", "lantitude": "35.21565732", "longitude": "126.8177204"}, {"farm_num": 25, "farm_title": "반월공동체텃밭", "farm_Address": "광주광역시 광산구 월곡동 110-7, 산105-12", "lantitude": "35.16583095", "longitude": "126.816104"}, {"farm_num": 26, "farm_title": "인계마을공동체희망텃밭", "farm_Address": "광주광역시 광산구 우산동 1601-7/889-3", "lantitude": "35.16022481", "longitude": "126.8070287"}]}, 
        { name : '동구', info : [{"farm_num":17, "farm_title":'행복키움주말농장(소태동)', "farm_Address":'광주광역시 동구 소태동 94', "lantitude":'35.11996627', "longitude":'126.9435334'}, {"farm_num":18, "farm_title":'행복키움주말농장(내남동)', "farm_Address":'광주광역시 동구 내남동 184', "lantitude":'35.08621359', "longitude":'126.9396791'}, {"farm_num":19, "farm_title":'행복키움주말농장(용연동)', "farm_Address":'광주광역시 동구 용연동 423-1,426-1', "lantitude":'35.09464888', "longitude":'126.9627606'},{"farm_num":20, "farm_title":'행복키움주말농장(용산동)', "farm_Address":'광주광역시 동구 용산동 80-1', "lantitude":'35.11138393', "longitude":'126.9337723'}]},
        { name :'서구', info: [{"farm_num":13, "farm_title":'도시텃밭', "farm_Address":'광주광역시 서구 양동 406', "lantitude":'35.15664161', "longitude":'126.8941407'}, {"farm_num":14, "farm_title":'마제텃밭', "farm_Address":'광주광역시 서구 금호동 60-14', "lantitude":'35.12954391', "longitude":'126.8625879'}, {"farm_num":15, "farm_title":'봉산주말농장', "farm_Address":'광주광역시 서구 용두동 656-8', "lantitude":'35.09532647', "longitude":'126.8135303'}, {"farm_num":16, "farm_title":'풍암호수공원주말농장', "farm_Address":'광주광역시 서구 풍암동 556-1', "lantitude":'35.12978978', "longitude":'126.8684548'},{"farm_num":21, "farm_title":'양동 친환경공영도시텃밭', "farm_Address":'광주광역시 서구 양동 406', "lantitude":'35.15665117', "longitude":'126.8942291'},{"farm_num":22, "farm_title":'풍암동 친환경공영도시텃밭', "farm_Address":'광주광역시 서구 풍암동 383-1', "lantitude":'35.12933324', "longitude":'126.8758014'}]},
        { name :'남구', info: [{"farm_num":23, "farm_title":'건강희망텃밭', "farm_Address":'광주광역시 남구 양과동 957 외 2필지', "lantitude": '35.08743568', "longitude":'126.8638243'}]},
        { name : '북구', info:[{'farm_num': 10, 'farm_title': '분토농업주말농장', 'farm_Address': '광주광역시 북구 청풍동 1311-3', 'lantitude': '35.18696743', 'longitude': '126.9570844'}, {'farm_num': 11, 'farm_title': '우리두리주말농장', 'farm_Address': '광주광역시 북구 청풍동 420-1', 'lantitude': '35.17211848', 'longitude': '126.9602707'}, {'farm_num': 12, 'farm_title': '해피팜주말농장', 'farm_Address': '광주광역시 북구 장등동 803', 'lantitude': '35.20645158', 'longitude': '126.9318408'}, {'farm_num': 24, 'farm_title': '무명(광주 월계동)', 'farm_Address': '광주광역시 월계동 830-2', 'lantitude': '35.21221173', 'longitude': '126.8421647'}],}]
    },
    {
      name: '전라남도',
      sector : [
      { name : '나주시', info: [{"farm_num":39, "farm_title":'혁신도시 공원텃밭',"farm_Address":'전라남도 나주시 빛가람동 536외 2개소', "lantitude": '35.01018778', "longitude":'126.7762545'}]}, 
      { name : '목포시', info: [{"farm_num":32, "farm_title":'삼향골', "farm_Address":'전라남도 목포시 대양동 198', "lantitude":'34.83593901',  "longitude":'126.4258916'}]},
      { name : '여수시', info: [{"farm_num":3, "farm_title":'나무향기 현천골농장', "farm_Address":'전라남도 여수시 소라면 현천리 673-7', "lantitude": '34.75914515', "longitude":'127.6079463'}, {"farm_num":4, "farm_title":'힐링캠프', "farm_Address":'전라남도 여수시 선원동 848-3, 849-1', "lantitude": '34.77036357', "longitude":'127.6556207'},{"farm_num":33, "farm_title":'도시민 친환경 가족텃밭', "farm_Address":'전라남도 여수시 여천동 896-2, 896-4', "lantitude": '34.78074351', "longitude":'127.6637043'}]},
      { name : '순천시', info: [{"farm_num":40, "farm_title":'신대도시농업공원',"farm_Address":'전라남도 순천시 해룡면 신대리 2137', "lantitude": '34.92765363', "longitude":'127.5545998'}]},
      { name : '광양시', info: [{"farm_num":38, "farm_title":'농사체험학습장',"farm_Address":'전라남도 광양시 봉강면 지곡리 862-19외', "lantitude": '34.9897648', "longitude":'127.5772'}]},
      { name : '장성군', info: [{"farm_num":37, "farm_title":'옐로우시티', "farm_Address":'전라남도 장성군 장성읍 1455', "lantitude":'35.30309222', "longitude":'126.7700636'}]},
      { name : '화순군', info: [{"farm_num":2, "farm_title":'힐링텃밭', "farm_Address":'전라남도 화순군 화순읍 삼천리 48', "lantitude":'35.04576754', "longitude":'126.9930968'}, {"farm_num":5, "farm_title":'고인돌텃밭농장', "farm_Address":'전라남도 화순군 도곡면 월곡리 672', "lantitude":'34.98704109', "longitude":'126.9133503'}, {"farm_num":6, "farm_title":'능주정보화마을텃밭', "farm_Address":'전라남도 화순군 능주면 백암리', "lantitude":'35.02047124', "longitude":'126.9706413'}, {"farm_num":7, "farm_title":'힐링가족텃밭', "farm_Address":'전라남도 화순군 화순읍 교리 247', "lantitude":'35.06086769', "longitude":'126.9804573'}]}]
  }];

  
  return (
    <FarmData.Provider value={sidos}>{props.children}</FarmData.Provider>
  )
}

export default GetData