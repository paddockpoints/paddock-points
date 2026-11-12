/* ============================================================
   SITE DATA — this is the only file you edit after each race.
   1. Change UPDATED to today's date.
   2. Penalty points: add a line to the driver's "o" list:
        {p:POINTS, ev:"EVENT", why:"REASON", exp:"YYYY-MM-DD", src:"LINK"}
      exp = the date the point expires (12 months after it was given).
      src = link to the stewards' decision or report it came from (optional;
            without it the site links to the PlanetF1 tracker in DEFAULT_SRC).
      Add prov:true while a penalty is not yet confirmed against the FIA
      stewards' decision. It shows as "Provisional" on the site. Remove it
      once you have checked the FIA document.
      Expired points drop off the site automatically — never delete them by hand
      until you want to tidy up.
   3. Road to F1: update the championship points (3rd value) and keep
      rows in championship order. Licence points are worked out for you.
   ============================================================ */
const UPDATED="2026-11-09";
const UPDATED_NOTE="After São Paulo GP";
const DEFAULT_SRC={label:"PlanetF1 tracker",url:"https://www.planetf1.com/features/f1-penalty-points-drivers"};

const TEAMS={ "McLaren":"#ff8000","Mercedes":"#27f4d2","Red Bull":"#3671c6","Ferrari":"#e8002d","Williams":"#64c4ff",
  "Racing Bulls":"#6692ff","Aston Martin":"#229971","Haas":"#b6babd","Audi":"#9b0000","Alpine":"#0093cc","Cadillac":"#c9a227"};
const DRIVERS=[
 {n:"Franco Colapinto",t:"Alpine",o:[
   {p:1,ev:"Barcelona-Catalunya GP 2026",why:"Failing to slow for yellow flags",exp:"2027-06-14"},
   {p:2,ev:"Dutch GP 2026",why:"Overtaking under double yellow flags",exp:"2027-08-23"},
   {p:1,ev:"Dutch GP 2026",why:"Second yellow flag infringement",exp:"2027-08-23"},
   {p:1,ev:"Mexico City GP 2026",why:"Failing to slow for single yellow flags",exp:"2027-11-01"}]},
 {n:"Liam Lawson",t:"Racing Bulls",o:[
   {p:1,ev:"São Paulo GP 2025 Sprint",why:"Causing a collision with Bearman",exp:"2026-11-09"},
   {p:1,ev:"Abu Dhabi GP 2025",why:"Erratic driving while defending",exp:"2026-12-07"},
   {p:1,ev:"Dutch GP 2026",why:"Yellow flag infringement",exp:"2027-08-23"},
   {p:1,ev:"Mexico City GP 2026 (FP2)",why:"Unacceptable driving, contact with Verstappen",exp:"2027-10-30",src:"https://www.planetf1.com/news/fia-verstappen-lawson-grid-penalty-mexico-gp"}]},
 {n:"Oliver Bearman",t:"Haas",o:[
   {p:1,ev:"São Paulo GP 2025",why:"Potentially dangerous driving",exp:"2026-11-09"},
   {p:1,ev:"Abu Dhabi GP 2025",why:"More than one change of direction defending",exp:"2026-12-07"}]},
 {n:"Gabriel Bortoleto",t:"Audi",o:[
   {p:2,ev:"Las Vegas GP 2025",why:"Causing a collision with Stroll",exp:"2026-11-23"}]},
 {n:"Arvid Lindblad",t:"Racing Bulls",o:[
   {p:2,ev:"Dutch GP 2026",why:"Yellow flag infringement",exp:"2027-08-23"}]},
 {n:"Oscar Piastri",t:"McLaren",o:[
   {p:2,ev:"São Paulo GP 2025",why:"Causing a collision with Antonelli and Leclerc",exp:"2026-11-09"}]},
 {n:"Alex Albon",t:"Williams",o:[
   {p:1,ev:"Las Vegas GP 2025",why:"Contact with Hamilton",exp:"2026-11-23"},
   {p:2,ev:"São Paulo GP 2026",why:"Rejoining the track unsafely, forcing Gasly to brake",exp:"2027-11-08",src:"https://www.gpblog.com/en/news/brazilian-gp-stewards-deliver-verdict-after-dangerous-on-track-incident"}]},
 {n:"Kimi Antonelli",t:"Mercedes",o:[
   {p:1,ev:"Hungarian GP 2026 (qualifying)",why:"Not slowing enough under yellow flags",exp:"2027-07-25"}]},
 {n:"Lewis Hamilton",t:"Ferrari",o:[
   {p:1,ev:"São Paulo GP 2025",why:"Causing a collision with Colapinto",exp:"2026-11-09"}]},
 {n:"Lance Stroll",t:"Aston Martin",o:[
   {p:1,ev:"Abu Dhabi GP 2025",why:"More than one change of direction defending",exp:"2026-12-07"}]},
 {n:"Max Verstappen",t:"Red Bull",o:[
   {p:1,ev:"Mexico City GP 2026 (FP2)",why:"Unacceptable driving, contact with Lawson",exp:"2027-10-30",src:"https://www.planetf1.com/news/fia-verstappen-lawson-grid-penalty-mexico-gp"}]},
 {n:"Fernando Alonso",t:"Aston Martin",o:[]},
 {n:"Valtteri Bottas",t:"Cadillac",o:[]},
 {n:"Sergio Pérez",t:"Cadillac",o:[]},
 {n:"Pierre Gasly",t:"Alpine",o:[
   {p:2,ev:"Mexico City GP 2026",why:"Failing to slow for double yellow flags",exp:"2027-11-01"}]},
 {n:"Isack Hadjar",t:"Red Bull",o:[]},
 {n:"Nico Hülkenberg",t:"Audi",o:[]},
 {n:"Charles Leclerc",t:"Ferrari",o:[]},
 {n:"Lando Norris",t:"McLaren",o:[]},
 {n:"Esteban Ocon",t:"Haas",o:[]},
 {n:"George Russell",t:"Mercedes",o:[]},
 {n:"Carlos Sainz",t:"Williams",o:[
   {p:2,ev:"Azerbaijan GP 2026 (qualifying)",why:"Failing to slow for yellow flags",exp:"2027-09-25"}]},
 {n:"Ryo Hirakawa",t:"Haas",o:[]},
 {n:"Rafael Câmara",t:"Haas",o:[]}
];

const SL={F2:[40,40,40,30,20,10,8,6,4,3],F3:[30,25,20,15,12,9,7,5,3,2]};
const SERIES={
 F2:{status:"2026 season in progress, standings after the Baku double-header. Positions and points are provisional until the Abu Dhabi finale.",
  rows:[
   ["Rafael Câmara","Invicta Racing",207,0,"F1 debut for Haas at São Paulo GP; Haas seat confirmed for 2027"],
   ["Nikola Tsolov","Campos Racing",200,25,"Banked 25 as 2025 F3 runner-up"],
   ["Alex Dunne","Rodin Motorsport",189,0,""],
   ["Gabriele Minì","MP Motorsport",163,0,""],
   ["Dino Beganovic","DAMS Lucas Oil",137,0,"Ferrari F1 reserve for 2027"],
   ["Noel León","Campos Racing",133,0,""],
   ["Martinius Stenshorne","Rodin Motorsport",107,0,""],
   ["Joshua Dürksen","Invicta Racing",90,0,""],
   ["Kush Maini","ART Grand Prix",90,0,""],
   ["Laurens van Hoepen","Trident",90,0,""],
   ["Tasanapol Inthraphuvasak","ART Grand Prix",71,0,""],
   ["Ritomo Miyata","Hitech",70,0,""]]},
 F3:{status:"2026 season complete. Ugo Ugochukwu won the title by 14 points at the Madring finale in September.",
  rows:[
   ["Ugo Ugochukwu","Campos Racing",159,0,"2026 F3 champion"],
   ["Freddie Slater","Trident",145,0,""],
   ["Tuukka Taponen","MP Motorsport",109,0,"Expected to step up to F2"],
   ["Taito Kato","ART Grand Prix",105,0,""],
   ["Théophile Naël","Campos Racing",88,0,""],
   ["Pedro Clerot","Rodin Motorsport",88,0,""],
   ["Ernesto Rivera","Campos Racing",87,0,""],
   ["Brando Badoer","Rodin Motorsport",71,0,""],
   ["Hiyu Yamakoshi","Van Amersfoort Racing",71,0,""],
   ["Noah Strømsted","Trident",65,0,""],
   ["Bruno del Pino","Van Amersfoort Racing",57,0,""],
   ["Maciej Gładysz","ART Grand Prix",54,0,""]]}
};
