export type Category = {
  id: string;
  name: string;
  slug: string;
  parentSlug?: string;
};

export const categories: Category[] = [
  // PRINCIPALES
  { id: "almuerzos", name: "Almuerzos", slug: "almuerzos" },
  { id: "platos-carta", name: "Platos Carta", slug: "platos-carta" },
  { id: "picoteo", name: "Picoteo", slug: "picoteo" },
  { id: "chancheo", name: "Chancheo", slug: "chancheo" },
  { id: "postres", name: "Postres", slug: "postres" },
  { id: "bebidas-tragos", name: "Bebidas y Tragos", slug: "bebidas-tragos" },
  {
    id: "agregados",
    name: "Agregados",
    slug: "agregados",
    parentSlug: "chancheo",
  },

  // SUBCATEGORÍAS — PLATOS CARTA
  { id: "carnes", name: "Carnes", slug: "carnes", parentSlug: "platos-carta" },
  {
    id: "del-mar",
    name: "Del Mar",
    slug: "del-mar",
    parentSlug: "platos-carta",
  },
  {
    id: "ensaladas",
    name: "Ensaladas",
    slug: "ensaladas",
    parentSlug: "platos-carta",
  },
  { id: "tablas", name: "Tablas", slug: "tablas", parentSlug: "platos-carta" },

  // SUBCATEGORÍAS — CHANCHEO
  {
    id: "hamburguesas",
    name: "Hamburguesas",
    slug: "hamburguesas",
    parentSlug: "chancheo",
  },
  {
    id: "sandwiches",
    name: "Sandwiches",
    slug: "sandwiches",
    parentSlug: "chancheo",
  },
  {
    id: "ass",
    name: "Ass",
    slug: "ass",
    parentSlug: "chancheo",
  },
  {
    id: "completos",
    name: "Completos",
    slug: "completos",
    parentSlug: "chancheo",
  },
  {
    id: "chorillanas",
    name: "Chorrillanas",
    slug: "chorillanas",
    parentSlug: "chancheo",
  },
  { id: "pizzas", name: "Pizzas", slug: "pizzas", parentSlug: "chancheo" },
  {
    id: "papas-fritas",
    name: "Papas Fritas",
    slug: "papas-fritas",
    parentSlug: "chancheo",
  },

  // SUBCATEGORÍAS — BEBIDAS Y TRAGOS
  {
    id: "tragos-autor",
    name: "Tragos de Autor",
    slug: "tragos-autor",
    parentSlug: "bebidas-tragos",
  },
  {
    id: "cervezas",
    name: "Cervezas",
    slug: "cervezas",
    parentSlug: "bebidas-tragos",
  },
  {
    id: "vinos-espumantes",
    name: "Vinos y Espumantes",
    slug: "vinos-espumantes",
    parentSlug: "bebidas-tragos",
  },
  {
    id: "bebidas-jugos",
    name: "Bebidas y Jugos",
    slug: "bebidas-jugos",
    parentSlug: "bebidas-tragos",
  },
  {
    id: "cafe-te",
    name: "Café y Té",
    slug: "cafe-te",
    parentSlug: "bebidas-tragos",
  },
];

