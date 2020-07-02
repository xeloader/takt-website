import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import STLDom from './OutlineViewDom'
import merge from 'deepmerge'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

import { Switch, Route, NavLink } from 'react-router-dom'

const { fetch } = window

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

const Info = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  border-top: 2px solid lightgray;
  padding: 0.5rem;
  box-sizing: border-box;
  display: flex;
`

const CompatibleStamp = styled.span`
  cursor: help;
  font-style: super;
  font-size: smaller;
  color: lightgray;
`

const TopRight = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`

const Right = styled.div`
  flex: 1;
  text-align: right;
`
const Left = styled.div`
  flex: 2;
`
const GridItem = styled.div`
  position: relative;
  border: 2px solid ${props => props.borderColor || 'lightgray'};
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

const BGImage = styled.figure`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  margin: 0;
`

const ExtLink = ({ children, ...props }) => <a target='_blank' rel='noopener noreferrer' {...props}>{children}</a>

const API_ENDPOINT = 'https://api.github.com/repos/xeloader/takt-models/contents'
const RAW_ENDPOINT = 'https://raw.githubusercontent.com/xeloader/takt-models/master'

const getContent = (path) => new Promise((resolve, reject) => {
  fetch(`${RAW_ENDPOINT}${path}`)
    .then((res) => res.json())
    .then(resolve)
    .catch(reject)
})
const getPartsMeta = () => getContent('/meta/parts.json')
const getKitsMeta = () => getContent('/meta/kits.json')

const getPartsList = () => new Promise((resolve, reject) => {
  fetch(`${API_ENDPOINT}/`)
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
  const [kits, setKits] = useState({})
  const [parts, setParts] = useState([]) // every part as object
  useEffect(() => {
    // merge parts and meta
    if (partList.length > 0 && partMeta.default) {
      const defaultMeta = partMeta.default
      const parts = partList
        .reduce((acc, part) => {
          const meta = merge(
            defaultMeta,
            partMeta[part.name]
          ) // merge meta data
          return {
            ...acc,
            [part.name]: {
              ...meta,
              src: part.download_url
            }
          }
        }, {})
      setParts(parts)
    }
  }, [partList, partMeta])
  useEffect(() => {
    getPartsMeta().then(setPartMeta)
    getPartsList().then(setPartList)
    getKitsMeta().then((kits) => {
      const formatted = Object.keys(kits)
        .reduce((acc, key) => {
          const kit = kits[key]
          const preview = `${RAW_ENDPOINT}/${kit.preview}`
          return {
            ...acc,
            [key]: {
              ...kit,
              preview
            }
          }
        }, {})
      setKits(formatted)
    })
  }, [])
  const genManual = (kit) => {
    return `
${kit.name}
${kit.description}

[PRINT INSTRUCTIONS]
${Object.keys(kit.parts)
  .reduce((acc, cur) => {
    const part = kit.parts[cur]
    return `${acc}${cur}: ${part.quantity}pcs \n`
  }, '')}
`
  }
  const downloadKit = (kitId) => {
    const zip = new JSZip()
    const kit = kits[kitId]
    const { parts: kitParts } = kit
    const files = zip.folder('files')
    zip.file('instructions.txt', genManual(kit))
    const requestedParts = Object.keys(kitParts)
      .map((partId) => {
        const part = parts[partId]
        return {
          ...part,
          id: partId
        }
      })
      .filter((part) => part.src != null) // remove parts that doesnt exist in the github repo yet
    Promise.all( // download all model files parallel
      requestedParts.map((part) => {
        return fetch(part.src) // download model file
          .then((response) => response.blob())
          .then((blob) => {
            files.file(part.id, blob) // add file to zip
          })
      }))
      .then(() => {
        zip.generateAsync({ type: 'blob' }) // generate zip file
          .then((blob) => saveAs(blob, `${kitId}.zip`))
      })
  }
  const handleDownload = (kitId) => (e) => {
    downloadKit(kitId)
  }
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
        <P>The blocks are compatible with the <ExtLink href='https://teenage.engineering/designs/frekvens'>FREKVENS</ExtLink> collection from <ExtLink href='https://about.ikea.com/'>IKEA</ExtLink> and <ExtLink href='https://teenage.engineering'>Teenage Engineering</ExtLink>.</P>
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
          </NavList>
        </nav>
      </MaxWidth>
      <Switch>
        <Route path='/kits'>
          <Grid>
            {Object.keys(kits)
              .map((key) => {
                const kit = kits[key]
                return (
                  <GridItem key={key} onClick={handleDownload(key)}>
                    <BGImage src={kit.preview} />
                  </GridItem>
                )
              })}
          </Grid>
        </Route>
        <Route>
          <Grid>
            {Object.keys(parts)
              .map((key) => {
                const part = parts[key]
                const { frekvens, takt } = part.compatibility
                const compatible = (frekvens ? 'F' : '') + (takt ? 'T' : '')
                const compatibleTitle = frekvens && takt
                  ? 'Compatible with Frekvens and TAKT'
                  : (takt)
                    ? 'Only compatible with TAKT'
                    : (frekvens)
                      ? 'Only compatible with Frekvens'
                      : 'Not compatible'
                const { viewer, ...props } = part
                return (
                  <GridItem key={props.src}>
                    <STLDom viewProps={viewer} {...props} />
                    <TopRight>
                      <CompatibleStamp title={compatibleTitle}>{compatible}</CompatibleStamp>
                    </TopRight>
                    <Info>
                      <Left>{part.name || key}</Left>
                      <Right><ExtLink href={part.src}>download</ExtLink></Right>
                    </Info>
                  </GridItem>
                )
              })}
          </Grid>
        </Route>
      </Switch>
    </AppWrapper>
  )
}

export default App
