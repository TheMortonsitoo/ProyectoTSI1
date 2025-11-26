import bcrypt from "bcrypt";
import Empleado from "./models/Empleado";
import server from "./server";
import db from "./config/database";
import { cargarEmpleadosIniciales } from "./config/data/cargarEmpleados";
import { cargarProductosIniciales } from "./config/data/cargarProductos";
import { cargarServiciosIniciales } from "./config/data/cargarServicios";

db.sync().then(async () => {
  console.log("Base de datos sincronizada");

  await cargarEmpleadosIniciales();
  await cargarProductosIniciales();
  await cargarServiciosIniciales();

  server.listen(3000, () => {
    console.log("inicio Api Express");
  });
});
