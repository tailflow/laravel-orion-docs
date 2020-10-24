module.exports = {
    base: '/laravel-orion-docs/',
    title: 'Laravel Orion',
    description: 'The simplest way to create REST API with Laravel',
    head: [
        ['link', { rel: "shortcut icon", href: "/favicon.ico" }],
    ],
    themeConfig: {
        repo: 'tailflow/laravel-orion',
        docsRepo: 'tailflow/laravel-orion-docs',
        docsDir: 'docs',
        editLinks: true,
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/guide/' },
        ],
        sidebar: {
            '/guide/': [
                {
                    title: 'Guide',
                    collapsable: false,
                    children: [
                        '',
                        'getting-started',
                        'models',
                        'relationships',
                        'hooks',
                        'search',
                        'batch-operations',
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