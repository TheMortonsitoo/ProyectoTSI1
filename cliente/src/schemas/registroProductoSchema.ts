import { nonEmpty, object, pipe, string, transform } from "valibot";

export const ProductoSchema = object({
  nombreProducto: pipe(
    string(),
    nonEmpty("El nombre del producto es obligatorio"),
  ),

  precioUnitario: pipe(
    string(),
    nonEmpty("El precio es obligatorio"),
    transform(Number)  
  ),

  descripcion: pipe(
    string(),
    nonEmpty("Ingrese una descripción del producto"),
  ),

  stock: pipe(
    string(),
    nonEmpty("Debe ingresar cantidad del producto"),
    transform(Number)   
  ),
});
