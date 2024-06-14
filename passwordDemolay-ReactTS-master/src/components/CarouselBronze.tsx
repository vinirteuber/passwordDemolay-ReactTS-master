import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Meiameia from "../assets/meiameia.jpeg";
import Goethe from "../assets/goethe.jpeg";
import Mkraft from "../assets/Mkraft.png";

const CarouselBronze = () => {
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
          <img className="prata" src={Meiameia} alt="patrocinio" />
        </div>
        <div>
          <img className="prata " src={Goethe} alt="patrocinio" />
        </div>
        <div>
          <img className="prata " src={Mkraft} alt="patrocinio" />
        </div>
      </Slider>
    </div>
  );
};

export default CarouselBronze;
