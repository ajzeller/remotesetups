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

const CompaniesFrame = styled.iframe`
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 8px;
`



const CompaniesPage = (props) => {
  const {data, errors} = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site

  return (
    <Layout currentPage='companies'>
      <SEO
        title={`${site.title} | Remote-Forward Tech Companies`}
        description={`These tech companies of over 250 employees have made remote work a permanent option for their employees going forward.`}
        keywords={site.keywords}
      />
      <ContainerMain>
        <h1>Remote-Forward Tech Companies</h1>
        <p>
          These tech companies of over 250 employees have made remote work a permanent option for their employees going forward. 
        </p>
        <p>
          Some companies, like Automattic and GitLab, have been 100% remote from the start. 
          Others, like Twitter and Coinbase, have recently announced new remote-friendly policies going forward from the Covid-19 Pandemic.
        </p>
        <p>Please reach out on <a href="https://twitter.com/remotesetups" target="_blank">Twitter</a> to modify. 
          We'll keep this updated as additional companies make announcements.
        </p>
        <CompaniesFrame src="https://airtable.com/embed/shrSJ0ZRzY0OKejkK?backgroundColor=cyan&viewControls=on" frameborder="0" onmousewheel="" width="100%" height="1000px"></CompaniesFrame>
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

  query CompaniesPageQuery {
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
  }
`

export default CompaniesPage
