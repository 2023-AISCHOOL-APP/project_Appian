// auth/AuthLogin.js

import React from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox
} from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const AuthLogin = ({ title, subtitle, subtext }) => (
  <>
    {title ? (
      <Typography fontWeight="700" variant="h2" mb={1}>
        {title}
      </Typography>
    ) : null}

    {subtext}

    <Stack>
      <Box>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="user_id"
          mb="5px"
        >
          회원 ID
        </Typography>
        <CustomTextField id="username" variant="outlined" fullWidth />
      </Box>
      <Box mt="25px">
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="password"
          mb="5px"
        >
          비밀번호
        </Typography>
        <CustomTextField
          id="password"
          type="password"
          variant="outlined"
          fullWidth
        />
      </Box>

      <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                sx={{
                  "&:checked": {
                    background: "red"
                  }
                }}
              />
            }
            label="아이디 기억하기"
          />
        </FormGroup>
        <Typography
          component={Link}
          to="/"
          fontWeight="500"
          sx={{
            textDecoration: 'none',
            color: 'primary.main',
          }}
        >
          비밀번호 찾기
        </Typography>
      </Stack>
    </Stack>
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
            background: "red"
          },
          background: "#05AC7B",
          borderRadius: "50px",
          width: "260px"
        }}
      >
        로그인
      </Button>
    </Box>
    {subtitle}
  </>
);

export default AuthLogin;
