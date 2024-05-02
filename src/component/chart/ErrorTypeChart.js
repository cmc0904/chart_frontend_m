import React, { useEffect } from 'react';
import "../../style/search.css";


import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


function ErrorTypeChart({ showedChartData }) {

    useEffect(()=>{
        am4core.useTheme(am4themes_animated);
        let chart = am4core.create("disorder-type", am4charts.PieChart);
        chart.exporting.menu = new am4core.ExportMenu();
        chart.exporting.menu.align = "right";
        chart.exporting.menu.verticalAlign = "bottom";
        chart.exporting.filePrefix = "장애_종류별"; 
        // Add data
        chart.data = showedChartData.chartData;

        // Add and configure Series
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        
        pieSeries.dataFields.value = "value";
        pieSeries.dataFields.category = "title";

        chart.legend = new am4charts.Legend();
        chart.legend.position = 'bottom';
        chart.legend.maxHeight = 100;
        chart.legend.maxWidth = 30;
        chart.legend.scrollable = true;
        return () => {
            chart.dispose();
        };
    }, [showedChartData])

    return (
        <>
              <div id="disorder-type"></div>
        </>
    )
}

export default ErrorTypeChart;
