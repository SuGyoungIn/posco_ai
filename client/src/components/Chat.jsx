// Chat.js
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { socket } from './SocketManager'; // socketmanager에서 socket 가져오기

const messageStyle = {
  listStyleType: 'none',
  padding: 0,
  margin: 0,
  position: 'fixed',
  bottom: '30px' /* 채팅 입력 폼 아래에 위치 */,
  right: '10px',
  width: '300px' /* 메시지 창의 너비 */,
  maxHeight: '300px' /* 메시지 창의 최대 높이 */,
  overflowY: 'auto',
  background: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '8px',
  boxShadow: '0 0 12px rgba(0, 0, 0, 0.2)',
};

const messageBubbleStyle = {
  padding: '10px',
  borderBottom: '1px solid #ccc',
};

const formStyle = {
  width: '40vw',
  position: 'absolute',
  bottom: '30px',
  display: 'flex',
  padding: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.25)',
  borderRadius: '4px',
};

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    console.log('Chat 컴포넌트가 마운트되었습니다.');

    socket.on('message', (msg) => {
      console.log('메시지 수신:', msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      socket.emit('chat message', { id: socket.id, message: input });
      setInput('');
    }
  };

  return (
    <div>
      <ul style={messageStyle}>
        {messages.map((msg, index) =>
          index % 2 === 0 ? (
            <li style={messageBubbleStyle} key={index}>
              {msg.nickname + ': ' + msg.message}
            </li>
          ) : (
            <li
              style={{ ...messageBubbleStyle, backgroundColor: '#efefef' }}
              key={index}
            >
              {msg.nickname + ': ' + msg.message}
            </li>
          )
        )}
      </ul>
      <form style={formStyle} id='form' onSubmit={handleSubmit}>
        <Form.Control
          type='text'
          id='input'
          autoComplete='off'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type='submit' variant='secondary'>
          Send
        </Button>
      </form>
    </div>
  );
}
