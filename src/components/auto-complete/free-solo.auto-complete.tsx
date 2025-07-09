import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import Autocomplete, { AutocompleteProps as MuiAutocompleteProps } from '@mui/material/Autocomplete'
import { MUITextField } from '@/components'
import { Chip } from '@mui/material'
import { useState } from 'react'

interface FreeSoloAutoCompleteProps<Form extends FieldValues>
    extends Omit<MuiAutocompleteProps<any, boolean, boolean, boolean>, 'name' | 'renderInput' | 'options'> {
    control: Control<Form>
    name: Path<Form>
    variant?: 'outlined' | 'standard' | 'filled'
    readOnly?: boolean
    label: string
    defaultValue?: any
    placeholder?: string
    hintText?: string
}

export const FreeSoloAutoComplete = <Form extends FieldValues>(props: FreeSoloAutoCompleteProps<Form>): JSX.Element => {
    const {
        control,
        name,
        variant,
        readOnly,
        label,
        defaultValue = [],
        placeholder = `Ketik ${label.toLowerCase()} lalu tekan enter...`,
        hintText = '',
        ...muiAutoCompleteProps
    } = props
    const [inputValue, setInputValue] = useState('')

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                const { onChange, ...moreField } = field

                const error = Boolean(fieldState?.error)
                const helperText = fieldState?.error?.message

                return (
                    <>
                        <Autocomplete
                            {...muiAutoCompleteProps}
                            {...moreField}
                            fullWidth
                            multiple
                            freeSolo
                            value={field.value || []}
                            readOnly={readOnly}
                            defaultValue={defaultValue}
                            componentsProps={{
                                popper: {
                                    sx: {
                                        zIndex: 10000,
                                    },
                                },
                            }}
                            options={[]}
                            onInputChange={(event, newValue) => {
                                setInputValue(newValue)
                            }}
                            onChange={(event, newValue) => {
                                onChange(newValue)
                            }}
                            onKeyDown={event => {
                                if (event.key === 'Enter' && inputValue) {
                                    const newValue = [...(field.value || []), inputValue]
                                    field.onChange(newValue)
                                    setInputValue('')
                                    event.preventDefault()
                                }
                            }}
                            renderInput={params => (
                                <MUITextField
                                    {...params}
                                    variant={variant}
                                    sx={{
                                        fontSize: 12,
                                        '& .MuiInputBase-input:hover': {
                                            cursor: readOnly ? 'default' : '',
                                        },
                                    }}
                                    label={label}
                                    error={error}
                                    size='small'
                                    helperText={helperText}
                                    InputProps={{
                                        ...params.InputProps,
                                    }}
                                    placeholder={readOnly ? undefined : placeholder}
                                />
                            )}
                            renderTags={(value: any, getTagProps) =>
                                value.map((option: string, index: number) => (
                                    <Chip
                                        sx={{ height: '20px' }}
                                        size='small'
                                        label={option}
                                        {...getTagProps({ index })}
                                        key={index}
                                    />
                                ))
                            }
                        />
                        {!readOnly && (
                            <p className='text-[11px] ml-2 text-gray-500 mt-[1px]'>
                                {hintText || ` * Tekan enter untuk memasukkan ${label.toLowerCase()}`}
                            </p>
                        )}
                    </>
                )
            }}
        />
    )
}
