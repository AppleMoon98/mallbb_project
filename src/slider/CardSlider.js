import React from "react";
import Slider from "react-slick";
import Slide1 from "../img/project_Img/menu_Image/menu(소보루).png"
import Slide2 from "../img/project_Img/menu_Image/menu10(와플).png"
import Slide3 from "../img/project_Img/menu_Image/menu11(앙버터).jpg"
import Slide4 from "../img/project_Img/menu_Image/menu13(깨찰빵).jpg"
import Slide5 from "../img/project_Img/menu_Image/menu17(바게트).jpg"
import Slide6 from "../img/project_Img/menu_Image/menu12(피자빵).jpg"
import Previmg from "../img/project_Img/bar_Image/prev_arrow.svg"
import Nextimg from "../img/project_Img/bar_Image/next_arrow.svg"
import { Link } from "react-router-dom";


function PrevArrow(props){
  const {className, style, onClick} = props;
  return (
    <img src={Previmg} alt="prev" className={className} 
    style={{
        ...style,
        display: "block",
        left: "10px",
        transform:"translateY(-50%)",
        zIndex: 10,
        width: "40px",
        height: "40px",
        cursor: "pointer",
      }}
    onClick={onClick}
    />
  );
}

function NextArrow(props){
  const {className, style, onClick} = props;
  return (
    <img src={Nextimg} alt="next" className={className} 
    style={{
        ...style,
        display: "block",
        right: "10px",
        zIndex: 10,
        width: "40px",
        height: "40px",
        cursor: "pointer",
      }}
    onClick={onClick}
    />
  );
}

const CardSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    autoplay: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640,  settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="slider-wrap">
      <Slider {...settings}>
        <div className="slide-card"><Link to="/"><img src={Slide1}></img></Link></div>
        <div className="slide-card"><Link to="/"><img src={Slide2}></img></Link></div>
        <div className="slide-card"><Link to="/"><img src={Slide3}></img></Link></div>
        <div className="slide-card"><Link to="/"><img src={Slide4}></img></Link></div>
        <div className="slide-card"><Link to="/"><img src={Slide5}></img></Link></div>
        <div className="slide-card"><Link to="/"><img src={Slide6}></img></Link></div>
      </Slider>
    </div>
  );
};
export default CardSlider;