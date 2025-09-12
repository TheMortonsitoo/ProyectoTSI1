import { Container } from "react-bootstrap";
import NavbarComponent from "../components/NavBar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavbarComponent />
      <Container className="mt-4">{children}</Container>
    </>
  );
};

export default MainLayout