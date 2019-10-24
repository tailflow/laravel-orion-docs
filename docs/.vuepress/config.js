module.exports = {
    title: 'Laravel Orion',
    description: 'The easiest way to create REST API with Laravel',
    themeConfig: {
        repo: 'laravel-orion/laravel-orion',
        docsRepo: 'laravel-orion/docs',
        docsDir: 'docs',
        editLinks: true,
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Guide', link: '/guide/' },
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
                        'hooks',
                        'query-parameters',
                        'security',
                        'responses'
                    ]
                }
            ],
        },
        lastUpdated: 'Last Updated',
    },
}