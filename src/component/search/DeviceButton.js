import React from 'react';
import "../../style/search.css";



function DeviceButton({handleDeviceButton, item}) {

  return (
    <>
        <button
            onClick={() => {handleDeviceButton(item)}}

            className="device"
        >
            {item}
        </button>
    </>
  )
}

export default DeviceButton;
