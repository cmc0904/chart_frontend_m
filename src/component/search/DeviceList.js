import React, { useEffect, useState } from 'react';
import "../../style/search.css";
import DeviceButton from './DeviceButton';
import axios from 'axios';


function DeviceList({setDevice, search, deviceName}) {

    const [deviceNameList, setDeviceNameList] = useState([]);
    

    useEffect(()=>{
        getAllDeviceName();
    }, [])

    const getAllDeviceName = async () => {
        try {
            const res = await axios.get("/api/chart/getAllDeviceName");
            setDeviceNameList(res.data)
        } catch(e) {
            console.log(e);
        }
    }

    const handleDeviceButton = async (selectedDevice) => {
        await setDevice(selectedDevice);
        search(selectedDevice);
    };



    return (
        <>
            <div className="device-list">
                <div className="device-scorll-box">
                    {deviceNameList.map((item, idx) => (
                        <DeviceButton key={idx} handleDeviceButton={handleDeviceButton} item={item}></DeviceButton>
                    ))}
                </div>
            </div>
        </>
    )
}

export default DeviceList;
