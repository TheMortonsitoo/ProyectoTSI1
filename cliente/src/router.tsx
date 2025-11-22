import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./Layouts/Layout";
import Home from "./pages/Home";
import Tienda from "./pages/Tienda";
import Mantención from "./pages/servicios/Mantecion";
import Baterías from "./pages/servicios/CambioBaterias";
import Pintura from "./pages/servicios/CambioPintura";
import Frenos from "./pages/servicios/Frenos";
import Registro from "./pages/Registro";
import Login from "./pages/Login";
import CheckOut from "./pages/CheckOut";
import Perfil from "./pages/Perfil";
import Agendar from "./pages/Agenda";
import ProtectedRoute from "./Layouts/RouteProtegida";
import AdminPanel from "./pages/PaginaAdmin";
import Unauthorized from "./pages/NoAutorizacion";

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
  },
  {
    path: "/perfil",
    element: <MainLayout><Perfil /></MainLayout>,
  },
  {
    path: "/agenda",
    element: <MainLayout><Agendar /></MainLayout>,
  },
  {
  path: "/admin",
  element: (
    <ProtectedRoute allowedRoles={["Admin"]}>
      <MainLayout><AdminPanel /></MainLayout>
    </ProtectedRoute>
  ),
},
{
  path: "/unauthorized",
  element: <MainLayout><Unauthorized /></MainLayout>,
}
]);

export default router;
