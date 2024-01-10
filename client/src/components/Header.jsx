import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Button } from 'react-bootstrap';

function Header(props) {
  const nickName = JSON.parse(localStorage.getItem('user'))?.nickname;

  const logout = () => {
    localStorage.removeItem('user');
    alert('로그아웃 되었습니다.');
    window.location.href = '/login';
  };
  return (
    <Navbar bg='dark' data-bs-theme='dark'>
      <Container>
        <Navbar.Brand href='/'>LOGO</Navbar.Brand>
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text>{nickName && <p>{nickName} 님</p>}</Navbar.Text>
          <Button variant='outline-secondary' onClick={() => logout()}>
            로그아웃
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
