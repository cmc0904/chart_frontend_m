import React, { useEffect } from 'react';
import "../../style/search.css";


import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


function DailyErrorChart({ showedChartData }) {

    useEffect(()=>{
        if(showedChartData.chartData.length === 0) return

        am4core.useTheme(am4themes_animated);

        var chart = am4core.create("day-disorder", am4charts.XYChart);
        chart.exporting.menu = new am4core.ExportMenu();
        chart.exporting.filePrefix = "일별_장애_발생_추이"; 
        chart.exporting.menu.align = "right";
        chart.exporting.menu.verticalAlign = "bottom";
        chart.data = showedChartData.chartData;
    
        // Create axes
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = 'title';
        categoryAxis.title.text = '발생 날짜';
    
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = '발생 건수(건)';
        valueAxis.min = showedChartData.min; // 최소값 설정
        valueAxis.max = showedChartData.max; // 최대값 설정
    
        // Create series
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = 'value';
        series.dataFields.categoryX = 'title';
        series.tooltipText = '{title} : {value}건';
    
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
            <div id="day-disorder"></div>
        </>
    )
}

export default DailyErrorChart;
