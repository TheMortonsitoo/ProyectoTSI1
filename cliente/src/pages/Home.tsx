import Agendar from "../components/Calendario";
import CarouselComponent from "../components/Carrusel";
import ServiciosC from "../components/ServiciosCirculo";

const Home = () => {
  return (
    <>
      <CarouselComponent />
      <ServiciosC/>
      <Agendar />
    </>
  );
};

export default Home;