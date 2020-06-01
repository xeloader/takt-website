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

const SideNavList = styled.ul`
  list-style: none;
  text-align: right;
  line-height: 150%;
`

const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem 1rem 1rem;
  text-align: center;
  & > li {
    display: inline-block;
    flex: 1;
    padding: 1rem;
    &.selected {
      border: 2px solid blue;
    }
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

const ExtLink = ({ children, ...props }) => <a target='_blank' rel='noopener noreferrer' {...props}>{children}</a>

function App () {
  return (
    <AppWrapper>
      <Side>
        <nav>
          <SideNavList>
            <li>
              <ExtLink href='https://github.com/search?q=topic%3Atakt+user%3Axeloader'>source code</ExtLink>
            </li>
            <li>
              <ExtLink href='https://www.buymeacoffee.com/xeloader'>buy me a coffee</ExtLink>
            </li>
            <li>
              <ExtLink href='https://ingman.me'>my portfolio</ExtLink>
            </li>
          </SideNavList>
        </nav>
      </Side>
      <MaxWidth maxWidth='512px'>
        <Title>TAKT</Title>
        <P>Building blocks that are modular and designed for 3D printing with sustainability in mind. The fragile parts are small and replaceable for waste reduction if something breaks.</P>
        <P>The boxes are compatible with the <ExtLink href='https://teenage.engineering/designs/frekvens'>FREKVENS</ExtLink> collection from <ExtLink href='https://about.ikea.com/'>IKEA</ExtLink> and <ExtLink href='https://teenage.engineering'>Teenage Engineering</ExtLink>.</P>
        <LineList>
          <li>3D printable without support</li>
          <li>Modular and connectable to each other</li>
          <li>Sustainable design. Fragile parts are small and printed separately.</li>
        </LineList>

        <nav>
          <NavList>
            <li>
              <a href=''>kits</a>
            </li>
            <li className='selected'>
              <a href=''>pieces</a>
            </li>
            <li>
              <a href=''>photos</a>
            </li>
          </NavList>
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
