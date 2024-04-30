import React, { useEffect, useState } from 'react';
import "../../style/search.css";
import DeviceButton from './DeviceButton';
import axios from 'axios';
import LoadingSpinner from '../loading/LoadingSpinner';


function DeviceList({setDevice, search, deviceName}) {

    const [deviceNameList, setDeviceNameList] = useState([]);
    

    useEffect(() => {
        getAllDeviceName();
    }, []);

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
            <div className="device-list" style={{"width" : "100%"}}>
                {deviceNameList.length === 0 ? 
                    <LoadingSpinner title={"모든 장비 이름 불러오는 중  . . ."}></LoadingSpinner>
                :
                    <div className="device-scorll-box">
                        {deviceNameList.map((item, idx) => (
                            <DeviceButton key={idx} handleDeviceButton={handleDeviceButton} item={item}></DeviceButton>
                        ))}
                    </div>
                }

            </div>
        </>
    )
}

export default DeviceList;
