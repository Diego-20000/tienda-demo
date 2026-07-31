/* Carrito — listado, cantidades, resumen */

function renderCart() {
  const wrap = document.getElementById('cart-wrap');
  const lines = cartLines();

  if (!lines.length) {
    wrap.innerHTML = `
      <div class="empty-state">
        <div class="icon">🛒</div>
        <h3>Tu carrito está vacío</h3>
        <p>Todavía no agregaste ningún producto.</p>
        <a href="index.html" class="btn btn-primary" style="margin-top:14px;">Ver catálogo</a>
      </div>`;
    return;
  }

  const itemsHtml = lines
    .map(
      (l) => `
    <div class="cart-item" data-line="${l.product.id}">
      <div class="thumb"><img src="${productImage(l.product)}" alt="${l.product.name}"></div>
      <div class="grow">
        <h4>${l.product.name}</h4>
        <div class="unit-price">${formatARS(l.product.price)} c/u</div>
        <div class="qty-stepper" style="margin-top:8px;">
          <button type="button" data-qty-minus="${l.product.id}">–</button>
          <span>${l.qty}</span>
          <button type="button" data-qty-plus="${l.product.id}">+</button>
        </div>
        <button class="remove-link" data-remove="${l.product.id}">Quitar</button>
      </div>
      <div class="line-price">${formatARS(l.lineTotal)}</div>
    </div>`
    )
    .join('');

  const total = cartTotal();

  wrap.innerHTML = `
    <div class="cart-layout">
      <div>${itemsHtml}</div>
      <div class="summary-card">
        <div class="row"><span>Subtotal (${lines.reduce((s, l) => s + l.qty, 0)} productos)</span><span>${formatARS(total)}</span></div>
        <div class="row"><span>Entrega</span><span>A elegir en el siguiente paso</span></div>
        <div class="row total"><span>Total</span><span>${formatARS(total)}</span></div>
        <a href="checkout.html" class="btn btn-primary btn-block" style="margin-top:16px;">Continuar con el pedido</a>
        <a href="index.html" class="btn btn-ghost btn-block">Seguir comprando</a>
      </div>
    </div>
  `;

  wrap.querySelectorAll('[data-qty-plus]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.qtyPlus;
      const current = getCart().find((i) => i.productId === id);
      setCartQty(id, (current ? current.qty : 0) + 1);
      renderCart();
    });
  });
  wrap.querySelectorAll('[data-qty-minus]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.qtyMinus;
      const current = getCart().find((i) => i.productId === id);
      setCartQty(id, (current ? current.qty : 0) - 1);
      renderCart();
    });
  });
  wrap.querySelectorAll('[data-remove]').forEach((btn) => {
    btn.addEventListener('click', () => {
      removeFromCart(btn.dataset.remove);
      showToast('Producto quitado');
      renderCart();
    });
  });
}

document.addEventListener('DOMContentLoaded', renderCart);
