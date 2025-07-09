import { DatePicker, DatePickerProps } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

export type PickerProps<T extends FieldValues = Record<string, any>> = Partial<DatePickerProps<Dayjs>> & {
    form: UseFormReturn<T>
    name: Path<T>
    label: string
}

export function DatePickerCustom<T extends FieldValues = Record<string, any>>(props: PickerProps<T>) {
    const { form, name, label, ...datePickerProps } = props

    const {
        watch,
        setValue,
        formState: { errors },
    } = form

    return (
        <DatePicker
            {...datePickerProps}
            sx={{ backgroundColor: 'white', borderRadius: 1, ...datePickerProps.sx }}
            label={label}
            value={watch(name) ? dayjs(watch(name)) : null}
            format='DD MMMM YYYY'
            onChange={newValue => {
                const formattedDate = newValue ? dayjs(newValue).format('YYYY-MM-DD') : ''
                setValue(name, formattedDate as any)
            }}
            slotProps={{
                textField: {
                    fullWidth: true,
                    helperText: errors[name]?.message as string,
                    error: !!errors[name],
                    size: 'small',
                    InputProps: { readOnly: true },
                    ...datePickerProps.slotProps?.textField,
                },
            }}
        />
    )
}
