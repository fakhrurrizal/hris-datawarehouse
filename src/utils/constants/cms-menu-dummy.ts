export const CmsMenuDummy = [
    {
        id: 1,
        name: 'Dashboard',
        path: '/cms/dashboard',
        icon: 'typcn:home-outline',
        status: 'true',
        children: [],
    },
    {
        id: 2,
        name: 'Blog',
        path: '',
        icon: 'fluent:news-24-filled',
        status: 'true',
        children: [
            {
                id: 3,
                name: 'Category',
                path: '/cms/blog/category',
                icon: 'icon-park-outline:computer',
                status: 'true',
                children: [],
            },
            {
                id: 4,
                name: 'Post',
                path: '/cms/blog/post',
                icon: 'icon-park-outline:computer',
                status: 'true',
                children: [],
            },
        ],
    },
]
