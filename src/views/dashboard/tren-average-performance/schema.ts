import { z } from 'zod'

export const SalesFilterSchema = z
    .object({
        range: z.object({
            label: z.string().min(1, { message: 'wajib diisi' }),
            value: z.string(),
        }),
        start_date: z.string().optional(),
        end_date: z.string().optional(),
    })
    .transform(data => {
        const newData: any = data

        if (data?.range?.label === 'Custom') {
            newData.start_date = data.start_date
        } else {
            newData.start_date = data.range.value
        }

        return data
    })

export type schemaForm = z.infer<typeof SalesFilterSchema>
