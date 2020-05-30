import React from 'react'
import { Canvas } from 'react-three-fiber'
import STLView from './OutlineScene'

const OutlineViewDom = (props) => {
  const { src } = props
  return (
    <Canvas>
      <STLView src={src} />
    </Canvas>
  )
}

export default OutlineViewDom
