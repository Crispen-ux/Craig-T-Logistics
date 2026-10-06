export const towns = [
  { id: "johannesburg", name: "Johannesburg", province: "Gauteng", lat: -26.2041, lng: 28.0473 },
  { id: "pretoria", name: "Pretoria", province: "Gauteng", lat: -25.7479, lng: 28.2293 },
  { id: "midrand", name: "Midrand", province: "Gauteng", lat: -25.9567, lng: 28.1206 },
  { id: "rustenburg", name: "Rustenburg", province: "North West", lat: -25.6675, lng: 27.2421 },
  { id: "potchefstroom", name: "Potchefstroom", province: "North West", lat: -26.7051, lng: 27.0978 },
  { id: "mahikeng", name: "Mahikeng", province: "North West", lat: -25.8586, lng: 25.6356 },
  { id: "polokwane", name: "Polokwane", province: "Limpopo", lat: -23.9045, lng: 29.4689 },
  { id: "musina", name: "Musina", province: "Limpopo", lat: -22.3541, lng: 29.7464 },
  { id: "emalahleni", name: "Emalahleni (Witbank)", province: "Mpumalanga", lat: -25.8766, lng: 29.9766 },
  { id: "mbombela", name: "Mbombela (Nelspruit)", province: "Mpumalanga", lat: -25.4745, lng: 30.9703 },
  { id: "bloemfontein", name: "Bloemfontein", province: "Free State", lat: -29.0852, lng: 26.1596 },
  { id: "welkom", name: "Welkom", province: "Free State", lat: -27.9766, lng: 26.7348 },
  { id: "bethlehem", name: "Bethlehem", province: "Free State", lat: -28.2328, lng: 28.3167 },
  { id: "kimberley", name: "Kimberley", province: "Northern Cape", lat: -28.7282, lng: 24.7499 },
  { id: "upington", name: "Upington", province: "Northern Cape", lat: -28.4478, lng: 21.2561 },
  { id: "durban", name: "Durban", province: "KwaZulu-Natal", lat: -29.8587, lng: 31.0218 },
  { id: "pietermaritzburg", name: "Pietermaritzburg", province: "KwaZulu-Natal", lat: -29.6168, lng: 30.3928 },
  { id: "richards-bay", name: "Richards Bay", province: "KwaZulu-Natal", lat: -28.7808, lng: 32.0383 },
  { id: "newcastle", name: "Newcastle", province: "KwaZulu-Natal", lat: -27.7571, lng: 29.9318 },
  { id: "gqeberha", name: "Gqeberha", province: "Eastern Cape", lat: -33.9608, lng: 25.6022 },
  { id: "east-london", name: "East London", province: "Eastern Cape", lat: -33.0292, lng: 27.9058 },
  { id: "mthatha", name: "Mthatha", province: "Eastern Cape", lat: -31.5889, lng: 28.6767 },
  { id: "george", name: "George", province: "Western Cape", lat: -33.9836, lng: 22.4564 },
  { id: "cape-town", name: "Cape Town", province: "Western Cape", lat: -33.9249, lng: 18.4241 },
  { id: "paarl", name: "Paarl", province: "Western Cape", lat: -33.7311, lng: 18.9747 },
  { id: "stellenbosch", name: "Stellenbosch", province: "Western Cape", lat: -33.9321, lng: 18.8602 },
  { id: "worcester", name: "Worcester", province: "Western Cape", lat: -33.4896, lng: 19.4455 },
  { id: "gaborone", name: "Gaborone", country: "Botswana", lat: -24.6282, lng: 25.9231, crossBorder: true },
  { id: "maputo", name: "Maputo", country: "Mozambique", lat: -25.9692, lng: 32.5732, crossBorder: true },
  { id: "harare", name: "Harare", country: "Zimbabwe", lat: -17.8252, lng: 31.0335, crossBorder: true },
  { id: "mbabane", name: "Mbabane", country: "Eswatini", lat: -26.3054, lng: 31.1367, crossBorder: true },
  { id: "maseru", name: "Maseru", country: "Lesotho", lat: -29.3151, lng: 27.4869, crossBorder: true },
  { id: "windhoek", name: "Windhoek", country: "Namibia", lat: -22.5609, lng: 17.0658, crossBorder: true },
];

export const roadOverrides = {
  "johannesburg|durban": { km: 585, road: "N3" },
  "johannesburg|cape-town": { km: 1400, road: "N1" },
  "johannesburg|pretoria": { km: 60, road: "N1" },
  "johannesburg|bloemfontein": { km: 400, road: "N1" },
  "johannesburg|polokwane": { km: 295, road: "N1" },
  "johannesburg|mbombela": { km: 365, road: "N4" },
  "johannesburg|rustenburg": { km: 120, road: "N4" },
  "johannesburg|emalahleni": { km: 185, road: "N4" },
  "johannesburg|gqeberha": { km: 1065, road: "N1 / N2" },
  "johannesburg|east-london": { km: 1050, road: "N1 / N6" },
  "johannesburg|kimberley": { km: 540, road: "N12 / N8" },
  "johannesburg|gaborone": { km: 380, road: "N14 / A1" },
  "johannesburg|maputo": { km: 600, road: "N4" },
  "johannesburg|harare": { km: 1150, road: "N1 / A4" },
  "johannesburg|mbabane": { km: 370, road: "N4 / MR3" },
  "johannesburg|maseru": { km: 400, road: "N1 / A2" },
  "pretoria|musina": { km: 480, road: "N1" },
  "durban|cape-town": { km: 1730, road: "N2" },
  "durban|gqeberha": { km: 1000, road: "N2" },
  "durban|richards-bay": { km: 165, road: "N2" },
  "durban|pietermaritzburg": { km: 90, road: "N3" },
  "cape-town|gqeberha": { km: 750, road: "N2" },
  "cape-town|george": { km: 430, road: "N2" },
  "cape-town|stellenbosch": { km: 52, road: "R44" },
  "bloemfontein|kimberley": { km: 240, road: "N8" },
};

const R = 6371;
const rad = (d) => (d * Math.PI) / 180;

export const straightLineKm = (a, b) => {
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
};

const pairKey = (a, b) => [a.id, b.id].sort().join("|");

export function routeDistance(fromId, toId) {
  const a = towns.find((t) => t.id === fromId);
  const b = towns.find((t) => t.id === toId);
  if (!a || !b || a.id === b.id) return null;
  const known = roadOverrides[pairKey(a, b)];
  if (known) return { ...known, source: "known", from: a, to: b };
  const km = Math.round(straightLineKm(a, b) * 1.16);
  return { km, road: "Best available route", source: "estimate", from: a, to: b };
}

export function estimateTransit(km) {
  const speed = km < 150 ? 55 : km < 500 ? 65 : 75;
  const driving = km / speed;
  const breaks = Math.max(0, Math.floor(driving / 4.5)) * 0.5;
  const wheelTime = driving + breaks;
  let days, transit;
  if (wheelTime <= 4.5) {
    days = 1;
    transit = wheelTime + 1;
  } else if (wheelTime <= 9) {
    days = 1;
    transit = wheelTime + 3;
  } else {
    days = Math.ceil(wheelTime / 9);
    transit = wheelTime + 8 * (days - 1) + 3;
  }
  return { speed, driving, wheelTime, days, transit };
}
