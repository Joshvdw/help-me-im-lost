import React, { useRef, useEffect, useState } from 'react'
import { useGLTF, useAnimations, Box, useHelper } from '@react-three/drei'
import { useMousePosition } from "../singleComponents/Hooks/useMousePosition";
import { map_range } from "../singleComponents/Utils/Utils";
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'


export function Charles(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/glbs/Charles.glb')
  const { actions } = useAnimations(animations, group)

  const pointLightRef = useRef()
  // useHelper(lightRef, THREE.PointLightHelper)

  const [playState, setplayState] = useState(false)

  let targetPositionZ = 4
  let targetLightIntensity = 1.2

  function playAnimation() {
    setplayState(true)
  }

  useEffect(()=>{
    if(playState) {
      actions['running'].repetitions = 1
      actions['scare'].repetitions = 1
      actions['running'].clampWhenFinished = true;
      actions['scare'].clampWhenFinished = true;
      actions['running'].play()
      actions['scare'].play();
    }
  },[playState])
  
  useFrame(()=>{
    if (playState) {
      if(group.current.position.z <= targetPositionZ) {
        group.current.position.z += 0.06
      }
      if(pointLightRef.current.intensity <= targetLightIntensity) {          
        pointLightRef.current.intensity += 0.06
      }
      setTimeout(() => {
        if(group.current !== null) {
          if(group.current.position.z <= (targetPositionZ + 5)) {
            group.current.position.z += 0.06
          }
        }
      }, 3000);
    }
  })

  return (
    <>
      <pointLight 
        castShadow 
        intensity={0} 
        penumbra={1} 
        position={[0,-.8,5.1]}
        ref={pointLightRef}
      />
      <group ref={group} {...props} dispose={null} rotation={[0,.05,0]} position={[0,-1.4,1]}>
        <Box args={[1,1.5,1]} position={[0,1,0]} onPointerEnter={playAnimation} visible={false}><meshBasicMaterial/></Box>
        <group name="Scene" >
          <group name="mixamorigMeshes" rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
          <group  name="Charles" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <primitive object={nodes.mixamorigHips} />
            <skinnedMesh frustumCulled={false} name="mixamorigArms_Geo" geometry={nodes.mixamorigArms_Geo.geometry} material={materials.Skin_MAT} skeleton={nodes.mixamorigArms_Geo.skeleton} />
            <skinnedMesh frustumCulled={false}name="mixamorigCigar_Geo" geometry={nodes.mixamorigCigar_Geo.geometry} material={materials.Cigar_Mat} skeleton={nodes.mixamorigCigar_Geo.skeleton} />
            <skinnedMesh frustumCulled={false} name="mixamorigHat_Geo" geometry={nodes.mixamorigHat_Geo.geometry} material={materials['Clothes_MAT.001']} skeleton={nodes.mixamorigHat_Geo.skeleton} />
            <skinnedMesh frustumCulled={false} name="mixamorigHead_Geo" geometry={nodes.mixamorigHead_Geo.geometry} material={materials.Skin_MAT} skeleton={nodes.mixamorigHead_Geo.skeleton} />
            <skinnedMesh frustumCulled={false} name="mixamorigJacket_Geo" geometry={nodes.mixamorigJacket_Geo.geometry} material={materials.Clothes_MAT} skeleton={nodes.mixamorigJacket_Geo.skeleton} />
            <skinnedMesh frustumCulled={false} name="mixamorigL_Eye_Geo" geometry={nodes.mixamorigL_Eye_Geo.geometry} material={materials['Eyes_MAT.001']} skeleton={nodes.mixamorigL_Eye_Geo.skeleton} />
            <skinnedMesh frustumCulled={false} name="mixamorigPants_Geo" geometry={nodes.mixamorigPants_Geo.geometry} material={materials['Clothes_MAT.001']} skeleton={nodes.mixamorigPants_Geo.skeleton} />
            <skinnedMesh frustumCulled={false} name="mixamorigR_Eye_Geo" geometry={nodes.mixamorigR_Eye_Geo.geometry} material={materials.Eyes_MAT} skeleton={nodes.mixamorigR_Eye_Geo.skeleton} />
            <skinnedMesh frustumCulled={false} name="mixamorigShoes_Geo" geometry={nodes.mixamorigShoes_Geo.geometry} material={materials['Clothes_MAT.001']} skeleton={nodes.mixamorigShoes_Geo.skeleton} />
            <skinnedMesh frustumCulled={false} name="mixamorigTeeth_Down_Geo" geometry={nodes.mixamorigTeeth_Down_Geo.geometry} material={materials.Skin_MAT} skeleton={nodes.mixamorigTeeth_Down_Geo.skeleton} />
            <skinnedMesh frustumCulled={false} name="mixamorigTeeth_Up_Geo" geometry={nodes.mixamorigTeeth_Up_Geo.geometry} material={materials.Skin_MAT} skeleton={nodes.mixamorigTeeth_Up_Geo.skeleton} />
          </group>
        </group>
      </group>
    </>
  )
}

useGLTF.preload('/glbs/Charles.glb')
