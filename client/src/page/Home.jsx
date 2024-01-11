import React, { useEffect, useState } from 'react';
import HeaderInfo from '../components/HeaderInfo';
import ImageInput from '../components/ImageInput';

import 'bootstrap/dist/css/bootstrap.min.css';
const divStyle = {
  width: '70vw',
  margin: '0 auto',
  paddingTop: '30px',
};
function Home(props) {
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user == null) {
      window.location.href = '/login';
    }
  }, []);
  return (
    <div>
      <HeaderInfo />
      <div style={divStyle}>
        <ImageInput />
      </div>
    </div>
  );
}

export default Home;
