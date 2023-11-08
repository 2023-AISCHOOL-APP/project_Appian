import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PageTitle from '../Components/PageTitle';
import DaumPost from '../Components/DaumPost';
import API_URL from '../api_url';


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
    ]}
  });

const Mypage = () => {

  const userInfo = useLocation().state.info
  console.log('유저정보', userInfo)

  const [form, setForm] = useState({ user_id: userInfo.USER_ID, user_password: userInfo.USER_PASSWORD, user_name : userInfo.USER_NAME, user_nick : userInfo.USER_NICK , user_email: userInfo.USER_EMAIL, user_phone: userInfo.USER_PHONE, user_address : '' });

  //중복체크 DB 응답 결과
  const [message, setMessage] = useState(''); 

  const checkUrl = `${API_URL}/user/check`;

  
  const idCheck = async () => {
    console.log('id체크',form.user_id)
    
    await axios.post(checkUrl, {user_id : form.user_id})
    .then((Response)=>{
      const responseData = Response.data ;
      // setMessage(Response.data);
      console.log('DB에 있는 데이터인가?:(T/F)','id?', message)
      if (responseData == '아이디 없음'){
        alert('사용할 수 있는 아이디입니다');
        
      }else {
        alert('사용할 수 없는 아이디입니다');
        setForm({...form, user_id : ''})
      }    
    })
    .catch((Error)=>{
      console.log("통신 실패 + \n" + Error)
    })
  };

  const nickCheck = async () => {
    await axios.post(checkUrl, {user_nick : form.user_nick})
    .then((Response)=>{
      console.log('DB에 있는 데이터인가?:(T/F)', 'nick',Response.data)
      const responseData = Response.data ;
      // setMessage(Response.data);
      if (responseData == '닉네임 없음'){
        alert('사용할 수 있는 닉네임입니다');
        
      }else {
        alert('사용할 수 없는 닉네임입니다');
        setForm({...form, user_nick : ''})
      }
    })
    .catch((Error)=>{
      console.log("통신 실패 + \n" + Error)
    })
  };
  

  const emailCheck = async () => {
    await axios.post(checkUrl, {user_email : form.user_email})
    .then((Response)=>{
      console.log('DB에 있는 데이터인가?:(T/F)','email',Response.data)
      const responseData = Response.data ;
      // setMessage(Response.data);
      if (responseData == '이메일 없음'){
        alert('사용할 수 있는 이메일입니다');
      }else {
        alert('사용할 수 없는 이메일입니다');
        setForm({...form, user_email : ''})
      }
    })
    .catch((Error)=>{
      console.log("통신 실패 + \n" + Error)
    })
  };


  
  
  // DB로 전송하는 데이터
  const sendUrl = `${API_URL}/user/update_change`;
  const infoSending = async () => {

    console.log('데이터 확인',form)


    await axios.post(sendUrl, {form})
    .then((Response)=>{
      
      alert('🧑‍🌾회원 정보가 수정되었습니다! ')   
      sessionStorage.setItem('user_id', form.user_id)
      sessionStorage.setItem('user_nick', form.user_nick)
      sessionStorage.setItem('user_type', form.user_type)   
      window.location.replace('/')

    })
    .catch((Error)=>{
      console.log("통신 실패 + \n" + Error)
      if (Error.response.status == 500){
        alert('빈칸이 존재합니다.')
      }
    })
  };

  const [openPostcode, setOpenPostcode] = useState(false);
  


  return (
    <>
    <PageTitle data={'내 정보 수정'} num={1}/>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
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
                  disabled
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
                  disabled
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
                  onChange={(e)=>setForm({...form, user_password : e.target.value})}
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
                  required
                  fullWidth
                  id="user_name"
                  label="이름(실명)"
                  value={form.user_name}
                  disabled
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
                  onChange={(e)=>setForm({...form, user_phone : e.target.value})}
                />
              </Grid>
          
              <Grid item xs={12} sx={{display: "flex"}}>
                <TextField
                  color = "success"
                  size = "small"
                  required
                  fullWidth
                  id="address"
                  autoComplete="off"
                  value={form.user_address}
                  //onChange={(e)=>setForm({...form, user_address : e.target.value})}
                />
                <Grid item xs={4}>
                  <DaumPost setForm = {setForm} form={form}></DaumPost>  
                </Grid>
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
  )
}

export default Mypage