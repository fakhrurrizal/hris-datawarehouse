import { Grid } from '@mui/material'
import dayjs from 'dayjs'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { schemaForm } from './schema'
import { ModalCustom } from '@/components/custom-modal'
import { ServerSideAutoComplete, StaticAutoComplete } from '@/components'
import { DatePickerCustom } from '@/components/mui/custom-date-picker'
import { queryClient } from '@/pages/_app'

interface Props {
    open: boolean
    toggle: () => void
    form: UseFormReturn<schemaForm>
    setStartDate: Dispatch<SetStateAction<string>>
    setEndDate: Dispatch<SetStateAction<string>>
    setDepartment: Dispatch<SetStateAction<string>>
}

const options = [
    { label: '1 Bulan Terakhir', value: dayjs().subtract(1, 'month').format('YYYY-MM-DD') },
    { label: '1 Tahun Terakhir', value: dayjs().subtract(1, 'year').format('YYYY-MM-DD') },
    { label: '3 Tahun Terakhir', value: dayjs().subtract(3, 'year').format('YYYY-MM-DD') },
    { label: 'Custom', value: 'custom' },
]

const FilterSales = ({ open, setStartDate, setEndDate, toggle, form, setDepartment }: Props) => {
    const { control, handleSubmit, watch, reset, setValue } = form

    const onSubmit = async (data: schemaForm) => {
        setStartDate(String(data?.start_date))
        setEndDate(String(data?.end_date))
        setDepartment(String(watch("department_id")?.id))
        toggle()
    }

    const handleDelete = () => {
        queryClient.invalidateQueries({ queryKey: ['LIST_DASHBOARD_SCORECARD'] })
        queryClient.invalidateQueries({ queryKey: ['LIST_DASHBOARD_LINE_CHART'] })
        queryClient.invalidateQueries({ queryKey: ['LIST_DASHBOARD_EMPLOYEE_PER_RECRUITMENT_SOURCE'] })
        queryClient.invalidateQueries({ queryKey: ['LIST_DASHBOARD_LINE_CHART_performance_score'] })
        queryClient.invalidateQueries({ queryKey: ['LIST_DASHBOARD_AVERAGE_PERFORMANCE_SCORE_PER_DEPARTMENT'] })
        queryClient.invalidateQueries({ queryKey: ['LIST_DASHBOARD_EMP_SATISFACTION_PER_POSITION'] })
        queryClient.invalidateQueries({ queryKey: ['LIST_DASHBOARD_PIE_CHART_EMPLOYEE_TERMINATION_RATIO'] })
        queryClient.invalidateQueries({ queryKey: ['LIST_DASHBOARD_AVERAGE_SALARY_PER_POSITION'] })
        queryClient.invalidateQueries({ queryKey: ['LIST_DASHBOARD_AVERAGE_SALARY_PER_DEPARTMENT'] })
        queryClient.invalidateQueries({ queryKey: ['LIST_DASHBOARD_EMPLOYEE_PER_DEPARTMENT'] })
        queryClient.invalidateQueries({ queryKey: ['LIST_DASHBOARD_EMPLOYEE_PER_POSITION'] })
        queryClient.invalidateQueries({ queryKey: ['LIST_DASHBOARD_SALARY_COMPARISON'] })
        queryClient.invalidateQueries({ queryKey: ['LIST_DASHBOARD_EMPLOYEE_PER_GENDER'] })
        queryClient.invalidateQueries({ queryKey: ['LIST_EMPLOYEE'] })
        queryClient.invalidateQueries({ queryKey: ['LIST_DASHBOARD_EMPLOYEE_MARITAL_STATUS'] })
        queryClient.invalidateQueries({ queryKey: ['LIST_DASHBOARD_EMPLOYEE_AGE'] })

        const defaultStart = ''
        const defaultEnd = ''
        setDepartment('')
        reset({
            department_id: null,
            start_date: defaultStart,
            end_date: defaultEnd,
            range: { label: '', value: defaultStart },
        })

        setStartDate(defaultStart)
        setEndDate(defaultEnd)
        toggle()
    }

    const endDateRange = watch('range')
    useEffect(() => {
        const selectedRange = endDateRange

        if (
            !selectedRange ||
            selectedRange.label === '' ||
            selectedRange.value === ''
        ) {
            setValue('start_date', '')
            setValue('end_date', '')

            return
        }

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
                    <ServerSideAutoComplete<schemaForm, { id: number; label: string }, any>
                        control={control}
                        endpoint='dim_department'
                        name='department_id'
                        label='Departemen'
                        formatOptions={response => {
                            const options = response.data

                            if (!options) return []

                            return options.map((option: any) => ({
                                id: option.dept_id,
                                label: option.department,
                            }))
                        }}
                    />
                </Grid>
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
