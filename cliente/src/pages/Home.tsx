import Agendar from "../components/Calendario";
import CarouselComponent from "../components/Carrusel";
import Creditos from "../components/Creditos";
import ServiciosC from "../components/ServiciosCirculo";
import Ubicacion from "../components/Ubicacion";

const Home = () => {
  return (
    <>
      <CarouselComponent />
      <ServiciosC/>
      <Agendar />
      <Ubicacion />
      <Creditos />
    </>
  );
};

export default Home;