module.exports = {
    title: 'Laravel Orion',
    description: 'Just playing around',
    themeConfig: {
        repo: 'laravel-orion/laravel-orion',
        docsRepo: 'laravel-orion/docs',
        docsDir: 'docs',
        editLinks: true,
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Guide', link: '/guide/' },
          { text: 'Reference', link: '/reference/' }
        ],
        sidebar: {
            '/guide/' : [
                {
                    title: 'Guide',
                    collapsable: false,
                    children: [
                        '',
                        'getting-started',
                        'models',
                        'relationships',
                        'query-parameters',
                        'security',
                        'responses'
                    ]
                },
                {
                    title: 'Advanced',
                    collapsable: false,
                    children: [
                        '',
                    ]
                }
            ],
        },
        lastUpdated: 'Last Updated',
    },
}