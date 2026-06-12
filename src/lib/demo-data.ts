export type Position = "POR" | "DEF" | "MED" | "DEL";

export type Player = {
  id: number;
  name: string;
  team: string;
  position: Position;
  value: number;
  points: number;
  form: number;
  trend: number;
  status: "titular" | "duda" | "lesionado";
  initials: string;
  color: string;
};

export const myPlayers: Player[] = [
  { id: 1, name: "Unai Simón", team: "Athletic Club", position: "POR", value: 7.8, points: 126, form: 7.4, trend: 3.2, status: "titular", initials: "US", color: "#d83a4b" },
  { id: 2, name: "Dani Carvajal", team: "Real Madrid", position: "DEF", value: 8.6, points: 119, form: 7.1, trend: 1.8, status: "titular", initials: "DC", color: "#f4d25a" },
  { id: 3, name: "Pau Cubarsí", team: "FC Barcelona", position: "DEF", value: 10.2, points: 134, form: 7.8, trend: 4.5, status: "titular", initials: "PC", color: "#4569d4" },
  { id: 4, name: "Robin Le Normand", team: "Atlético", position: "DEF", value: 7.4, points: 108, form: 6.8, trend: -0.6, status: "duda", initials: "RL", color: "#db3b45" },
  { id: 5, name: "Alejandro Balde", team: "FC Barcelona", position: "DEF", value: 6.9, points: 101, form: 6.6, trend: 2.2, status: "titular", initials: "AB", color: "#4569d4" },
  { id: 6, name: "Jude Bellingham", team: "Real Madrid", position: "MED", value: 18.9, points: 198, form: 8.6, trend: 3.9, status: "titular", initials: "JB", color: "#f4d25a" },
  { id: 7, name: "Pedri", team: "FC Barcelona", position: "MED", value: 14.3, points: 175, form: 8.1, trend: 5.1, status: "titular", initials: "PE", color: "#4569d4" },
  { id: 8, name: "Álex Baena", team: "Villarreal", position: "MED", value: 12.7, points: 168, form: 7.9, trend: 4.2, status: "titular", initials: "ÁB", color: "#e6ca3d" },
  { id: 9, name: "Isco", team: "Real Betis", position: "MED", value: 9.8, points: 154, form: 7.6, trend: -1.1, status: "duda", initials: "IS", color: "#3ba06a" },
  { id: 10, name: "Kylian Mbappé", team: "Real Madrid", position: "DEL", value: 24.8, points: 231, form: 9.2, trend: 6.8, status: "titular", initials: "KM", color: "#f4d25a" },
  { id: 11, name: "Lamine Yamal", team: "FC Barcelona", position: "DEL", value: 22.1, points: 218, form: 9.0, trend: 7.3, status: "titular", initials: "LY", color: "#4569d4" },
  { id: 12, name: "Oihan Sancet", team: "Athletic Club", position: "MED", value: 8.2, points: 133, form: 7.0, trend: 1.4, status: "titular", initials: "OS", color: "#d83a4b" },
  { id: 13, name: "Aitor Paredes", team: "Athletic Club", position: "DEF", value: 4.6, points: 88, form: 6.3, trend: 0.7, status: "titular", initials: "AP", color: "#d83a4b" },
  { id: 14, name: "Álex Remiro", team: "Real Sociedad", position: "POR", value: 6.1, points: 114, form: 6.9, trend: 0.4, status: "titular", initials: "ÁR", color: "#4b83ca" },
  { id: 15, name: "Borja Iglesias", team: "Celta", position: "DEL", value: 5.7, points: 96, form: 6.5, trend: -2.0, status: "lesionado", initials: "BI", color: "#74a9d6" },
];

export const marketPlayers: Player[] = [
  { id: 101, name: "Nico Williams", team: "Athletic Club", position: "DEL", value: 15.4, points: 178, form: 8.2, trend: 5.7, status: "titular", initials: "NW", color: "#d83a4b" },
  { id: 102, name: "Federico Valverde", team: "Real Madrid", position: "MED", value: 16.8, points: 183, form: 8.3, trend: 2.8, status: "titular", initials: "FV", color: "#f4d25a" },
  { id: 103, name: "Antony", team: "Real Betis", position: "DEL", value: 11.2, points: 142, form: 7.7, trend: 8.2, status: "titular", initials: "AN", color: "#3ba06a" },
  { id: 104, name: "Julián Álvarez", team: "Atlético", position: "DEL", value: 19.6, points: 205, form: 8.8, trend: 3.6, status: "titular", initials: "JÁ", color: "#db3b45" },
  { id: 105, name: "Martín Zubimendi", team: "Real Sociedad", position: "MED", value: 10.7, points: 151, form: 7.5, trend: 1.6, status: "titular", initials: "MZ", color: "#4b83ca" },
  { id: 106, name: "Jesús Areso", team: "Osasuna", position: "DEF", value: 5.1, points: 105, form: 6.9, trend: 4.1, status: "titular", initials: "JA", color: "#cc3947" },
];

export const standings = [
  { rank: 1, name: "Stratos United", manager: "Ramón", points: 1684, round: 74, budget: 16.4, color: "#b8f35a" },
  { rank: 2, name: "Tiki Taka FC", manager: "Javi", points: 1621, round: 68, budget: 9.7, color: "#65d5ff" },
  { rank: 3, name: "Los Galácticos", manager: "Laura", points: 1579, round: 81, budget: 21.2, color: "#a58cff" },
  { rank: 4, name: "Patapum CF", manager: "Álvaro", points: 1512, round: 59, budget: 6.8, color: "#ff9c72" },
  { rank: 5, name: "La Masía", manager: "Marta", points: 1488, round: 77, budget: 14.1, color: "#ff708f" },
  { rank: 6, name: "Barrio Norte", manager: "Sergio", points: 1396, round: 53, budget: 28.5, color: "#f0cb5d" },
];

export const fixtures = [
  { home: "Real Madrid", away: "Real Sociedad", time: "Sáb · 18:30", homeColor: "#f4d25a", awayColor: "#4b83ca", players: 4 },
  { home: "FC Barcelona", away: "Athletic Club", time: "Sáb · 21:00", homeColor: "#4569d4", awayColor: "#d83a4b", players: 5 },
  { home: "Real Betis", away: "Villarreal", time: "Dom · 16:15", homeColor: "#3ba06a", awayColor: "#e6ca3d", players: 2 },
  { home: "Atlético", away: "Celta", time: "Dom · 21:00", homeColor: "#db3b45", awayColor: "#74a9d6", players: 2 },
];

export const activity = [
  { title: "Puerta Grande fichó a Griezmann", detail: "Oferta ganadora de 18,4 M€", time: "Hace 12 min", type: "market" },
  { title: "Jornada 31 cerrada", detail: "Se han repartido 428 puntos", time: "Hace 2 h", type: "score" },
  { title: "Marta puso a Lamine en venta", detail: "Precio: 23,5 M€", time: "Hace 3 h", type: "market" },
  { title: "Regla actualizada por Ramón", detail: "Capitán: bonificación x1,5", time: "Ayer", type: "admin" },
];
