import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Card, Stack, Typography, Button, Dialog, DialogActions, Image } from '@mui/material'
import LogoSrc from 'src/assets/images/logos/farm_logo@2x.png';

// components
import PageContainer from 'src/components/container/PageContainer';
import AuthLogin from './auth/AuthLogin';

const Login2 = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <PageContainer title="Login" description="로그인 페이지입니다">
      <Box
        sx={{
          position: 'relative',
          background: 'linear-gradient(rgba(34, 193, 195, 0.6), rgba(253, 187, 45, 0.6)), url("login-farmfarm.svg")',
          backgroundSize: "cover",
          '&:before': {
            content: '""',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.4',
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px', boxShadow: 0 }}>
              <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
              <img src={LogoSrc} alt="Logo" style={{ width: '100%', maxWidth: '200px' }} />  {/* 변경 부분 */}
              </Box>
              <AuthLogin
                onLoginButtonClick={handleOpen}
                subtext={
                  <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>
                    로그인이 필요합니다
                  </Typography>
                }
                subtitle={
                  <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                    <Typography
                      component={Link}
                      to="/register"
                      fontWeight="500"
                      sx={{
                        color: "#05AC7B",
                        textDecoration: "underline"
                      }}
                    >
                      회원가입
                    </Typography>
                  </Stack>
                }
              />

              <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogActions>
                  <Button fullWidth variant="contained" color="primary" component={Link} to="/farm-registration" onClick={handleClose}>
                    텃밭 등록하기
                  </Button>
                  <Button fullWidth variant="outlined" color="primary" component={Link} to="/farm-search" onClick={handleClose} style={{ marginTop: '15px' }}>
                    텃밭 찾기
                  </Button>
                </DialogActions>
              </Dialog>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login2;