import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/Layout";
import Home from "./pages/Home";
import Tienda from "./pages/Tienda";
import Mantención from "./pages/servicios/Mantecion";
import Baterías from "./pages/servicios/CambioBaterias";
import Pintura from "./pages/servicios/CambioPintura";
import Frenos from "./pages/servicios/Frenos";
import Registro from "./pages/Registro";
import Login from "./pages/Login";
import CheckOut from "./pages/CheckOut";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout><Home /></MainLayout>,
  },
  {
    path: "/tienda",
    element: <MainLayout><Tienda /></MainLayout>,
  },
  {
    path: "/servicios/mantencion",
    element: <MainLayout><Mantención /></MainLayout>,
  },
  {
    path: "/servicios/frenos",
    element: <MainLayout><Frenos /></MainLayout>,
  },
  {
    path: "/servicios/pintura",
    element: <MainLayout><Pintura /></MainLayout>,
  },
  {
    path: "/servicios/baterias",
    element: <MainLayout><Baterías /></MainLayout>,
  },
  {
    path: "/registrar",
    element: <MainLayout><Registro /></MainLayout>,
  },
  {
    path: "/login",
    element: <MainLayout><Login /></MainLayout>,
  },
  {
    path: "/checkout",
    element: <MainLayout><CheckOut /></MainLayout>,
  }

]);

export default router;
