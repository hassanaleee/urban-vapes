export interface ProductColor {
  name: string;
  hex: string;
}

export interface RetailProduct {
  id: string;
  name: string;
  brand: string;
  category: 'Devices' | 'Pods' | 'Disposables' | 'E-Liquids' | 'Accessories';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  colors: ProductColor[];
  specs: {
    label: string;
    value: string;
  }[];
  inStock: boolean;
}

export interface RetailBrand {
  id: string;
  name: string;
  tagline: string;
  logoText: string;
  productsCount: number;
}

export const RETAIL_BRANDS: RetailBrand[] = [
  { id: "oxva", name: "OXVA", tagline: "Extreme Flavor & Innovation", logoText: "O X V A", productsCount: 14 },
  { id: "vaporesso", name: "VAPORESSO", tagline: "Beyond the Ordinary", logoText: "V A P O R E S S O", productsCount: 18 },
  { id: "geekvape", name: "GEEKVAPE", tagline: "Geek Knows Best", logoText: "G E E K V A P E", productsCount: 12 },
  { id: "smok", name: "SMOK", tagline: "Innovation Keeps Changing", logoText: "S M O K", productsCount: 16 },
  { id: "uwell", name: "UWELL", tagline: "Pure Flavor Precision", logoText: "U W E L L", productsCount: 10 },
  { id: "voopoo", name: "VOOPOO", tagline: "Spark Your Life", logoText: "V O O P O O", productsCount: 15 }
];

export const RETAIL_PRODUCTS: RetailProduct[] = [
  {
    id: "oxva-xlim-pro-2",
    name: "OXVA Xlim Pro 2 Pod Kit",
    brand: "OXVA",
    category: "Pods",
    price: 29.99,
    originalPrice: 34.99,
    rating: 4.9,
    reviewsCount: 128,
    badge: "BESTSELLER",
    shortDesc: "1000mAh battery with 0.56-inch HD screen and 30W max power output.",
    fullDesc: "The OXVA Xlim Pro 2 is equipped with an upgraded 1000mAh high-density battery and a vibrant 0.56-inch HD color display screen. Features precise airflow control and leak-proof top-fill cartridges.",
    image: "/images/urban_x1.png",
    colors: [
      { name: "Black Carbon", hex: "#0c0c0e" },
      { name: "Gunmetal Mesh", hex: "#262930" },
      { name: "Crimson Red", hex: "#E50914" }
    ],
    specs: [
      { label: "Battery Capacity", value: "1000mAh Built-in" },
      { label: "Output Power", value: "5W - 30W Adjustable" },
      { label: "Display", value: "0.56-inch HD Color Screen" },
      { label: "Charging", value: "Type-C 2A Fast Charge" }
    ],
    inStock: true
  },
  {
    id: "vaporesso-xros-4",
    name: "Vaporesso XROS 4 Pod System",
    brand: "VAPORESSO",
    category: "Pods",
    price: 32.99,
    rating: 4.8,
    reviewsCount: 94,
    badge: "NEW RELEASE",
    shortDesc: "COREX 2.0 tech with aluminum alloy unibody and 3 output modes.",
    fullDesc: "Vaporesso XROS 4 features COREX 2.0 pulse heating technology with a 1000mAh battery housed in an anodized aluminum alloy unibody chassis. Ultra-precise airflow adjustment.",
    image: "/images/urban_arc.png",
    colors: [
      { name: "Black Chrome", hex: "#181a20" },
      { name: "Titanium Silver", hex: "#3e424c" },
      { name: "Midnight Red", hex: "#80080d" }
    ],
    specs: [
      { label: "Heating Tech", value: "COREX 2.0 Pulse Mode" },
      { label: "Chassis Material", value: "Anodized Aluminum Alloy" },
      { label: "Pod Capacity", value: "3.0ml Top Fill" },
      { label: "Airflow", value: "Precision Slide Adjustment" }
    ],
    inStock: true
  },
  {
    id: "geekvape-aegis-legend-3",
    name: "Geekvape Aegis Legend 3 Kit",
    brand: "GEEKVAPE",
    category: "Devices",
    price: 64.99,
    originalPrice: 74.99,
    rating: 4.95,
    reviewsCount: 210,
    badge: "FLAGSHIP MOD",
    shortDesc: "IP68 tri-proof rating with AS Chip 4.0 and 200W dual 18650 output.",
    fullDesc: "Built for extreme durability and raw performance. The Aegis Legend 3 incorporates IP68 water, dust, and shock resistance alongside the AS Chip 4.0 and smart palm unlock telemetry.",
    image: "/images/urban_v2.png",
    colors: [
      { name: "Stealth Black", hex: "#08080a" },
      { name: "Dark Chrome", hex: "#22252c" },
      { name: "Crimson Edition", hex: "#a80b13" }
    ],
    specs: [
      { label: "Durability Rating", value: "IP68 Tri-Proof Armor" },
      { label: "Power Output", value: "5W - 200W Dual Battery" },
      { label: "Chipset", value: "AS Chip 4.0 Smart Tech" },
      { label: "Tank", value: "Geekvape Z Sub-Ohm Tank" }
    ],
    inStock: true
  },
  {
    id: "smok-nord-5",
    name: "SMOK Nord 5 Pod Kit",
    brand: "SMOK",
    category: "Devices",
    price: 34.99,
    rating: 4.7,
    reviewsCount: 88,
    shortDesc: "2000mAh monster battery with 80W max output and dual-side airflow.",
    fullDesc: "The SMOK Nord 5 features an integrated 2000mAh battery supporting up to 80W power output. Stepless dual-sided airflow slider ensures maximum vapor density and flavor clarity.",
    image: "/images/urban_mini.png",
    colors: [
      { name: "Matte Black", hex: "#0d0d10" },
      { name: "Gunmetal Leather", hex: "#2a2d36" }
    ],
    specs: [
      { label: "Battery", value: "2000mAh Integrated" },
      { label: "Output Power", value: "5W - 80W Adjustable" },
      { label: "Pod Capacity", value: "5.0ml RPM 3 Series" },
      { label: "Charging", value: "Type-C Fast Charge" }
    ],
    inStock: true
  },
  {
    id: "uwell-caliburn-g3-lite",
    name: "Uwell Caliburn G3 Lite Kit",
    brand: "UWELL",
    category: "Pods",
    price: 24.99,
    rating: 4.85,
    reviewsCount: 62,
    badge: "POPULAR",
    shortDesc: "Pro-FOCS flavor tech with 1200mAh battery and ultra-compact profile.",
    fullDesc: "Uwell Caliburn G3 Lite combines legendary Pro-FOCS flavor reproduction with a long-lasting 1200mAh battery in a lightweight, travel-friendly stealth profile.",
    image: "/images/urban_arc.png",
    colors: [
      { name: "Space Black", hex: "#0a0a0c" },
      { name: "Shadow Gray", hex: "#282a30" }
    ],
    specs: [
      { label: "Flavor Tech", value: "Pro-FOCS Flavor Matrix" },
      { label: "Battery", value: "1200mAh Built-in" },
      { label: "Cartridge", value: "G3 Integrated Mesh Pods" },
      { label: "Airflow", value: "Dual Airflow System" }
    ],
    inStock: true
  },
  {
    id: "voopoo-drag-5-kit",
    name: "Voopoo Drag 5 Box Mod Kit",
    brand: "VOOPOO",
    category: "Devices",
    price: 59.99,
    originalPrice: 69.99,
    rating: 4.9,
    reviewsCount: 145,
    shortDesc: "GENE.TT 2.0 Chip with dual 18650 power and UFORCE-X Tank.",
    fullDesc: "The flagship Voopoo Drag 5 is crafted with zinc alloy chassis and premium leather grip inlay. Powered by dual 18650 batteries and the high-speed GENE.TT 2.0 chipset.",
    image: "/images/urban_x1.png",
    colors: [
      { name: "Gradient Black", hex: "#101014" },
      { name: "Crimson Leather", hex: "#7a080e" }
    ],
    specs: [
      { label: "Chipset", value: "GENE.TT 2.0 Tech" },
      { label: "Max Wattage", value: "177W Max Output" },
      { label: "Tank", value: "UFORCE-X Top Airflow Tank" },
      { label: "Material", value: "Zinc Alloy & Leather" }
    ],
    inStock: true
  }
];

export const RETAIL_CATEGORIES = [
  { id: "devices", name: "DEVICES", tagline: "Box Mods & Advanced Kits", image: "/images/urban_v2.png", count: "48 MODELS" },
  { id: "pods", name: "POD SYSTEMS", tagline: "Compact Refillable Flavor Kits", image: "/images/urban_x1.png", count: "36 MODELS" },
  { id: "disposables", name: "DISPOSABLES", tagline: "Pre-Filled High Puff Bars", image: "/images/urban_mini.png", count: "52 VARIETIES" },
  { id: "e-liquids", name: "E-LIQUIDS", tagline: "Freebase & Nicotine Salts", image: "/images/urban_arc.png", count: "120+ FLAVORS" },
  { id: "accessories", name: "ACCESSORIES", tagline: "Coils, Chargers, Cases & Docks", image: "/images/urban_accessories.png", count: "80+ ESSENTIALS" }
];
