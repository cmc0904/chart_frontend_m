import React, { useEffect, useState } from 'react';
import "../../style/search.css";

import DeviceList from './DeviceList';

import axios from 'axios';
import DataRangePicker from './DataRangePicker';

function SearchBox({ setSearchResult, setSearchLoading }) {
  const [notExistDevice, setNotExistDevice] = useState(false);

  const [deviceName, setDeviceName] = useState("");
  const [startDateToEndDate, setStartDateToEndDate] = useState({ "startDate": "", "endDate": "" });

  const search = async () => {
    try {
      var url = `/api/chart/searchChart?deviceName=${deviceName}&startDate=${startDateToEndDate.startDate}&endDate=${startDateToEndDate.endDate}`
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
      var url = `/api/chart/searchChart?deviceName=${device}&startDate=${startDateToEndDate.startDate}&endDate=${startDateToEndDate.endDate}`
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
            <div style={{ "color": "red" }}>존재 하지 않는 기기 입니다.</div>
          }

          <div className='detail-search'>
            <DataRangePicker setStartDateToEndDate={setStartDateToEndDate} />

            <DeviceList setDevice={setDeviceName} search={searchByDeviceButton} deviceName={deviceName} />
          </div>


        </div>
      </div>
    </>
  )
}

export default SearchBox;
