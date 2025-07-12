export const endpoints = {
    // auth
    get_me: 'auth/user',
    logout: 'auth/logout',
    login: 'auth/signin',
    register: 'auth/signup',
    dashboard: 'dashboard',
    dim: 'dim',
    dim_department: 'dim/department',
} as const
