/* ============================================================
   Generador de imágenes placeholder (SVG, 100% local, sin red).
   Dibuja una silueta simple por categoría sobre un fondo con
   degradé pastel. Se reemplaza fácil por fotos reales: solo
   hay que poner una URL de imagen real en el campo "img" de
   cada producto en data.js.
   ============================================================ */

const PLACEHOLDER_PALETTES = [
  ['#F0D9C9', '#E3A857'], // terracota / mostaza
  ['#E8EEE4', '#8FA888'], // salvia
  ['#F6E4D8', '#C97C5D'], // arcilla
  ['#F1E6D3', '#B98452'], // arena
  ['#EADCEE', '#B98FC2'], // ciruela suave
];

function paletteFor(seed) {
  return PLACEHOLDER_PALETTES[seed % PLACEHOLDER_PALETTES.length];
}

// Siluetas simples por categoría, dibujadas a mano con formas básicas
const CATEGORY_ICONS = {
  mates: (c) => `
    <ellipse cx="200" cy="255" rx="70" ry="66" fill="${c}" opacity=".9"/>
    <rect x="176" y="150" width="16" height="90" rx="8" fill="${c}" transform="rotate(-18 184 195)"/>
    <circle cx="146" cy="140" r="7" fill="${c}"/>
  `,
  tazas: (c) => `
    <rect x="140" y="180" width="120" height="90" rx="16" fill="${c}" opacity=".9"/>
    <path d="M260 195 h26 a24 24 0 0 1 0 60 h-26" fill="none" stroke="${c}" stroke-width="14"/>
  `,
  tazones: (c) => `
    <path d="M120 210 h160 a80 60 0 0 1 -160 0 z" fill="${c}" opacity=".9"/>
    <ellipse cx="200" cy="210" rx="80" ry="16" fill="${c}"/>
  `,
  platitos: (c) => `
    <ellipse cx="200" cy="235" rx="105" ry="30" fill="${c}" opacity=".9"/>
    <ellipse cx="200" cy="228" rx="70" ry="18" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="4"/>
  `,
  'juegos-de-te': (c) => `
    <path d="M130 220 h140 a20 40 0 0 1 -20 50 h-100 a20 40 0 0 1 -20 -50 z" fill="${c}" opacity=".9"/>
    <path d="M270 225 h20 a18 18 0 0 1 0 36 h-20" fill="none" stroke="${c}" stroke-width="10"/>
    <rect x="185" y="185" width="10" height="30" rx="4" fill="${c}"/>
    <circle cx="190" cy="178" r="9" fill="${c}"/>
  `,
  combos: (c) => `
    <rect x="130" y="190" width="140" height="100" rx="10" fill="${c}" opacity=".9"/>
    <rect x="130" y="190" width="140" height="26" fill="#fff" opacity=".35"/>
    <rect x="190" y="190" width="20" height="100" fill="#fff" opacity=".35"/>
  `,
};

function productPlaceholderDataUri(category, seed) {
  const [bg, fg] = paletteFor(seed);
  const iconFn = CATEGORY_ICONS[category] || CATEGORY_ICONS.tazas;
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <defs>
    <radialGradient id="g${seed}" cx="50%" cy="42%" r="70%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="${bg}"/>
    </radialGradient>
  </defs>
  <rect width="400" height="400" fill="url(#g${seed})"/>
  ${iconFn(fg)}
</svg>`.trim();
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}
