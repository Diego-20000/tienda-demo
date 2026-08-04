/* ============================================================
   Catálogo de muestra — Dulce Cosecha
   Rubro: conservas, dulces y licores artesanales.
   Estos son los datos "de fábrica": la primera vez que se abre
   la demo se copian a localStorage (ver initCatalog en store.js)
   y desde ahí el panel admin puede agregar, editar o borrar
   productos y categorías sin tocar este archivo.
   ============================================================ */

const SEED_CATEGORIES = [
  { slug: 'conservas', label: 'Conservas' },
  { slug: 'dulces', label: 'Dulces' },
  { slug: 'licores', label: 'Licores' },
  { slug: 'combos', label: 'Combos / Regalos' },
];

const SEED_PRODUCTS = [
  // ---- Conservas ----
  { id: 'p01', name: 'Mermelada de Higo', category: 'conservas', price: 4200, desc: 'Higos de estación cocidos a fuego lento con azúcar y un toque de limón. Frasco de 350g.' },
  { id: 'p02', name: 'Mermelada de Frutilla', category: 'conservas', price: 4000, desc: 'Receta casera, fruta entera, sin conservantes. Frasco de 350g.' },
  { id: 'p03', name: 'Dulce de Membrillo', category: 'conservas', price: 4500, desc: 'Dulce de membrillo tradicional en frasco, ideal con quesos. 400g.' },
  { id: 'p04', name: 'Dulce de Batata', category: 'conservas', price: 4300, desc: 'Dulce de batata artesanal, textura suave. 400g.' },
  { id: 'p05', name: 'Escabeche de Berenjenas', category: 'conservas', price: 5200, desc: 'Berenjenas en escabeche casero, receta de feria. Frasco de 400g.' },
  { id: 'p06', name: 'Pickles Mixtos', category: 'conservas', price: 4800, desc: 'Verduras encurtidas de estación, mezcla de la huerta. Frasco de 350g.' },
  { id: 'p07', name: 'Cebollas Encurtidas', category: 'conservas', price: 3900, desc: 'Cebolla morada encurtida, ideal para picadas y sándwiches. 300g.' },
  { id: 'p08', name: 'Chimichurri Artesanal', category: 'conservas', price: 3600, desc: 'Salsa chimichurri casera, hierbas frescas. Frasco de 250g.' },

  // ---- Dulces ----
  { id: 'p09', name: 'Alfajores de Maicena (x6)', category: 'dulces', price: 5400, desc: 'Alfajores de maicena rellenos de dulce de leche, bañados en coco. Docena chica x6.' },
  { id: 'p10', name: 'Alfajores de Chocolate (x6)', category: 'dulces', price: 5800, desc: 'Tapas de cacao, relleno de dulce de leche, baño de chocolate. x6 unidades.' },
  { id: 'p11', name: 'Bombones Artesanales (caja x9)', category: 'dulces', price: 7200, desc: 'Surtido de bombones de chocolate rellenos, caja de regalo x9.' },
  { id: 'p12', name: 'Turrón de Maní', category: 'dulces', price: 3200, desc: 'Turrón casero de maní, receta de feria. 200g.' },
  { id: 'p13', name: 'Budín de Limón', category: 'dulces', price: 5600, desc: 'Budín húmedo de limón con glaseado. Molde individual de 500g.' },
  { id: 'p14', name: 'Cookies Artesanales (x8)', category: 'dulces', price: 4600, desc: 'Cookies caseras de chips de chocolate, bolsa x8 unidades.' },
  { id: 'p15', name: 'Alfajores de Chocolate y Coco (x6)', category: 'dulces', price: 6000, desc: 'Variante especial bañada en chocolate con coco rallado. x6 unidades.' },

  // ---- Licores ----
  { id: 'p16', name: 'Licor de Café', category: 'licores', price: 11500, desc: 'Licor artesanal de café de grano, elaboración casera. Botella de 500ml.' },
  { id: 'p17', name: 'Limoncello Casero', category: 'licores', price: 12000, desc: 'Limoncello con cáscara de limón de estación, receta italiana tradicional. 500ml.' },
  { id: 'p18', name: 'Licor de Naranja', category: 'licores', price: 11800, desc: 'Licor de naranja con un toque de canela. Botella de 500ml.' },
  { id: 'p19', name: 'Amargo Serrano', category: 'licores', price: 13500, desc: 'Amargo artesanal a base de hierbas serranas, receta de familia. 500ml.' },
  { id: 'p20', name: 'Licor de Menta', category: 'licores', price: 11500, desc: 'Licor de menta fresca, ideal como digestivo. Botella de 500ml.' },
  { id: 'p21', name: 'Aperitivo de Membrillo', category: 'licores', price: 12500, desc: 'Aperitivo dulce a base de membrillo casero. Botella de 500ml.' },

  // ---- Combos / Regalos ----
  { id: 'p22', name: 'Combo Desayuno (mermelada + budín)', category: 'combos', price: 9500, desc: 'Un frasco de mermelada a elección + budín individual, en bolsa de regalo.' },
  { id: 'p23', name: 'Set Conservas x3', category: 'combos', price: 12200, desc: 'Tres frascos de conservas a elección, presentados juntos para regalar.' },
  { id: 'p24', name: 'Caja Regalo Dulce y Licor', category: 'combos', price: 18500, desc: 'Una botella de licor a elección + alfajores, en caja de regalo con tarjeta.' },
  { id: 'p25', name: 'Picada Dulce Surtida', category: 'combos', price: 14800, desc: 'Selección de dulces y conservas para compartir, ideal para llevar a una reunión.' },
  { id: 'p26', name: 'Combo Feria (conserva + dulce + licor)', category: 'combos', price: 19900, desc: 'Lo mejor de cada categoría en un solo combo: una conserva, un dulce y un licor a elección.' },
];

function formatARS(n) {
  return '$' + n.toLocaleString('es-AR');
}
