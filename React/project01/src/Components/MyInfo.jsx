import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PageTitle from './PageTitle';
import axios from 'axios';
import DaumPost from './DaumPost';



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
 

export default function Myinfo() {

  const [form, setForm] = useState({ user_id: "", user_password: "", user_name : "", user_nick : "" , user_email: "", user_phone: "", user_address : "" });


  //중복체크 DB 응답 결과
  const [message, setMessage] = useState(''); 

  const idCheckUrl = 'http://192.168.70.237:5022/id_check';
  const nickCheckUrl = 'http://192.168.70.237:5022/nick_check';
  const emailCheckUrl = 'http://192.168.70.237:5022/email_check';


  const idCheck = async () => {
    await axios.post(idCheckUrl, {user_id : form.user_id})
    .then((Response)=>{
      setMessage(Response.data);
      console.log('DB에 있는 데이터인가?:(T/F)','id?', message)
      if (message === false){
        alert('사용할 수 있는 아이디입니다');
      }else {
        alert('사용할 수 없는 아이디입니다');
      }    
    })
    .catch((Error)=>{
      console.log("통신 실패 + \n" + Error)
    })
  };

  const nickCheck = async () => {
    await axios.post(nickCheckUrl, {user_id : form.user_nick})
    .then((Response)=>{
      console.log('DB에 있는 데이터인가?:(T/F)', 'nick',Response.data)
      setMessage(Response.data);
      if (message === false){
        alert('사용할 수 있는 닉네임입니다');
      }else {
        alert('사용할 수 없는 닉네임입니다');
      }
    })
    .catch((Error)=>{
      console.log("통신 실패 + \n" + Error)
    })
  };
  

  const emailCheck = async () => {
    await axios.post(emailCheckUrl, {user_id : form.user_email})
    .then((Response)=>{
      console.log('DB에 있는 데이터인가?:(T/F)','email',Response.data)
      setMessage(Response.data);
      if (message === false && message !== ' '){
        alert('사용할 수 있는 이메일입니다');
      }else {
        alert('사용할 수 없는 이메일입니다');
      }
    })
    .catch((Error)=>{
      console.log("통신 실패 + \n" + Error)
    })
  };


  
  
  // DB로 전송하는 데이터
  const sendUrl = 'http://192.168.70.237:5022/add_id';
  const infoSending = async () => {

    console.log(form)


    await axios.post(sendUrl, {form})
    .then((Response)=>{
      
      alert('🧑‍🌾팜팜의 회원이 되신걸 축하드립니다! ')   
      sessionStorage.setItem('user_id', form.user_id)
      sessionStorage.setItem('user_nick', form.user_nick)
      sessionStorage.setItem('user_type', form.user_type)   
      window.location.replace('/')

    })
    .catch((Error)=>{
      console.log("통신 실패 + \n" + Error)
    })
  };


  return (
    <>
    <PageTitle data={'내 정보 수정'} num={3}/>
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
                  name='user_id'
                  id="user_id"
                  value={form.user_id}
                  helperText="ID : 6자 이상 (영문자와 숫자) "
                  autoFocus
                  autoComplete='off'
                  onChange={(e)=>setForm(e.target.value)}                  
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
                  autoComplete='off'
                  helperText="PW : 6 ~ 12자의 영문, 숫자 조합"
                  value={form.user_password}
                 
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
                  autoComplete='off'
                  helperText="Email 예시 : farmers@farmfarm.co.kr"
                  value={form.user_email}
          
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
                  onClick={()=>form.user_email.length > 0 ? emailCheck() : alert('이메일 주소를 입력해주세요.')}
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
                  disabled
                  fullWidth
                  id="user_name"
                  label="이름(실명)"
                  value={form.user_name}
                  autoComplete='off'
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
                  autoComplete='off'
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
                  onClick={()=>form.user_nick.length > 0 ? nickCheck() : alert('닉네임을 입력해주세요.')}
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
                  autoComplete='off'
                            
                />
              </Grid>
          
              <Grid item xs={12} sx={{display: "flex"}}>
                <TextField
                  color = "success"
                  size = "small"
                  required
                  fullWidth
                  id="address"
                  // label="거주지 주소 : 이거 API 찾아봐야함"
                  autoComplete="off"
                  
                  value={form.user_address}
                  //onChange={(e)=>setForm({...form, user_address : e.target.value})}
                />
                <DaumPost setForm = {setForm} form={form}></DaumPost>  
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
              수정하기
            </Button>
            </Box>
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    </>
  );
}
