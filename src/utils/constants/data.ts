export const menu_static = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        icon: 'solar:home-outline',
        role: [1, 2],
        children: [],
    },
    {
        path: '/manage-tour',
        name: 'Paket Wisata',
        role: [2],
        icon: 'mdi:package-variant-closed',
        children: [
            {
                path: '/manage-tour/paket',
                name: 'Paket',
                icon: 'mdi:package-variant',
            },
            {
                path: '/manage-tour/jadwal',
                name: 'Jadwal',
                icon: 'mdi:calendar-month-outline',
            },
            {
                path: '/manage-tour/pesanan',
                name: 'Pesanan',
                icon: 'mdi:cart-outline',
            },
        ],
    },
    {
        path: '/manage-user',
        name: 'Kelola Akun',
        role: [1],
        icon: 'mdi:account-outline',
        children: [
            {
                path: '/manage-user/user',
                name: 'Akun User',
                icon: 'mdi:account',
            },
            {
                path: '/manage-user/agen',
                name: 'Akun Agen',
                icon: 'mdi:account-tie',
            },
        ],
    },
    {
        path: '/laporan',
        name: 'Laporan',
        role: [1, 2],
        icon: 'mdi:flag-outline',
        children: [],
    },
]

export interface MenuItem {
    path: string
    name: string
    icon: string
    role?: number[]
    children?: MenuItem[]
}
