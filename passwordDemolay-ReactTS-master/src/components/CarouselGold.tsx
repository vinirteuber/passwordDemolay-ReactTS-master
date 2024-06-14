import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MeO from "../assets/logo-mosistemas-seo.png";
import Esquadro from "../assets/esquadroatelie.jpeg";
import Lufiego from "../assets/lufiegoatualizada.jpeg";

const CarouselGold = () => {
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: false,
    prevArrow: false,
  };

  return (
    <div className="all">
      <Slider {...settings}>
        <div>
          <img className="ouro" src={MeO} alt="patrocinio" />
        </div>
        <div>
          <img className="ouro" src={Esquadro} alt="patrocinio" />
        </div>
        <div>
          <img className="ouro" src={Lufiego} alt="patrocinio" />
        </div>
      </Slider>
    </div>
  );
};

export default CarouselGold;
