import React from "react";
import Slider from "react-slick";
import Slide1 from "../img/project_Img/slide_Image/Silde.webp"
import Slide2 from "../img/project_Img/slide_Image/Silde2.webp"
import Slide3 from "../img/project_Img/slide_Image/Slide3.jpg"
import Slide4 from "../img/project_Img/slide_Image/Silde4.jpeg"
import Slide5 from "../img/project_Img/slide_Image/Silde6.png"


const MainSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640,  settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="slider-wrap">
      <Slider {...settings}>
        <div className="slide-card"><img src={Slide1}></img></div>
        <div className="slide-card"><img src={Slide2}></img></div>
        <div className="slide-card"><img src={Slide3}></img></div>
        <div className="slide-card"><img src={Slide4}></img></div>
        <div className="slide-card"><img src={Slide5}></img></div>
      </Slider>
    </div>
  );
};

export default MainSlider;


