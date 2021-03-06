// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// document schemas
import author from './documents/author'
import category from './documents/category'
import post from './documents/post'
import setup from './documents/setup'
import siteSettings from './documents/siteSettings'
import setupTag from './documents/setupTag'

// Object types
import bodyPortableText from './objects/bodyPortableText'
import bioPortableText from './objects/bioPortableText'
import excerptPortableText from './objects/excerptPortableText'
import mainImage from './objects/mainImage'
import inlineImage from './objects/inlineImage'
import downloadableImage from './objects/downloadableImage'
import authorReference from './objects/authorReference'
import productTable from './objects/productTable'
import markdownInput from './objects/markdownInput'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'blog',
  // Then proceed to concatenate our our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    siteSettings,
    post,
    setup,
    category,
    setupTag,
    author,
    mainImage,
    inlineImage,
    productTable,
    markdownInput,
    authorReference,
    bodyPortableText,
    bioPortableText,
    downloadableImage,
    excerptPortableText

    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
  ])
})
