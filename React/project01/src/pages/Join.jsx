import React, { useState } from 'react';
import {Avatar, Button, CssBaseline, TextField, FormControl, FormControlLabel, FormHelperText, Grid, Box, Typography, Container} from '@mui/material/';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import PageTitle from '../Components/PageTitle';


const Join = () => {
  const emailAlert = '';

  return (
    <>
   
    <PageTitle data={'회원가입'} num={0}/>
    <Grid item xs={12}> 
    <TextField 
    id='user_id' 
    variant='outlined' 
    color="secondary" 
    focused required
    label='이름(닉네임)'
    name='ff'
    size ='small'
    /> 

  
    </Grid>
    </>
    );
};

export default Join