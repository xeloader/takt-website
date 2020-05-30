import React from 'react'
import styled from 'styled-components'
import STLDom from './OutlineViewDom'

const AppWrapper = styled.div`
width: inherit;
height: inherit;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`

const GridItem = styled.div`
  border: 2px solid black;
  height: 25vh;
  width: 25vh;
`

function App () {
  return (
    <AppWrapper>
      <aside>
        <nav>
          <ul>
            <li>
              <a href=''>source code</a>
            </li>
            <li>
              <a href=''>buy me a coffee</a>
            </li>
            <li>
              <a href=''>my portfolio</a>
            </li>
          </ul>
        </nav>
      </aside>
      <h1>TAKT</h1>
      <p>Boxes that are modular and designed for 3D printing with sustainability in mind. The fragile parts are small and replaceable for waste reduction if something breaks.</p>
      <p>The boxes are compatible with the <a href='#'>FREKVENS</a> collection from <a href='#'>IKEA</a> and <a href='#'>Teenage Engineering</a>.</p>
      <ul>
        <li>3D printable without support</li>
        <li>Modular and connectable to each other</li>
        <li>Sustainable design. Fragile parts are small and printed separately.</li>
      </ul>

      <nav>
        <ul>
          <li>
            <a href=''>kits</a>
          </li>
          <li>
            <a href=''>pieces</a>
          </li>
          <li>
            <a href=''>photos</a>
          </li>
        </ul>
      </nav>
      <Grid>
        <GridItem>
          <STLDom src='/assets/takt/models/hinge.stl' />
        </GridItem>
        <GridItem>
          <STLDom src='/assets/takt/models/hinge.stl' />
        </GridItem>
        <GridItem>
          <STLDom src='/assets/takt/models/hinge.stl' />
        </GridItem>
      </Grid>
    </AppWrapper>
  )
}

export default App
