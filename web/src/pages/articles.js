import React from 'react'
import {graphql} from 'gatsby'
import styled from 'styled-components'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../lib/helpers'
import BlogPostPreviewList from '../components/blog-post-preview-list'
// import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import { ContainerMain } from '../containers'
import SetupsGrid from '../components/setupsGrid'
import RecentPosts from '../components/recentPosts'
import {Link} from 'gatsby'
import Img from "gatsby-image"

const PostImage = styled(Img)`
  height: 200px;
`

const HomeGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  align-items: flex-start;
  grid-gap: 24px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`

const PostPreviewContainer = styled.div`
  padding: 24px;
  box-sizing: border-box;
  display: grid;
  align-content: flex-start;
  grid-template-columns: auto;
  background-color: ${props => props.theme.theme.bg.primary};
  color: ${props => props.theme.theme.text.primary};
  border: 1px solid ${ props => props.theme.theme.border.secondary};
  height: 100%;

  h2{
    margin: 12px 0 6px 0;

    &:hover {
      color: ${props => props.theme.theme.colors.red};
    }
  }
`

const Author = styled.h3`
  margin: 6px 0 6px 0;
  font-weight: 500;
  font-size: 1rem;
`

const PostPreview = ( {post} ) => {
  // console.log(post)
  return(
    <Link to={`/${post.slug.current}`}>
      <PostPreviewContainer>
        <PostImage fluid={post.mainImage.asset.fluid} />
        <h2>{post.title}</h2>
        <Author>
          By: {post.authors.map(item => (<span key={item.author.id}>{item.author.name}</span>))}
        </Author>
      </PostPreviewContainer>
    </Link>
  )
}

const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 24px;
`

const ArticlesPage = props => {
  const {data, errors} = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const filterByCategory = ({ categories }) => {
    console.log(categories)
    let matchesCategory = false
    categories.map(category => {
      if(category.title == 'Guide'){
        matchesCategory = true
      }
    })
    return matchesCategory
  }

  const site = (data || {}).site
  const posts = (data || {}).posts
    ? mapEdgesToNodes(data.posts)
      .filter(filterOutDocsWithoutSlugs)
      .filter(filterOutDocsPublishedInTheFuture)
    : []

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  console.log(posts)

  return (
    <Layout currentPage='articles'>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <ContainerMain>
        <h1>All Articles</h1>
        <PostsGrid>
          {posts && (posts.map(post => (<PostPreview post={post} key={post.id} />)) )}
        </PostsGrid>
        {/* <HomeGrid>
          {posts && (<RecentPosts posts={posts} />)}
        </HomeGrid> */}
      </ContainerMain>

      {/* {postNodes && (
        <BlogPostPreviewList
          title='Latest blog posts'
          nodes={postNodes}
          browseMoreHref='/archive/'
        />
      )} */}
    </Layout>
  )
}

export const query = graphql`
  fragment SanityImage on SanityMainImage {
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
    }
  }

  query ArticlesPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
      setups {
        username
        tags {
          title
          color
          backgroundColor
        }
        mainImage {
          asset {
            fluid {
              ...GatsbySanityImageFluid
            }
            fixed(width: 400) {
              ...GatsbySanityImageFixed
            }
          }
          alt
        }
        slug {
          current
        }
      }
    }

    tags: allSanityTag {
      edges {
        node {
          color
          title
          backgroundColor
        }
      }
    }

    posts: allSanityPost(
      limit: 6
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null },  }
    ) {
      edges {
        node {
          id
          publishedAt
          authors{
            author{
              name
              id
            }
          }
          mainImage {
            asset{
              fluid {
                ...GatsbySanityImageFluid
              }
              fixed(width: 400) {
                ...GatsbySanityImageFixed
              }
            }
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
          categories {
            title
          }
        }
      }
    }
  }
`

export default ArticlesPage
