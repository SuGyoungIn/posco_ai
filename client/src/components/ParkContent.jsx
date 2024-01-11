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
// 여기 폴더 풀어서 써야함!
import AniAlpaca from './models/AniAlpaca';
import AniCat from './models/AniCat';
import AniDonkey from './models/AniDonkey';
import AniFox from './models/AniFox';
import AniRabbit from './models/AniRabbit';
import AniShiba from './models/AniShiba';
import AniStag from './models/AniStag';
import AniWhiteHorse from './models/AniWhiteHorse';
import AniHusky from './models/AniHusky';

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
      {characters?.map((character) => {
        let AnimalComponent;

        switch (character.animal) {
          case 0:
            AnimalComponent = AniAlpaca;
            break;
          case 1:
            AnimalComponent = AniDonkey;
            break;
          case 2:
            AnimalComponent = AniFox;
            break;
          case 3:
            AnimalComponent = AniWhiteHorse;
            break;
          case 4:
            AnimalComponent = AniHusky;
            break;
          case 5:
            AnimalComponent = AniShiba;
            break;
          case 6:
            AnimalComponent = AniStag;
            break;
          case 7:
            AnimalComponent = AniRabbit;
            break;
          case 8:
            AnimalComponent = AniCat;
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
