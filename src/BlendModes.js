import React from 'react'
import styled from 'styled-components'

export const Fill = styled.div`
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: ${props => props.width || '100%'};
    height: ${props => props.height || '100%'};
    background-color: ${props => props.color};
    transition: opacity 0.1s ease-out;
    opacity: ${props => props.opacity || 1.0};
    &:hover {
        opacity: 0;
    }
`

export const Group = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: ${props => props.width || '100%'};
    height: ${props => props.height || '100%'};
    &:hover > ${Fill} {
        opacity: 0;
    }
`

export const Overlay = styled(Fill)`
    mix-blend-mode: overlay;
`
export const Color = styled(Fill)`
    mix-blend-mode: color;
`
export const Hue = styled(Fill)`
    mix-blend-mode: hue;
`
