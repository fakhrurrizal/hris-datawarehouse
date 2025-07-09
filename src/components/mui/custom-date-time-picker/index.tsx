import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'

export type PickerProps<T extends FieldValues = Record<string, any>> = Partial<DateTimePickerProps<Dayjs>> & {
    form: UseFormReturn<T>
    name: Path<T>
    label: string
    onChange?: DateTimePickerProps<Dayjs>['onChange']
}

export function DateTimePickerCustom<T extends FieldValues = Record<string, any>>(props: PickerProps<T>) {
    const { form, name, label, onChange, ...dateTimePickerProps } = props

    const {
        watch,
        setValue,
        formState: { errors },
    } = form

    return (
        <DateTimePicker
            {...dateTimePickerProps}
            sx={{ backgroundColor: 'white', borderRadius: 1, ...dateTimePickerProps.sx }}
            label={label}
            value={watch(name) ? dayjs(watch(name)) : null}
            format='DD MMMM YYYY HH:mm'
            ampm={false}
            onChange={(newValue, keyboardInputValue) => {
                if (onChange) {
                    onChange(newValue, keyboardInputValue)
                }
                const formattedDate = newValue ? dayjs(newValue).format('YYYY-MM-DD HH:mm') : ''
                setValue(name, formattedDate as any)
            }}
            slotProps={{
                textField: {
                    fullWidth: true,
                    helperText: errors[name]?.message as string,
                    error: !!errors[name],
                    size: 'small',
                    InputProps: { readOnly: true },
                    ...dateTimePickerProps.slotProps?.textField,
                },
            }}
        />
    )
}
