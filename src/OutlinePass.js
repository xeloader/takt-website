import React, { useRef } from 'react'
import { Vector2 } from 'three'
import { useThree } from 'react-three-fiber'

// current.selectedObjects.push(mesh.current)
/// Set above in the mesh

function OutlinePassConfig () {
  const { size, scene, camera } = useThree()
  const outline = useRef()
  return <outlinePass
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
  />
}

export default OutlinePassConfig
