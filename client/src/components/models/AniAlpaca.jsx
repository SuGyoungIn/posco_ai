/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/Alpaca.glb -o src/components/AniAlpaca.jsx -r public 
*/

import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useGraph } from '@react-three/fiber';
import { useGLTF, useAnimations, Text } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

export default function AniAlpaca(props) {
  const group = useRef();
  const { scene, materials, animations } = useGLTF('/models/Alpaca.glb');
  const { actions } = useAnimations(animations, group);
  const [ani, setAni] = useState('AnimalArmature|Idle');

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
        {props.nickname}
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
          <group name='Alpaca' rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <skinnedMesh
              name='Alpaca_1'
              geometry={nodes.Alpaca_1.geometry}
              material={materials.Main_Light}
              skeleton={nodes.Alpaca_1.skeleton}
            />
            <skinnedMesh
              name='Alpaca_2'
              geometry={nodes.Alpaca_2.geometry}
              material={materials.Main}
              skeleton={nodes.Alpaca_2.skeleton}
            />
            <skinnedMesh
              name='Alpaca_3'
              geometry={nodes.Alpaca_3.geometry}
              material={materials.Main_Dark}
              skeleton={nodes.Alpaca_3.skeleton}
            />
            <skinnedMesh
              name='Alpaca_4'
              geometry={nodes.Alpaca_4.geometry}
              material={materials.Muzzle}
              skeleton={nodes.Alpaca_4.skeleton}
            />
            <skinnedMesh
              name='Alpaca_5'
              geometry={nodes.Alpaca_5.geometry}
              material={materials.Hooves}
              skeleton={nodes.Alpaca_5.skeleton}
            />
            <skinnedMesh
              name='Alpaca_6'
              geometry={nodes.Alpaca_6.geometry}
              material={materials.Eyes_Black}
              skeleton={nodes.Alpaca_6.skeleton}
            />
            <skinnedMesh
              name='Alpaca_7'
              geometry={nodes.Alpaca_7.geometry}
              material={materials.Eyes_White}
              skeleton={nodes.Alpaca_7.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/models/Alpaca.glb');
