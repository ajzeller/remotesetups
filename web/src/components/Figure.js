import React from 'react'
import Img from 'gatsby-image'
import {getFluidGatsbyImage, getFixedGatsbyImage} from 'gatsby-source-sanity'
import clientConfig from '../../client-config'
import styled from 'styled-components'

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
  return (
    <figure>
      {/* <Img fluid={fluidProps} alt={node.alt} /> */}
      <ImageWrapper>
        <Image fluid={fluidProps} alt={node.alt} />
      </ImageWrapper>
      <Caption>{node.caption}</Caption>
    </figure>
  )
}
