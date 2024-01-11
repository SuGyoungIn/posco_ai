import React, { useState } from 'react';
import Header from '../components/Header';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { socket } from '../components/SocketManager';
import axios from 'axios';
import { Canvas } from '@react-three/fiber';

import ParkContent from '../components/ParkContent';
import Chat from '../components/Chat';

const divStyle = {
  width: '70vw',
  margin: '0 auto',
};

const imageContainer = {
  display: 'grid',
  gridTemplateRows: 'repeat(3, 200px)',
  gridTemplateColumns: 'repeat(3, 1fr)',
};
const imageBoxStyle = {
  width: '250px',
  height: '200px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  border: '1.5px solid #ddd',
};
const pickImageBoxStyle = {
  width: '250px',
  height: '200px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  border: '3px solid #00A5E5',
};

const imageStyle = {
  width: '200px',
  height: '150px',
  objectFit: 'cover',
};

export default function Park(props) {
  const [show, setShow] = useState(false);
  const [pickedAnimal, setPickedAnimal] = useState(-1);
  const nickname = JSON.parse(localStorage.getItem('user'))?.nickname;
  //socket 보내기
  const handlePickedAnimal = async (e) => {
    e.preventDefault();

    socket.emit('pickAnimal', {
      id: socket.id,
      data: [nickname, pickedAnimal],
    });
    const url = process.env.REACT_APP_OTHER_API_URL + '/users';
    const body = {
      nickname,
      animal: pickedAnimal,
    };
    try {
      const response = await axios.patch(url, JSON.stringify(body), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const data = response.data;
        setShow(true);
        console.log(data);
        // window.location.href = '/park';
      }
    } catch (err) {
      console.error(err);
    }
  };

  const animals = [
    {
      name: '알파카',
      image: '/images/alpaca.png',
    },
    {
      name: '당나귀',
      image: '/images/donkey.png',
    },
    {
      name: '여우',
      image: '/images/fox.png',
    },
    {
      name: '말',
      image: '/images/horse.png',
    },
    {
      name: '허스키',
      image: '/images/husky.png',
    },
    {
      name: '시바',
      image: '/images/siba.png',
    },
    {
      name: '숫사슴',
      image: '/images/stag.png',
    },
    {
      name: '토끼',
      image: '/images/rabbit.png',
    },
    {
      name: '고양이',
      image: '/images/cat.png',
    },
  ];

  return (
    <div>
      <Header />
      {show ? (
        <div style={divStyle}>
          <Canvas shadows camera={{ position: [8, 8, 8], fov: 30 }}>
            <ParkContent />
          </Canvas>
          <Chat />
        </div>
      ) : (
        <div style={divStyle}>
          <h2>원하는 동물을 선택하세요</h2>
          <div style={imageContainer}>
            {animals.map((animal, idx) =>
              idx === pickedAnimal ? (
                <div key={idx} style={pickImageBoxStyle}>
                  <img
                    style={imageStyle}
                    src={animal.image}
                    alt={animal.name}
                  ></img>
                  <p>{animal.name}</p>
                </div>
              ) : (
                <div
                  key={idx}
                  style={imageBoxStyle}
                  onClick={() => {
                    setPickedAnimal(idx);
                  }}
                >
                  <img
                    style={imageStyle}
                    src={animal.image}
                    alt={animal.name}
                  ></img>
                  <p>{animal.name}</p>
                </div>
              )
            )}
          </div>
          <Button variant='primary' onClick={(e) => handlePickedAnimal(e)}>
            선택하기
          </Button>
        </div>
      )}
    </div>
  );
}
