import React, { useEffect, useState } from 'react';

import { DateRange } from 'react-date-range';
import { addDays } from "date-fns"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

function DataRangePicker({setStartDateToEndDate}) {
    useEffect(()=> {
        setStartDateToEndDate(
            {
            "startDate" : `${state[0].startDate.getFullYear()}-${zfill(state[0].startDate.getMonth().toString(), '0')}-${zfill(state[0].startDate.getDate().toString(), '0')} 00:00:00`
            , "endDate" : `${state[0].endDate.getFullYear()}-${zfill(state[0].endDate.getMonth().toString(), '0')}-${zfill(state[0].endDate.getDate().toString(), '0')} 00:00:00`
            }
        );
    },[])

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 1),
            key: "selection",
        },
    ]);

    const zfill = (item, char) => {
        return item.length === 1 ? char + item : item
    }

    const handleDateRangePick = (item) => {

        setState(item)

        setStartDateToEndDate(
            {
            "startDate" : `${item[0].startDate.getFullYear()}-${zfill(item[0].startDate.getMonth().toString(), '0')}-${zfill(item[0].startDate.getDate().toString(), '0')} 00:00:00`
            , "endDate" : `${item[0].endDate.getFullYear()}-${zfill(item[0].endDate.getMonth().toString(), '0')}-${zfill(item[0].endDate.getDate().toString(), '0')} 00:00:00`
            }
        );

        console.log(            {
            "startDate" : `${item[0].startDate.getFullYear()}-${zfill(item[0].startDate.getMonth().toString(), '0')}-${zfill(item[0].startDate.getDate().toString(), '0')} 00:00:00`
            , "endDate" : `${item[0].endDate.getFullYear()}-${zfill(item[0].endDate.getMonth().toString(), '0')}-${zfill(item[0].endDate.getDate().toString(), '0')} 00:00:00`
            }
        )
        
    }



    return (
        <>
            <DateRange
                className='calender'
                editableDateInputs={true}
                onChange={(item) => handleDateRangePick([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state}
                months={1}
                direction="horizontal"
            />
        </>
    )
}

export default DataRangePicker;
