import React from 'react'
import styled from 'styled-components'

const DisclaimerWrapper = styled.p`
  color: ${props => props.theme.theme.text.quarternary};
`

const Disclaimer = () => {
  return(
    <DisclaimerWrapper>
      (Please note that this page may contain Amazon affiliate links which help me to keep this site running. By clicking the links I earn a commission at no cost to you.)
    </DisclaimerWrapper>
  )
}

export default Disclaimer

