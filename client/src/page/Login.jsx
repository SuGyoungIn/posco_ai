import React from 'react';
import 'boxicons';
import './Login.css';

import axios from 'axios';
import { Button } from '@mui/material';

function Login(props) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = process.env.REACT_APP_OTHER_API_URL + '/users/login';
    const nickname = e.target.elements.nickname.value;
    const pw = e.target.elements.pw.value;
    const body = {
      nickname,
      password: pw,
    };

    try {
      const response = await axios.post(url, JSON.stringify(body), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      if (response.status === 200) {
        const data = response.data;
        const user = {
          userId: data.userId,
          nickname: nickname,
          role: data.role,
        };
        window.localStorage.setItem('user', JSON.stringify(user));
        alert('로그인이 되었습니다.');
        if (data.role === 1) {
          window.location.href = '/admin/home';
        } else if (data.role === 2) {
          window.location.href = '/';
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div class='loginBack'>
      <div class='wrapper'>
        <form onSubmit={handleSubmit}>
          <h1>로그인</h1>
          <div class='input-box'>
            <input
              id='nickname'
              name='nickname'
              type='text'
              placeholder='Username'
            />
            <box-icon type='solid' name='user'></box-icon>
          </div>
          <div class='input-box'>
            <input
              id='pw'
              name='pw'
              type='password'
              placeholder='Password'
              required
            />
            <box-icon name='lock-alt' type='solid'></box-icon>
          </div>

          <Button type='submit' class='btn'>
            로그인
          </Button>
          <div class='register-link'>
            <p>
              계정이 없으신가요? <a href='/signup'>회원가입</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
