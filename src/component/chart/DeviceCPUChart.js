import React, { useEffect } from 'react';
import "../../style/search.css";


import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


function DeviceCPUChart({ showedChartData }) {

    useEffect(()=>{
        am4core.useTheme(am4themes_animated);

        var chart = am4core.create("device-cpu", am4charts.XYChart);
        chart.exporting.timeoutDelay = 5000;


        chart.exporting.menu = new am4core.ExportMenu();
        chart.exporting.filePrefix = "CPU_사용량_TOP10"; 

        chart.exporting.menu.align = "right";
        chart.exporting.menu.verticalAlign = "bottom";
        chart.data = showedChartData.chartData;

        // Create axes
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = 'title';
        categoryAxis.title.text = '장비 이름';
        categoryAxis.renderer.labels.template.rotation = 5; // 레이블 회전


        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = '평균 사용량(%)';
        valueAxis.min = showedChartData.min - 2; // 최소값 설정
        valueAxis.max = showedChartData.max; // 최대값 설정

        // Create series
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = 'value';
        series.dataFields.categoryX = 'title';
        series.tooltipText = '{title} : {value}%';

        // Add bullets
        let bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.radius = 4;
        bullet.circle.fill = am4core.color('#fff');
        bullet.circle.strokeWidth = 2;

        // Add legend
        chart.legend = new am4charts.Legend();
        chart.legend.position = 'bottom';

        // Add scrollbar
        chart.scrollbarX = new am4core.Scrollbar();

        // Add cursor
        chart.cursor = new am4charts.XYCursor();

        return () => {
            chart.dispose();
        };
    }, [showedChartData])

    return (
        <>
            <div id="device-cpu"></div>
        </>
    )
}

export default DeviceCPUChart;
