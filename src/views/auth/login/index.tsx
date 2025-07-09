import { CustomTextField } from '@/components'
import { axiosInterceptor } from '@/config'
import { useLoginMutation } from '@/modules/auth/login'
import { useAuth } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon } from '@iconify/react'
import { Box, Button, Card, CardContent, Grid, Typography, Container, Fade, Slide } from '@mui/material'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// Schema Zod untuk validasi Login
const loginSchema = z.object({
    email: z.string().min(1, 'Email wajib diisi').email('Email tidak valid'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
})

type LoginFormData = z.infer<typeof loginSchema>

const LoginComponent: React.FC = () => {
    const router = useRouter()
    const [isVisible, setIsVisible] = useState(false)

    const { mutateAsync: login, isLoading: isLoadingLogin } = useLoginMutation()
    const setAuth = useAuth(state => state.setAuth)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const onSubmit = async (data: LoginFormData) => {
        try {
            const res = await login(data)
            const user = res?.data?.user
            const accessToken = 'Bearer ' + res?.data?.access_token
            setAuth({ accessToken, user })
            axiosInterceptor.defaults.headers.common['Authorization'] = accessToken
            axios.defaults.headers.common['Authorization'] = accessToken
            router.push('/')
        } catch (error) {
            console.error('Login error:', error)
        }
    }

    return (
        <div className='min-h-screen relative overflow-hidden'>
            {/* Elegant Light Blue Background */}
            <div className='absolute inset-0'>
                {/* Subtle Light Blue Gradient Background */}
                <div
                    className='absolute inset-0'
                    style={{
                        background:
                            'linear-gradient(135deg, #f8fafc 0%, #e1f5fe 25%, #f0f9ff 50%, #fafbff 75%, #ffffff 100%)',
                    }}
                />

                {/* Elegant Geometric Patterns */}
                <div className='absolute inset-0'>
                    {/* Subtle geometric shapes */}
                    <div
                        className='absolute opacity-5'
                        style={{
                            width: '400px',
                            height: '400px',
                            background: 'linear-gradient(45deg, #3b82f6, #1e40af)',
                            borderRadius: '50%',
                            top: '-200px',
                            left: '-200px',
                            animation: 'gentleFloat 20s ease-in-out infinite',
                        }}
                    />
                    <div
                        className='absolute opacity-5'
                        style={{
                            width: '300px',
                            height: '300px',
                            background: 'linear-gradient(45deg, #60a5fa, #3b82f6)',
                            borderRadius: '50%',
                            top: '10%',
                            right: '-150px',
                            animation: 'gentleFloat 25s ease-in-out infinite reverse',
                        }}
                    />
                    <div
                        className='absolute opacity-5'
                        style={{
                            width: '200px',
                            height: '200px',
                            background: 'linear-gradient(45deg, #93c5fd, #60a5fa)',
                            borderRadius: '50%',
                            bottom: '20%',
                            left: '10%',
                            animation: 'gentleFloat 30s ease-in-out infinite',
                        }}
                    />

                    {/* Elegant lines/strokes */}
                    <div
                        className='absolute opacity-10'
                        style={{
                            width: '2px',
                            height: '200px',
                            background: 'linear-gradient(to bottom, transparent, #3b82f6, transparent)',
                            top: '20%',
                            left: '15%',
                            animation: 'gentleFloat 15s ease-in-out infinite',
                        }}
                    />
                    <div
                        className='absolute opacity-10'
                        style={{
                            width: '2px',
                            height: '150px',
                            background: 'linear-gradient(to bottom, transparent, #60a5fa, transparent)',
                            top: '40%',
                            right: '20%',
                            animation: 'gentleFloat 18s ease-in-out infinite reverse',
                        }}
                    />
                </div>

                {/* Subtle mesh pattern overlay */}
                <div
                    className='absolute inset-0'
                    style={{
                        background: `
                            radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, rgba(147, 197, 253, 0.03) 0%, transparent 50%),
                            radial-gradient(circle at 40% 70%, rgba(96, 165, 250, 0.02) 0%, transparent 50%)
                        `,
                    }}
                />
            </div>

            {/* Main Content */}
            <Container maxWidth='sm' className='relative z-10 min-h-screen flex items-center justify-center py-8'>
                <Fade in={isVisible} timeout={1000}>
                    <Card
                        sx={{
                            background: 'rgba(255, 255, 255, 0.85)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '20px',
                            boxShadow: '0 25px 50px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.6)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            width: '100%',
                            maxWidth: '450px',
                            overflow: 'visible',
                            position: 'relative',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '1px',
                                background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent)',
                            },
                        }}
                    >
                        <CardContent sx={{ p: 6 }}>
                            <Slide direction='down' in={isVisible} timeout={1200}>
                                <Box className='text-center mb-8'>
                                    {/* Logo with elegant glow effect */}
                                    <Box
                                        className='inline-block p-4 rounded-full mb-6 relative'
                                        sx={{
                                            background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                                            boxShadow:
                                                '0 15px 35px rgba(59, 130, 246, 0.25), 0 5px 15px rgba(59, 130, 246, 0.2)',
                                            '&::before': {
                                                content: '""',
                                                position: 'absolute',
                                                top: '-2px',
                                                left: '-2px',
                                                right: '-2px',
                                                bottom: '-2px',
                                                background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
                                                borderRadius: '50%',
                                                zIndex: -1,
                                                opacity: 0.5,
                                            },
                                        }}
                                    >
                                        <Image
                                            src='/Logo.png'
                                            alt='Logo'
                                            width={60}
                                            height={60}
                                            className='filter brightness-0 invert'
                                        />
                                    </Box>

                                    {/* Welcome Text with elegant styling */}
                                    <Typography
                                        variant='h4'
                                        className='font-bold mb-2'
                                        sx={{
                                            background:
                                                'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                            fontSize: '2.2rem',
                                            fontWeight: '700',
                                            letterSpacing: '-0.025em',
                                            textShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
                                        }}
                                    >
                                        Selamat Datang
                                    </Typography>

                                    <Typography
                                        variant='body1'
                                        sx={{
                                            color: '#475569',
                                            fontSize: '1rem',
                                            fontWeight: '400',
                                            letterSpacing: '0.025em',
                                        }}
                                    >
                                        Silakan masuk ke akun Anda
                                    </Typography>
                                </Box>
                            </Slide>

                            <Slide direction='up' in={isVisible} timeout={1400}>
                                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <Box className='relative'>
                                                <CustomTextField
                                                    control={control}
                                                    size='medium'
                                                    error={!!errors.email}
                                                    name='email'
                                                    label='Email*'
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: '12px',
                                                            backgroundColor: 'rgba(248, 250, 252, 0.8)',
                                                            transition: 'all 0.3s ease',
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(248, 250, 252, 1)',
                                                                transform: 'translateY(-1px)',
                                                                boxShadow: '0 5px 15px rgba(59, 130, 246, 0.1)',
                                                            },
                                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: '#3b82f6',
                                                                borderWidth: '2px',
                                                            },
                                                            '&.Mui-focused': {
                                                                backgroundColor: 'rgba(248, 250, 252, 1)',
                                                                transform: 'translateY(-1px)',
                                                                boxShadow: '0 5px 15px rgba(59, 130, 246, 0.15)',
                                                            },
                                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: '#3b82f6',
                                                                borderWidth: '2px',
                                                            },
                                                        },
                                                        '& .MuiInputLabel-root': {
                                                            color: '#64748b',
                                                            fontWeight: '500',
                                                            '&.Mui-focused': {
                                                                color: '#3b82f6',
                                                            },
                                                        },
                                                    }}
                                                />
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Box className='relative'>
                                                <CustomTextField
                                                    control={control}
                                                    inputFormat='PASSWORD'
                                                    size='medium'
                                                    error={!!errors.password}
                                                    placeholder='••••••••'
                                                    name='password'
                                                    label='Password*'
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: '12px',
                                                            backgroundColor: 'rgba(248, 250, 252, 0.8)',
                                                            transition: 'all 0.3s ease',
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(248, 250, 252, 1)',
                                                                transform: 'translateY(-1px)',
                                                                boxShadow: '0 5px 15px rgba(59, 130, 246, 0.1)',
                                                            },
                                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: '#3b82f6',
                                                                borderWidth: '2px',
                                                            },
                                                            '&.Mui-focused': {
                                                                backgroundColor: 'rgba(248, 250, 252, 1)',
                                                                transform: 'translateY(-1px)',
                                                                boxShadow: '0 5px 15px rgba(59, 130, 246, 0.15)',
                                                            },
                                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: '#3b82f6',
                                                                borderWidth: '2px',
                                                            },
                                                        },
                                                        '& .MuiInputLabel-root': {
                                                            color: '#64748b',
                                                            fontWeight: '500',
                                                            '&.Mui-focused': {
                                                                color: '#3b82f6',
                                                            },
                                                        },
                                                    }}
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>

                                    <Box className='pt-4'>
                                        <Button
                                            type='submit'
                                            fullWidth
                                            variant='contained'
                                            disabled={isLoadingLogin}
                                            sx={{
                                                background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
                                                position: 'relative',
                                                '&::before': {
                                                    content: '""',
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                                                    borderRadius: '12px',
                                                    opacity: 0,
                                                    transition: 'opacity 0.3s ease',
                                                },
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow:
                                                        '0 15px 35px rgba(59, 130, 246, 0.4), 0 5px 15px rgba(59, 130, 246, 0.3)',
                                                },
                                                '&:hover::before': {
                                                    opacity: 1,
                                                },
                                                '&:active': {
                                                    transform: 'translateY(0px)',
                                                },
                                                borderRadius: '12px',
                                                height: '52px',
                                                fontSize: '16px',
                                                fontWeight: '600',
                                                textTransform: 'none',
                                                color: '#ffffff',
                                                boxShadow: '0 8px 25px rgba(59, 130, 246, 0.35)',
                                                transition: 'all 0.3s ease',
                                                zIndex: 1,
                                            }}
                                        >
                                            <Box sx={{ position: 'relative', zIndex: 2 }}>
                                                {isLoadingLogin ? (
                                                    <Box className='flex items-center gap-2'>
                                                        <Icon icon='mdi:loading' className='animate-spin' />
                                                        Memproses...
                                                    </Box>
                                                ) : (
                                                    <Box className='flex items-center gap-2'>
                                                        <Icon icon='mdi:login' />
                                                        Masuk
                                                    </Box>
                                                )}
                                            </Box>
                                        </Button>
                                    </Box>
                                </form>
                            </Slide>

                            <Box className='text-center mt-8'>
                                <Typography
                                    variant='body2'
                                    sx={{
                                        color: '#64748b',
                                        fontSize: '14px',
                                        fontWeight: '400',
                                    }}
                                ></Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Fade>
            </Container>

            {/* Custom CSS for elegant animations */}
            <style jsx>{`
                @keyframes gentleFloat {
                    0%,
                    100% {
                        transform: translateY(0px) rotate(0deg) scale(1);
                        opacity: 0.05;
                    }
                    33% {
                        transform: translateY(-10px) rotate(2deg) scale(1.05);
                        opacity: 0.08;
                    }
                    66% {
                        transform: translateY(5px) rotate(-1deg) scale(0.95);
                        opacity: 0.03;
                    }
                }

                @keyframes shimmer {
                    0% {
                        background-position: -200px 0;
                    }
                    100% {
                        background-position: 200px 0;
                    }
                }
            `}</style>
        </div>
    )
}

export default LoginComponent
