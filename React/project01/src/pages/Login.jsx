import * as React from 'react';
import PageTitle from '../Components/PageTitle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.primary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://localhost:3000/">
        FARMFARM
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
              label="아이디"
              name="id"
              autoComplete="email"
              autoFocus
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
              autoComplete="current-password"
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
                marginTop : '40px'
              }}
            >
              로그인
            </Button>
            <Grid container>
              <Grid item sx={{
                      borderRadius: "20px",
                      marginTop : '40px',
                      textAlign : 'center'}} direction="row" spacing={1} justifyContent="center" mt={3}>

                <Link href="/join" variant="body2">
                  {"회원가입"}
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