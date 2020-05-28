
import './index.css'

import ReactDOM from 'react-dom'
import React, { useRef, Suspense, useEffect } from 'react'
import { Canvas, useFrame, useThree, extend } from 'react-three-fiber'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'

import OutlineView from './OutlineView'

extend({ EffectComposer, RenderPass })

function Scene (props) {
  const renderer = useThree()
  const composer = useRef()
  const { gl, camera, size, scene } = renderer
  useEffect(() => composer.current.setSize(size.width, size.height), [size])
  // hijack render loop
  useFrame((_) => {
    composer.current.render()
  }, 1)
  const scale = 0.2
  return (
    <>
      <scene>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <effectComposer ref={composer} args={[gl]}>
          <renderPass attachArray='passes' args={[scene, camera]} />
        </effectComposer>
        <Suspense fallback={<mesh><boxGeometry attach='geometry' /><meshBasicMaterial color='hotpink' attach='material' /></mesh>}>
          <OutlineView scale={scale} src='/assets/takt/models/hinge.stl' />
          <OutlineView scale={scale} color='#F0F0F0' src='/assets/takt/models/screw.stl' />
          <OutlineView scale={scale} src='/assets/takt/models/nut.stl' />
        </Suspense>
      </scene>
    </>
  )
}

ReactDOM.render(
  <Canvas>
    <Scene />
  </Canvas>,
  document.getElementById('root')
)
