export default {
  name: 'tag',
  type: 'document',
  title: 'Setup Tags',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      title: 'Text Color',
      name: 'color',
      type: 'string'
    },
    {
      title: 'Background Color',
      name: 'backgroundColor',
      type: 'string'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description'
    }
  ]
}
