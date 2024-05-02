import React, { useEffect, useState } from 'react';
import "../../style/search.css";
import DeviceButton from './DeviceButton';
import axios from 'axios';
import LoadingSpinner from '../loading/LoadingSpinner';


function DeviceList({setDevice, search, deviceName}) {

    const [deviceNameList, setDeviceNameList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        getAllDeviceName();
    }, []);

    const getAllDeviceName = async () => {
        setIsLoading(true)
        axios.get("/api/chart/getAllDeviceName").then(res => {
            setDeviceNameList(res.data)
            setIsLoading(false)
        }).catch(e => console.log(e));
    }   

    useEffect(() => {

        const searchDeviceName = async () => {
            try {
                const res = await axios.get("/api/chart/getAllDeviceName?deviceName="+deviceName);
                setDeviceNameList(res.data)
            } catch(e) {
                console.log(e);
            }
        }

        searchDeviceName();
    }, [deviceName]);

    const handleDeviceButton = async (selectedDevice) => {
        await setDevice(selectedDevice);
        search(selectedDevice);
    };



    return (
        <>
            <div className="device-list" style={{"width" : "100%"}}>
                { isLoading ? 
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
