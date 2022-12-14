/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Box001: THREE.Mesh
    Sphere001: THREE.Mesh
    Sphere002: THREE.Mesh
  }
  materials: {
    ['03 - Default']: THREE.MeshStandardMaterial
    ['02 - Default']: THREE.MeshStandardMaterial
  }
}

export function Teddy(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/glbs/Teddy.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group position={[-0.8, 0.34, -2.3]} rotation={[0, -0.48, 0]} scale={0.01}>
        <mesh geometry={nodes.Box001.geometry} material={materials['03 - Default']} position={[-5.59, -34.24, 1.74]} rotation={[-Math.PI, 1.56, -Math.PI]} />
        <mesh geometry={nodes.Sphere001.geometry} material={materials['02 - Default']} position={[3.48, 18.94, -8.27]} rotation={[1.58, -0.35, -1.85]} />
        <mesh geometry={nodes.Sphere002.geometry} material={materials['02 - Default']} position={[2.81, 20.87, 7.9]} rotation={[1.64, 0.22, -1.35]} />
      </group>
    </group>
  )
}

useGLTF.preload('/glbs/Teddy.glb')
