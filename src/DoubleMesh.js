import React, { useEffect, useState } from 'react'

function Outline (props) {
  const { children, ...rest } = props
  const [clone, setClone] = useState()
  useEffect(() => {
    if (children.ref.current && !clone) {
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

export default Outline
