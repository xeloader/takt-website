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
  margin: 0 auto;
  width: 25vh;
`

const LineList = styled.ul`
    list-style: none;
    margin-left: 0;
    padding-left: 1em;
  & > li:before {
    display: inline-block;
    line-height: 200%;
    content: "-";
    width: 1.5em;
    margin-left: -1.5em;
}
`

const Title = styled.h1`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-align: center;
`

const P = styled.p`
text-align: center;
`
const Side = styled.aside`
  position: absolute;
  top: 1rem;
  right: 1rem;

`

const MaxWidth = styled.div`
  margin: 0 auto;
  max-width: ${props => props.maxWidth || '1024px'};
`

function App () {
  return (
    <AppWrapper>
      <Side>
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
      </Side>
      <MaxWidth maxWidth='512px'>
        <Title>TAKT</Title>
        <P>Boxes that are modular and designed for 3D printing with sustainability in mind. The fragile parts are small and replaceable for waste reduction if something breaks.</P>
        <P>The boxes are compatible with the <a href='#'>FREKVENS</a> collection from <a href='#'>IKEA</a> and <a href='#'>Teenage Engineering</a>.</P>
        <LineList>
          <li>3D printable without support</li>
          <li>Modular and connectable to each other</li>
          <li>Sustainable design. Fragile parts are small and printed separately.</li>
        </LineList>

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
      </MaxWidth>
      <Grid>
        <GridItem>
          <STLDom src='/assets/takt/models/hinge.stl' />
        </GridItem>
        <GridItem>
          <STLDom src='/assets/takt/models/nut.stl' />
        </GridItem>
        <GridItem>
          <STLDom src='/assets/takt/models/screw.stl' />
        </GridItem>
        <GridItem>
          <STLDom src='/assets/takt/models/hinge.stl' />
        </GridItem>
      </Grid>
    </AppWrapper>
  )
}

export default App
