import "../style/layout.css"

import Header from '../component/Header';

import Card from '../component/cards/Card';
import SearchBox from '../component/search/SearchBox';
import { useEffect, useState } from "react";



function HomeView() {

  const [searchResult, setSearchResult] = useState([]);

  useEffect(()=> {
    console.log(searchResult)
  }, [searchResult])


  return (
    <>
      <div>
        <Header headerName={"Chart"} />

        <Card cardSetting={{ "title": "가장 장애가 많이 일어난 장비 이름", "value": "개포동1264-13다세대주택" }} />

        <section id="section">
          <SearchBox setSearchResult={setSearchResult} />

          <div className="card-box">
            <Card cardSetting={{ "title": "CPU 평균 온도", "value": "65°C" }} />
            <Card cardSetting={{ "title": "평균 CPU 사용량", "value": "80%" }} />
            <Card cardSetting={{ "title": "평균 메모리 사용량", "value": "80%" }} />
            <Card cardSetting={{ "title": "평균 메모리 사용량", "value": "80%" }} />
          </div>
        </section>
      </div>

    </>
  )
}

export default HomeView;
