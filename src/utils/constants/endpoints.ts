export const endpoints = {
    // auth
    get_me: 'auth/user',
    logout: 'auth/logout',
    login: 'auth/signin',
    register: 'auth/signup',
    dashboard: 'dashboard',

    // blog
    blog: 'blog',
    blog_category: 'blog/category',

    // files
    file: 'file',
} as const
