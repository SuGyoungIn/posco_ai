import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useGraph } from '@react-three/fiber';
import { useGLTF, useAnimations, Text } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';

export default function AniHusky(props) {
  const { scene, materials, animations } = useGLTF('/models/husky.glb');
  const huskyRef = useRef();
  const { actions } = useAnimations(animations, huskyRef);
  const [huskyAni, setHuskyAni] = useState('AnimalArmature|Idle');

  const SPEED = 0.5;
  const position = useMemo(() => props.position, []);

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  useEffect(() => {
    actions[huskyAni].reset().fadeIn(0.32).play();
    return () => actions[huskyAni]?.fadeOut(0.32);
  }, [huskyAni]);

  useFrame(() => {
    if (huskyRef.current.position.distanceTo(props.position) > 0.1) {
      const direction = huskyRef.current.position
        .clone()
        .sub(props.position)
        .normalize()
        .multiplyScalar(SPEED);

      huskyRef.current.position.sub(direction);
      huskyRef.current.lookAt(props.position);
      setHuskyAni('AnimalArmature|Walk');
    } else {
      setHuskyAni('AnimalArmature|Idle');
    }
  });

  return (
    <group
      ref={huskyRef}
      {...props}
      dispose={null}
      scale={5}
      position={position}
    >
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
          <group
            name='Cube'
            position={[0, 0, 0.062]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <skinnedMesh
              name='Cube_1'
              geometry={nodes.Cube_1.geometry}
              material={materials.Material}
              skeleton={nodes.Cube_1.skeleton}
            />
            <skinnedMesh
              name='Cube_2'
              geometry={nodes.Cube_2.geometry}
              material={materials['Material.001']}
              skeleton={nodes.Cube_2.skeleton}
            />
            <skinnedMesh
              name='Cube_3'
              geometry={nodes.Cube_3.geometry}
              material={materials['Material.006']}
              skeleton={nodes.Cube_3.skeleton}
            />
            <skinnedMesh
              name='Cube_4'
              geometry={nodes.Cube_4.geometry}
              material={materials['Material.003']}
              skeleton={nodes.Cube_4.skeleton}
            />
            <skinnedMesh
              name='Cube_5'
              geometry={nodes.Cube_5.geometry}
              material={materials['Material.002']}
              skeleton={nodes.Cube_5.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/models/husky.glb');
