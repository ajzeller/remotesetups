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

const HomeGrid = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  align-items: flex-start;
  grid-gap: 24px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`



const IndexPage = props => {
  const {data, errors} = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
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

  return (
    <Layout>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <ContainerMain>
        <HomeGrid>
          {posts && (<RecentPosts posts={posts} />)}
          { site.setups && (
            <SetupsGrid setups={site.setups} tags={data.tags} />
            )}
        </HomeGrid>
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

  query IndexPageQuery {
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
          id
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
          id
        }
      }
    }

    posts: allSanityPost(
      limit: 6
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          publishedAt
          mainImage {
            ...SanityImage
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
          categories {
            title
            id
          }
        }
      }
    }
  }
`

export default IndexPage
