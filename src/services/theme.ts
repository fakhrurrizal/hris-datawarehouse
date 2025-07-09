import { colors } from '@/utils'
import { alpha, createTheme } from '@mui/material/styles'
import { useMemo } from 'react'

export const useGetTheme = () => {
    const primary = '#3FA9E6'

    const error = '#ff3a6e'

    const borderRadius = 4

    const fontColor = '#474955'

    const fontDark = '#474955'

    const useTheme = useMemo(
        () =>
            createTheme({
                shape: {
                    borderRadius,
                },

                palette: {
                    primary: {
                        main: primary,
                    },

                    error: {
                        main: error,
                    },

                    success: {
                        main: '#6fd943',
                    },

                    secondary: {
                        main: '#808080',
                    },

                    warning: {
                        main: colors.yellow[400],
                    },

                    info: {
                        main: colors.blue[300],
                    },

                    mainColor: colors.slate[100],

                    fontColor,

                    text: {
                        primary: fontColor,
                        secondary: fontDark,
                    },
                },

                typography: {
                    fontFamily: ['"Montserrat"', 'sans-serif'].join(','),
                    fontSize: 13.125,
                    h1: {
                        fontWeight: 500,
                        fontSize: '2.375rem',
                        lineHeight: 1.368421,
                    },
                    h2: {
                        fontWeight: 500,
                        fontSize: '2rem',
                        lineHeight: 1.375,
                    },
                    h3: {
                        fontWeight: 500,
                        lineHeight: 1.38462,
                        fontSize: '1.625rem',
                    },
                    h4: {
                        fontWeight: 500,
                        lineHeight: 1.364,
                        fontSize: '1.375rem',
                    },
                    h5: {
                        fontWeight: 500,
                        lineHeight: 1.3334,
                        fontSize: '1.125rem',
                    },
                    h6: {
                        lineHeight: 1.4,
                        fontSize: '0.9375rem',
                    },
                    subtitle1: {
                        fontSize: '1rem',
                        letterSpacing: '0.15px',
                    },
                    subtitle2: {
                        lineHeight: 1.32,
                        fontSize: '0.875rem',
                        letterSpacing: '0.1px',
                    },
                    body1: {
                        lineHeight: 1.467,
                        fontSize: '0.9375rem',
                    },
                    body2: {
                        fontSize: '0.8125rem',
                        lineHeight: 1.53846154,
                    },
                    button: {
                        lineHeight: 1.2,
                        fontSize: '0.9375rem',
                        letterSpacing: '0.43px',
                    },
                    caption: {
                        lineHeight: 1.273,
                        fontSize: '0.6875rem',
                    },
                    overline: {
                        fontSize: '0.75rem',
                        letterSpacing: '1px',
                    },
                },

                shadows: [
                    'none',
                    '0px 2px 4px 0px rgba(47, 43, 61, 0.12)',
                    '0px 2px 6px 0px rgba(47, 43, 61, 0.14)',
                    '0px 3px 8px 0px rgba(47, 43, 61, 0.14)',
                    '0px 3px 9px 0px rgba(47, 43, 61, 0.15)',
                    '0px 4px 10px 0px rgba(47, 43, 61, 0.15)',
                    '0px 4px 11px 0px rgba(47, 43, 61, 0.16)',
                    '0px 4px 18px 0px rgba(47, 43, 61, 0.1)',
                    '0px 4px 13px 0px rgba(47, 43, 61, 0.18)',
                    '0px 5px 14px 0px rgba(47, 43, 61, 0.18)',
                    '0px 5px 15px 0px rgba(47, 43, 61, 0.2)',
                    '0px 5px 16px 0px rgba(47, 43, 61, 0.2)',
                    '0px 6px 17px 0px rgba(47, 43, 61, 0.22)',
                    '0px 6px 18px 0px rgba(47, 43, 61, 0.22)',
                    '0px 6px 19px 0px rgba(47, 43, 61, 0.24)',
                    '0px 7px 20px 0px rgba(47, 43, 61, 0.24)',
                    '0px 7px 21px 0px rgba(47, 43, 61, 0.26)',
                    '0px 7px 22px 0px rgba(47, 43, 61, 0.26)',
                    '0px 8px 23px 0px rgba(47, 43, 61, 0.28)',
                    '0px 8px 24px 6px rgba(47, 43, 61, 0.28)',
                    '0px 9px 25px 0px rgba(47, 43, 61, 0.3)',
                    '0px 9px 26px 0px rgba(47, 43, 61, 0.32)',
                    '0px 9px 27px 0px rgba(47, 43, 61, 0.32)',
                    '0px 10px 28px 0px rgba(47, 43, 61, 0.34)',
                    '0px 10px 30px 0px rgba(47, 43, 61, 0.34)',
                ],

                components: {
                    MuiTextField: {
                        styleOverrides: {
                            root: {
                                fontWeight: 500,
                            },
                        },
                        defaultProps: {
                            fullWidth: true,
                        },
                    },

                    MuiInputAdornment: {
                        styleOverrides: {
                            root: {
                                '& .MuiTypography-root': {
                                    color: alpha('#000000', 0.87),
                                },
                            },
                        },
                    },

                    MuiSelect: {
                        defaultProps: {
                            fullWidth: true,
                            size: 'small',
                        },
                    },

                    MuiButton: {
                        styleOverrides: {
                            root: {
                                boxShadow: 'none',
                                textTransform: 'none',
                                ':hover': {
                                    boxShadow: 'none',
                                },
                            },
                        },
                    },

                    MuiListItemIcon: {
                        styleOverrides: {
                            root: {
                                minWidth: '38px',
                                color: primary,
                            },
                        },
                    },

                    MuiListItem: {
                        styleOverrides: {
                            root: {
                                borderRadius: borderRadius + 'px',
                            },
                        },
                    },

                    MuiListItemButton: {
                        styleOverrides: {
                            root: {
                                borderRadius: borderRadius + 'px',

                                ':hover': {
                                    boxShadow: 'none',
                                },

                                '&.Mui-selected': {
                                    backgroundColor: alpha(primary, 0.2),

                                    '& .MuiButtonBase-root': {
                                        color: primary,
                                    },

                                    '& .MuiTypography-root': {
                                        color: primary,
                                        fontWeight: 500,
                                    },

                                    '& .MuiSvgIcon-root': {
                                        color: primary,
                                    },
                                },
                            },
                        },
                    },

                    MuiStepLabel: {
                        styleOverrides: {
                            root: {
                                '& .MuiSvgIcon-root': {
                                    width: '1.25em',
                                    height: '1.25em',
                                },
                            },
                            label: {
                                fontSize: '0.85rem',
                            },
                        },
                    },

                    MuiCard: {
                        styleOverrides: {
                            root: {
                                boxShadow: 'none',
                                backgroundImage: 'none',
                            },
                        },
                    },

                    MuiTableCell: {
                        styleOverrides: {
                            head: {
                                fontWeight: 600,
                            },
                        },
                    },

                    MuiTooltip: {
                        defaultProps: {
                            placement: 'bottom',
                            sx: {
                                fontSize: '13px',
                            },
                        },
                    },

                    MuiButtonGroup: {
                        styleOverrides: {
                            root: {
                                boxShadow: 'none',
                            },
                        },
                    },

                    MuiCardContent: {
                        styleOverrides: {
                            root: {
                                ':last-child': {
                                    paddingBottom: '16px',
                                },
                            },
                        },
                    },

                    MuiAutocomplete: {
                        styleOverrides: {
                            tag: ({ ownerState }) => ({
                                ...(ownerState.size === 'small' && {
                                    height: '22px',
                                }),
                            }),
                        },
                    },
                },
            }),

        [fontColor, fontDark, primary]
    )

    return useTheme
}
