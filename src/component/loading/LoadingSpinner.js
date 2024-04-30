import React from 'react';
import "../../style/loading.css";



function LoadingSpinner({title}) {

  return (
    <>
        <div className="spinner-container" >
            <div className="spinner"></div>
            <div className='loading-name'>{title}</div>
        </div>


    </>
  )
}

export default LoadingSpinner;
