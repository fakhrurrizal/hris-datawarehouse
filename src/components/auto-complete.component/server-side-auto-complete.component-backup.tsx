import { useEffect, useState } from 'react'
import { Control, Controller, FieldValues, Path, PathValue } from 'react-hook-form'
import { useQuery } from 'react-query'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { ApiEndpoint, getApi } from '@/utils'
import MuiAutocomplete, { AutocompleteProps as MuiAutocompleteProps } from '@mui/material/Autocomplete'
import MuiTextField from '@mui/material/TextField'
import { GeneralOption, GeneralOptionsResponse } from '@/interfaces'
import { useDebounce } from '@/services'
import qs from 'query-string'
import { axiosInterceptor } from '@/config'
import { Button } from '@mui/material'

interface ServerSideAutoCompleteProps<Form extends FieldValues, Option, Response>
    extends Omit<MuiAutocompleteProps<Option, boolean, boolean, boolean>, 'name' | 'renderInput' | 'options'> {
    control: Control<Form>
    name: Path<Form>
    formatOptions?: (options: Response) => Option[]
    endpoint: ApiEndpoint
    onValueChange?: MuiAutocompleteProps<Option, boolean, boolean, boolean>['onChange']
    queryEndpoint?: Record<string, number | string | boolean>
    idEndpoint?: string | number
    label?: string
    disabled?: boolean
    readOnly?: boolean
    defaultValue?: any
    placeholder?: string
    setTextSearch?: (searchValue: any) => void
    excludeId?: number
    selectedOptions?: any
    handleToggleFormAdd?: any
    titleAddNewFreeSolo?: any
    titleAddNewNoOption?: any
    handleToggleFormAddFreeSolo?: any
    filterSelectedOptions?: boolean
}

export function ServerSideAutoComplete<
    Form extends FieldValues,
    Option = GeneralOption,
    Response = GeneralOptionsResponse,
>(props: ServerSideAutoCompleteProps<Form, Option, Response>) {
    const {
        control,
        name,
        endpoint,
        idEndpoint,
        disabled,
        queryEndpoint = {},
        formatOptions = res => (res as GeneralOptionsResponse).data,
        onValueChange,
        label = '',
        readOnly = false,
        defaultValue = null,
        placeholder = `Pilih ${label}...`,
        setTextSearch,
        excludeId,
        selectedOptions = [],
        handleToggleFormAdd,
        titleAddNewFreeSolo = '',
        titleAddNewNoOption = '',
        handleToggleFormAddFreeSolo,
        filterSelectedOptions = true,
        ...muiAutoCompleteProps
    } = props

    const [open, setOpen] = useState<boolean>(false)

    const [inputValue, setInputValue] = useState<string>('')

    const searchValue = useDebounce<string>(inputValue)

    const apiEndpoint = qs.stringifyUrl({
        url: idEndpoint ? `${getApi(endpoint)}/${idEndpoint}` : getApi(endpoint),
        query: {
            ...queryEndpoint,
            ...(searchValue ? { search: searchValue, limit: 20 } : { limit: 20 }),
        },
    })

    const {
        data = [],
        refetch: getData,
        isLoading,
    } = useQuery<Option[]>({
        queryFn: async () => {
            const res: any = await axiosInterceptor.get<Response>(apiEndpoint)

            const options = excludeId
                ? (formatOptions(res?.data) as Option[])?.filter((item: any) => item?.id !== excludeId)
                : (formatOptions(res?.data) as Option[])

            return options as Option[]
        },

        queryKey: [apiEndpoint, excludeId],

        enabled: false,
    })

    useEffect(() => {
        if (setTextSearch) {
            setTextSearch(searchValue)
        }
        if (open) getData()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, searchValue, getData])

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
                        {...muiAutoCompleteProps}
                        {...moreField}
                        value={field.value}
                        readOnly={readOnly}
                        defaultValue={defaultValue}
                        onChange={(e, value: any, ...restEvent) => {
                            const valueType = typeof value?.[value?.length - 1 || 0]

                            if (valueType == 'string') {
                                handleToggleFormAddFreeSolo()

                                return
                            }

                            if (onValueChange) {
                                onValueChange(e, value, ...restEvent)
                            }
                            setInputValue('')

                            onChange(value as unknown as React.ChangeEvent<Element> | PathValue<Form, Path<Form>>)
                        }}
                        componentsProps={{
                            popper: {
                                sx: {
                                    zIndex: 10000,
                                },
                            },
                        }}
                        noOptionsText={
                            handleToggleFormAdd && inputValue !== '' ? (
                                <Button
                                    color='primary'
                                    fullWidth
                                    sx={{ justifyContent: 'flex-start', pl: 2, py: 0 }}
                                    onMouseDown={event => {
                                        event.preventDefault()
                                        event.stopPropagation()
                                        handleToggleFormAdd()
                                    }}
                                    startIcon={<AddCircleIcon />}
                                >
                                    {titleAddNewNoOption == '' ? `Tambah data ${inputValue}` : titleAddNewNoOption}
                                </Button>
                            ) : (
                                'Tidak ada Data'
                            )
                        }
                        options={data}
                        filterSelectedOptions={filterSelectedOptions}
                        filterOptions={options => {
                            const filtered = options.filter(
                                (option: any) =>
                                    !selectedOptions.some((selectedOption: any) => selectedOption?.id == option.id)
                            )

                            if (titleAddNewFreeSolo !== '' && searchValue && options?.length <= 0) {
                                filtered.push(`Tambah "${searchValue}"` as any)
                            }

                            return filtered
                        }}
                        disabled={disabled}
                        onOpen={() => setOpen(true)}
                        onClose={() => {
                            setInputValue('')
                            setOpen(false)
                        }}
                        loading={isLoading}
                        forcePopupIcon={!readOnly}
                        renderInput={params => (
                            <MuiTextField
                                variant={'outlined'}
                                sx={{
                                    fontSize: 12,
                                    '& .MuiInputBase-input:hover': {
                                        cursor: readOnly ? 'default' : '',
                                    },
                                }}
                                {...params}
                                label={label}
                                error={error}
                                size='small'
                                onChange={event => {
                                    setInputValue(event.target.value)
                                }}
                                helperText={helperText}
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
