const image = (name: string) => `/images/${name}`;

export const PLAYER = {
  name: "Jimoh Abdulmumin",
  firstName: "JIMOH",
  lastName: "ABDULMUMIN",
  tagline: "WORDS. STRATEGY. COMPETITION.",
  subtitle: "WESPA International Master · PANASA Expert · 15 Years",
  heroPhoto: image("photo4.jpg"),
  profilePhoto: image("photo10.jpg"),

  bio: [
    "My story started in our family room, playing a game that would eventually take me from the comfort of home to the magnificent halls and arenas of Scrabble across Nigeria and beyond.",
    "From those humble beginnings to becoming an International Master recognized by WESPA and a Scrabble Expert under PANASA — the journey has been nothing short of remarkable. Every game taught me something. Every victory challenged me to aim higher. Every loss reminded me there is always room to improve.",
    "The dream remains simple: to become better every single day. 15 years down, and I am still learning, still competing, still growing, and still hungry. This is my story. And the journey continues.",
  ],

  rating: 2063,
  ranking: "World No. 16",
  wespaCode: "JABD",
  gamesPlayed: 651,
  wins: 340,
  winRate: "68%",
  highestScore: 524,
  tournamentWins: 23,
  yearsPlaying: 15,
  tournaments: 45,
  podiums: 31,

  social: {
    facebook: "https://www.facebook.com/share/16BNDbmk7xP/?mibextid=wwXIfr",
    instagram: "https://www.instagram.com/abdulmumeen__jimoh",
    whatsapp: "https://wa.me/2349165170852",
    wespa: "https://wespa.xerafin.net/rankings.html",
  },
  contact: {
    whatsapp: "+234 916 517 0852",
    email: "Jimohabdulmumuni633@gmail.com",
  },
} as const;

export type Result =
  | "Winner"
  | "1st Runner Up"
  | "2nd Runner Up"
  | "Gold Medalist"
  | "Silver Medalist"
  | "Fourth Position"
  | "Fifth Position"
  | "Seventh Position";

export type Achievement = {
  year: number;
  event: string;
  result: Result;
  location?: string;
  photo?: string;
  featured?: boolean;
};

export const ACHIEVEMENTS: Achievement[] = [
  { year: 2017, event: "Godswill Akpabio International Classics (Youth Category)", result: "Winner", featured: true },
  { year: 2018, event: "Owerri Opens (Intermediate/Masters)", result: "1st Runner Up" },
  { year: 2019, event: "OSFI 2019", result: "1st Runner Up" },
  { year: 2020, event: "Ushaka Tournament", location: "Makurdi", result: "2nd Runner Up" },
  { year: 2021, event: "Mindsport Premier League — Hurricanes", result: "Fourth Position" },
  { year: 2021, event: "Champions of Champions", result: "Fourth Position" },
  { year: 2022, event: "Plateau State Annual Tournament (Scrabble in the Rock)", result: "Winner", featured: true },
  { year: 2022, event: "Mindsport Premier League — Hurricanes", result: "2nd Runner Up" },
  { year: 2022, event: "National Sports Festival (Doubles Category)", result: "Gold Medalist", photo: image("photo2.jpg"), featured: true },
  { year: 2022, event: "National Sports Festival (Best Draw Board)", result: "Silver Medalist" },
  { year: 2023, event: "Akure Bimonthly Retreat", result: "Winner" },
  { year: 2023, event: "Interclub Challenge (Apex Scrabble Club)", result: "1st Runner Up" },
  { year: 2023, event: "Mindsport Premier League — Hurricanes", result: "Winner", featured: true },
  { year: 2023, event: "MSPL Grandslam Tournament", result: "Seventh Position" },
  { year: 2023, event: "Engr. Adowei / Sir Collins Birthday Retreat", result: "Winner" },
  { year: 2023, event: "PA Momoh Egbele Memorial Tournament", result: "Winner" },
  { year: 2024, event: "Emmanuel Egbele Annual Scrabble Tournament", result: "Fifth Position" },
  { year: 2024, event: "Pyramid Celebration Retreat", location: "Kentade, Lagos", result: "1st Runner Up" },
  { year: 2024, event: "Interclub Challenge (Apex Scrabble Club)", result: "Fourth Position" },
  { year: 2024, event: "Akure Bimonthly Retreat", result: "Fifth Position" },
  { year: 2024, event: "President Toke's Birthday Jamz", result: "Winner" },
  { year: 2024, event: "All African Games Side Event Tournament", location: "Ghana", result: "Seventh Position" },
  { year: 2024, event: "Gov. Douye Diri National Tournament (4th Edition)", result: "Fourth Position" },
  { year: 2024, event: "South South Open (Masters Category)", result: "1st Runner Up" },
  { year: 2024, event: "South West Open", location: "Akure, Ondo State", result: "2nd Runner Up" },
  { year: 2024, event: "JAMSC 2024", result: "2nd Runner Up" },
  { year: 2024, event: "National Sports Festival (Doubles Category)", result: "Gold Medalist", featured: true },
  { year: 2024, event: "African Scrabble Championship", location: "Kigali, Rwanda", result: "Fourth Position", featured: true },
  { year: 2025, event: "Asaph Zadok Best State (Ogun)", result: "Winner" },
  { year: 2025, event: "Interclub Challenge (Gateway SC)", result: "Winner" },
  { year: 2025, event: "BIST — Bubbles Invitational Scrabble Tournament (1st Edition)", result: "Winner" },
  { year: 2025, event: "BSP 2.0", location: "Ajegunle, Lagos", result: "Winner" },
  { year: 2025, event: "Gov. Douye Diri National Scrabble Championship (5th Edition)", result: "1st Runner Up" },
  { year: 2025, event: "Lekki Scrabble Classics", location: "Lekki Peninsula Hotel and Towers", result: "Winner", photo: image("photo6.jpg"), featured: true },
  { year: 2025, event: "Lagos Unified Scrabble Meet (LUSM)", location: "Rowe Park, Yaba, Lagos", result: "Winner", photo: image("photo10.jpg"), featured: true },
  { year: 2025, event: "World Scrabble Championship", location: "Accra, Ghana", result: "Seventh Position", photo: image("photo9.jpg"), featured: true },
  { year: 2025, event: "Scrabblemania 3.0", location: "Sinkor, Monrovia", result: "Winner" },
  { year: 2025, event: "Gov. Douye Diri National Scrabble Championship (6th Edition)", result: "Winner", featured: true },
  { year: 2026, event: "Masters Class Invite Scrabble Tournament 1.0", location: "Opebi, Ikeja, Lagos", result: "Winner", photo: image("photo7.jpg"), featured: true },
  { year: 2026, event: "Dynamite Open Scrabble Tournament 5.0 (Celebrity Doubles)", result: "Winner" },
  { year: 2026, event: "Surulere May Scrabble Retreat", result: "1st Runner Up" },
  { year: 2026, event: "Scrabblemania 4.0", location: "Gbagada, Lagos", result: "Winner", photo: image("photo5.jpg"), featured: true },
  { year: 2026, event: "Champ Invitational Retreat", location: "NAF Officers' Mess, PWD, Ikeja, Lagos State", result: "Winner", photo: image("trophy-group.jpg") },
  { year: 2026, event: "Lekki Scrabble Classics", location: "Lekki Peninsula Hotel and Towers", result: "Winner", photo: image("trophy-bus.jpg"), featured: true },
  { year: 2026, event: "African Scrabble Championship", location: "Sinkor, Liberia · October 22–25", result: "Winner", photo: image("africa-champion.png"), featured: true },
];

export type GalleryItem = {
  src: string;
  caption: string;
  year: number;
  tag: "Tournament" | "Competition" | "Awards" | "Travel";
};

export const GALLERY: GalleryItem[] = [
  { src: image("africa-mvp.png"), caption: "MVP Trophy Winner — 16th African Scrabble Championship", year: 2026, tag: "Awards" },
  { src: image("africa-champion.png"), caption: "African Scrabble Champion — Sinkor, Liberia", year: 2026, tag: "Awards" },
  { src: image("africa-trophy.png"), caption: "A proud championship moment for Nigeria", year: 2026, tag: "Awards" },
  { src: image("then-now.jpg"), caption: "Then and now — fifteen years of growth at the board", year: 2026, tag: "Competition" },
  { src: image("trophy-bus.jpg"), caption: "Bringing another championship trophy home", year: 2026, tag: "Travel" },
  { src: image("trophy-group.jpg"), caption: "Celebrating a championship podium moment", year: 2026, tag: "Awards" },
  { src: image("photo4.jpg"), caption: "Deep focus — World Scrabble Championship 2025", year: 2025, tag: "Competition" },
  { src: image("photo10.jpg"), caption: "Winner — Lagos Unified Scrabble Meet 2025", year: 2025, tag: "Awards" },
  { src: image("photo5.jpg"), caption: "Scrabblemania 4.0 winner — Gbagada, Lagos 2026", year: 2026, tag: "Awards" },
  { src: image("photo2.jpg"), caption: "National Scrabble Championship — Gold Medal", year: 2022, tag: "Tournament" },
  { src: image("photo9.jpg"), caption: "WESPA 2025 prize ceremony — Accra, Ghana", year: 2025, tag: "Tournament" },
  { src: image("photo6.jpg"), caption: "Lekki Scrabble Classics 2025 — victory moment", year: 2025, tag: "Awards" },
  { src: image("photo7.jpg"), caption: "Masters Class Invite 1.0 winner — Ikeja 2026", year: 2026, tag: "Awards" },
  { src: image("photo3.jpg"), caption: "International journey — Bangkok, Thailand", year: 2025, tag: "Travel" },
];

export const TILE_VALUES: Record<string, number> = {
  A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8,
  K: 5, L: 1, M: 3, N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1,
  U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10,
};
