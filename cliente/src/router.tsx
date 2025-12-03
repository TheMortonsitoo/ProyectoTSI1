import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import { action as loginAction } from "./pages/Login";
import Tienda from "./pages/Tienda";
import Mantención from "./pages/servicios/Mantecion";
import Baterías from "./pages/servicios/CambioBaterias";
import Pintura from "./pages/servicios/CambioPintura";
import Frenos from "./pages/servicios/Frenos";
import Login from "./pages/Login";
import CheckOut from "./pages/CheckOut";
import Perfil from "./pages/Perfil";
import Agendar from "./pages/Agenda";
import AdminPanel from "./pages/Admin/PaginaAdmin";
import Unauthorized from "./pages/NoAutorizacion";
import Registro, { actionRegistro } from "./pages/Registro";
import ViewAgregarProducto from "./pages/Admin/ViewAgregarProducto";
import ViewAgregarServicio from "./pages/Admin/ViewAgregarServicio";
import MainLayout from "./layouts/Layout";
import ProtectedRoute from "./layouts/RouteProtegida";
import InventarioPage from "./pages/Admin/ViewAgregarEmpleado";

const router = createBrowserRouter([
  { path: "/", element: <MainLayout><Home /></MainLayout> },
  { path: "/login", element: <MainLayout><Login /></MainLayout>, action: loginAction },
  { path: "/registrar", element: <MainLayout><Registro /></MainLayout>, action: actionRegistro },
  { path: "/tienda", element: <MainLayout><Tienda /></MainLayout> },
  { path: "/servicios/mantencion", element: <MainLayout><Mantención /></MainLayout> },
  { path: "/servicios/frenos", element: <MainLayout><Frenos /></MainLayout> },
  { path: "/servicios/pintura", element: <MainLayout><Pintura /></MainLayout> },
  { path: "/servicios/baterias", element: <MainLayout><Baterías /></MainLayout> },
  { path: "/checkout", element: <MainLayout><CheckOut /></MainLayout> },

  // Rutas protegidas para clientes y admins
  {
    path: "/perfil",
    element: (
      <ProtectedRoute allowedRoles={["cliente", "empleado", "admin"]}>
        <MainLayout><Perfil /></MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/agenda",
    element: (
      <ProtectedRoute allowedRoles={["cliente", "admin", "empleado"]}>
        <MainLayout><Agendar /></MainLayout>
      </ProtectedRoute>
    ),
  },

  // Ruta protegida solo para admin
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <MainLayout><AdminPanel /></MainLayout>
      </ProtectedRoute>
    ),
  },

    {
    path: "/agregar-producto",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <MainLayout><ViewAgregarProducto/></MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/disminuir-producto",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <MainLayout><ViewAgregarProducto/></MainLayout>
      </ProtectedRoute>
    ),
  },

      {
    path: "/agregar-servicio",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <MainLayout><ViewAgregarServicio/></MainLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/agregar-empleado",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <MainLayout><InventarioPage/></MainLayout>
      </ProtectedRoute>
    ),
  },

  { path: "/unauthorized", element: <MainLayout><Unauthorized /></MainLayout> },
]);

export default router;
