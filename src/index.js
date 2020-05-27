
import './index.css'

import ReactDOM from 'react-dom'
import React, { useRef, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import { Geometry } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

function Box (props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  const gltf = useLoader(STLLoader, '/assets/takt/models/hinge-center.stl')
  const [geometry, setGeometry] = useState()
  useEffect(() => {
    setGeometry(new Geometry().fromBufferGeometry(gltf))
  }, [gltf])
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    // console.log(mesh.current.parent.children)
  })

  return (
    <mesh
      {...props}
      geometry={geometry}
      scale={active ? [0.2, 0.2, 0.2] : [0.1, 0.1, 0.1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
      ref={mesh}
      receiveShadow
    >
      <meshPhongMaterial color='hotpink' attach='material' />
    </mesh>
    // <primitive
    //   object={gltf}
    //   {...props}
    //   ref={mesh}
    //   scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
    //   onClick={(e) => setActive(!active)}
    //   onPointerOver={(e) => setHover(true)}
    //   onPointerOut={(e) => setHover(false)}
    // />
  )
}

ReactDOM.render(
  <Canvas>
    <camera shadowCameraVisible attach='camera' />
    <ambientLight castShadow />
    <pointLight position={[10, 10, 10]} castShadow />
    <Suspense fallback={<mesh><boxGeometry attach='geometry' /><meshBasicMaterial color='hotpink' attach='material' /></mesh>}>
      <Box position={[0, 0, 0]} />
    </Suspense>
  </Canvas>,
  document.getElementById('root')
)
