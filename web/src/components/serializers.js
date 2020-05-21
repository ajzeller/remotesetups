import React from 'react'
import Figure from './Figure'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

const TldrWrapper = styled.div`
  border: 1px solid ${props => props.theme.theme.colors.blue};
  background-color: ${props => props.theme.theme.colors.transparentBlue};
  border-radius: 8px;
  padding: 12px;

  h3{
    font-weight: 600;
    color: ${props => props.theme.theme.colors.blue};
    margin: 6px 0;
  }
`

const Tldr = (props) => {
  console.log(props)

  return(
    <TldrWrapper>
      <h3>TLDR</h3>
      {props.children}
    </TldrWrapper>
  )
}

const Markdown = ({input}) => {
  console.log(input)

  return(
    <ReactMarkdown source={input[0]} />
  )
}

const serializers = {
  types: {
    authorReference: ({node}) => <span>{node.author.name}</span>,
    mainImage: Figure,
    productTable: ({node}) => {
      console.log(node)
      return(
        <div>table goes here</div>
      )
    },
    // productTable: (props) => <div>{props.children}</div>,
    block (props) {
      switch (props.node.style) {
        case 'h1':
          return <h1>{props.children}</h1>

        case 'h2':
          return <h2>{props.children}</h2>

        case 'h3':
          return <h3>{props.children}</h3>

        case 'h4':
          return <h4>{props.children}</h4>

        case 'blockquote':
          return <blockquote>{props.children}</blockquote>

        case 'tldr':
          return <Tldr>{props.children}</Tldr>

        case 'markdown':
          return <Markdown input={props.children} />

        default:
          return <p>{props.children}</p>
      }
    },
  },
  marks: {
    link: ({mark, children}) => {
      // Read https://css-tricks.com/use-target_blank/
      const { blank, href } = mark
      return blank ?
        <a href={href} target="_blank" rel="noopener">{children}</a>
        : <a href={href}>{children}</a>
    }
  }
}

export default serializers
