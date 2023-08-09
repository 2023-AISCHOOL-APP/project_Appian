import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {FormControlLabel, FormControl, FormLabel, FormHelperText } from '@mui/material/';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PageTitle from '../Components/PageTitle';
import {RadioGroup, Radio} from '@mui/material/RadioGroup';
import axios from 'axios';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        FarmFarm
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.


const defaultTheme = createTheme({
  typography : {
    fontFamily : [
      'SUIT-regular', 'SUIT-Bold'
    ]
  },
});
 

export default function SignUp() {


  const [form, setForm] = useState({ user_id: "", user_password: "", user_name : "", user_nick : "" , user_email: "", user_phone: "", user_address : "" });
 


  // 중복체크 => DB에 없는 정보 (False), DB에 있는 정보 (True)
  // 응답이 False인 경우에만 Join 가능

  const [message, setMessage] = useState(''); //DB 응답 결과

  const idCheckUrl = 'http://192.168.70.165:5022/id_check';
  const nickCheckUrl = 'http://192.168.70.165:5022/nick_check';
  const emailCheckUrl = 'http://192.168.70.165:5022/email_check';

  const idCheck = async () => {
    await axios.post(idCheckUrl, {user_id : form.user_id})
    .then((Response)=>{
      console.log('DB에 있는 데이터인가?:(T/F)',Response.data)
      setMessage(Response.data.message);

    })
    .catch((Error)=>{
      console.log("통신 실패 + \n" + Error)
    })
  };

  const nickCheck = async () => {
    await axios.post(nickCheckUrl, {user_id : form.user_nick})
    .then((Response)=>{
      console.log('DB에 있는 데이터인가?:(T/F)',Response.data)
      setMessage(Response.data.message);

    })
    .catch((Error)=>{
      console.log("통신 실패 + \n" + Error)
    })
  };
  

  const emailCheck = async () => {
    await axios.post(emailCheckUrl, {user_id : form.user_email})
    .then((Response)=>{
      console.log('DB에 있는 데이터인가?:(T/F)',Response.data)
      setMessage(Response.data.message);

    })
    .catch((Error)=>{
      console.log("통신 실패 + \n" + Error)
    })
  };
  
  const [validateUserId ,setValidateUserId] = useState('');

  let idValid = /^[A-Za-z0-9].{6,}$/ ;
  if (idValid.test(form.user_id)) {
    setValidateUserId(true); //검증 성공
  } else {
    setValidateUserId(false); //검증 실패
  }

  console.log(validateUserId)











  const sendUrl = 'http://192.168.70.165:5022/add_id';
  const infoSending = async () => {
    await axios.post(sendUrl, {form})
    .then((Response)=>{
      alert(Response.data)
      setMessage(Response.data.message);  

    })
    .catch((Error)=>{
      console.log("통신 실패 + \n" + Error)
    })
  };

 

  // 에러 메세지 객체
//   const errMsg = {
//     id: { 
//       invalid: "6자 이상의 영문과 숫자만 사용 가능합니다",
//       success: "사용 가능한 아이디입니다",
//       fail: "사용할 수 없는 아이디입니다"
//     },
//     pw: "8~20자의 영문, 숫자, 특수문자를 모두 포함한 비밀번호를 입력해주세요",
//     nick : {
//       success: "사용 가능한 닉네임입니다",
//       fail: "사용할 수 없는 닉네임입니다"
//     },
//     email : {
//       success : '사용 가능한 이메일 주소입니다',
//       fail : '사용할 수 없는 이메일 주소입니다'
//     },
//     mobile: "‘-’ 제외한 11자리를 입력해주세요" 
// }

  


  return (
    <>
    <PageTitle data={'회원가입'} num={1}/>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12} >
              <Typography> 계정 정보 등록 </Typography>
              </Grid>
            <Grid item xs={9}>
                <TextField
                  color = "success"
                  size = "small"
                  required
                  fullWidth
                  label="아이디"
                  type="id"
                  id="user_id"
                  value={form.user_id}
                  helperText="ID : 6자 이상 (영문자와 숫자) "
                  autoFocus
                  onChange={(e)=> {setForm({...form, user_id : e.target.value})}}
                  
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  size ='medium'
                  color ='success'
                  variant="contained"
                  sx={{
                    '&:hover':{
                      backgroundColor :' #00C897'
                    },
                    backgroundColor:'#05AC7B',
                    fontFamily:'SUIT-regular',
       
                  }}
                  onClick={idCheck}
                   >중복확인</Button>

              </Grid>
              <Grid item xs={12}>
                <TextField
                  color = "success"
                  size = "small"
                  required
                  fullWidth
                  label="비밀번호"
                  type="password"
                  id="password"
                  value={form.user_password}
                  autoComplete="new-password"
                  helperText="PW : 8~20자 (영문 대소문자, 특수문자, 숫자)"
                  onChange={(e)=> {setForm({...form, user_password : e.target.value})}}
                />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  color = "success"
                  size = "small"
                  required
                  fullWidth
                  id="email"
                  label="Email 주소"
                  autoComplete="email"
                  value={form.user_email}
                  onChange={(e)=>setForm({...form, user_email : e.target.value})}
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  size ='medium'
                  color ='success'
                  variant="contained"
                  sx={{
                    '&:hover':{
                      backgroundColor :' #00C897'
                    },
                    backgroundColor:'#05AC7B',
                    fontFamily:'SUIT-regular',
       
                  }}
                  onClick={emailCheck}
                   >중복확인</Button>
              </Grid>
              <Grid item xs={12} >
                <Box sx={{height : 20}}></Box>
              <Typography> 개인 정보 등록 </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  color = "success"
                  size = "small"
                  required
                  fullWidth
                  id="user_name"
                  label="이름(실명)"
                  value={form.user_name}
                  onChange={(e)=> {setForm({...form, user_name : e.target.value})}}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  color = "success"
                  size = "small"
                  required
                  fullWidth
                  id="nickName"
                  label="닉네임"
                  value={form.user_nick}
                  onChange={(e)=> {setForm({...form, user_nick : e.target.value})}}
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  size ='medium'
                  color ='success'
                  variant="contained"
                  sx={{
                    '&:hover':{
                      backgroundColor :' #00C897'
                    },
                    backgroundColor:'#05AC7B',
                    fontFamily:'SUIT-regular',
       
                  }}
                  onClick={nickCheck}
                   >중복확인</Button>

              </Grid>    
              
             

            
              <Grid item xs={12}>
                <TextField
                  color = "success"
                  size = "small"
                  required
                  fullWidth
                  id="phone"
                  label="연락처(000-0000-0000)"
                  value={form.user_phone}
                  onChange={(e)=>setForm({...form, user_phone : e.target.value})}
               
                />
              </Grid>
          
              <Grid item xs={12}>
                <TextField
                  color = "success"
                  size = "small"
                  required
                  fullWidth
                  id="address"
                  label="거주지 주소 : 이거 API 찾아봐야함"
                  autoComplete="address"
                  value={form.user_address}
                  onChange={(e)=>setForm({...form, user_address : e.target.value})}
                />
              </Grid>
             
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    component={Link}
                    to="/"
                    type="submit"
                    sx={{
                      '&:hover': {
                        background: "#00C897"
                      },
                      background: "#05AC7B",
                      borderRadius: "20px",
                      marginTop : '40px',
                      width : '180px'
                    }}
                    onClick={infoSending}
            >
              가입하기
            </Button>
            </Box>
            <Grid container justifyContent="center">
              <Grid item sx={{
                      borderRadius: "20px",
                      marginTop : '30px',
                      textAlign : 'center',
                      color  : '#05AC7B '
                    }}
            >
                <Link href="/login" variant="body2">
                  이미 계정이 있다면? 로그인
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    </>
  );
}
