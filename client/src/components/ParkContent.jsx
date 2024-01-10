import React, { Suspense, useState } from 'react';
import * as THREE from 'three';
import { useAtom } from 'jotai';
import {
  OrbitControls,
  useFBX,
  OrthographicCamera,
  Sky,
  useCursor,
} from '@react-three/drei';
import { charactersAtom } from '../components/SocketManager';
import AniHusky from './AniHusky';
import { socket } from './SocketManager';
export default function ParkContent() {
  const garden = useFBX('/models/garden.fbx');

  const [characters] = useAtom(charactersAtom);
  const [onFloor, setOnFloor] = useState(false);
  useCursor(onFloor);
  return (
    <Suspense fallback={null}>
      <Sky sunPosition={[100, 500, 20]} />
      <axesHelper scale={10} />
      <ambientLight intensity={5} color='#B1E1FF' />
      <directionalLight
        color='#fff'
        position={[-10, 30, -10]}
        intensity={2}
        target-position={[0, 0, 0]}
        shadow-mapSize={[2048, 2048]}
        castShadow
      />
      <axesHelper args={[1000]} />
      <OrthographicCamera
        makeDefault
        position={[30, 40, 50]}
        far={1000}
        near={-1000}
        left={-100}
        right={100}
        top={100}
        bottom={-100}
      />
      <primitive
        object={garden}
        scale={0.8}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
        onClick={(e) => socket.emit('move', [e.point.x, 25, e.point.z])}
        onPointerEnter={() => setOnFloor(true)}
        onPointerLeave={() => setOnFloor(false)}
      />
      {characters?.map((character) => (
        <AniHusky
          key={character.id}
          position={
            new THREE.Vector3(character.position[0], 25, character.position[2])
          }
        />
      ))}
      <OrbitControls />
    </Suspense>
  );
}
