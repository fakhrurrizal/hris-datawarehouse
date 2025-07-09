import { StaticAutoComplete } from '@/components/auto-complete.component'
import { UseFormReturn } from 'react-hook-form'
import dayjs from 'dayjs'
import { Grid } from '@mui/material'
import { schemaForm } from './schema'
import { Dispatch, SetStateAction } from 'react'
import { ModalCustom } from '@/components/custom-modal'
import { DatePickerCustom } from '@/components/mui/custom-date-picker'

interface Props {
    open: boolean
    toggle: () => void
    form: UseFormReturn<schemaForm>
    setStartDate: Dispatch<SetStateAction<string>>
    setEndDate: Dispatch<SetStateAction<string>>
    refetchFilter?: any
    setRange: Dispatch<SetStateAction<string>>
}

const options = [
    { label: 'Hari Ini', value: dayjs().format('YYYY-MM-DD') },
    { label: '1 Minggu yang Lalu', value: dayjs().subtract(1, 'week').format('YYYY-MM-DD') },
    { label: '1 Bulan yang Lalu', value: dayjs().subtract(1, 'month').format('YYYY-MM-DD') },
    { label: 'Custom', value: 'custom' },
]

const FilterSalesStatistik = ({ setRange, open, setStartDate, setEndDate, toggle, form, refetchFilter }: Props) => {
    const { control, handleSubmit, watch, reset } = form

    const onSubmit = async (data: schemaForm) => {
        setStartDate(String(data?.start_date))
        setRange(data?.range?.label)
        setEndDate(String(data?.end_date))
        toggle()

        if (refetchFilter) {
            refetchFilter()
        }
    }

    const handleDelete = () => {
        reset({
            start_date: dayjs().format('YYYY-MM-DD'),
            end_date: dayjs().format('YYYY-MM-DD'),
            range: { label: 'Hari Ini', value: dayjs().format('YYYY-MM-DD') },
        })
        toggle()

        if (refetchFilter) {
            refetchFilter()
        }
    }

    return (
        <ModalCustom
            open={open}
            toggle={toggle}
            handleDelete={handleDelete}
            buttonDeleteProps={{ children: 'Reset' }}
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
                {watch('range')?.label === 'Custom' && (
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
                )}
            </Grid>
        </ModalCustom>
    )
}

export default FilterSalesStatistik
