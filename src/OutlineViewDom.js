import React from 'react'
import { Canvas } from 'react-three-fiber'
import STLView from './OutlineScene'

const OutlineViewDom = (props) => {
  const { src, ...rest } = props
  return (
    <Canvas>
      <STLView src={src} {...rest} />
    </Canvas>
  )
}

export default OutlineViewDom
