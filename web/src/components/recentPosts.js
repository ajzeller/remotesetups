import {Link} from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { Panel } from './setupsGrid'
import { Label } from './'

const RecentPostsPanel = styled(Panel)`
  padding: 12px;
  display: grid;
  grid-gap: 12px;
`

// const Label = styled.span`
//   font-size: 0.7rem;
//   text-transform: uppercase;
//   font-weight: 700;
// `

const PostPreviewItem = styled.div`
  color: ${props => props.theme.theme.text.primary};
`

const PostTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  font-style: italic;

  &:hover{
    color: ${props => props.theme.theme.colors.red};
  }
`

const PostCategory = styled(Label)`
  /* font-size: 1.2rem; */
  /* font-weight: 600; */
  margin: 0;
  color: ${props => props.theme.theme.text.quarternary};
`

const PostPreview = ( { post } ) => {
  return(
    <Link to={`/${post.slug.current}`}>
      <PostPreviewItem>
        {post.categories.map(category => (
          <PostCategory key={category.id}>{category.title}</PostCategory>
        ))}
        <PostTitle>
          {post.title}
        </PostTitle>
      </PostPreviewItem>
    </Link>
  )
}

const RecentPosts = ( {posts} ) => {
  return(
    <RecentPostsPanel>
      <Label>
        Recent
      </Label>
      {posts.map(post => (<PostPreview post={post} key={post.id} />))}
    </RecentPostsPanel>
  )
}

export default RecentPosts