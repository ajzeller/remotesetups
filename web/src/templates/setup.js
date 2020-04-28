import React from 'react'
import {graphql} from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import BlogPost from '../components/blog-post'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import {toPlainText} from '../lib/helpers'
import SetupPage from '../components/setupPage'

export const query = graphql`
  query SetupTemplateQuery($id: String!) {
    setup: sanitySetup(id: {eq: $id}) {
      id
      publishedAt
      username
      slug {
        current
      }
      _rawExcerpt
      _rawBody
      setupUrl
      source
      title
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
          fixed(width: 700) {
            ...GatsbySanityImageFixed
          }
        }
      }

    }
  }
`

const SetupTemplate = props => {
  const {data, errors} = props
  const setup = data && data.setup
  return (
    <Layout>
      {errors && <SEO title='GraphQL Error' />}
      {/* {setup && <SEO title={setup.username || 'Untitled'} description={toPlainText(setup._rawExcerpt)} image={setup.mainImage} />} */}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      {setup && <SetupPage {...setup} />}
    </Layout>
  )
}

export default SetupTemplate
