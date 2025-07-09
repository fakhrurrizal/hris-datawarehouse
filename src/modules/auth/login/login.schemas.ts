import { z } from 'zod'

const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/

export const loginSchema = z.object({
    email: z.string().min(1, { message: 'Harus di isi' }).regex(emailPattern, { message: 'Email tidak valid' }),

    password: z.string().min(1, { message: 'Harus di isi' }),
})

export type LoginForm = z.infer<typeof loginSchema>
