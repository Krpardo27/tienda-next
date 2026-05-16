export type Product = {
  name: string;
  slug: string;

  description?: string;

  price: number;

  image?: string;

  categorySlug: string;

  isPopular?: boolean;

  featured?: boolean;

  available?: boolean;
};

export const products: Product[] = [
  // ======================================
  // ALMUERZOS
  // ======================================

  {
    name: "Lomo Liso",
    slug: "almuerzo-lomo-liso",

    description:
      "Incluye dos acompañamientos y un bebestible. Acompañamientos: arroz, huevo frito, papas fritas, ensalada, puré o vegetales salteados.",

    price: 10990,

    categorySlug: "almuerzos",

    featured: true,

    available: true,
  },

  {
    name: "Carne al Jugo",
    slug: "almuerzo-carne-jugo",

    description: "Incluye dos acompañamientos y un bebestible.",

    price: 10990,

    categorySlug: "almuerzos",

    available: true,
  },

  {
    name: "Salmón a la Mantequilla",
    slug: "almuerzo-salmon-mantequilla",

    description: "Incluye dos acompañamientos y un bebestible.",

    price: 10990,

    categorySlug: "almuerzos",

    available: true,
  },

  {
    name: "Reineta a la Mantequilla",
    slug: "almuerzo-reineta-mantequilla",

    description: "Incluye dos acompañamientos y un bebestible.",

    price: 10990,

    categorySlug: "almuerzos",

    available: true,
  },

  {
    name: "Merluza Frita",
    slug: "almuerzo-merluza-frita",

    description: "Incluye dos acompañamientos y un bebestible.",

    price: 10990,

    categorySlug: "almuerzos",

    available: true,
  },

  {
    name: "Ensalada Hipocalórica",
    slug: "almuerzo-ensalada-hipocalorica",

    description: "Incluye dos acompañamientos y un bebestible.",

    price: 10990,

    categorySlug: "almuerzos",

    available: true,
  },

  {
    name: "Atún Sellado",
    slug: "almuerzo-atun-sellado",

    description: "Incluye dos acompañamientos y un bebestible.",

    price: 10990,

    categorySlug: "almuerzos",

    available: true,
  },

  {
    name: "Pollo a la Plancha",
    slug: "almuerzo-pollo-plancha",

    description: "Incluye dos acompañamientos y un bebestible.",

    price: 10990,

    categorySlug: "almuerzos",

    available: true,
  },

  {
    name: "Milanesa de Pollo",
    slug: "almuerzo-milanesa-pollo",

    description: "Incluye dos acompañamientos y un bebestible.",

    price: 10990,

    categorySlug: "almuerzos",

    available: true,
  },

  {
    name: "Tallarines Saltados",
    slug: "almuerzo-tallarines-saltados",

    description: "Incluye dos acompañamientos y un bebestible.",

    price: 10990,

    categorySlug: "almuerzos",

    available: true,
  },

  {
    name: "Filete Saltado",
    slug: "almuerzo-filete-saltado",

    description: "Incluye dos acompañamientos y un bebestible.",

    price: 13990,

    categorySlug: "almuerzos",

    featured: true,

    available: true,
  },

  // ======================================
  // AGREGADOS
  // ======================================

  {
    name: "Papas Fritas",
    slug: "papas-fritas-agregado",

    price: 1590,

    categorySlug: "agregados",

    available: true,
  },

  {
    name: "Puré",
    slug: "pure-agregado",

    price: 1290,

    categorySlug: "agregados",

    available: true,
  },

  {
    name: "Arroz",
    slug: "arroz-agregado",

    price: 990,

    categorySlug: "agregados",

    available: true,
  },

  {
    name: "Huevo Frito",
    slug: "huevo-frito-agregado",

    price: 990,

    categorySlug: "agregados",

    available: true,
  },

  {
    name: "Vegetales Salteados",
    slug: "vegetales-saltados",

    price: 990,

    categorySlug: "agregados",

    available: true,
  },

  {
    name: "Ensalada del Día",
    slug: "ensalada-dia",

    price: 990,

    categorySlug: "agregados",

    available: true,
  },

  {
    name: "Palta",
    slug: "palta",

    price: 1890,

    categorySlug: "agregados",

    available: true,
  },

  {
    name: "Empanadas Tomate Albahaca",
    slug: "empanadas-tomate-albahaca",

    price: 2490,

    categorySlug: "agregados",

    available: true,
  },

  // Carnes
  {
    name: "Filete Saltado",
    slug: "filete-saltado",
    description: "200 gr de carne filete acompañados de papas fritas y arroz",
    price: 13990,
    categorySlug: "carnes",
    available: true,
  },
  {
    name: "Lomo a la Pobre",
    slug: "lomo-a-la-pobre",
    description:
      "200 gr de lomo acompañado de papas frita, huevo frito y cebolla caramelizada",
    price: 13990,
    categorySlug: "carnes",
    available: true,
  },
  {
    name: "Tallarines Saltados",
    slug: "tallarines-saltados",
    description:
      "Tallarines saltados en wok acompañados de 200 gr de pollo, 200 gr de camaron o mixto",
    price: 10990,
    categorySlug: "carnes",
    available: true,
  },
  {
    name: "Pollo a la Pobre",
    slug: "pollo-a-la-pobre",
    description:
      "200 gr de pollo acompañados de papas fritas, huevo frito y cebolla caramelizada",
    price: 13990,
    categorySlug: "carnes",
    available: true,
  },
  {
    name: "Crudo",
    slug: "crudo",
    description:
      "200 gr de carne magra, acompañado de cebolla morada, pepinillos, mayonesa, ají verde y pan en rodajas",
    price: 13990,
    categorySlug: "carnes",
    available: true,
  },
  {
    name: "Chuletas de Cerdo",
    slug: "chuletas-de-cerdo",
    description:
      "Tres chuletas de cerdo, acompañadas de papas fritas, huevo frito y cebolla caramelizada",
    price: 13990,
    categorySlug: "carnes",
    available: true,
  },

  // Del mar
  {
    name: "Tartaro de Atún",
    slug: "tartaro-de-atun",
    description:
      "Tomate cherry, aceite de sésamo, palta, lechuga hidropónica, tostadas, acompañado de salsa Jack Daniels",
    price: 12990,
    categorySlug: "del-mar",
    available: true,
  },
  {
    name: "Ceviche a la Peruana",
    slug: "ceviche-a-la-peruana",
    description:
      "Acompañado de una cama de lechuga hidropónica, cancha, palta y tostadas",
    price: 13990,
    categorySlug: "del-mar",
    available: true,
  },
  {
    name: "Machas a la Parmesana",
    slug: "machas-a-la-parmesana",
    description: "Gratinado de quesos mozzarella y parmesano",
    price: 16990,
    categorySlug: "del-mar",
    available: true,
  },

  // Ensaladas
  {
    name: "Ensalada Cesar Pollo",
    slug: "ensalada-cesar-pollo",
    description:
      "Lechuga hidropónica, crutones, palta, queso parmesano y tomates cherrys, acompañada de salsa césar",
    price: 10990,
    categorySlug: "ensaladas",
    available: true,
  },
  {
    name: "Ensalada del Chef",
    slug: "ensalada-del-chef",
    description:
      "Salmón a la plancha, camarones salteados, lechuga hidropónica, palta, tomate cherry, queso parmesano, ciboulette, almendras laminadas, aderezo mostaza y miel",
    price: 11990,
    categorySlug: "ensaladas",
    available: true,
  },
  {
    name: "Ensalada Mar y Tierra",
    slug: "ensalada-mar-y-tierra",
    description:
      "Camarones y pollo salteado, lechuga hidropónica, palta, queso parmesano, almendras laminadas y aderezo de mostaza y miel",
    price: 11990,
    categorySlug: "ensaladas",
    available: true,
  },
  {
    name: "Ensalada Atún Steak",
    slug: "ensalada-atun-steak",
    description:
      "Atún sellado en sésamo, acompañado de salsa Jack Daniels, junto con tomate cherry, poalta y almendra laminadas",
    price: 13990,
    categorySlug: "ensaladas",
    available: true,
  },

  // Tablas
  {
    name: "Tabla Americana",
    slug: "tabla-americana",
    description:
      "5 alitas Bbq, chicken tenders, mozzarella sticks, papas fritas y aros de cebolla, acompañada de salsa bbq",
    price: 22990,
    categorySlug: "tablas",
    available: true,
  },
  {
    name: "Tabla Fuente Vicuña",
    slug: "tabla-fuente-vicuna",
    description:
      "Pollo a la mostaza, empanadas de queso caseras, mozzarella sticks, quesadillas de mechada, acompañada de salsa de ajo & sour cream",
    price: 23990,
    categorySlug: "tablas",
    available: true,
  },
  {
    name: "Tabla Mar y Fuego",
    slug: "tabla-mar-y-fuego",
    description:
      "Lomo en tiras, pollo en tiras, camarones, cebolla morada, tomate, ciboulette, cilantro, salsa de soya, acompañado de tostadas y mayonesa casera",
    price: 23990,
    categorySlug: "tablas",
    available: true,
  },

  // Hamburguesas
  {
    name: "Burguer Luco",
    slug: "burguer-luco",
    description: "200 gr de carne y queso mozzarella",
    price: 9990,
    categorySlug: "hamburguesas",
    available: true,
  },
  {
    name: "Cheese Burguer",
    slug: "cheese-burguer",
    description: "200 gr de carne, tocino, queso cheddar y salsa de la casa",
    price: 10990,
    categorySlug: "hamburguesas",
    available: true,
  },
  {
    name: "Big Boss",
    slug: "big-boss",
    description:
      "200 gr de carne, lechuga hidropónica, rodajas de tomate, cebolla morada, pepinillos y salsa de la casa",
    price: 10990,
    categorySlug: "hamburguesas",
    available: true,
  },
  {
    name: "Burguer Italiana",
    slug: "burguer-italiana",
    description: "200 gr de carne, palta, rodajas de tomate y salsa de la casa",
    price: 11990,
    categorySlug: "hamburguesas",
    available: true,
  },
  {
    name: "Burguer Quinoa",
    slug: "burguer-quinoa",
    description:
      "200 gr de quinoa, rúcula, cebolla caramelizada, champiñon & mayonesa de la casa",
    price: 11990,
    categorySlug: "hamburguesas",
    available: true,
  },
  {
    name: "La Gringa",
    slug: "la-gringa",
    description:
      "200 gr de quinoa, lechuga hidropónica, tomate, tocino, cheddar, aros de cebolla y salsa BBQ",
    price: 11990,
    categorySlug: "hamburguesas",
    available: true,
  },
  {
    name: "Truffle Burguer",
    slug: "truffle-burguer",
    description:
      "200 gr de carne, rúcula, cebolla caramelizada, champiñon, queso mozzarella, mayonesa de la casa y aceite de trufa",
    price: 12990,
    categorySlug: "hamburguesas",
    available: true,
  },

  // Sandwiches
  {
    name: "Pirata",
    slug: "pirata",
    description:
      "Merluza, lechuga hidropónica, rodajas de tomate, cebolla morada, ají verde y mayonesa de la casa",
    price: 10990,
    categorySlug: "sandwiches",
    available: true,
  },
  {
    name: "Pollo Crispy",
    slug: "pollo-crispy",
    description: "Pollo crispy, rodajas de tomate, palta y mayonesa de la casa",
    price: 10990,
    categorySlug: "sandwiches",
    available: true,
  },

  {
    name: "Mechada Luco",
    slug: "mechada-luco",
    description: "Carne mechada y queso mozzarella",
    price: 10990,
    categorySlug: "sandwiches",
    available: true,
  },
  {
    name: "Mechada Italiana",
    slug: "mechada-italiana",
    description:
      "Carne mechada, palta, rodajas de tomate y mayonesa de la casa",
    price: 11990,
    categorySlug: "sandwiches",
    available: true,
  },
  {
    name: "Ave Italiana",
    slug: "ave-italiana",
    description:
      "Pollo en tiras, palta, rodajas de tomate y mayonesa de la casa",
    price: 10990,
    categorySlug: "sandwiches",
    available: true,
  },
  {
    name: "Churrasco Lomo Italiano",
    slug: "churrasco-lomo-italiano",
    description:
      "Tiras de lomo, palta, rodajas de tomate y mayonesa de la casa",
    price: 10990,
    categorySlug: "sandwiches",
    available: true,
  },
  {
    name: "Churrasco Lomo Luco",
    slug: "churrasco-lomo-luco",
    description: "Tiras de lomo, queso fundido",
    price: 10990,
    categorySlug: "sandwiches",
    available: true,
  },

  // Completos
  {
    name: "Completo Italiano",
    slug: "completo-italiano",

    price: 4490,

    categorySlug: "completos",

    available: true,
  },
  {
    name: "Especial Palta",
    slug: "especial-palta",

    description:
      "Pan de completo, vianesa XL, palta, tomate & mayonesa de la casa",

    price: 4990,

    categorySlug: "completos",

    available: true,
  },
  {
    name: "Especial Tomate",
    slug: "especial-tomate",

    description: "Pan de completo, vianesa XL, tomate, mayonesa de la casa",

    price: 4990,

    categorySlug: "completos",

    available: true,
  },
  {
    name: "Ass Italiano",
    slug: "ass-italiano",

    description: "Pan de completo, carne, palta, tomate, mayonesa de la casa",

    price: 5990,

    categorySlug: "ass",

    available: true,
  },
  {
    name: "Ass Luco",
    slug: "ass-luco",

    description: "Pan de completo, carne, queso mozzarella",

    price: 5590,

    categorySlug: "ass",

    available: true,
  },
  {
    name: "Ass Brasileño",
    slug: "ass-brasileno",

    description: "Pan de completo, carne, queso mozzarella y palta",

    price: 5990,

    categorySlug: "ass",

    available: true,
  },
];
