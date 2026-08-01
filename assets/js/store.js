/* ============================================================
   Store — capa de datos 100% cliente (localStorage).
   No hay backend: esto simula lo que en producción sería
   Node + Express + PostgreSQL (ver spec técnica del proyecto).
   Estados de pedido: pendiente_pago -> pendiente_confirmar ->
   pagado_confirmado  (o -> cancelado si vencen los 15 min)
   ============================================================ */

const LS_CART = 'ac_cart';
const LS_ORDERS = 'ac_orders';
const LS_SEQ = 'ac_order_seq';
const LS_ADMIN = 'ac_admin_session';
const LS_PRODUCTS = 'ac_products';
const LS_CATEGORIES = 'ac_categories';
const LS_PRODUCT_SEQ = 'ac_product_seq';
const RESERVA_MIN = 15;

const ALIAS_MP = 'abriendocaminos.mp';
const WHATSAPP = '2241 515744';

// ---------- helpers genéricos ----------
function readLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}
function writeLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ---------- catálogo (productos + categorías) ----------
// Se "seedea" una sola vez desde data.js. A partir de ahí el panel
// admin lee y escribe acá — así los cambios se ven en vivo en la tienda.
function initCatalog() {
  if (localStorage.getItem(LS_PRODUCTS) === null) writeLS(LS_PRODUCTS, SEED_PRODUCTS);
  if (localStorage.getItem(LS_CATEGORIES) === null) writeLS(LS_CATEGORIES, SEED_CATEGORIES);
}
initCatalog();

function getProducts() {
  return readLS(LS_PRODUCTS, SEED_PRODUCTS);
}
function getCategories() {
  return readLS(LS_CATEGORIES, SEED_CATEGORIES);
}
function getProduct(id) {
  return getProducts().find((p) => p.id === id);
}
function categoryLabel(slug) {
  const c = getCategories().find((c) => c.slug === slug);
  return c ? c.label : slug;
}
function nextProductId() {
  const seq = readLS(LS_PRODUCT_SEQ, 100) + 1;
  writeLS(LS_PRODUCT_SEQ, seq);
  return 'pc' + seq;
}
function saveProduct(product) {
  const products = getProducts();
  if (product.id) {
    const idx = products.findIndex((p) => p.id === product.id);
    if (idx >= 0) products[idx] = { ...products[idx], ...product };
    else products.push(product);
  } else {
    product.id = nextProductId();
    products.push(product);
  }
  writeLS(LS_PRODUCTS, products);
  return product;
}
function deleteProduct(id) {
  writeLS(LS_PRODUCTS, getProducts().filter((p) => p.id !== id));
}
function productCount(categorySlug) {
  return getProducts().filter((p) => p.category === categorySlug).length;
}
function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'categoria';
}
function saveCategory(label, existingSlug) {
  const categories = getCategories();
  if (existingSlug) {
    const cat = categories.find((c) => c.slug === existingSlug);
    if (cat) cat.label = label;
  } else {
    let slug = slugify(label);
    let n = 2;
    while (categories.some((c) => c.slug === slug)) {
      slug = slugify(label) + '-' + n++;
    }
    categories.push({ slug, label });
  }
  writeLS(LS_CATEGORIES, categories);
}
function deleteCategory(slug) {
  if (productCount(slug) > 0) return false;
  writeLS(LS_CATEGORIES, getCategories().filter((c) => c.slug !== slug));
  return true;
}
function resetCatalog() {
  writeLS(LS_PRODUCTS, SEED_PRODUCTS);
  writeLS(LS_CATEGORIES, SEED_CATEGORIES);
  localStorage.removeItem(LS_PRODUCT_SEQ);
}

// ---------- carrito ----------
function getCart() {
  return readLS(LS_CART, []);
}
function saveCart(cart) {
  writeLS(LS_CART, cart);
  updateCartBadge();
}
function addToCart(productId, qty) {
  const cart = getCart();
  const existing = cart.find((i) => i.productId === productId);
  if (existing) existing.qty += qty;
  else cart.push({ productId, qty });
  saveCart(cart);
}
function setCartQty(productId, qty) {
  let cart = getCart();
  if (qty <= 0) {
    cart = cart.filter((i) => i.productId !== productId);
  } else {
    const existing = cart.find((i) => i.productId === productId);
    if (existing) existing.qty = qty;
  }
  saveCart(cart);
}
function removeFromCart(productId) {
  setCartQty(productId, 0);
}
function cartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}
function cartLines() {
  return getCart()
    .map((i) => {
      const product = getProduct(i.productId);
      if (!product) return null;
      return { product, qty: i.qty, lineTotal: product.price * i.qty };
    })
    .filter(Boolean);
}
function cartTotal() {
  return cartLines().reduce((sum, l) => sum + l.lineTotal, 0);
}
function clearCart() {
  writeLS(LS_CART, []);
  updateCartBadge();
}
function updateCartBadge() {
  document.querySelectorAll('[data-cart-count]').forEach((el) => {
    el.textContent = cartCount();
  });
}

// ---------- pedidos ----------
function nextOrderId() {
  const seq = readLS(LS_SEQ, 1000) + 1;
  writeLS(LS_SEQ, seq);
  return 'AC-' + seq;
}
function getOrders() {
  expireStaleOrders();
  return readLS(LS_ORDERS, []);
}
function saveOrders(orders) {
  writeLS(LS_ORDERS, orders);
}
function getOrder(id) {
  return getOrders().find((o) => o.id === id);
}
function createOrder({ clienteNombre, clienteEmail, tipoEntrega }) {
  const lines = cartLines();
  if (!lines.length) return null;
  const now = new Date();
  const vence = new Date(now.getTime() + RESERVA_MIN * 60000);
  const order = {
    id: nextOrderId(),
    cliente_nombre: clienteNombre,
    cliente_email: clienteEmail,
    items: lines.map((l) => ({
      productId: l.product.id,
      name: l.product.name,
      qty: l.qty,
      unitPrice: l.product.price,
    })),
    monto_total: cartTotal(),
    tipo_entrega: tipoEntrega,
    estado: 'pendiente_pago',
    creado_en: now.toISOString(),
    vence_en: vence.toISOString(),
    comprobante: null,
    comprobante_subido_en: null,
    confirmado_en: null,
  };
  const orders = readLS(LS_ORDERS, []);
  orders.unshift(order);
  saveOrders(orders);
  clearCart();
  return order;
}
function attachComprobante(orderId, dataUrl) {
  const orders = readLS(LS_ORDERS, []);
  const order = orders.find((o) => o.id === orderId);
  if (!order || order.estado !== 'pendiente_pago') return null;
  order.comprobante = dataUrl;
  order.comprobante_subido_en = new Date().toISOString();
  order.estado = 'pendiente_confirmar';
  saveOrders(orders);
  return order;
}
function confirmOrder(orderId) {
  const orders = readLS(LS_ORDERS, []);
  const order = orders.find((o) => o.id === orderId);
  if (!order || order.estado !== 'pendiente_confirmar') return null;
  order.estado = 'pagado_confirmado';
  order.confirmado_en = new Date().toISOString();
  saveOrders(orders);
  return order;
}
function expireStaleOrders() {
  const orders = readLS(LS_ORDERS, []);
  const now = Date.now();
  let changed = false;
  orders.forEach((o) => {
    if (o.estado === 'pendiente_pago' && new Date(o.vence_en).getTime() < now) {
      o.estado = 'cancelado';
      changed = true;
    }
  });
  if (changed) saveOrders(orders);
}

const ESTADO_LABELS = {
  pendiente_pago: 'Pendiente de pago',
  pendiente_confirmar: 'Pendiente de confirmar',
  pagado_confirmado: 'Pago confirmado',
  cancelado: 'Cancelado',
};

// ---------- admin (mock, sin seguridad real — es una demo) ----------
function isAdminLoggedIn() {
  return sessionStorage.getItem(LS_ADMIN) === '1';
}
function adminLogin() {
  sessionStorage.setItem(LS_ADMIN, '1');
}
function adminLogout() {
  sessionStorage.removeItem(LS_ADMIN);
}
function requireAdmin() {
  if (!isAdminLoggedIn()) {
    window.location.href = 'index.html';
  }
}

// ---------- reset total de la demo ----------
function resetDemo() {
  localStorage.removeItem(LS_CART);
  localStorage.removeItem(LS_ORDERS);
  localStorage.removeItem(LS_SEQ);
  sessionStorage.removeItem(LS_ADMIN);
  showToast('Demo reiniciada');
  setTimeout(() => {
    const inAdmin = window.location.pathname.includes('/admin/');
    window.location.href = inAdmin ? 'index.html' : 'index.html';
  }, 500);
}

// ---------- toast ----------
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 2200);
}

// ---------- formato ----------
function formatDateTime(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('es-AR') + ' ' + d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  document.querySelectorAll('[data-reset-demo]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('¿Reiniciar la demo? Se van a borrar el carrito y los pedidos guardados en este navegador.')) {
        resetDemo();
      }
    });
  });
});
