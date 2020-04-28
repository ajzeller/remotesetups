import React from 'react'
import styled from 'styled-components'
import {Link} from 'gatsby'
import Img from "gatsby-image"
import { motion } from "framer-motion";
import { ContainerFullWidth, ContainerBodyWidth } from '../containers'
import SetupTag from './setupTag'
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from '@react-hook/window-size'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 24px;
`

const SetupPanel = styled(motion.div)`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
  color: ${props => props.theme.theme.text.primary};
`

const SetupImg = styled(Img)`
  height: 250px;
`

const ImgContainer = styled.div`
  position: relative;
`

const Username = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background-color: ${props => props.theme.theme.bg.inset};
  box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.2);
  padding: 4px 8px;
  font-size: 0.8rem;
  border-radius: 4px;
  opacity: 0.9;
`

const SetupPreviewDetails = styled.div`
  padding: 12px;
  /* display: grid; */
  /* grid-gap: 12px; */
  background-color: ${props => props.theme.theme.bg.tertiary};
  height: 100%;
`

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const SetupPreview = ({setup}) => {
  let [width, height] = useWindowSize()

  if(!width){
   width = 1000
  }

  return(
    <Link to={`/setups/${setup.slug.current}`}>
      <SetupPanel 
        whileHover={width > 700 ? {
          scale: 1.02,
          y: 0
        } : { } }
      >
        <ImgContainer>
          <SetupImg 
            fluid={setup.mainImage.asset.fluid} 
            objectFit="fill"
            />
          <Username>
            {setup.username}
          </Username>
        </ImgContainer>

        <SetupPreviewDetails>

          <TagContainer>
            {setup.tags.map(tag => (
              <SetupTag tagData={tag} />
            ))}
          </TagContainer>

        </SetupPreviewDetails>

      </SetupPanel>
    </Link>
  )
}

const SetupsGrid = ( {setups} ) => {

  console.log(setups)

  return(
    <Grid>
      {
        setups && setups.map(setup => (
          <SetupPreview setup={setup} />
        ))
      }
    </Grid>
  )
}

export default SetupsGrid