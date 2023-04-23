import * as React from 'react';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {LocalizationProvider} from '@mui/x-date-pickers-pro';
import {AdapterDayjs} from '@mui/x-date-pickers-pro/AdapterDayjs';
import {DateRangePicker} from '@mui/x-date-pickers-pro/DateRangePicker';
import {INITIAL_END_DATE, INITIAL_START_DATE} from "../../configs/variables.config";

export default function BasicDateRangePicker({handleChangeDateRage}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateRangePicker']}>
                <DateRangePicker
                    localeText={{start: 'Release Start', end: 'Release End'}}
                    defaultValue={[INITIAL_START_DATE, INITIAL_END_DATE]}
                    onAccept={(value => handleChangeDateRage(value))}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}