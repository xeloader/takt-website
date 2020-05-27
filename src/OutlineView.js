import React, { useState, useEffect, useRef } from 'react'
import { useLoader, Canvas, useFrame, extend } from 'react-three-fiber'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
import { Geometry } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
extend({ OrbitControls, OutlinePass })

// <mesh geometry={stl} castShadow receiveShadow>
//       <meshPhongMaterial color='hotpink' specular={0x111111} shininess={200} attach='material' />
//     </mesh>

const Outline = (props) => {
  const object = useLoader(GLTFLoader, props.src, (loader) => {
    console.log(loader)
    loader.manager.onError = () => {
      console.log('errror')
    }
    loader.manager.onLoad = () => {
      console.log('loading...')
    }
  })
  return (
    <mesh>
      <meshBasicMaterial color='hotpink' attach='material' />
      <coneGeometry attach='geometry' />
    </mesh>
  )
}

/* <mesh ref={mesh} castShadow receiveShadow>
    <coneGeometry fromBufferGeometry={bufferGeometry} attach='geometry' />
    <meshBasicMaterial color='pink' attach='material' />
  </mesh> */

export default Outline
