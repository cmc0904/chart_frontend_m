import "../style/layout.css"

import Header from '../component/Header';

import Card from '../component/cards/Card';
import SearchBox from '../component/search/SearchBox';
import { useEffect, useState } from "react";
import axios from "axios";

// 차트
import "../style/chart.css";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

function HomeView() {

  const [searchResult, setSearchResult] = useState([]);
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
  }, [])

  useEffect(() => {

    if (searchResult.length === 0) return;
    console.log(searchResult)
    const chart = am4core.create("model-disorder", am4charts.XYChart);
    chart.autoMargins = false; // 오토마진 비활성화
    chart.data = searchResult.modelDisorder.chartData;
    console.log(chart.data)
    chart.exporting.menu = new am4core.ExportMenu();
    chart.exporting.menu.align = "right";
    chart.exporting.menu.verticalAlign = "bottom";

    // X축을 설정합니다.
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "title";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 70;

    // Y축을 설정합니다.
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minGridDistance = 15; // Y축의 최소 그리드 간격을 10으로 설정합니다.
    valueAxis.min = searchResult.modelDisorder.min;
    valueAxis.max = searchResult.modelDisorder.max;
    // 시리즈를 생성합니다.
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "title";
    series.name = "title";
    series.columns.template.tooltipText = "{categoryX}: {valueY}[/]";
    series.columns.template.fillOpacity = .8;

    return () => {
      chart.dispose();
    };

  }, [searchResult]);

  useEffect(() => {

    if (searchResult.length === 0) return;
    // Create chart instance
    let chart = am4core.create("disorder-type", am4charts.PieChart);

    // Add data
    chart.data = searchResult.disorderType.chartData;

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "title";

    return () => {
      chart.dispose();
    };

  }, [searchResult]);




  return (
    <>
      <div>
        <Header headerName={"Chart"} />

        {maxErrorDevice.title === "로딩 중 . . ." ?
          <Card cardSetting={{ "title": "가장 장애가 많이 일어난 장비 이름", "value": `로딩중 . . .` }} />
          :
          <Card cardSetting={{ "title": "가장 장애가 많이 일어난 장비 이름", "value": `${maxErrorDevice.title}(${maxErrorDevice.value}건)` }} />
        }



        <section id="section">
          <SearchBox setSearchResult={setSearchResult} />

          <div className="card-box">
            <Card cardSetting={{ "title": "CPU 평균 온도", "value": "65°C" }} />
            <Card cardSetting={{ "title": "평균 CPU 사용량", "value": "80%" }} />
            <Card cardSetting={{ "title": "평균 메모리 사용량", "value": "80%" }} />
            <Card cardSetting={{ "title": "평균 메모리 사용량", "value": "80%" }} />
          </div>

          <div className="grid-container">
            <div className="grid-item">
              <div className="error_title">장비별 CPU TOP 10</div>
              <div id="device-cpu"></div>
            </div>

            <div className="grid-item">
              <div className="error_title">모델별 장애 TOP 10</div>
              <div id="model-disorder"></div>
            </div>

            <div className="grid-item">
              <div className="error_title">장애 종류별 TOP 10</div>
              <div id="disorder-type"></div>
            </div>

            <div className="grid-item">
              <div className="error_title">일병 장애 추이</div>
              <div id="day-disorder"></div>
            </div>
          </div>

        </section>
      </div>

    </>
  )
}

export default HomeView;
