
import './index.css'

import ReactDOM from 'react-dom'
import React, { useRef, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame, useLoader, addEffect, useThree, extend, useRender } from 'react-three-fiber'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { Geometry, BackSide, Vector2, EdgesGeometry } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls, AsciiEffect, OutlinePass, EffectComposer, RenderPass, GlitchPass, FilmPass })

const Controls = props => {
  const { camera } = useThree()
  const controls = useRef()
  useFrame(() => controls.current && controls.current.update())
  return <orbitControls ref={controls} args={[camera]} {...props} />
}

function Scene (props) {
  const renderer = useThree()
  const { gl, camera, size, scene } = renderer
  const composer = useRef()
  useEffect(() => composer.current.setSize(size.width, size.height), [size])
  useFrame((renderer) => {
    composer.current.render()
  }, 1)
  const outline = useRef()
  console.log(size)
  return (
    <>
      <scene>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <effectComposer ref={composer} args={[gl]}>
          <renderPass attachArray='passes' args={[scene, camera]} />
          {/* <asciiEffect attachArray='passes' args={[gl]} /> */}
          {/* <glitchPass attachArray='passes' args={[gl]} /> */}
          {/* <filmPass attachArray='passes' args={[gl]} /> */}
          {/* <outlinePass
            attachArray='passes'
            edgeStrenth={1.0}
            edgeGlow={0.0}
            ref={outline}
            edgeThickness={1.0}
            visibleEdgeColor='black'
            hiddenEdgeColor='black'
            pulsePeriod={0}
            rotate={false}
            usePatternTexture={false}
            args={[new Vector2(size.width, size.height), scene, camera, []]}
            renderToScreen
          /> */}
        </effectComposer>
        <Suspense fallback={<mesh><boxGeometry attach='geometry' /><meshBasicMaterial color='hotpink' attach='material' /></mesh>}>
          <Box position={[0, 0, 0]} outline={outline} />
        </Suspense>
      </scene>
    </>
  )
}

function Outline (props) {
  const { children, ...rest } = props
  const [clone, setClone] = useState()
  useEffect(() => {
    if (children.ref.current && !clone) {
      console.log('setting')
      setClone(children.ref.current.clone())
    }
  }, [children, clone])
  return (
    <group {...rest}>
      {children}
      {React.cloneElement(children, {}, [
        <meshPhongMaterial key={1} attach='material' color='black' side={BackSide} />
      ])}
    </group>
  )
}

function Box (props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  const { outline } = props

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  const [edges, setEdges] = useState()

  const gltf = useLoader(STLLoader, '/assets/takt/models/hinge-center.stl')
  const [geometry, setGeometry] = useState()
  useEffect(() => {
    if (!geometry) return
    // const { current } = outline
    // console.log('settings selected objects')
    // console.log(current, geometry, outline)
    // current.selectedObjects.push(mesh.current)
  }, [geometry])
  useEffect(() => {
    setGeometry(new Geometry().fromBufferGeometry(gltf))
    const edges = new EdgesGeometry(gltf, 10)
    console.log('setting edges', edges)
    setEdges(edges)
  }, [gltf])
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    groupRef.current.rotation.x = groupRef.current.rotation.y += 0.01
    // console.log(mesh.current.parent.children)
  })

  const groupRef = useRef()

  return (
    <group ref={groupRef}>
      {edges && (
        <lineSegments
          geometry={edges}
          scale={active ? [0.2, 0.2, 0.2] : [0.1, 0.1, 0.1]}
        >
          <lineBasicMaterial color='black' attach='material' linewidth={1} />
        </lineSegments>
      )}
      <mesh
        {...props}
        ref={mesh}
        geometry={geometry}
        scale={active ? [0.2, 0.2, 0.2] : [0.1, 0.1, 0.1]}
        onClick={(e) => setActive(!active)}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
      >
        <meshPhongMaterial color={hovered ? 'lightgray' : 'white'} attach='material' />
      </mesh>
    </group>
  )
}

ReactDOM.render(
  <Canvas>
    <Scene />
  </Canvas>,
  document.getElementById('root')
)
