import {Link} from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { Panel } from './setupsGrid'

const RecentPostsPanel = styled(Panel)`
  padding: 12px;
  display: grid;
  grid-gap: 12px;
`

const Label = styled.span`
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: 700;
`

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

const PostPreview = ( { post } ) => {
  return(
    <Link to={post.slug.current}>
      <PostPreviewItem>
        <PostTitle>
          {post.title}
        </PostTitle>
      </PostPreviewItem>
    </Link>
  )
}

const RecentPosts = ( {posts} ) => {
  console.log(posts)

  return(
    <RecentPostsPanel>
      <Label>
        Recent
      </Label>
      {posts.map(post => (<PostPreview post={post} />))}
    </RecentPostsPanel>
  )
}

export default RecentPosts