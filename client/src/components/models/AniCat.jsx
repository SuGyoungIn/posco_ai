/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/models/CatWalk.glb -o src/components/AniCat.jsx -r public 
Author: LostBoyz2078 (https://sketchfab.com/LostModels2025)
License: CC-BY-NC-4.0 (http://creativecommons.org/licenses/by-nc/4.0/)
Source: https://sketchfab.com/3d-models/cat-walk-915680200c064815bba75e008ba9efb5
Title: Cat Walk
*/

import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useGraph } from '@react-three/fiber';
import { useGLTF, useAnimations, Text } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

export default function AniCat(props) {
  const group = useRef();
  const { scene, materials, animations } = useGLTF('/models/CatWalk.glb');
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
      <group name='Sketchfab_Scene'>
        <group name='Sketchfab_model' rotation={[-Math.PI / 2, 0, 0]}>
          <group name='root'>
            <group name='GLTF_SceneRootNode' rotation={[Math.PI / 2, 0, 0]}>
              <group name='GLTF_created_0'>
                <primitive object={nodes.GLTF_created_0_rootJoint} />
                <group name='0000_pet_s_4cat_Black_60'>
                  <group name='0000_pet_s_4cat_Black_61' />
                </group>
                <group name='0001_pet_s_4cat_Black_62'>
                  <group name='0001_pet_s_4cat_Black_63' />
                </group>
                <group name='0002_pet_s_4cat_Black_64'>
                  <group name='0002_pet_s_4cat_Black_65' />
                </group>
                <group name='0003_pet_s_4cat_Black_66'>
                  <group name='0003_pet_s_4cat_Black_67' />
                </group>
                <skinnedMesh
                  name='Object_7'
                  geometry={nodes.Object_7.geometry}
                  material={materials.pet_s_4cat_Black_mat}
                  skeleton={nodes.Object_7.skeleton}
                />
                <skinnedMesh
                  name='Object_10'
                  geometry={nodes.Object_10.geometry}
                  material={materials.pet_s_4cat_Black_mat}
                  skeleton={nodes.Object_10.skeleton}
                />
                <skinnedMesh
                  name='Object_13'
                  geometry={nodes.Object_13.geometry}
                  material={materials.pet_s_4cat_Black_mat}
                  skeleton={nodes.Object_13.skeleton}
                />
                <skinnedMesh
                  name='Object_16'
                  geometry={nodes.Object_16.geometry}
                  material={materials.pet_s_4cat_Blackeye_mat}
                  skeleton={nodes.Object_16.skeleton}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/models/CatWalk.glb');
