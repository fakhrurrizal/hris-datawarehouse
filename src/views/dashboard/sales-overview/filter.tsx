import { Grid } from '@mui/material'
import dayjs from 'dayjs'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { schemaForm } from './schema'
import { ModalCustom } from '@/components/custom-modal'
import { StaticAutoComplete } from '@/components'
import { DatePickerCustom } from '@/components/mui/custom-date-picker'
import { queryClient } from '@/pages/_app'

interface Props {
    open: boolean
    toggle: () => void
    form: UseFormReturn<schemaForm>
    setStartDate: Dispatch<SetStateAction<string>>
    setEndDate: Dispatch<SetStateAction<string>>
}

const options = [
    { label: 'Hari Ini', value: dayjs().format('YYYY-MM-DD') },
    { label: '1 Minggu', value: dayjs().subtract(1, 'week').format('YYYY-MM-DD') },
    { label: '1 Bulan', value: dayjs().subtract(1, 'month').format('YYYY-MM-DD') },
    { label: 'Custom', value: 'custom' },
]

const FilterSales = ({ open, setStartDate, setEndDate, toggle, form }: Props) => {
    const { control, handleSubmit, watch, reset, setValue } = form

    const onSubmit = async (data: schemaForm) => {
        setStartDate(String(data?.start_date))
        setEndDate(String(data?.end_date))
        toggle()
    }

    const handleDelete = () => {
        queryClient.invalidateQueries({ queryKey: ['LIST_DASHBOARD_SALE_BRANCH'] })
        queryClient.invalidateQueries({ queryKey: ['LIST_DASHBOARD_LINE_CHART'] })
        queryClient.invalidateQueries({ queryKey: ['LIST_DASHBOARD_SCORECARD'] })
        queryClient.invalidateQueries({ queryKey: ['LIST_DASHBOARD_PRODUCT_SOLD_CHART'] })

        const defaultStart = dayjs().subtract(1, 'week').format('YYYY-MM-DD')
        const defaultEnd = dayjs().format('YYYY-MM-DD')

        reset({
            branch_id: null,
            start_date: defaultStart,
            end_date: defaultEnd,
            range: { label: '1 Minggu', value: defaultStart },
        })

        setStartDate(defaultStart)
        setEndDate(defaultEnd)
        toggle()
    }

    const endDateRange = watch('range')
    useEffect(() => {
        const selectedRange = endDateRange
        if (!selectedRange || selectedRange.label === 'Custom') return

        const startDate = selectedRange.value
        const endDate = dayjs().format('YYYY-MM-DD')

        setValue('start_date', startDate)
        setValue('end_date', endDate)
    }, [endDateRange, setValue])

    return (
        <ModalCustom
            open={open}
            toggle={toggle}
            handleDelete={handleDelete}
            buttonDeleteProps={{ children: 'Reset', onClick: handleDelete }}
            title='Filter'
            buttonOkProps={{ onClick: handleSubmit(onSubmit), children: 'Filter' }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <StaticAutoComplete
                        options={options}
                        control={control}
                        label='Pilih Filter'
                        name='range'
                        disableClearable
                    />
                </Grid>

                {watch('range')?.label === 'Custom' ? (
                    <>
                        <Grid item xs={12} md={6}>
                            <DatePickerCustom
                                form={form}
                                maxDate={dayjs(watch('end_date'))}
                                name='start_date'
                                label='Tanggal Mulai'
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DatePickerCustom
                                form={form}
                                minDate={dayjs(watch('start_date'))}
                                maxDate={dayjs()}
                                name='end_date'
                                label='Tanggal Selesai'
                            />
                        </Grid>
                    </>
                ) : null}
            </Grid>
        </ModalCustom>
    )
}

export default FilterSales
