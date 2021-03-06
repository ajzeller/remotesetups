const {isFuture} = require('date-fns')
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const {format} = require('date-fns')

async function createBlogPostPages (graphql, actions, reporter) {
  const {createPage} = actions
  console.log(`createBlogPostPages`)
  const result = await graphql(`
    {
      allSanityPost(
        filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
      ) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const postEdges = (result.data.allSanityPost || {}).edges || []

  postEdges
    .filter(edge => !isFuture(edge.node.publishedAt))
    .forEach((edge, index) => {
      const {id, slug = {}, publishedAt} = edge.node
      const dateSegment = format(publishedAt, 'YYYY/MM')
      const path = `/${slug.current}/`

      reporter.info(`Creating blog post page: ${path}`)

      createPage({
        path,
        component: require.resolve('./src/templates/blog-post.js'),
        context: {id}
      })
    })
}

async function createSetupPages (graphql, actions, reporter) {
  const {createPage} = actions
  console.log(`createSetupPages`)

  const result = await graphql(`
    {
      allSanitySetup{
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const setups = (result.data.allSanitySetup || {}).edges || []

  setups
    .forEach((edge, index) => {
      const {id, slug, publishedAt} = edge.node
      // const dateSegment = format(publishedAt, 'YYYY/MM')
      const path = `/setups/${slug.current}/`

      reporter.info(`Creating setup page: ${path}`)

      createPage({
        path,
        component: require.resolve('./src/templates/setup.js'),
        context: {id}
      })
    })
}

exports.createPages = async ({graphql, actions, reporter}) => {
  await createBlogPostPages(graphql, actions, reporter)
  await createSetupPages(graphql, actions, reporter)
}
