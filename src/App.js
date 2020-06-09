import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import STLDom from './OutlineViewDom'

import { Switch, Route, NavLink } from 'react-router-dom'

const AppWrapper = styled.div`
width: inherit;
height: inherit;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 1rem;
  column-gap: 1rem;
  width: 80vw;
  margin: 0 auto;
  padding-bottom: 2rem;
`

const GridItem = styled.div`
  border: 2px solid lightgray;
  height: 20vw;
  margin: 0 auto;
  width: 20vw;
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
  }
  .selected {
      border: 2px solid blue;
      padding: 1rem;
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

const API_ENDPOINT = 'https://api.github.com/repos/xeloader/takt-models/contents'
const RAW_ENDPOINT = 'https://raw.githubusercontent.com/xeloader/takt-models/master'

const getPartsMeta = () => new Promise((resolve, reject) => {
  window.fetch(`${RAW_ENDPOINT}/meta/parts.json`)
    .then((res) => res.json())
    .then(resolve)
    .catch(reject)
})

const getPartsList = () => new Promise((resolve, reject) => {
  window.fetch(`${API_ENDPOINT}/`)
    .then((res) => res.json())
    .then((json) => {
      const files = json.filter((item) => item.type !== 'dir') // remove directories
      resolve(files)
    })
    .catch(reject)
})

function App () {
  const [partMeta, setPartMeta] = useState({})
  const [partList, setPartList] = useState([])
  const [parts, setParts] = useState([]) // every part as object
  useEffect(() => {
    console.log(partList, partMeta)
    // merge lists
    if (partList.length > 0 && partMeta.default) {
      const defaultMeta = partMeta.default
      const parts = partList.map((part) => {
        const { name } = part
        const meta = partMeta[name]
        return {
          ...defaultMeta,
          ...meta,
          src: part.download_url
        }
      })
      console.log(parts)
      setParts(parts)
    }
  }, [partList, partMeta])
  useEffect(() => {
    getPartsMeta().then(setPartMeta)
    getPartsList().then(setPartList)
  }, [])
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
              <NavLink activeClassName='selected' to='/kits'>kits</NavLink>
            </li>
            <li>
              <NavLink activeClassName='selected' to='/' exact>parts</NavLink>
            </li>
            <li>
              <NavLink activeClassName='selected' to='/photos'>photos</NavLink>
            </li>
          </NavList>
        </nav>
      </MaxWidth>
      <Switch>
        <Route path='/kits'>
          <p>Kits</p>
        </Route>
        <Route path='/photos'>
          <p>Photos</p>
        </Route>
        <Route>
          <Grid>
            {parts.map(({ viewer, ...props }) => (
              <GridItem key={props.src}>
                <STLDom viewProps={viewer} {...props} />
              </GridItem>
            ))}
          </Grid>
        </Route>
      </Switch>
    </AppWrapper>
  )
}

export default App
