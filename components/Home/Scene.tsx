import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  Float,
  Circle,
  MeshReflectorMaterial,
  Icosahedron,
  Box,
  Plane,
  OrbitControls,
  useHelper,
  Stats,
  Environment,
  useTexture
} from "@react-three/drei";
import { useMousePosition } from "../singleComponents/Hooks/useMousePosition";
import { useFrame, useThree } from "@react-three/fiber";
import useStore from "../singleComponents/Hooks/useStore";
import { useTimeline } from "../singleComponents/Hooks/useTimeLine";
import * as THREE from 'three'
import { map_range } from "../singleComponents/Utils/Utils";
import { Charles } from '../canvasComponents/Charles'
import { Tree } from '../canvasComponents/Tree_1'
import { Barrel } from "../canvasComponents/Barrel";
import { Branches } from "../canvasComponents/Branches";
import { Compost_Bags } from "../canvasComponents/Compost_Bags";
import { House } from "../canvasComponents/House";
import { Lantern } from "../canvasComponents/Lantern";
import { Oil_Can } from "../canvasComponents/Oil_Can";
import { Rocks } from "../canvasComponents/Rocks";
import { Rocks_2 } from "../canvasComponents/Rocks_2";
import { SpiderRock } from "../canvasComponents/SpiderRock";
import { Teddy } from "../canvasComponents/Teddy";
import { AxesHelper } from "three";

const vector = new THREE.Vector3();
const pos = new THREE.Vector3();
const camPos = new THREE.Vector3();

export default function ExampleScene(props: {
  setReveal: Dispatch<SetStateAction<boolean>>;
}) {
  // let meshRef = useRef<THREE.Mesh>();
  const { viewport } = useThree();
  const mouse = useMousePosition();

  const lightRef = useRef<THREE.SpotLight>(null!)
  // useHelper(lightRef, THREE.SpotLightHelper, 'red')
  
  const vec = new THREE.Vector3()

  useFrame((state) => {
    // gets mouse position accurately, in relation to the camera position 
    vector.set(mouse.current.x, mouse.current.y, 0);
    vector.unproject(state.camera); // unproject gets the camera position in relations to your device
    state.camera.getWorldPosition(camPos); //  copy camera's position in the scene into the camPos vector
    let dir = vector.sub(camPos).normalize(); 
    const distance = -camPos.z / dir.z;
    pos
      .copy(camPos)
      .add(
        dir.multiplyScalar(distance + map_range(mouse.current.x, -1, 1, -1, -3))
      );

      lightRef.current.position.lerp(pos, 0.1)
      lightRef.current.target.position.lerp(vec.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0), 0.1)
      lightRef.current.target.updateMatrixWorld()      
  });

  useEffect(() => {
    props.setReveal(true);
  }, []);

  const [renderState, setrenderState] = useState(false)

  setTimeout(() => {
    setrenderState(true)
  }, 7500);

  const CharlesComponent = () => {
    return renderState ? <Charles /> : <></>
  }

  const terrain = useTexture({
    map: '/textures/forest_leaves_03_diff_1k.jpg',
    displacementMap: '/textures/forest_leaves_03_disp_1k.png',
    aoMap: "/textures/forest_leaves_03_ao_1k.jpg",
    roughnessMap: "/textures/forest_leaves_03_ao_1k.jpg",
    metalnessMap: "/textures/forest_leaves_03_ao_1k.jpg",
    normalMap: "/textures/forest_leaves_03_nor_gl_1k.jpg"
    })

  return (
    <>
    {/* DEVELOPMENT */}
    {/* <OrbitControls /> */}
    {/* <axesHelper/> */}
    {/* <ambientLight intensity={5} /> */}
    {/* <Stats /> */}

      <spotLight 
        castShadow 
        intensity={4} 
        penumbra={1} 
        ref={lightRef} 
        // distance={50}

        // decay={18}
      />
      
      <CharlesComponent />
      <group position={[0,-1.45,0]}>
        <Plane 
          args={[20,30]}
          position={[0,-2.7,0]}
          // scale={10}
          rotation-x={-Math.PI / 2}
        >
          <meshStandardMaterial 
            side={THREE.DoubleSide} 
            {...terrain}  
            
            normalMap-encoding={THREE.LinearEncoding}
          />
        </Plane>
        <Tree />
        <Barrel />
        {/* <Branches /> */}
        <Compost_Bags />
        {/* <House /> */}
        <Lantern position={[2,2,2]}/>
        {/* <Oil_Can /> */}
        {/* <Rocks /> */}
        {/* <Rocks_2 /> */}
        {/* <SpiderRock /> */}
        {/* <Teddy /> */}
      </group>

      {/* <Circle
        args={[12.75, 36, 36]}
        rotation-x={-Math.PI / 2}
        position={[1, -1.7, 0]}
      >
        <MeshReflectorMaterial
          resolution={1024}
          blur={[400, 50]}
          mirror={2}
          mixBlur={0.75}
          mixStrength={10}
          transparent
          opacity={0.5}
          color="#555"
          metalness={4}
          roughness={1}
        />
      </Circle>

      <Float floatIntensity={3}>
        <Icosahedron
          args={[1.5]}
          castShadow={true}
          ref={meshRef}
          onClick={() => {
            console.log(mouse);
          }}
        >
          <MeshReflectorMaterial
            resolution={1024}
            blur={[400, 50]}
            mirror={0}
            mixBlur={0.75}
            mixStrength={10}
            transparent
            opacity={1}
            color="orange"
            metalness={2}
            roughness={1}
          />
        </Icosahedron>
      </Float> */}
      {/* <pointLight position={[10, 10, 10]} power={800} /> */}
    </>
  );
}
