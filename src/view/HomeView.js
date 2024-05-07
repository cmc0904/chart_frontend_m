import "../style/layout.css"

import Header from '../component/Header';

import Card from '../component/cards/Card';
import SearchBox from '../component/search/SearchBox';
import { useEffect, useState } from "react";
import axios from "axios";

// 차트
import "../style/chart.css";

import ChartBox from "../component/chart/ChartBox";

function HomeView() {

  const [searchResult, setSearchResult] = useState([]);
  const [searchLoading, setSearchLoading] = useState(true);
  const [maxErrorDevice, setMaxErrorDevice] = useState({ "title": "로딩 중 . . .", "value": "" });

  useEffect(() => {
    const getMaxErrorDevice = async () => {
      try {
        const res = await axios.get("/api/chart/getMaxErrorDeviceName");
        setMaxErrorDevice(res.data);
      } catch (e) {
        console.log(e);
      }
    }

    getMaxErrorDevice()
    getChartData();
  }, [])


  const getChartData = async () => {
    setSearchResult([]);
    setSearchLoading(true);
    axios.get("/api/chart/getChartData")
      .then(
        res => {
          setSearchResult(res.data);
          setSearchLoading(false);
        }
      )
      .catch(e => console.log(e))
  }


  return (
    <>
      <div>
        <Header headerName={"Chart"} headerAction={getChartData}/>

        {maxErrorDevice.title === "로딩 중 . . ." ?
          <Card cardSetting={{ "title": "가장 장애가 많이 일어난 장비 이름", "value": `로딩중 . . .` }} />
          :
          <Card cardSetting={{ "title": "가장 장애가 많이 일어난 장비 이름", "value": `${maxErrorDevice.title}(${maxErrorDevice.value}건)` }} />
        }



        <section id="section">
          <SearchBox setSearchResult={setSearchResult} setSearchLoading={setSearchLoading}/>

          {searchResult && searchResult.deviceData != null && (
            searchLoading ?
              <div className="card-box">
                <Card cardSetting={{ "title": "CPU 평균 온도", "value": `로딩 중 . . .` }} />
                <Card cardSetting={{ "title": "평균 CPU 사용량", "value": `로딩 중 . . .` }} />
                <Card cardSetting={{ "title": "평균 메모리 사용량", "value": `로딩 중 . . .` }} />
              </div>
            :
              <div className="card-box">
                <Card cardSetting={{ "title": "CPU 평균 온도", "value": `${searchResult.deviceData.averageTemperature}°C` }} />
                <Card cardSetting={{ "title": "평균 CPU 사용량", "value": `${searchResult.deviceData.averageCPUUsage}%` }} />
                <Card cardSetting={{ "title": "평균 메모리 사용량", "value": `${searchResult.deviceData.averageMemoryUsage}%` }} />
              </div>
          )}
          {searchResult.message !== "NOT_EXIST_DEVICE" &&
            <ChartBox searchLoading={searchLoading} searchResult={searchResult}></ChartBox>
          }
        </section>
      </div>

    </>
  )
}

export default HomeView;
