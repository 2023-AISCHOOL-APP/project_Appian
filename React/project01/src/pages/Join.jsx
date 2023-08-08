import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {FormControlLabel, FormControl, FormLabel } from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PageTitle from '../Components/PageTitle';
import {RadioGroup, Radio} from '@mui/material/RadioGroup';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
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
  }
});

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  const [state, setState] = useState("default");


  return (
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
        <PageTitle data={'로그인'} num={1}/>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
         
            <Grid item xs={12}>
                <TextField
                  color = "success"
                  required
                  fullWidth
                  name="id"
                  label="아이디"
                  type="id"
                  id="id"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  color = "success"
                  required
                  fullWidth
                  name="password"
                  label="비밀번호"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  color = "success"
                  autoComplete="given-name"
                  name="이름"
                  required
                  fullWidth
                  id="이름"
                  label="이름"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  color = "success"
                  required
                  fullWidth
                  id="닉네임"
                  label="닉네임"
                  name="닉네임"
                  autoComplete="family-name"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  color = "success"
                  required
                  fullWidth
                  id="email"
                  label="Email 주소"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  color = "success"
                  required
                  fullWidth
                  id="address"
                  label="거주지 주소 : 이거 API 찾아봐야함"
                  name="address"
                  autoComplete="address"
                />
              </Grid>
             
            </Grid>
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
                      marginTop : '40px'
                    }}
            >
              가입하기
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item sx={{
                      borderRadius: "20px",
                      marginTop : '40px',
                      textAlign : 'center',
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
  );
}