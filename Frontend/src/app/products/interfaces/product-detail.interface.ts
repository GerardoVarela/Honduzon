export interface ProductDetail{
  APELLIDO: string;
  CANTIDAD_PRODUCTO: number;
  CANTIDAD_PROD_VENDIDO: number;
  CantidadProdTotal: number;
  DESCRIPCION_PRODUCTO: string;
  ID_CATEGORIA: number;
  ID_USUARIO: number;
  IMAGEN: Imagen;
  IMAGENS: null;
  NOMBRE: string;
  NOMBRE_DEPARTAMENTO: string;
  NOMBRE_PRODUCTO: string;
  PRECIO: number;
}

export interface Imagen{
  data: number[];
  type: string;
}