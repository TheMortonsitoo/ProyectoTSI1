import { nonEmpty, object, pipe, string, transform } from "valibot";

export const ServicioSchema = object({
  nombreServicio: pipe(
    string(),
    nonEmpty("El nombre del servicio es obligatorio"),
  ),

  precio: pipe(
    string(),
    nonEmpty("El precio es obligatorio"),
    transform(Number)  
  ),

  descripcion: pipe(
    string(),
    nonEmpty("Ingrese una descripción del producto"),
  ),

  tiempo: pipe(
    string(),
    nonEmpty("Debe ingresar el tiempo del servicio"),
    transform(Number)   
  ),
});
