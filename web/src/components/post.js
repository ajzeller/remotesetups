import {format, distanceInWords, differenceInDays} from 'date-fns'
import React from 'react'
import styled from 'styled-components'
import Img from "gatsby-image"
import { ContainerFullWidth, ContainerMain } from '../containers'

import {buildImageObj} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'
import PortableText from './portableText'
import Container from './container'

import AuthorList from './author-list'

import styles from './blog-post.module.css'

const CoverImage = styled(Img)`
  max-height: 600px;
`

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e90c35' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
`

const ArticleContainer = styled.article`
  max-width: 1000px;
  padding: 24px;
  margin: auto;
`

const ArticleInfo = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

const PublishedBy = styled.span`
  /* font-style: italic; */
  margin: 0 4px 0 0;
  /* font-size: 0.8rem; */
`

const AuthorItem = styled.span`
  margin: 0 24px 0 0;
  font-weight: 600;
`

const ArticleDate = styled.span`
  /* color: ${props => props.theme.theme.colors.blue}; */
  color: ${props => props.theme.theme.text.quarternary};
  margin: 0 24px 0 0;
`

const Category = styled.span`
  background-color: ${props => props.theme.theme.bg.inset};
  color: ${props => props.theme.theme.text.tertiary};
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 4px;
  padding: 4px 8px;
`

const ArticleBody = styled.div`
  max-width: 800px;
  margin: 48px 0 0 0;

  h2{
    display: inline-block;
    padding: 12px 12px 12px 0;
    margin: 24px 0 12px 0;
    /* background-color: #ffffff; */
    background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e90c35' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
  }

  blockquote{
    margin: 0;
    padding: 12px;
    background-color: ${props => props.theme.theme.bg.inset};
    border-radius: 4px;
  }
`

const Post = (props) => {
  const {_rawBody, authors, categories, title, mainImage, publishedAt} = props
  console.log(authors)

  return (
    <ArticleContainer>
        {/* <CoverImage 
          fluid={mainImage.asset.fluid} 
          objectFit="cover" 
        /> */}
        <Title>{title}</Title>
        <ArticleInfo>
          <PublishedBy>
            Written by 
          </PublishedBy>
          {authors && authors.map((item, _key) => (
            <AuthorItem key={_key}>
              {item.author.name}
            </AuthorItem>
          ))}
            {publishedAt && (
            <ArticleDate>
              Last updated on {format(new Date(publishedAt), 'MMMM Do, YYYY')}
            </ArticleDate>
            )}

            {categories && categories.map(category => (
              <Category key={category._id}>{category.title}</Category>
            ))}
        </ArticleInfo>

        <ArticleBody>
          {_rawBody && <PortableText blocks={_rawBody} />}
        </ArticleBody>


    </ArticleContainer>
  )
}

export default Post
