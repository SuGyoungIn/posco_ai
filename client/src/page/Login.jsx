import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const divStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '60vw',
  minWidth: '480px',
  height: '60vh',
  margin: '20vh auto',
  backgroundColor: '#ddd',
  borderRadius: '20px',
  boxSizing: 'border-box',
};

const labelStyle = {
  marginBottom: '10px',
};

const inputStyle = {
  marginBottom: '20px',
  border: '1px solid #aaa',
  width: '30vw',
  height: '40px',
  padding: '0 10px',
  borderRadius: '10px',
};
function Login(props) {
  const handleSubmit = async (e) => {
    console.log(1);
    e.preventDefault();
    const url = process.env.REACT_APP_OTHER_API_URL + '/users/login';
    const nickname = e.target.elements.nickname.value;
    const pw = e.target.elements.pw.value;
    const body = {
      nickname,
      password: pw,
    };

    try {
      console.log(2);
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
        console.log(3);
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
    <div style={divStyle}>
      <h1>PPARK</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={labelStyle} htmlFor='nickname'>
            <b>아이디</b>
          </label>
          <br />
          <input
            type='text'
            placeholder='아이디를 입력하세요'
            id='nickname'
            name='nickname'
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor='pw'>
            <b>비밀번호</b>
          </label>
          <br />
          <input
            type='password'
            placeholder='비밀번호를 입력하세요'
            id='pw'
            name='pw'
            style={inputStyle}
            required
          />
        </div>
        <Button variant='primary' type='submit'>
          Login
        </Button>
        <a href='/signup'>회원가입하러 가기</a>
      </form>
    </div>
  );
}

export default Login;
