import {
  Truck, Route, Package, Boxes, Globe, Zap, Ship,
  ShoppingCart, Pickaxe, Sprout, HardHat, Cog, Factory,
  MapPin, CalendarClock, MessageSquare, FileCheck, Bell, Layers,
  Circle, Phone, Mail, Clock, Calculator, ShipWheel, Weight, Box,
  CalendarDays, ArrowRight, ArrowUpRight, Download, Compass, BookOpen,
} from "lucide-react";

const map = {
  truck: Truck,
  route: Route,
  package: Package,
  boxes: Boxes,
  globe: Globe,
  zap: Zap,
  ship: Ship,
  "shopping-cart": ShoppingCart,
  pickaxe: Pickaxe,
  sprout: Sprout,
  "hard-hat": HardHat,
  cog: Cog,
  factory: Factory,
  "map-pin": MapPin,
  "calendar-clock": CalendarClock,
  "message-square": MessageSquare,
  "file-check": FileCheck,
  bell: Bell,
  layers: Layers,
  phone: Phone,
  mail: Mail,
  clock: Clock,
  calculator: Calculator,
  weight: Weight,
  box: Box,
  calendar: CalendarDays,
  compass: Compass,
  book: BookOpen,
  download: Download,
  "arrow-right": ArrowRight,
  "arrow-up-right": ArrowUpRight,
};

export function Icon({ name, className = "h-5 w-5", ...props }) {
  const C = map[name] || Circle;
  return <C className={className} strokeWidth={1.8} {...props} />;
}

export default Icon;
