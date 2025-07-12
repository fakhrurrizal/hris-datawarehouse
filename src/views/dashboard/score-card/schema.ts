import { z } from 'zod'

export const SalesFilterSchema = z
    .object({
        range: z.object({
            label: z.string().optional(),
            value: z.string().optional(),
        }),
        start_date: z.string().optional(),
        end_date: z.string().optional(),
        department_id: z
            .object({
                id: z.number().optional(),
                label: z.string().optional(),
            })
            .nullable()
            .optional(),
    })
    .transform(data => {
        const newData: any = data

        if (data?.range?.label === 'Custom') {
            newData.start_date = data.start_date
        } else {
            newData.start_date = data.range.value
        }

        if (data.department_id) {
            newData.department_id = data.department_id.id
        }

        return data
    })

export type schemaForm = z.infer<typeof SalesFilterSchema>
