import type { PaletteOptions as MuiPalleteOptions, Palette as MuiPallete } from '@mui/material'

declare module '@mui/material' {
    interface PaletteOptions extends MuiPalleteOptions {
        mainColor: string
        fontColor: string
    }

    interface Palette extends MuiPallete {
        mainColor: string
        fontColor: string
    }
}

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: true
        sm: true
        md: true
        lg: true
        xl: true
        xxl: true
    }
}
