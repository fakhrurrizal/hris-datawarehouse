import { axiosInterceptor } from '@/config'
import { GeneralOption, GeneralOptionsResponse } from '@/interfaces'
import { useDebounce } from '@/services'
import { ApiEndpoint, getApi } from '@/utils'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Button } from '@mui/material'
import MuiAutocomplete, { AutocompleteProps as MuiAutocompleteProps } from '@mui/material/Autocomplete'
import MuiTextField from '@mui/material/TextField'
import qs from 'query-string'
import { useEffect, useState } from 'react'
import { Control, Controller, FieldValues, Path, PathValue } from 'react-hook-form'
import { useInfiniteQuery } from 'react-query'

interface ServerSideAutoCompleteProps<Form extends FieldValues, Option, Response>
    extends Omit<MuiAutocompleteProps<Option, boolean, boolean, boolean>, 'name' | 'renderInput' | 'options'> {
    control: Control<Form>
    name: Path<Form>
    formatOptions?: (options: Response) => Option[]
    endpoint: ApiEndpoint
    onValueChange?: MuiAutocompleteProps<Option, boolean, boolean, boolean>['onChange']
    queryEndpoint?: Record<string, number | string | boolean | undefined>
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
    inputSize?: 'small' | 'medium'
    onChangeValueInput?: (value: string) => void
    inputRef?: any
    showAddButton?: () => void
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
        inputSize = 'small',
        onChangeValueInput,
        inputRef,
        showAddButton,
        ...muiAutoCompleteProps
    } = props

    const [open, setOpen] = useState<boolean>(false)

    const [inputValue, setInputValue] = useState<string>('')

    const [hasMore, setHasMore] = useState(true)

    const searchValue = useDebounce<string>(inputValue)

    const apiEndpoint = qs.stringifyUrl({
        url: idEndpoint ? `${getApi(endpoint)}/${idEndpoint}` : getApi(endpoint),
        query: {
            ...queryEndpoint,
            ...(searchValue ? { search: searchValue, limit: 20 } : { limit: 20 }),
        },
    })

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
        queryKey: ['autocomplete', apiEndpoint, excludeId],
        queryFn: async ({ pageParam = 1 }) => {
            const res: any = await axiosInterceptor.get<Response>(apiEndpoint, {
                params: {
                    // ...queryEndpoint,
                    // limit: 20,
                    ...(searchValue ? { search: searchValue } : {}),
                    page: pageParam,
                },
            })

            const options = excludeId
                ? (formatOptions(res?.data) as Option[])?.filter((item: any) => item?.id !== excludeId)
                : (formatOptions(res?.data) as Option[])

            setHasMore(options.length === 20)

            return options
        },
        getNextPageParam: (lastPage, allPages) => {
            return hasMore ? allPages.length + 1 : undefined
        },
        enabled: open,
    })

    const handleScroll = (event: React.SyntheticEvent) => {
        const listboxNode = event.currentTarget
        if (
            listboxNode.scrollTop + listboxNode.clientHeight >= listboxNode.scrollHeight - 50 &&
            hasNextPage &&
            !isFetchingNextPage
        ) {
            fetchNextPage()
        }
    }

    useEffect(() => {
        if (setTextSearch) {
            setTextSearch(searchValue)
        }
        // if (open) getData()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, searchValue])

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
                                        // setInputValue('')
                                        handleToggleFormAdd()
                                    }}
                                    startIcon={<AddCircleIcon />}
                                >
                                    {titleAddNewNoOption == '' ? `Tambah data ${inputValue}` : titleAddNewNoOption}
                                </Button>
                            ) : showAddButton ? (
                                <Button
                                    onClick={showAddButton}
                                    color='primary'
                                    fullWidth
                                    sx={{ justifyContent: 'flex-start', pl: 2, py: 0 }}
                                    startIcon={<AddCircleIcon />}
                                >
                                    Tambah Data Baru
                                </Button>
                            ) : (
                                'Tidak ada Data'
                            )
                        }
                        options={[
                            ...(data?.pages.flatMap((page: any) => page) || []),
                            ...(isFetchingNextPage ? ['loading data...' as any] : []),
                            ...(showAddButton ? [{ id: 'add_new', label: 'Tambah Data Baru' }] : []), // Tambahin opsi khusus
                        ]}
                        renderOption={(props, option: any) => {
                            if (option?.id === 'add_new') {
                                return (
                                    <li {...props} onClick={() => showAddButton?.()}>
                                        <Button
                                            color='primary'
                                            fullWidth
                                            sx={{ justifyContent: 'flex-start', py: 0 }}
                                            startIcon={<AddCircleIcon />}
                                        >
                                            Tambah Data Baru
                                        </Button>
                                    </li>
                                )
                            }
                            const label = typeof option == 'string' ? option : option?.label || option?.name

                            return <li {...props}>{label}</li>
                        }}
                        loading={isLoading || isFetchingNextPage}
                        ListboxProps={{
                            onScroll: handleScroll,
                            style: { maxHeight: '300px', overflow: 'auto' },
                        }}
                        filterSelectedOptions={filterSelectedOptions}
                        filterOptions={options => {
                            const filtered = options.filter(
                                (option: any) =>
                                    !selectedOptions.some((selectedOption: any) => selectedOption?.id == option.id)
                            )

                            if (titleAddNewFreeSolo !== '' && searchValue) {
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
                                inputRef={inputRef as any}
                                size={inputSize}
                                onChange={event => {
                                    const value = event.target.value
                                    setInputValue(value)
                                    if (onChangeValueInput) {
                                        onChangeValueInput(value) // Panggil props baru saat nilai berubah
                                    }
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
