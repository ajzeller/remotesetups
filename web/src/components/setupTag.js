import React from 'react'
import styled from 'styled-components'
import { IoMdClose } from "react-icons/io";
import { MdRadioButtonChecked, MdRadioButtonUnchecked, MdRefresh } from "react-icons/md";


const Tag = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  padding: 6px 12px;
  border-radius: 20px;
  margin: 0 8px 8px 0;
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: 700;
  /* text-shadow: 0px 0px 10px rgba(0,0,0,0.2); */
  box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.1);
  opacity: ${props => props.isVisible ? 1 : 0.5 };
  cursor: pointer;

  svg {
    margin: 0 0 0 4px;
  }
`

export const ResetTag = ({ 
  handleResetClick,   
  isVisible = true, 
  isToggleable = false,
  resetFilterTags
 }) => {

  return(
    <Tag color={'black'} backgroundColor={'white'} isVisible={isVisible} onClick= {() => resetFilterTags()} >
      Reset Filters
      <MdRefresh size='16px' />
    </Tag>
  )
}

const SetupTag = ({ 
  title, 
  color, 
  backgroundColor, 
  isVisible = true, 
  isToggleable = false,
  handleFilterTagClick
 }) => {
  // const { title, color, backgroundColor } = tagData

  return(
    <Tag color={color} backgroundColor={backgroundColor} isVisible={isVisible} onClick={isToggleable ? (() => handleFilterTagClick(title)): undefined }>
      {title}
      {/* {isToggleable && (
        isVisible ? <MdRadioButtonChecked size='16px' /> :
        <MdRadioButtonUnchecked size='16px' />
      )} */}
    </Tag>
  )
}

export default SetupTag