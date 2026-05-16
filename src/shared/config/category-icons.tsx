import { IconType } from "react-icons";
import {
  FaBreadSlice,
  FaHotdog,
  FaGlassWater,
} from "react-icons/fa6";

import {
  FaBurger,
  FaPizzaSlice,
  FaFish,
  FaWineGlass,
  FaBeerMugEmpty,
  FaMugHot,
  FaIceCream,
  FaBowlFood,
  FaPlateWheat,
  FaDrumstickBite,
  FaBacon,
  FaCheese,
  FaUtensils,
} from "react-icons/fa6";

import {
  MdLunchDining,
  MdOutlineLocalBar,
} from "react-icons/md";

export const categoryIcons: Record<string, IconType> = {
  // PRINCIPALES
  almuerzos: MdLunchDining,
  "platos-carta": FaUtensils,
  picoteo: FaPlateWheat,
  chancheo: FaBurger,
  postres: FaIceCream,
  "bebidas-tragos": MdOutlineLocalBar,
  agregados: FaCheese,

  // PLATOS CARTA
  carnes: FaDrumstickBite,
  "del-mar": FaFish,
  ensaladas: FaBowlFood,
  tablas: FaBacon,

  // CHANCHEO
  hamburguesas: FaBurger,
  sandwiches: FaBreadSlice,
  ass: FaHotdog,
  completos: FaHotdog,
  chorillanas: FaBacon,
  pizzas: FaPizzaSlice,
  "papas-fritas": FaBowlFood,

  // BEBIDAS
  "tragos-autor": FaWineGlass,
  cervezas: FaBeerMugEmpty,
  "vinos-espumantes": FaWineGlass,
  "bebidas-jugos": FaGlassWater,
  "cafe-te": FaMugHot,
};