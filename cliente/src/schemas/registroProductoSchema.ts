import { nonEmpty, object, pipe, string } from "valibot";

export const ProductoSchema = object({
  nombreProducto: pipe(
    string(),
    nonEmpty("El nombre del producto es obligatorio"),
  ),

  precioUnitario: pipe(
    string(),
    nonEmpty("El precio requerido"),
  ),

  descripcion: pipe(
    string(),
    nonEmpty("Apellido materno requerido"),
  ),

  stock: pipe(
    string(),
    nonEmpty("El teléfono es obligatorio"),
  ),
});