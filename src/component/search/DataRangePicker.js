import React, { useEffect, useState } from 'react';

import { DateRange } from 'react-date-range';
import { addDays } from "date-fns"
import ko from 'date-fns/locale/ko';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

function DataRangePicker({setStartDateToEndDate}) {
    useEffect(()=> {
        setStartDateToEndDate(
            {
            "startDate" : `${state[0].startDate.getFullYear()}-${zfill((state[0].startDate.getMonth() + 1).toString(), '0')}-${zfill(state[0].startDate.getDate().toString(), '0')} 00:00:00`
            , "endDate" : `${state[0].endDate.getFullYear()}-${zfill((state[0].endDate.getMonth() + 1).toString(), '0')}-${zfill(state[0].endDate.getDate().toString(), '0')} 23:59:59`
            }
        );
    },[])


    const [state, setState] = useState([
        {
            startDate: new Date(2024, 3, 22),
            endDate: addDays(new Date(2024, 3, 22), 1),
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
            "startDate" : `${item[0].startDate.getFullYear()}-${zfill((item[0].startDate.getMonth() + 1).toString(), '0')}-${zfill(item[0].startDate.getDate().toString(), '0')} 00:00:00`
            , "endDate" : `${item[0].endDate.getFullYear()}-${zfill((item[0].endDate.getMonth() + 1).toString(), '0')}-${zfill(item[0].endDate.getDate().toString(), '0')} 23:59:59`
            }
        );
        
    }



    return (
        <>
            <DateRange
                className='calender'
                locale={ko} 
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
