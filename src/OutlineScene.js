import React, { useRef, Suspense, useEffect } from 'react'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { useFrame, useThree, extend } from 'react-three-fiber'
import OutlineView from './OutlineView'

extend({ EffectComposer, RenderPass })

function Scene (props) {
  const composer = useRef()
  const renderer = useThree()
  const { viewProps, src } = props
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
          <OutlineView scale={scale} src={src} {...viewProps} />
        </Suspense>
      </scene>
    </>
  )
}

export default Scene
