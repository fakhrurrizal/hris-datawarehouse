import { axiosInterceptor } from '@/config'
import { GeneralOption, GeneralOptionsResponse } from '@/interfaces'
import { ApiEndpoint, getApi } from '@/utils'
import MuiAutocomplete, { AutocompleteProps as MuiAutocompleteProps } from '@mui/material/Autocomplete'
import MuiTextField from '@mui/material/TextField'
import qs from 'query-string'
import { useEffect, useState } from 'react'
import { Control, Controller, FieldValues, Path, PathValue } from 'react-hook-form'
import { useQuery } from 'react-query'

interface ClientSideAutoCompleteProps<Form extends FieldValues, Option, Response>
    extends Omit<MuiAutocompleteProps<Option, boolean, boolean, boolean>, 'name' | 'renderInput' | 'options'> {
    control: Control<Form>
    name: Path<Form>
    formatOptions?: (options: Response) => Option[]
    endpoint: ApiEndpoint
    onValueChange?: MuiAutocompleteProps<Option, boolean, boolean, boolean>['onChange']
    queryEndpoint?: Record<string, number | string | boolean>
    idEndpoint?: string | number
    label?: string
}

export function ClientSideAutoComplete<
    Form extends FieldValues,
    Option = GeneralOption,
    Response = GeneralOptionsResponse,
>(props: ClientSideAutoCompleteProps<Form, Option, Response>) {
    const {
        control,
        name,
        endpoint,
        idEndpoint,
        queryEndpoint = {},
        formatOptions = res => (res as GeneralOptionsResponse).data,
        onValueChange,
        label = '',
        ...muiAutoCompleteProps
    } = props

    const [open, setOpen] = useState<boolean>(false)

    const apiEndpoint = qs.stringifyUrl({
        url: idEndpoint ? `${getApi(endpoint)}/${idEndpoint}` : getApi(endpoint),
        query: queryEndpoint,
    })

    const {
        data = [],
        refetch: getData,
        isLoading,
    } = useQuery<Option[]>({
        queryFn: async () => {
            const res = await axiosInterceptor.get<Response>(apiEndpoint)

            const options = formatOptions(res.data)

            return options as Option[]
        },

        queryKey: [apiEndpoint],

        enabled: false,
    })

    useEffect(() => {
        if (open) getData()
    }, [open, getData])

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
                        options={data}
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                        loading={isLoading}
                        renderInput={params => (
                            <MuiTextField
                                {...params}
                                label={label}
                                error={error}
                                helperText={helperText}
                                InputLabelProps={{ shrink: true }}
                                size='small'
                                placeholder={`Pilih ${label}`}
                            />
                        )}
                    />
                )
            }}
        />
    )
}
