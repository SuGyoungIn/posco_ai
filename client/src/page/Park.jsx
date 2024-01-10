import React from 'react';
import { Canvas } from '@react-three/fiber';

import ParkContent from '../components/ParkContent';
import Chat from '../components/Chat';
import { SocketManager } from '../components/SocketManager';

const divStyle = {
  width: '90vw',
  height: '90vh',
  margin: '30px auto',
};

function Park(props) {
  return (
    <div style={divStyle}>
      <SocketManager />
      <Canvas shadows camera={{ position: [8, 8, 8], fov: 30 }}>
        <ParkContent />
      </Canvas>
      <Chat />
    </div>
  );
}

export default Park;
