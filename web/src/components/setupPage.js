import React from 'react'
import styled from 'styled-components'
import {Link} from 'gatsby'
import Img from "gatsby-image"
import { ContainerFullWidth, ContainerMain } from '../containers'
import PortableText from './portableText'
import SetupTag from './setupTag'
import { FaExternalLinkAlt } from "react-icons/fa";

const Backdrop = styled(ContainerFullWidth)`
  background-color: ${props => props.theme.theme.bg.tertiary};
`


const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 12px 0;
`

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-gap: 24px; 

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`

const DetailsColumn = styled.div`
  background-color: ${props => props.theme.theme.bg.secondary};
  padding: 24px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 12px;
  justify-items: left;
  align-content: start;
  align-self: flex-start;
  box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.1);
  border-radius: 8px;
`

const SetupImg = styled(Img)`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.1);
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

const Title = styled.h1`
  margin: 0;
  font-size: 1.8rem;
`

const SetupPage = (props) => {
  console.log(props)
  const {_rawBody, authors, mainImage, username, publishedAt, tags, source, setupUrl, title} = props

  return(
    <>
      <Backdrop>
        <ContainerMain>
          <DetailsGrid>
            <DetailsColumn>
              <Title>{title}</Title>
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
        </ContainerMain>
      </Backdrop>

      <ContainerMain>
        {_rawBody && <PortableText blocks={_rawBody} />}
      </ContainerMain>
    </>
  )
}

export default SetupPage