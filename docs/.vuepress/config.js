module.exports = {
    base: '/laravel-orion-docs/',
    title: 'Laravel Orion',
    description: 'The simplest way to create REST API with Laravel',
    head: [
        ['link', {rel: "shortcut icon", href: "/favicon.ico"}],
    ],
    themeConfig: {
        repo: 'tailflow/laravel-orion',
        docsRepo: 'tailflow/laravel-orion-docs',
        docsDir: 'docs',
        editLinks: true,
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Guide', link: '/v2.x/guide/'},
            {text: 'Screencasts', link: '/screencasts/'},
            {
                text: 'Version', items: [
                    {
                        text: '1.x',
                        link: '/v1.x/guide/'
                    },
                    {
                        text: '2.x',
                        link: '/v2.x/guide/'
                    },
                ]
            },
        ],
        sidebar: {
            '/v1.x/guide/': [
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
                },
                {
                    title: 'TypeScript SDK',
                    collapsable: false,
                    children: [
                        'typescript-sdk/introduction',
                        'typescript-sdk/getting-started',
                        'typescript-sdk/configuration',
                        'typescript-sdk/models',
                        'typescript-sdk/relationships',
                        'typescript-sdk/query-parameters'
                    ]
                }
            ],
            '/v2.x/guide/': [
                {
                    title: 'Guide',
                    collapsable: false,
                    children: [
                        'prologue',
                        '',
                        'getting-started',
                        'models',
                        'relationships',
                        'hooks',
                        'search',
                        'includes',
                        'aggregates',
                        'batch-operations',
                        'query-parameters',
                        'security',
                        'responses',
                        'specifications'
                    ]
                },
                {
                    title: 'TypeScript SDK',
                    collapsable: false,
                    children: [
                        'typescript-sdk/introduction',
                        'typescript-sdk/getting-started',
                        'typescript-sdk/configuration',
                        'typescript-sdk/models',
                        'typescript-sdk/relationships',
                        'typescript-sdk/query-parameters'
                    ]
                }
            ],
            '/screencasts/': [
                {
                    title: 'Screencasts',
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
