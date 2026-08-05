/* ============================================================
   Generador de imágenes placeholder (SVG, 100% local, sin red).
   Dibuja una silueta simple por categoría sobre un fondo con
   degradé pastel. Si un producto tiene foto real (campo "img"
   subido desde el panel admin), esa imagen se usa en su lugar
   — ver productImage() más abajo.
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
  tecnologia: (c) => `
    <rect x="160" y="140" width="80" height="140" rx="14" fill="${c}" opacity=".9"/>
    <rect x="172" y="156" width="56" height="96" rx="4" fill="#fff" opacity=".28"/>
    <circle cx="200" cy="266" r="6" fill="#fff" opacity=".5"/>
  `,
  hogar: (c) => `
    <path d="M200 130 L272 190 V272 H128 V190 Z" fill="${c}" opacity=".9"/>
    <rect x="180" y="222" width="40" height="50" fill="#fff" opacity=".22"/>
  `,
  indumentaria: (c) => `
    <path d="M160 150 L185 133 L200 148 L215 133 L240 150 L228 180 L215 170 V272 H185 V170 L172 180 Z" fill="${c}" opacity=".9"/>
  `,
  belleza: (c) => `
    <rect x="188" y="138" width="24" height="24" rx="5" fill="${c}"/>
    <path d="M178 168 h44 l6 20 v72 a9 9 0 0 1 -9 9 h-38 a9 9 0 0 1 -9 -9 v-72 z" fill="${c}" opacity=".9"/>
    <rect x="178" y="222" width="44" height="20" fill="#fff" opacity=".2"/>
  `,
  deportes: (c) => `
    <circle cx="200" cy="220" r="62" fill="${c}" opacity=".9"/>
    <path d="M148 220 h104 M200 168 v104" stroke="#fff" stroke-opacity=".35" stroke-width="6"/>
  `,
  ofertas: (c) => `
    <path d="M150 150 L232 150 L272 190 L192 272 L150 230 Z" fill="${c}" opacity=".9"/>
    <circle cx="180" cy="180" r="10" fill="#fff" opacity=".55"/>
  `,
  default: (c) => `
    <circle cx="200" cy="220" r="70" fill="${c}" opacity=".85"/>
  `,
};

function productPlaceholderDataUri(category, seed) {
  const [bg, fg] = paletteFor(seed);
  const iconFn = CATEGORY_ICONS[category] || CATEGORY_ICONS.default;
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

function productImage(product) {
  if (product.img) return product.img;
  const numeric = parseInt(String(product.id).replace(/\D/g, ''), 10) || 0;
  return productPlaceholderDataUri(product.category, numeric);
}
