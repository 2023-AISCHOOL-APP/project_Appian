const express = require('express');
const app = express();
const router = express.Router();
const conn = require('../database');
const { getLatLng } = require('../utils/getLatLng'); // 위경도 얻어오기
const multer = require('multer');
const path = require('path');

// 파일 저장 경로 및 파일 이름 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 저장할 경로 지정
    cb(null, 'public/img/farmimg');
  },
  filename: function (req, file, cb) {
    // farm_title을 파일 이름으로 사용
    const farm_title = req.body.farm_title;
    // 확장자 가져오기
    const extname = path.extname(file.originalname);
    // 현재 시간을 밀리초로 얻어와 파일 이름에 추가
    const timestamp = Date.now();
    // farm_title + 밀리초 + 확장자로 이름 설정
    const filename = `${farm_title}_${timestamp}${extname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

// 텃밭 등록
router.post('/add_farm', upload.single('farm_img'), async (req, res) => {
  console.log('텃밭 등록 시도');
  const imgFile = req.file;
  const farm_img = imgFile.filename
  const {
    farm_title,
    farm_type,
    farm_address,
    farm_price,
    user_id,
    lental_area,
    farm_sector,
    lental_type,
    startDate,
    endDate,
    lental_startDate,
    lental_endDate,
    description,
  } = req.body;

  console.log('텃밭이름:', farm_title);
  console.log('파일 이름:', farm_img);

  try {
    // 주소에서 위경도 얻기
    const { latitude, longitude } = await getLatLng(farm_address);

    console.log(
      user_id, // USER_ID
      farm_title, // FARM_TITLE
      farm_type, // FARM_TYPE
      farm_address, // FARM_ADDRESS
      farm_price, // FARM_PRICE
      latitude, // LANTITUDE
      longitude, // LONGITUDE
      lental_area, // LENTAL_AREA
      farm_sector, // FARM_SECTOR
      lental_type, // LENTAL_TYPE
      startDate, // STARTDATE
      endDate, // ENDDATE
      lental_startDate, // LENTAL_STARTDATE
      lental_endDate, // LENTAL_ENDDATE
      description, // DESCRIPTION
      farm_img, // FARM_IMG
    );


    let sql = "INSERT INTO farm (USER_ID, FARM_TITLE, FARM_TYPE, FARM_ADDRESS, FARM_PRICE, LANTITUDE, LONGITUDE, LENTAL_AREA, FARM_SECTOR, LENTAL_TYPE, STARTDATE, ENDDATE, LENTAL_STARTDATE, LENTAL_ENDDATE, DESCRIPTION, FARM_IMG) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    conn.query(sql, [
      user_id, // USER_ID
      farm_title, // FARM_TITLE
      farm_type, // FARM_TYPE
      farm_address, // FARM_ADDRESS
      farm_price, // FARM_PRICE
      latitude, // LANTITUDE
      longitude, // LONGITUDE
      lental_area, // LENTAL_AREA
      farm_sector, // FARM_SECTOR
      lental_type, // LENTAL_TYPE
      startDate, // STARTDATE
      endDate, // ENDDATE
      lental_startDate, // LENTAL_STARTDATE
      lental_endDate, // LENTAL_ENDDATE
      description, // DESCRIPTION
      farm_img, // FARM_IMG
    ],
      (err, rows) => {
        if (err) {
          console.log('텃밭 등록 실패');
          console.error(err);
          res.status(500).send('텃밭 등록 실패');
        }
        else {
          if (rows.affectedRows > 0) {
            console.log('텃밭 등록 성공', farm_title);
            res.status(200).send('텃밭 등록 성공');
          }
          else {
            console.log('텃밭 정보 삽입 실패', rows);
            res.status(500).send('텃밭 등록 실패')
          }
        }
      });
  }
  catch (error) {
    console.error('위경도 변환 에러', error);
    res.status(500).send('위경도 변환 실패')
  }
});


// 텃밭 검색
router.get('/farm', (req, res) => {
  console.log(req.query);
  let { sido, sigungu } = req.query;

  if (sido == "" || sigungu == "") {
    sql = "SELECT farm_num, farm_title, farm_type, farm_address, farm_price, lantitude, longitude, farm.user_id, lental_area, farm_sector, lental_type, DATE_FORMAT(startDate, '%Y-%m-%d') as startDate, DATE_FORMAT(endDate, '%Y-%m-%d') as endDate, DATE_FORMAT(lental_startDate, '%Y-%m-%d') as lental_startDate, DATE_FORMAT(lental_endDate, '%Y-%m-%d') as lental_endDate, description, farm_img, DATE_FORMAT(farm_day, '%Y-%m-%d') as farm_day, user_name, user_nick, user_email, user_phone FROM farm INNER JOIN user ON farm.user_id = user.user_id WHERE farm_address LIKE '%광주%' AND farm_address LIKE '%광산구%'"
    conn.query(sql, (err, rows) => {
      if (err) {
        console.error('텃밭 검색 초기 값 실패', err);
        res.status(500).send('텃밭 검색 초기 값 실패')
      }
      else {
        if (rows.length > 0) {
          console.log('텃밫 검색 초기 값 성공', rows);
          res.status(200).send(rows)
        }
        // else { // front에 이 응답 구현 안됨
        //   console.log('텃밭 검색 초기 값 없음', rows);
        //   res.status(200).send('텃밫 검색 초기 값 없음')
        // }
      }
    })
  }
  else {
    sql = "select farm_num, farm_title, farm_type, farm_address, farm_price, lantitude, longitude, farm.user_id, lental_area, farm_sector, lental_type, DATE_FORMAT(startDate, '%Y-%m-%d') as startDate, DATE_FORMAT(endDate, '%Y-%m-%d') as endDate, DATE_FORMAT(lental_startDate, '%Y-%m-%d') as lental_startDate, DATE_FORMAT(lental_endDate, '%Y-%m-%d') as lental_endDate, description, farm_img, DATE_FORMAT(farm_day, '%Y-%m-%d') as farm_day, user_name, user_nick, user_email, user_phone from farm INNER JOIN user ON farm.user_id = user.user_id where farm_address like ? and farm_address like ?"
    conn.query(sql, [`%${sido}%`, `%${sigungu}%`], (err, rows) => {
      if (err) {
        console.error('텃밭 검색 실패', err);
        res.status(500).send('텃밭 검색 실패');
      }
      else {
        if (rows.length > 0) {
          console.log('텃밭 검색 성공', rows);
          res.status(200).send(rows)
        }
        // else { // front에 이 응답 구현 안됨
        //   console.log('텃밭 검색 결과 없음', rows);
        //   res.status(200).send('텃밭 검색 결과 없음')
        // }
      }
    })
  }
});


// 텃밭 이미지
router.get('/farm_img/:name', (req, res) => {
  // 이미지 경로 설정
  const imagePath = path.join(__dirname, '..', 'public', 'img', 'farmImg', req.params.name);

  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error('텃밭 이미지 전송 오류 발생:', err);
      res.status(500).send('텃밭 이미지 전송 오류 발생');
    } else {
      console.log('텃밭 이미지 전송 완료', req.params.name);
    }
  });
});


// 텃밭 신청 체크
router.get('/farm_check', (req, res) => {
  console.log('텃밭 신청 체크', req.query);
  let { user_id, farm_num } = req.query;
  let sql = 'select user_id, farm_num from farm_application where user_id = ? and farm_num = ?';
  conn.query(sql, [user_id, farm_num], (err, rows) => {
    if (err) {
      console.error('텃밭 신청 체크 오류', err);
      res.status(500).send('텃빝 신청 체크 오류')
    }
    else {
      if (rows.length > 0) {
        console.log('텃밭 신청 내역 있음', rows);
        res.status(200).send('텃밭 신청 내역 있음')
      }
      else {
        console.log('텃밭 신청 내역 없음', user_id, farm_num);
        res.status(200).send('텃밭 신청 내역 없음')
      }
    }
  })
});


// 텃밭 신청
  // 여기서 메시지 주고 받아서 신청 가능 수 체크하는 것보다는 처음 농장 정보 받아올 때 체크해서 버튼 비활성화 하던지 하는 쪽이 더 좋아보임
router.get('/farm_apply', (req, res) => {
  console.log('텃밭 신청', req.query);
  let { user_id, farm_num } = req.query
  // 텃밭의 분양 수 가져오기 farm_sector
  sql = "select farm_sector from farm where farm_num = ?"
  conn.query(sql, [farm_num], (err, rows) => {
    if (err) {
      console.error('텃밭의 분양 수 조회 에러', err);
      res.status(500).send('텃밭의 분양 수 조회 실패');
    }
    else {
      if (rows.length > 0) {
        let farm_sector = rows[0].farm_sector
        console.log('텃밭의 분양 수 조회 성공', farm_sector);
        // 텃밭의 신청 수 가져오기 apply_count
        sql1 = "select count(*) as apply_count from farm_application where farm_num = ?";
        conn.query(sql1, [farm_num], (err, rows) => {
          if (err) {
            console.error('텃밭 신청 수 조회 에러', err);
            res.status(500).send('텃밭 신청 수 조회 에러');
          }
          else {
            if (rows.length > 0) {
              let apply_count = rows[0].apply_count;
              console.log('텃밭 신청 수 조회 성공', apply_count);

              // 분양 수 신청 수 비교 후 로직
              if (farm_sector > apply_count) {
                sql2 = "insert into farm_application (user_id, farm_num) values (?, ?)"
                conn.query(sql2, [user_id, farm_num], (err, rows) => {
                  if (err) {
                    console.error('분양 신청 삽입 오류', err);
                    res.status(500).send('분양 신청 삽입 오류')
                  }
                  else {
                    if (rows.affectedRows > 0) {
                      console.log('분양 신청 성공',user_id, farm_num);
                      res.status(200).send('분양 신청 성공')
                    }
                    else {
                      console.log('분양 신청 실패', rows);
                      res.status(500).send('분양 신청 실패')
                    }
                  }
                })

              }
              else {
                console.log('텃밭의 분양 신청이 최대치 입니다.');
                res.status(200).send('이미 해당 농장의 분양 신청이 최대치입니다.')
              }

            }
            else {
              console.log('텃밭 신청 수 정보가 없음', farm_num);
              res.status(500).send('텃밭 신청 수 정보가 없음');
            }
          }
        })
      }
    }
  })

});



module.exports = router;
