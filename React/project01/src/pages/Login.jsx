import * as React from 'react';
import { useState } from 'react';
import PageTitle from '../Components/PageTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.primary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        FarmFarm
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme({
  typography : {
    fontFamily : [
      'SUIT-regular', 'SUIT-Bold'
    ]
  }
});

const Login = () => {

  const [form, setForm] = useState({ user_id: "", user_password: "" });
  const [message, setMessage] = useState(''); //DB 응답 결과

  const loginUrl = 'http://192.168.70.237:5022/login';

  const infoSending = async () => {
    try {
      const response = await axios.post(loginUrl, { form });
      const responseData = response.data;
      console.log('응답 데이터:', responseData); // 확인을 위해 콘솔에 출력
      setMessage(responseData);
    } catch (error) {
      console.error('통신 실패:', error);
    }
  };




  return (
    <>
    <PageTitle data={'로그인'} num={1}/>
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
        ></Box>
      <Box component="form"  noValidate sx={{ mt: 1 }}>
            <TextField
              color = "success"
              margin="normal"
              required
              fullWidth
              id="user_id"
              value={form.user_id}
              label="아이디"
              name="id"
              autoComplete="email"
              autoFocus
              onChange={(e)=> {setForm({...form, user_id : e.target.value})}}
            />
            <TextField
              color = "success"
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              value={form.user_password}
              autoComplete="current-password"
              onChange={(e)=> {setForm({...form, user_password : e.target.value})}}
            />
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  sx={{
                    "&:checked": {
                      background: "red"
                    }
                  }} />
                }
              label="아이디 저장하기"
            />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              color="primary"
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
                width: "180px"
              }}
              onClick={infoSending}
            >
              로그인
            </Button>
            
            </Box>
            <Grid container justifyContent="center">
              <Grid item sx={{
                      borderRadius: "20px",
                      marginTop : '20px',
                      textAlign : 'center',
                    }}
            >
                <Link href="/join" variant="body2">
                  회원가입
                </Link>
              </Grid>
            </Grid>
            
          </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      </ThemeProvider>
      </>

  )
}

export default Login