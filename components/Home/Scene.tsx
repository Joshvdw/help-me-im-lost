import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import {
  Float,
  Circle,
  MeshReflectorMaterial,
  Icosahedron,
  Box,
  Plane,
  OrbitControls,
  useHelper
} from "@react-three/drei";
import { useMousePosition } from "../singleComponents/Hooks/useMousePosition";
import { useFrame, useThree } from "@react-three/fiber";
import useStore from "../singleComponents/Hooks/useStore";
import { useTimeline } from "../singleComponents/Hooks/useTimeLine";
import * as THREE from 'three'
import { map_range } from "../singleComponents/Utils/Utils";
import { Charles } from '../canvasComponents/Charles'
import { Tree } from '../canvasComponents/Tree_1'

const vector = new THREE.Vector3();
const pos = new THREE.Vector3();
const camPos = new THREE.Vector3();

export default function ExampleScene(props: {
  setReveal: Dispatch<SetStateAction<boolean>>;
}) {
  // let meshRef = useRef<THREE.Mesh>();
  const { viewport } = useThree();
  const mouse = useMousePosition();

  //Importing global scroll function
  const scroll = useStore((state) => state.scroll);
  const GPUTier = useStore((state) => state.GPUTier);

  //Keyframes for scroll based animations
  const keyframes = {
    rotation: [
      { time: 0, val: 0 },
      { time: 500, val: -100, easing: "easeInSine" },
      { time: 1000, val: 100, easing: "easeInSine" },
    ],
  };

  const remapKeyframes = {
    frame: [
      { time: 0, val: 0 },
      { time: 1000, val: 1000, easing: "linear" },
    ],
  };

  const [timeline, axes] = useTimeline(keyframes);
  const [timeRemap, timeAxe] = useTimeline(remapKeyframes);

  const lightRef = useRef<THREE.SpotLight>(null!)

  // useHelper(lightRef, THREE.SpotLightHelper, 'red')
  
  const vec = new THREE.Vector3()

  useFrame((state) => {
    // gets mouse position accurately, in relation to the camera position 
    vector.set(mouse.current.x, mouse.current.y, 0);
    vector.unproject(state.camera); // unproject gets the camera position in relations to your device
    state.camera.getWorldPosition(camPos); //  copy camera's position in the scene into the camPos vector
    var dir = vector.sub(camPos).normalize(); 
    const distance = -camPos.z / dir.z;
    pos
      .copy(camPos)
      .add(
        dir.multiplyScalar(distance + map_range(mouse.current.x, -1, 1, -1, -3))
      );

      lightRef.current.position.lerp(pos, 0.1)
      lightRef.current.target.position.lerp(vec.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0), 0.1)
      lightRef.current.target.updateMatrixWorld()      

      // scrubbing through the keyframes using the interpolated scroll value
    if (scroll?.animation.changed) {
      const y = scroll.get()[0];
      // @ts-ignore
      timeRemap.seek(timeRemap.duration * y);
      // @ts-ignore
      timeline.seek(timeAxe.current.frame);
      // @ts-ignore
      // meshRef.current?.rotateY(axes.current.rotation / 1500);
    }
  });

  useEffect(() => {
    props.setReveal(true);
  }, []);
  return (
    <>
    {/* <Plane scale={10}><meshStandardMaterial /></Plane> */}
      <spotLight 
        castShadow 
        intensity={3} 
        penumbra={1} 
        ref={lightRef} 
      />
      <Charles />
      <Tree />
      <OrbitControls />
      {/* <ambientLight /> */}
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
