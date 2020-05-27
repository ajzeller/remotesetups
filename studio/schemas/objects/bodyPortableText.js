import { FaExternalLinkAlt } from 'react-icons/fa'
import React from 'react'

const tldrRender = props => (
  <span style={{ borderBottom: '3px solid PowderBlue' }}>{props.children}</span>
)

const markdownRender = props => (
  <span style={{ borderBottom: '3px solid grey' }}>{props.children}</span>
)

const inlineTextRender = props => (
  <span style={{ borderBottom: '3px solid Aquamarine' }}>{props.children}</span>
)

export default {
  name: 'bodyPortableText',
  type: 'array',
  title: 'Post body',
  of: [
    {
      type: 'block',
      title: 'Block',
      // Styles let you set what your user can mark up blocks with. These
      // corrensponds with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
        {
          title: 'Inline Text', 
          value: 'inlineText',
          blockEditor: {
            render: inlineTextRender
          }
        },
        {
          title: 'TLDR', 
          value: 'tldr',
          blockEditor: {
            render: tldrRender
          }
        }
        // {
        //   title: 'Markdown',
        //   value: 'markdown',
        //   blockEditor: {
        //     render: markdownRender
        //   }
        // }
      ],
      lists: [{title: 'Bullet', value: 'bullet'}, {title: 'Number', value: 'number'}],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [{title: 'Strong', value: 'strong'}, {title: 'Emphasis', value: 'em'}],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'External Link',
            name: 'link',
            type: 'object',
            blockEditor: {
              icon: FaExternalLinkAlt
            },
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: Rule =>
                  Rule.uri({
                    allowRelative: true,
                    scheme: ['https', 'http', 'mailto', 'tel']
                  })
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                description: 'Read https://css-tricks.com/use-target_blank/',
                type: 'boolean'
              }
            ]
          }
        ]
      },
      of: [{type: 'authorReference'}]
    },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    {
      type: 'mainImage',
      options: {hotspot: true}
    },
    {
      type: 'inlineImage',
      options: {hotspot: true}
    },
    {
      type: 'downloadableImage',
      options: {hotspot: true}
    },
    {
      name: 'productTable',
      title: 'Product Table',
      type: 'productTable'
    }
  ]
}
