import React from 'react'
import styled from 'styled-components'

const Tag = styled.div`
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
`

const SetupTag = ({ tagData }) => {
  const { title, color, backgroundColor } = tagData

  return(
    <Tag color={color} backgroundColor={backgroundColor}>
      {title}
    </Tag>
  )
}

export default SetupTag