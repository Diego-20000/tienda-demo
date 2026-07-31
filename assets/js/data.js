/* ============================================================
   Catálogo de muestra — Abriendo Caminos
   Productos ficticios a modo de ejemplo, con precios en el orden
   de magnitud real informado por la clienta (ver spec). Reemplazar
   por el catálogo real (~70 ítems) cuando esté cargado en el panel.
   ============================================================ */

const CATEGORIES = [
  { slug: 'mates', label: 'Mates' },
  { slug: 'tazas', label: 'Tazas' },
  { slug: 'tazones', label: 'Tazones' },
  { slug: 'platitos', label: 'Platitos' },
  { slug: 'juegos-de-te', label: 'Juegos de té' },
  { slug: 'combos', label: 'Combos / Regalos' },
];

const PRODUCTS = [
  // ---- Mates ----
  { id: 'p01', name: 'Mate Ovalado Terracota', category: 'mates', price: 5000, desc: 'Mate torneado a mano en arcilla terracota, esmaltado en su interior. Pieza única, terminación mate.' },
  { id: 'p02', name: 'Mate Esmaltado Salvia', category: 'mates', price: 5200, desc: 'Mate de cuerpo redondeado con esmalte verde salvia y base engobada en tono natural.' },
  { id: 'p03', name: 'Mate Camionero Ciruela', category: 'mates', price: 4800, desc: 'Mate camionero clásico, esmalte ciruela mate por fuera y brillante por dentro.' },
  { id: 'p04', name: 'Mate Imperial Arena', category: 'mates', price: 5500, desc: 'Mate imperial de boca ancha, tono arena natural con detalle de guarda incisa.' },
  { id: 'p05', name: 'Mate Torpedo Bordó', category: 'mates', price: 4900, desc: 'Forma torpedo clásica, esmalte bordó profundo con brillo satinado.' },
  { id: 'p06', name: 'Mate Doble Pared Natural', category: 'mates', price: 5800, desc: 'Doble pared para mantener el agua caliente por más tiempo. Terminación natural sin esmaltar.' },

  // ---- Tazas ----
  { id: 'p07', name: 'Taza Vintage Arcilla', category: 'tazas', price: 4700, desc: 'Taza de 250ml con asa curva, esmalte arcilla mate y borde engobado en blanco.' },
  { id: 'p08', name: 'Taza Desayuno Salvia', category: 'tazas', price: 5100, desc: 'Taza grande de 350ml ideal para café con leche, esmalte verde salvia satinado.' },
  { id: 'p09', name: 'Taza Espresso Mostaza', category: 'tazas', price: 3900, desc: 'Mini taza de 90ml para café espresso, esmalte mostaza brillante.' },
  { id: 'p10', name: 'Taza Cónica Terracota', category: 'tazas', price: 4600, desc: 'Silueta cónica moderna, interior blanco y exterior en terracota natural.' },
  { id: 'p11', name: 'Taza con Plato Ciruela', category: 'tazas', price: 6200, desc: 'Set de taza y platito a juego, esmalte ciruela con reflejos satinados.' },
  { id: 'p12', name: 'Taza Jarrito Arena', category: 'tazas', price: 4500, desc: 'Taza tipo jarrito de asa ancha, terminación arena mate, apta lavavajillas.' },

  // ---- Tazones ----
  { id: 'p13', name: 'Tazón Desayuno Terracota', category: 'tazones', price: 7200, desc: 'Tazón amplio de 400ml, perfecto para café con leche o granola. Esmalte terracota.' },
  { id: 'p14', name: 'Tazón Nórdico Salvia', category: 'tazones', price: 7600, desc: 'Cuerpo bajo y ancho, esmalte salvia con base natural sin esmaltar.' },
  { id: 'p15', name: 'Tazón Rústico Arena', category: 'tazones', price: 6800, desc: 'Textura rústica al tacto, ideal para sopas o desayunos abundantes.' },
  { id: 'p16', name: 'Tazón Doble Asa Bordó', category: 'tazones', price: 7900, desc: 'Con dos asas laterales para sostener con las dos manos. Esmalte bordó.' },
  { id: 'p17', name: 'Tazón Grande Mostaza', category: 'tazones', price: 8100, desc: 'Capacidad extra grande, ideal para mates cocidos o infusiones compartidas.' },

  // ---- Platitos ----
  { id: 'p18', name: 'Platito Chico Terracota', category: 'platitos', price: 3600, desc: 'Platito de 12cm para masitas o como posavasos de mate. Esmalte terracota.' },
  { id: 'p19', name: 'Platito Ondulado Salvia', category: 'platitos', price: 3900, desc: 'Borde ondulado hecho a mano, esmalte salvia con reflejos.' },
  { id: 'p20', name: 'Platito Hondo Arena', category: 'platitos', price: 4200, desc: 'Platito hondo ideal para dips, aceitunas o snacks de feria.' },
  { id: 'p21', name: 'Set 2 Platitos Ciruela', category: 'platitos', price: 6900, desc: 'Dúo de platitos a juego, esmalte ciruela, ideales para compartir.' },

  // ---- Juegos de té ----
  { id: 'p22', name: 'Juego de Té Terracota (Tetera + 2 tazas)', category: 'juegos-de-te', price: 18500, desc: 'Tetera de 600ml con dos tazas a juego, esmalte terracota mate.' },
  { id: 'p23', name: 'Juego de Té Salvia (Tetera + 4 tazas)', category: 'juegos-de-te', price: 22000, desc: 'Set completo para compartir, tetera de 900ml y cuatro tazas esmaltadas en salvia.' },
  { id: 'p24', name: 'Tetera Individual Arena', category: 'juegos-de-te', price: 9800, desc: 'Tetera chica de 350ml con colador incorporado, ideal para uso individual.' },
  { id: 'p25', name: 'Juego de Té Mostaza (Tetera + 2 tazas)', category: 'juegos-de-te', price: 17800, desc: 'Combinación cálida en tonos mostaza, tetera con pico vertedor preciso.' },

  // ---- Combos / Regalos ----
  { id: 'p26', name: 'Combo Mate + Taza Terracota', category: 'combos', price: 13500, desc: 'Un mate y una taza en la misma paleta de color, presentado en bolsa de tela.' },
  { id: 'p27', name: 'Combo Desayuno Completo Salvia', category: 'combos', price: 16800, desc: 'Tazón + taza + platito a juego, ideal para regalar un desayuno completo.' },
  { id: 'p28', name: 'Set Regalo Mate + Mates Cocido', category: 'combos', price: 14200, desc: 'Mate individual + tazón para mate cocido, en caja de regalo con tarjeta.' },
  { id: 'p29', name: 'Combo Amigas (2 Tazas + 2 Platitos)', category: 'combos', price: 15900, desc: 'Dúo de tazas con platitos a juego, para compartir una merienda.' },
  { id: 'p30', name: 'Caja Regalo Premium Ciruela', category: 'combos', price: 18500, desc: 'Tazón + taza + platito + mate chico, todo en tono ciruela, presentado en caja.' },
  { id: 'p31', name: 'Combo Mate + Bombilla + Yerbera', category: 'combos', price: 13900, desc: 'Set completo para cebar: mate, yerbera a juego y bombilla de regalo.' },
];

function getProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function productImage(product) {
  const seed = parseInt(product.id.replace('p', ''), 10) || 0;
  return productPlaceholderDataUri(product.category, seed);
}

function categoryLabel(slug) {
  const c = CATEGORIES.find((c) => c.slug === slug);
  return c ? c.label : slug;
}

function formatARS(n) {
  return '$' + n.toLocaleString('es-AR');
}
