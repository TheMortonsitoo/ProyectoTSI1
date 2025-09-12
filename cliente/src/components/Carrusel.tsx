import { Carousel } from "react-bootstrap";

const CarouselComponent = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src="/images/Imagen1.jpg" alt="Imagen 1" />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-block w-100" src="/images/Imagen2.jpg" alt="Imagen 2" />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-block w-100" src="/images/Imagen3.jpg" alt="Imagen 3" />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;
