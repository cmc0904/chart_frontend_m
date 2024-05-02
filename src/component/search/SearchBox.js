import React, { useState } from 'react';
import "../../style/search.css";

import DeviceList from './DeviceList';

import axios from 'axios';
import DataRangePicker from './DataRangePicker';

function SearchBox({ setSearchResult, setSearchLoading }) {
  const [isDatePickerOn, setIsDatePickerOn] = useState(true);
  const [notExistDevice, setNotExistDevice] = useState(false);

  const [deviceName, setDeviceName] = useState("");
  const [startDateToEndDate, setStartDateToEndDate] = useState({"startDate" : "", "endDate" : ""});


  const search = async () => {
    try {
      var url = isDatePickerOn ?
         `/api/chart/searchChart?deviceName=${deviceName}&startDate=${startDateToEndDate.startDate}&endDate=${startDateToEndDate.endDate}`
        :
         `/api/chart/searchChart?deviceName=${deviceName}`

        setSearchLoading(true);
        axios.get(url)
          .then(
            res => {
              setNotExistDevice(res.data.message === "NOT_EXIST_DEVICE")
              setSearchResult(res.data);
              setSearchLoading(false);
            }
          )
          .catch(e => console.log(e))
    } catch (e) {
      console.log(e)
    }

  }

  const searchByDeviceButton = async (device) => {
    try {
      var url = isDatePickerOn ? 
        `/api/chart/searchChart?deviceName=${device}&startDate=${startDateToEndDate.startDate}&endDate=${startDateToEndDate.endDate}`
      : 
        `/api/chart/searchChart?deviceName=${device}`;
      setSearchLoading(true);
      axios.get(url)
        .then(
          res => {
            setNotExistDevice(res.data.message === "NOT_EXIST_DEVICE")
            setSearchResult(res.data);
            setSearchLoading(false);
          }
        )
        .catch(e => console.log(e))
    } catch (e) {
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
          {notExistDevice && 
            <div style={{"color" : "red"}}>존재 하지 않는 기기 입니다.</div>
          }
          <div style={{ "marginTop": "10px" }}>
            <div>
              <label htmlFor='date-picker-on' style={{ "marginRight": "15px", "lineHeight": "auto" }}>검색 기간 설정</label>
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
              <DataRangePicker setStartDateToEndDate={setStartDateToEndDate}/>
            }

            <DeviceList setDevice={setDeviceName} search={searchByDeviceButton} deviceName={deviceName} />
          </div>


        </div>
      </div>
    </>
  )
}

export default SearchBox;
