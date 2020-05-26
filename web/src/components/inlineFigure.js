import React from 'react'
import Img from 'gatsby-image'
import {getFluidGatsbyImage, getFixedGatsbyImage} from 'gatsby-source-sanity'
import clientConfig from '../../client-config'
import styled from 'styled-components'

const Caption = styled.figcaption`
  font-size: 0.8rem;
  margin: 4px 0 12px 0;
  color: ${props => props.theme.theme.text.quarternary};
  max-width: 300px;
`
const ImageWrapper = styled.div`
  /* width: 300px; */
  display: inline-block;
  /* float: right; */
`

const Image = styled(Img)`
  /* height: 400px; */
  /* max-width: 400px; */
  width: 350px;
  /* margin: 0 0 0 12px; */
`

const FigureWrapper = styled.figure`
  display: inline;
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
    {maxWidth: 400},
    clientConfig.sanity
  )
  return (
    // <FigureWrapper>
      <ImageWrapper>
        <Image fluid={fluidProps} alt={node.alt} />
        <Caption>{node.caption}</Caption>
      </ImageWrapper>
    // </FigureWrapper>
  )
}
