import server from "./server";
import Servicio from './models/Servicio';
import { productos } from "./config/data/productosbd";
import Producto from "./models/Producto";

(async () => {
  await Servicio.sync(); // No uses force si no quieres borrar la tabla

  const serviciosIniciales = [
    { codServicio: 'SRV001', nombreServicio: 'Lavado básico', precio: 5000, tiempo: '30 minutos' },
    { codServicio: 'SRV002', nombreServicio: 'Lavado premium', precio: 10000, tiempo: '80 minutos' },
    { codServicio: 'SRV003', nombreServicio: 'Desinfección interior', precio: 8000, tiempo: '45 minutos' },
    { codServicio: 'SRV004', nombreServicio: 'Revisión de auto', precio: 2000, tiempo: '20 minutos' },
    { codServicio: 'SRV005', nombreServicio: 'cambio de frenos', precio: 6000, tiempo: '40 minutos' },
  ];

  for (const servicio of serviciosIniciales) {
    await Servicio.upsert(servicio); // Inserta o actualiza según codServicio
  }

  console.log('Servicios iniciales actualizados');
})();

server.listen(3000, () =>{
    console.log('inicio Api Express')
})