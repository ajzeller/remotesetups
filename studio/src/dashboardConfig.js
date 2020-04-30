export default {
  widgets: [
    { name: 'structure-menu' },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5ea767973f79d28c6493e93b',
                  title: 'Sanity Studio',
                  name: 'remotesetups-studio',
                  apiId: '9ba64a7d-fe16-43ae-8ced-5c0366967e7b'
                },
                {
                  buildHookId: '5ea76797a72f5b8687578c23',
                  title: 'Blog Website',
                  name: 'remotesetups',
                  apiId: '259aeebb-56c9-4efd-a9fa-fbf31891db77'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/ajzeller/remotesetups',
            category: 'Code'
          },
          { title: 'Frontend', value: 'https://remotesetups.com', category: 'apps' }
        ]
      }
    },
    { name: 'project-users', layout: { height: 'auto' } },
    {
      name: 'document-list',
      options: { title: 'Recent blog posts', order: '_createdAt desc', types: ['post'] },
      layout: { width: 'medium' }
    }
  ]
}
