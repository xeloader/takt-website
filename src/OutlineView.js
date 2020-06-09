import React, { useRef, useState, useEffect } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { Geometry, EdgesGeometry } from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

function OutlineView (props) {
  const {
    src,
    scale: userScale = 1,
    angle = 10,
    color = 'lightgray',
    ...rest
  } = props
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  const [edges, setEdges] = useState()

  const gltf = useLoader(STLLoader, src)
  const [geometry, setGeometry] = useState()
  const [measurements, setMeasurements] = useState([])

  useEffect(() => {
    setGeometry(new Geometry().fromBufferGeometry(gltf))
    const edges = new EdgesGeometry(gltf, angle)
    setEdges(edges)
  }, [gltf])
  useEffect(() => {
    if (!geometry) return
    geometry.computeBoundingBox()
    const bbox = geometry.boundingBox
    const measurements = Object.keys(bbox.max)
      .map((direction) => {
        const max = bbox.max[direction]
        const min = bbox.min[direction]
        const length = Math.max(min, max) - Math.min(min, max)
        return length
      })
    setMeasurements(measurements)
    console.log(measurements)
  }, [geometry])
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    groupRef.current.rotation.x = groupRef.current.rotation.y += 0.01
    // console.log(mesh.current.parent.children)
  })

  const groupRef = useRef()
  const scale = active
    ? [userScale * 2, userScale * 2, userScale * 2]
    : [userScale, userScale, userScale]
  const position = [0, 0, 0]
  return (
    <group position={position} {...rest} ref={groupRef}>
      {edges && (
        <lineSegments
          geometry={edges}
          scale={scale}
        >
          <lineBasicMaterial color='black' attach='material' linewidth={1} />
        </lineSegments>
      )}
      <mesh
        ref={mesh}
        geometry={geometry}
        scale={scale}
        onClick={(e) => setActive(!active)}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
      >
        <meshPhongMaterial color={color} attach='material' />
      </mesh>
    </group>
  )
}

export default OutlineView
