/* Detalle de producto */

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

let currentQty = 1;

document.addEventListener('DOMContentLoaded', () => {
  const id = getParam('id');
  const product = getProduct(id);
  const wrap = document.getElementById('product-detail');

  if (!product) {
    wrap.innerHTML = `<p class="no-results">No encontramos ese producto. <a href="index.html">Volver al catálogo</a></p>`;
    return;
  }

  document.title = product.name + ' — Bazario';

  wrap.innerHTML = `
    <div class="gallery"><img src="${productImage(product)}" alt="${product.name}"></div>
    <div class="info">
      <span class="cat">${categoryLabel(product.category)}</span>
      <h1>${product.name}</h1>
      <div class="price">${formatARS(product.price)}</div>
      <p class="desc">${product.desc}</p>
      <div class="qty-row">
        <span>Cantidad</span>
        <div class="qty-stepper">
          <button id="qty-minus" type="button">–</button>
          <span id="qty-value">1</span>
          <button id="qty-plus" type="button">+</button>
        </div>
      </div>
      <button class="btn btn-primary btn-block" id="add-to-cart-btn">Agregar al carrito — ${formatARS(product.price)}</button>
      <div class="info-box">
        🚚 Envío a domicilio o retiro en sucursal. Pagás con tarjeta (aprobación al instante) o por transferencia.
      </div>
    </div>
  `;

  const qtyValue = document.getElementById('qty-value');
  const addBtn = document.getElementById('add-to-cart-btn');

  function refreshBtn() {
    addBtn.textContent = `Agregar al carrito — ${formatARS(product.price * currentQty)}`;
  }

  document.getElementById('qty-minus').addEventListener('click', () => {
    if (currentQty > 1) currentQty--;
    qtyValue.textContent = currentQty;
    refreshBtn();
  });
  document.getElementById('qty-plus').addEventListener('click', () => {
    currentQty++;
    qtyValue.textContent = currentQty;
    refreshBtn();
  });
  addBtn.addEventListener('click', () => {
    addToCart(product.id, currentQty);
    showToast('Agregado al carrito');
    currentQty = 1;
    qtyValue.textContent = 1;
    refreshBtn();
  });
});
