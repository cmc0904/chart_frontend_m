import React, { useEffect } from 'react';
import "../../style/search.css";


import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


function ModelErrorChart({ showedChartData }) {

    useEffect(()=>{
        am4core.useTheme(am4themes_animated);
        const chart = am4core.create("model-disorder", am4charts.XYChart);
        chart.exporting.timeoutDelay = 5000;

        chart.autoMargins = false; // 오토마진 비활성화
        chart.data = showedChartData.chartData;
        chart.exporting.menu = new am4core.ExportMenu();
        chart.exporting.filePrefix = "모델_종류별"; 
        chart.exporting.menu.align = "right";
        chart.exporting.menu.verticalAlign = "bottom";

        // X축을 설정합니다.
        const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "title";
        categoryAxis.title.text = '모델명';
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 70;

        // Y축을 설정합니다.
        const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.minGridDistance = 40; // Y축의 최소 그리드 간격을 10으로 설정합니다.
        valueAxis.min = showedChartData.min;
        valueAxis.max = showedChartData.max;
        valueAxis.title.text = '발생 건수(건)';

        // 시리즈를 생성합니다.
        const series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "value";
        series.dataFields.categoryX = "title";
        series.name = "모델별 장애 발생 건 수";
        series.columns.template.tooltipText = "{categoryX}: {valueY}[/]";
        series.columns.template.fillOpacity = .8;

        let bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.radius = 4;
        bullet.circle.fill = am4core.color('#fff');
        bullet.circle.strokeWidth = 2;

        chart.scrollbarX = new am4core.Scrollbar();
        

        chart.legend = new am4charts.Legend();
        chart.legend.position = 'bottom';
        return () => {
            chart.dispose();
        };
    }, [showedChartData])

    return (
        <>
            <div id="model-disorder"></div>
        </>
    )
}

export default ModelErrorChart;
