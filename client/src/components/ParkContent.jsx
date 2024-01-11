import React, { Suspense, useState, useEffect } from 'react';
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
import AniAlpaca from './models/AniAlpaca';
import AniFox from './models/AniFox';
import AniShiba from './models/AniShiba';
import AniStag from './models/AniStag';
import AniWhiteHorse from './models/AniWhiteHorse';
import AniHusky from './models/AniHusky';

import { socket } from './SocketManager';

export default function ParkContent(props) {
  const role = JSON.parse(localStorage.getItem('user'))?.role;
  const garden = useFBX('/models/garden.fbx');
  const [characters] = useAtom(charactersAtom);
  const [onFloor, setOnFloor] = useState(false);
  useCursor(onFloor);

  return (
    <Suspense fallback={null}>
      <Sky sunPosition={[100, 500, 20]} />
      <ambientLight intensity={5} color='#B1E1FF' />
      <directionalLight
        color='#fff'
        position={[-10, 30, -10]}
        intensity={2}
        target-position={[0, 0, 0]}
        shadow-mapSize={[2048, 2048]}
        castShadow
      />
      <OrthographicCamera
        makeDefault
        position={role === 1 ? [0, 150, 0] : [30, 40, 50]}
        rotation={role === 1 ? [0, Math.PI * 2, 0] : [0, 0, 0]}
        far={1000}
        near={-1000}
        left={-100}
        right={100}
        top={100}
        bottom={-100}
        zoom={role === 1 ? 0.2 : 1}
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
      {characters?.map((character) => {
        let AnimalComponent;

        switch (character.animal) {
          case 0:
            AnimalComponent = AniAlpaca;
            break;
          case 1:
            AnimalComponent = AniFox;
            break;
          case 2:
            AnimalComponent = AniWhiteHorse;
            break;
          case 3:
            AnimalComponent = AniHusky;
            break;
          case 4:
            AnimalComponent = AniShiba;
            break;
          case 5:
            AnimalComponent = AniStag;
            break;
          default:
            AnimalComponent = null;
            break;
        }

        if (AnimalComponent) {
          return (
            <AnimalComponent
              key={character.id}
              position={
                new THREE.Vector3(
                  character.position[0],
                  25,
                  character.position[2]
                )
              }
            />
          );
        }

        return null;
      })}
      <OrbitControls />
    </Suspense>
  );
}
