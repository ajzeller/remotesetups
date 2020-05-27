import React from 'react'
import Img from 'gatsby-image'
import {getFluidGatsbyImage, getFixedGatsbyImage} from 'gatsby-source-sanity'
import clientConfig from '../../client-config'
import styled from 'styled-components'
import { FaExternalLinkAlt } from "react-icons/fa";

const Figure = styled.figure`
  margin: 0 0 36px 0;
`

const Caption = styled.figcaption`
  font-size: 0.8rem;
  margin: 4px 0 0 0;
  color: ${props => props.theme.theme.text.quarternary};
`
const ImageWrapper = styled.div`
  max-width: 500px;
`

const Image = styled(Img)`
  /* height: 400px; */
  width: 100%;
`

const Download = styled.a`

  button {
    border: 0;
    padding: 6px 12px;
    font-weight: 800;
    margin: 12px 0 0 0;
    border-radius: 4px;
    font-size: 0.8rem;
    text-transform: uppercase;
    color: white;
    background-color: ${props => props.theme.theme.colors.red};
    display: flex;
    align-items: center;

    svg{
      margin: 0 0 0 4px;
    }
   
    &:hover {
      cursor: pointer;
    }
  }
`

export default ({node}) => {
  if (!node || !node.asset || !node.asset._id) { return null }
  const fixedProps = getFixedGatsbyImage(
    node.asset._id,
    {width: 400},
    clientConfig.sanity
  )
  const fluidProps = getFluidGatsbyImage(
    node.asset._id,
    {maxWidth: 500},
    clientConfig.sanity
  )

  console.log(node.asset.url)

  return (
    <Figure>
      {/* <Img fluid={fluidProps} alt={node.alt} /> */}
      <ImageWrapper>
        <Image fluid={fluidProps} alt={node.alt} />
      </ImageWrapper>

      <Download href={node.asset.url} target="_blank" >
        <button>
          View full-size image
          <FaExternalLinkAlt size='12px' />
        </button>
      </Download>

    </Figure>
  )
}
