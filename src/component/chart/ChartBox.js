import DailyErrorChart from "./DailyErrorChart";
import DeviceCPUChart from "./DeviceCPUChart";
import ErrorTypeChart from "./ErrorTypeChart";
import ModelErrorChart from "./ModelErrorChart";

import LoadingSpinner from "../loading/LoadingSpinner";

function ChartBox({ searchResult, searchLoading }) {
    return (
        <>
            <div className="grid-container">
                <div className="grid-item">
                    <div className="error_title">장비별 CPU TOP 10</div>
                    {
                        searchLoading ?
                            <LoadingSpinner title={"데이터 불러오는 중 . . ."}></LoadingSpinner>
                            :
                            searchResult.deviceCPU.chartData.length === 0 ?
                                <div className="noresult">조회된 결과가 없습니다.</div>
                                :
                                <DeviceCPUChart showedChartData={searchResult.deviceCPU}></DeviceCPUChart>
                    }
                </div>

                <div className="grid-item">
                    <div className="error_title">모델별 장애 TOP 10</div>
                    {
                        searchLoading ?
                            <LoadingSpinner title={"데이터 불러오는 중 . . ."}></LoadingSpinner>
                            :
                            searchResult.modelDisorder.chartData.length === 0 ?
                                <div className="noresult">조회된 결과가 없습니다.</div>
                                :
                                <ModelErrorChart showedChartData={searchResult.modelDisorder}></ModelErrorChart>
                    }
                </div>

                <div className="grid-item">
                    <div className="error_title">장애 종류별 TOP 10</div>
                    {
                        searchLoading ?
                            <LoadingSpinner title={"데이터 불러오는 중 . . ."}></LoadingSpinner>
                            :
                            searchResult.disorderType.chartData.length === 0 ?
                                <div className="noresult">조회된 결과가 없습니다.</div>
                                :
                                <ErrorTypeChart showedChartData={searchResult.disorderType}></ErrorTypeChart>
                    }
                </div>

                <div className="grid-item">
                    <div className="error_title">일별 장애 추이</div>
                    {
                        searchLoading ?
                            <LoadingSpinner title={"데이터 불러오는 중 . . ."}></LoadingSpinner>
                            :
                            searchResult.dailyDisorder.chartData.length === 0 ?
                                <div className="noresult">조회된 결과가 없습니다.</div>
                                :
                                <DailyErrorChart showedChartData={searchResult.dailyDisorder}></DailyErrorChart>
                    }

                </div>
            </div>
        </>
    )
}

export default ChartBox;
