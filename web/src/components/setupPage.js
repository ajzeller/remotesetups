import React from 'react'
import styled from 'styled-components'
import {Link} from 'gatsby'
import Img from "gatsby-image"
import { ContainerMain } from '../containers'
import PortableText from './portableText'
import SetupTag from './setupTag'
import { FaExternalLinkAlt } from "react-icons/fa";


const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
`

const DetailsColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 12px;
  justify-items: left;
  align-content: start;
`

const SetupImg = styled(Img)`
  width: 100%;
`

const Username = styled.div`
  display: inline;
  background-color: ${props => props.theme.theme.bg.inset};
  padding: 4px 8px;
  font-size: 0.8rem;
  margin: 0 0 12px 0;
  border-radius: 4px;
`

const Label = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
`

const ExternalLink = styled.a`
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  color: ${props => props.theme.theme.text.primary};

  svg{
    margin: 0 0 0 8px;
  }
`

const SetupPage = (props) => {
  console.log(props)
  const {_rawBody, authors, mainImage, username, publishedAt, tags, source, setupUrl} = props

  return(
    <ContainerMain>
      <DetailsGrid>
        <DetailsColumn>
          <Label>Made by</Label>
          <Username>
            {username}
          </Username>

          <Label>Tags</Label>
          <TagContainer>
            {tags.map(tag => (
              <SetupTag tagData={tag} />
            ))}
          </TagContainer>
            <ExternalLink href={setupUrl} target="_blank">View on {source} <FaExternalLinkAlt size='16px' /></ExternalLink>
        </DetailsColumn>
        <SetupImg fluid={mainImage.asset.fluid} />
      </DetailsGrid>

        {_rawBody && <PortableText blocks={_rawBody} />}
    </ContainerMain>
  )
}

export default SetupPage