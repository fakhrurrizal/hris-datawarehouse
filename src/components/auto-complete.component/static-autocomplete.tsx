import { GeneralOption } from '@/interfaces'
import MuiAutocomplete, { AutocompleteProps as MuiAutocompleteProps } from '@mui/material/Autocomplete'
import MuiTextField from '@mui/material/TextField'
import { Control, Controller, FieldValues, Path, PathValue } from 'react-hook-form'

interface StaticAutoCompleteProps<Form extends FieldValues, Option>
    extends Omit<MuiAutocompleteProps<Option, boolean, boolean, boolean>, 'name' | 'renderInput'> {
    control: Control<Form>
    name: Path<Form>
    label: string
    onValueChange?: MuiAutocompleteProps<Option, boolean, boolean, boolean>['onChange']
    variant?: 'outlined' | 'filled' | 'standard'
    readOnly?: boolean
    placeholder?: string
}

export function StaticAutoComplete<Form extends FieldValues, Option = GeneralOption>(
    props: StaticAutoCompleteProps<Form, Option>
) {
    const {
        control,
        label,
        name,
        onValueChange,
        variant = 'outlined',
        readOnly = false,
        placeholder = `Pilih ${label}...`,
        ...muiAutoCompleteProps
    } = props

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                const { onChange, ...moreField } = field

                const error = Boolean(fieldState?.error)
                const helperText = fieldState?.error?.message

                return (
                    <MuiAutocomplete<Option, boolean, boolean, boolean>
                        {...moreField}
                        {...muiAutoCompleteProps}
                        size='small'
                        readOnly={readOnly}
                        forcePopupIcon={!readOnly}
                        onChange={(e, value, ...restEvent) => {
                            if (onValueChange) {
                                onValueChange(e, value, ...restEvent)
                            }

                            onChange(value as unknown as React.ChangeEvent<Element> | PathValue<Form, Path<Form>>)
                        }}
                        componentsProps={{
                            popper: {
                                sx: {
                                    zIndex: 10000,
                                },
                            },
                        }}
                        renderInput={params => (
                            <MuiTextField
                                {...params}
                                label={props.label}
                                error={error}
                                helperText={helperText}
                                variant={variant}
                                InputLabelProps={{ shrink: true }}
                                placeholder={readOnly ? undefined : placeholder}
                            />
                        )}
                    />
                )
            }}
        />
    )
}
