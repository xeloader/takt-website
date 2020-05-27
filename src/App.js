import React, { Suspense, useRef } from 'react'
import styled from 'styled-components'
import OutlineView from './OutlineView'
import { Canvas, useFrame } from 'react-three-fiber'

const AppWrapper = styled.div`
width: inherit;
height: inherit;
`

const Box = (props) => (
  <mesh>
    <meshBasicMaterial color={props.color || 'hotpink'} attach='material' />
    <boxGeometry attach='geometry' args={Array.from(Array(6)).map(() => props.size)} />
  </mesh>
)

function App () {
  const canvas = useRef()
  useFrame(() => {
    console.log('1')
  })
  return (
    <AppWrapper>
      <Canvas ref={canvas}>
        <Suspense fallback={<Box size={1} color='pink' />}>
          <OutlineView src='/assets/takt/models/hinge.gltf' />
        </Suspense>
        <ambientLight castShadow />
        <pointLight position={[10, 10, 10]} castShadow />
      </Canvas>
    </AppWrapper>
  )
}

export default App
