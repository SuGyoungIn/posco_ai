/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/Donkey.glb -o src/components/AniDonkey.jsx -r public 
*/

import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useGraph } from '@react-three/fiber';
import { useGLTF, useAnimations, Text } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

export default function AniDonkey(props) {
  const group = useRef();
  const { scene, materials, animations } = useGLTF('/models/Donkey.glb');
  const { actions } = useAnimations(animations, group);
  const [ani, setAni] = useState('AnimalArmature|Idle');
  const nickname = JSON.parse(localStorage.getItem('user'))?.nickname;

  const SPEED = 0.5;
  const position = useMemo(() => props.position, []);

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  useEffect(() => {
    actions[ani].reset().fadeIn(0.32).play();
    return () => actions[ani]?.fadeOut(0.32);
  }, [ani]);

  useFrame(() => {
    if (group.current.position.distanceTo(props.position) > 0.1) {
      const direction = group.current.position
        .clone()
        .sub(props.position)
        .normalize()
        .multiplyScalar(SPEED);

      group.current.position.sub(direction);
      group.current.lookAt(props.position);
      setAni('AnimalArmature|Walk');
    } else {
      setAni('AnimalArmature|Idle');
    }
  });
  return (
    <group ref={group} {...props} dispose={null} scale={5} position={position}>
      <Text
        scale={[0.5, 0.5, 0.5]}
        color='red'
        anchorX='center'
        anchorY='middle'
        position={new THREE.Vector3(position[0], 5, position[2])}
      >
        {nickname}
      </Text>
      <group name='Root_Scene'>
        <group name='RootNode'>
          <group
            name='AnimalArmature'
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <primitive object={nodes.Body} />
            <primitive object={nodes.IKBackLegL} />
            <primitive object={nodes.IKFrontLegL} />
            <primitive object={nodes.IKBackLegR} />
            <primitive object={nodes.IKFrontLegR} />
          </group>
          <group name='Donkey' rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh
              name='Donkey_1'
              geometry={nodes.Donkey_1.geometry}
              material={materials.Main_Light}
              skeleton={nodes.Donkey_1.skeleton}
            />
            <skinnedMesh
              name='Donkey_2'
              geometry={nodes.Donkey_2.geometry}
              material={materials.Main}
              skeleton={nodes.Donkey_2.skeleton}
            />
            <skinnedMesh
              name='Donkey_3'
              geometry={nodes.Donkey_3.geometry}
              material={materials.Hair}
              skeleton={nodes.Donkey_3.skeleton}
            />
            <skinnedMesh
              name='Donkey_4'
              geometry={nodes.Donkey_4.geometry}
              material={materials.Muzzle}
              skeleton={nodes.Donkey_4.skeleton}
            />
            <skinnedMesh
              name='Donkey_5'
              geometry={nodes.Donkey_5.geometry}
              material={materials.Hooves}
              skeleton={nodes.Donkey_5.skeleton}
            />
            <skinnedMesh
              name='Donkey_6'
              geometry={nodes.Donkey_6.geometry}
              material={materials.Main_Dark}
              skeleton={nodes.Donkey_6.skeleton}
            />
            <skinnedMesh
              name='Donkey_7'
              geometry={nodes.Donkey_7.geometry}
              material={materials.Eye_Dark}
              skeleton={nodes.Donkey_7.skeleton}
            />
            <skinnedMesh
              name='Donkey_8'
              geometry={nodes.Donkey_8.geometry}
              material={materials.Eye_White}
              skeleton={nodes.Donkey_8.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/models/Donkey.glb');