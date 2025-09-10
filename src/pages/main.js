import "../css/main.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainSlider from "../slider/Slider";
import MainNav from "../common/MainNav";
import CardSlider from "../slider/CardSlider";

export default function App() {
  return (
    <div className="page-wrap">
      <MainNav/>
      <main className="main-container">
        <MainSlider/>
        <div className="text-4xl font-extrabold">오늘의 추천메뉴</div>
        <CardSlider/>
      </main>
    </div>
  );
}
