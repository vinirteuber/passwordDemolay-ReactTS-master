import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Chico from "../assets/ChicoKlein - Apoiador.png";
import Pizza from "../assets/PizzaNaPedra - Apoiador.png";

const CarouselApoiador = () => {
  const settings = {
    slidesToShow: 2,
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
          <img className="apoiador" src={Chico} alt="patrocinio" />
        </div>
        <div>
          <img className="apoiador" src={Pizza} alt="patrocinio" />
        </div>
      </Slider>
    </div>
  );
};

export default CarouselApoiador;
