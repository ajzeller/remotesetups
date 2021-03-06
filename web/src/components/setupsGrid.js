import React from 'react'
import styled from 'styled-components'
import {Link} from 'gatsby'
import Img from "gatsby-image"
import { motion } from "framer-motion";
import { ContainerFullWidth, ContainerBodyWidth, ContainerMain } from '../containers'
import SetupTag, { ResetTag } from './setupTag'
import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from '@react-hook/window-size'
import { useState } from 'react';
import { Label } from './'
import ReactMarkdown from 'react-markdown'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 24px;
  margin: 12px 0 0 0;
`

export const Panel = styled(motion.div)`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.2);
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
  background-color: ${props => props.theme.theme.bg.secondary};
  height: 100%;
`

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const SetupsSection = styled.div`
`

const FiltersGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 12px 0 12px 0;
`

const SetupPreview = ({setup}) => {
  let [width, height] = useWindowSize()

  if(!width){
   width = 1000
  }

  return(
    <Link to={`/setups/${setup.slug.current}`}>
      <Panel 
        whileHover={width > 700 ? {
          scale: 1.02,
          y: 0
        } : { } }
      >
        <ImgContainer>
          <SetupImg 
            fluid={setup.mainImage.asset.fluid} 
            objectFit="fill"
            alt={setup.mainImage.alt}
            />
          <Username>
            {setup.username}
          </Username>
        </ImgContainer>

        <SetupPreviewDetails>

          <TagContainer>
            {setup.tags.map(tag => (
              <SetupTag {...tag} key={`${setup.username}-${tag.id}`} />
            ))}
          </TagContainer>

        </SetupPreviewDetails>

      </Panel>
    </Link>
  )
}

const FilterTags = ({ filterTags, handleFilterTagClick, resetFilterTags }) => {
  // console.log(filterTags)

  return(
    <FiltersGrid>
      {filterTags.map(tag => (
        <SetupTag {...tag} isToggleable={true} handleFilterTagClick={handleFilterTagClick} key={tag.id} />
      ))}
      <ResetTag resetFilterTags={resetFilterTags} />
    </FiltersGrid>
  )
}

const SetupsGrid = ( { setups, tags } ) => {
  // console.log(tags)

  const [filterTags, setFilterTags] = useState(
    tags.edges.map(tag => ({
      title: tag.node.title,
      color: tag.node.color,
      backgroundColor: tag.node.backgroundColor,
      id: tag.node.id,
      isVisible: true
    }))
  )

  const handleFilterTagClick = (title) => {

    let allTagsVisible = true
    filterTags.forEach(tag => {
      if(!tag.isVisible){
        allTagsVisible = false
      }
    })

    setFilterTags(prev => prev.map(tag => {
      if(allTagsVisible){
        if(tag.title !== title){
          return({
            ...tag,
            isVisible: false
          })
        } else {
          return tag
        }
      } else{
        if(tag.title == title){
          return({
            ...tag,
            isVisible: !tag.isVisible
          })
        } else {
          return tag
        }
      }
    }))
  }

  const resetFilterTags = () => {
    setFilterTags(prev => prev.map(tag => ({
      ...tag,
      isVisible: true
    })
    ))
  }

  // console.log(setups)

  return(
    <SetupsSection>
      <Label>Filters</Label>
      <FilterTags filterTags={filterTags} handleFilterTagClick={handleFilterTagClick} resetFilterTags={resetFilterTags} />
      <Label>Setups ({setups.length} total)</Label>
      <Grid>  
        {
          setups && setups.filter(setup =>{
            let includeSetup = false

            setup.tags.forEach(tag => {
              filterTags.forEach(filterTag => {
                if(tag.title == filterTag.title && filterTag.isVisible){
                  includeSetup = true
                }
              })
            })

            return(includeSetup)

          }).map(setup => (
            <SetupPreview setup={setup} key={setup.username} />
            ))
          }
      </Grid>

    </SetupsSection>
  )
}

export default SetupsGrid