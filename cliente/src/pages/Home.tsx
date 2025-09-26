import Agendar from "../components/Calendario";
import CarouselComponent from "../components/Carrusel";
import ContactForm from "../components/FormularioContacto";
import ServiciosC from "../components/ServiciosCirculo";
import Ubicacion from "../components/Ubicacion";

const Home = () => {
  return (
    <>
      <CarouselComponent />
      <ServiciosC/>
      <Agendar />
      <Ubicacion />
      <ContactForm />
    </>
  );
};

export default Home;