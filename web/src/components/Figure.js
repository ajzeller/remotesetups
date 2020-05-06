import React from 'react'
import Img from 'gatsby-image'
import {getFluidGatsbyImage} from 'gatsby-source-sanity'
import clientConfig from '../../client-config'
import styled from 'styled-components'

const Caption = styled.figcaption`
  font-size: 0.8rem;
  margin: 4px 0 0 0;
  color: ${props => props.theme.theme.text.quarternary};
`

export default ({node}) => {
  if (!node || !node.asset || !node.asset._id) { return null }
  const fluidProps = getFluidGatsbyImage(
    node.asset._id,
    {maxWidth: 675},
    clientConfig.sanity
  )
  return (
    <figure>
      <Img fluid={fluidProps} alt={node.alt} />
      <Caption>{node.caption}</Caption>
    </figure>
  )
}
