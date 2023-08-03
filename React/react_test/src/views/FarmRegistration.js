import React from 'react';
import { Button, TextField, Card, Typography, Box } from '@mui/material';

const FarmRegistration = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        '&:before': {
          content: '""',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
          position: 'absolute',
          height: '100%',
          width: '100%',
          opacity: '0.6',  // 수정된 부분
          background: "url('login-farmfarm.svg')",
          backgroundSize: "cover"
        },
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Card elevation={9} sx={{ p: 4, width: '100%', maxWidth: '500px', boxShadow: 0 }}>
          <Typography variant="h4" gutterBottom textAlign="center">
            텃밭 등록
          </Typography>
          <form>
            <TextField fullWidth margin="normal" variant="outlined" label="텃밭 이름" />
            <TextField fullWidth margin="normal" variant="outlined" label="텃밭 위치" />
            <TextField fullWidth margin="normal" variant="outlined" label="텃밭 크기" />
            <TextField fullWidth margin="normal" variant="outlined" label="특별한 작물" multiline rows={4} />
            <Button fullWidth variant="contained" color="primary" style={{ marginTop: '20px' }}>
              등록하기
            </Button>
          </form>
        </Card>
      </Box>
    </Box>
  );
};

export default FarmRegistration;
