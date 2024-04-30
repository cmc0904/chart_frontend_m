import React, { useState } from 'react';
import "../../style/search.css";

import { DateRange } from 'react-date-range';
import { addDays } from "date-fns"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import DeviceList from './DeviceList';

import axios from 'axios';

function SearchBox({setSearchResult}) {
    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 1),
          key: "selection",
        },
    ]);

    const [isDatePickerOn, setIsDatePickerOn] = useState(true);


    const [deviceName, setDeviceName] = useState("");

    const search = async () => {
      try {
        const res = await axios.get(`/api/chart/searchChart?deviceName=${deviceName}`);
        setSearchResult(res.data);
      } catch(e) {
        console.log(e)
      }
  
    }

    const searchByDeviceButton = async (device) => {
        try {
          const res = await axios.get(`/api/chart/searchChart?deviceName=${device}`);
          setSearchResult(res.data);
        } catch(e) {
          console.log(e)
        }
    
      }

    return (
        <>
            <div className="search-box">
                <div>
                    <div className="input-box">
                        <input placeholder="장비 이름을 검색 입력 해주세요." value={deviceName} onChange={(e) => setDeviceName(e.target.value)} />
                        <button type="submit" onClick={search}>검색</button>
                    </div>

                    <div style={{"marginTop" : "10px"}}>
                        <div>
                            <label htmlFor='date-picker-on' style={{"marginRight" : "15px", "lineHeight" : "auto"}}>검색 기간 설정</label>
                            <input 
                                type='checkbox' 
                                id='date-picker-on' 
                                checked={isDatePickerOn} 
                                onChange={() => setIsDatePickerOn(!isDatePickerOn)}
                            />
                        </div>

                    </div>


                    <div className='detail-search'>
                        {isDatePickerOn && 
                            <DateRange
                                className='calender'
                                editableDateInputs={true}
                                onChange={(item) => setState([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={state}
                                months={1}
                                direction="horizontal"
                            />
                        }

                        <DeviceList setDevice={setDeviceName} search={searchByDeviceButton} deviceName={deviceName}/>
                    </div>

                    
                </div>
            </div>
        </>
    )
}

export default SearchBox;
