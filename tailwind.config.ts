import type { Config } from 'tailwindcss'
import daisyui from 'daisyui'

import { light } from 'daisyui/src/theming/themes'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/views/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                light: '#F2F5F9',
                primary: '#015FC9',
                pr: {
                    1: '#000717',
                    2: '#06132E',
                    3: '#0D1E45',
                    4: '#132A5D',
                    5: '#1A3574',
                    6: '#264DA2',
                    7: '#3364D1',
                    8: '#407BFF',
                    9: '#6695FF',
                    10: '#8CB0FF',
                    11: '#B3CAFF',
                    12: '#C6D7FF',
                    13: '#D9E5FF',
                    14: '#ECF2FF',
                    15: '#FFFFFF',
                },
                sc: {
                    1: '#000000',
                    2: '#190902',
                    3: '#321203',
                    4: '#4C1B05',
                    5: '#652406',
                    6: '#973609',
                    7: '#CA480C',
                    8: '#FC5A0F',
                    9: '#FD7B3F',
                    10: '#FD9C6F',
                    11: '#FEBD9F',
                    12: '#FECDB7',
                    13: '#FEDECF',
                    14: '#FFEEE7',
                    15: '#FFFFFF',
                },
                nt: {
                    1: '#000000',
                    2: '#0E0E0E',
                    3: '#1B1B1B',
                    4: '#292929',
                    5: '#363636',
                    6: '#515151',
                    7: '#6C6C6C',
                    8: '#878787',
                    9: '#9F9F9F',
                    10: '#B7B7B7',
                    11: '#CFCFCF',
                    12: '#DBDBDB',
                    13: '#E7E7E7',
                    14: '#F2F5F9',
                    15: '#FFFFFF',
                },
            },
            fontFamily: {
                'roboto-condensed': ['"Roboto Condensed"', 'sans-serif'],
                'dm-sans': ['"DM Sans"', 'sans-serif'],
            },
        },
        container: {
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '3rem',
                xl: '4rem',
                '2xl': '5rem',
            },
        },
        screens: {
            sm: '640px',
            // => @media (min-width: 640px) { ... }

            md: '768px',
            // => @media (min-width: 768px) { ... }

            lg: '1024px',
            // => @media (min-width: 1024px) { ... }

            xl: '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
        },
    },
    daisyui: {
        themes: [
            {
                light: {
                    ...light,
                    primary: '#1547ce',
                    secondary: '#F2F5F9',
                },
            },
        ],
    },

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    plugins: [daisyui, require('tailwind-scrollbar')],
}

export default config
