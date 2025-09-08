import React from "react";
import "../css/main.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import MainSlider from "../slider/Slider";
import MainNav from "../common/mainNav";
import CardSlider from "../slider/CardSlider";

export default function App() {
  return (
    <div className="page-wrap">
      <MainNav/>
      <main className="main-container">
        <MainSlider/>
        <h2>오늘의 추천메뉴</h2>
        <CardSlider/>
      </main>
    </div>
  );
}
