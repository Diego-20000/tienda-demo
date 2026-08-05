/* Checkout — datos + entrega -> método de pago (tarjeta / transferencia) -> confirmación */

const SS_ORDER_ID = 'ac_checkout_order_id';
const SS_CHECKOUT_DATA = 'ac_checkout_data';
let countdownTimer = null;
let uploadedDataUrl = null;
let selectedMethod = 'tarjeta';
let selectedCardBrand = null;

function renderSteps(current) {
  const steps = [
    { key: 'datos', label: 'Datos y entrega' },
    { key: 'pago', label: 'Pago' },
    { key: 'listo', label: 'Confirmación' },
  ];
  const idx = steps.findIndex((s) => s.key === current);
  document.getElementById('steps').innerHTML = steps
    .map((s, i) => {
      const cls = i === idx ? 'active' : i < idx ? 'done' : '';
      const sep = i > 0 ? '<span class="step-sep"></span>' : '';
      return `${sep}<span class="step-dot ${cls}"><span class="num">${i < idx ? '✓' : i + 1}</span> <span class="step-label">${s.label}</span></span>`;
    })
    .join('');
}

function renderEmptyCart() {
  renderSteps('datos');
  document.getElementById('checkout-content').innerHTML = `
    <div class="empty-state">
      <div class="icon">${ICONS.cart(40)}</div>
      <h3>Tu carrito está vacío</h3>
      <p>Agregá productos del catálogo antes de continuar.</p>
      <a href="index.html" class="btn btn-primary" style="margin-top:14px;">Ver catálogo</a>
    </div>`;
}

/* ---------------- Paso 1: datos y entrega ---------------- */

function renderStepDatos() {
  renderSteps('datos');
  const lines = cartLines();
  const total = cartTotal();
  document.getElementById('checkout-content').innerHTML = `
    <div class="card">
      <h3 class="mt-0">Tus datos</h3>
      <form id="datos-form">
        <div class="field">
          <label for="nombre">Nombre y apellido</label>
          <input type="text" id="nombre" required placeholder="Ej: Ana López">
        </div>
        <div class="field">
          <label for="email">Email</label>
          <input type="email" id="email" required placeholder="tuemail@ejemplo.com">
          <div class="hint">Ahí te vamos a avisar apenas se confirme tu pedido.</div>
        </div>

        <label style="display:block; font-size:13.5px; font-weight:600; margin-bottom:8px;">Entrega</label>
        <label class="delivery-option selected" data-entrega-option="envio_domicilio">
          <input type="radio" name="entrega" value="envio_domicilio" checked>
          <div style="flex:1;">
            <div class="title">Envío a domicilio</div>
            <div class="desc">Lo recibís en la puerta de tu casa.</div>
            <div class="field" id="direccion-fields" style="margin-top:12px;">
              <input type="text" id="direccion" placeholder="Calle y número" style="margin-bottom:8px;">
              <div class="field-row-2">
                <input type="text" id="ciudad" placeholder="Ciudad">
                <input type="text" id="cp" placeholder="Código postal">
              </div>
            </div>
          </div>
        </label>
        <label class="delivery-option" data-entrega-option="retiro_sucursal">
          <input type="radio" name="entrega" value="retiro_sucursal">
          <div>
            <div class="title">Retiro en sucursal</div>
            <div class="desc">${SUCURSAL_DIRECCION} — ${SUCURSAL_HORARIO}. Sin costo adicional.</div>
          </div>
        </label>

        <button type="submit" class="btn btn-primary btn-block" style="margin-top:20px;">Continuar — ${formatARS(total)}</button>
      </form>
    </div>
    <div class="card">
      <h3 class="mt-0" style="font-size:16px;">Resumen (${lines.reduce((s, l) => s + l.qty, 0)} productos)</h3>
      ${lines.map((l) => `<div class="row" style="display:flex;justify-content:space-between;font-size:14px;padding:6px 0;"><span>${l.qty} × ${l.product.name}</span><span>${formatARS(l.lineTotal)}</span></div>`).join('')}
      <div class="row total" style="display:flex;justify-content:space-between;border-top:1px solid var(--color-border);margin-top:10px;padding-top:10px;font-weight:700;"><span>Total</span><span>${formatARS(total)}</span></div>
    </div>
  `;

  document.querySelectorAll('.delivery-option').forEach((opt) => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.delivery-option').forEach((o) => o.classList.remove('selected'));
      opt.classList.add('selected');
      opt.querySelector('input[type=radio]').checked = true;
      document.getElementById('direccion-fields').style.display = opt.dataset.entregaOption === 'envio_domicilio' ? 'block' : 'none';
    });
  });

  document.getElementById('datos-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const tipoEntrega = document.querySelector('input[name=entrega]:checked').value;
    if (!nombre || !email) return;

    let direccion = null;
    if (tipoEntrega === 'envio_domicilio') {
      const calle = document.getElementById('direccion').value.trim();
      const ciudad = document.getElementById('ciudad').value.trim();
      const cp = document.getElementById('cp').value.trim();
      if (!calle || !ciudad) return;
      direccion = `${calle}, ${ciudad}${cp ? ' (CP ' + cp + ')' : ''}`;
    }

    const checkoutData = { nombre, email, tipoEntrega, direccion };
    sessionStorage.setItem(SS_CHECKOUT_DATA, JSON.stringify(checkoutData));
    renderStepPago(checkoutData);
  });
}

/* ---------------- Paso 2: método de pago ---------------- */

function renderStepPago(checkoutData) {
  if (!cartLines().length) { renderEmptyCart(); return; }
  renderSteps('pago');
  document.getElementById('checkout-content').innerHTML = `
    <div class="card">
      <div class="method-tabs">
        <div class="method-tab ${selectedMethod === 'tarjeta' ? 'active' : ''}" data-method="tarjeta">${ICONS.creditCard(15)} Tarjeta</div>
        <div class="method-tab ${selectedMethod === 'transferencia' ? 'active' : ''}" data-method="transferencia">${ICONS.bank(15)} Transferencia</div>
      </div>
      <div id="method-body"></div>
    </div>
  `;
  document.querySelectorAll('.method-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      selectedMethod = tab.dataset.method;
      document.querySelectorAll('.method-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      renderMethodBody(checkoutData);
    });
  });
  renderMethodBody(checkoutData);
}

function renderMethodBody(checkoutData) {
  if (selectedMethod === 'tarjeta') renderCardForm(checkoutData);
  else renderTransferForm(checkoutData);
}

/* -------- Tarjeta -------- */

function renderCardForm(checkoutData) {
  const subtotal = cartTotal();
  const brand = getCardBrand(selectedCardBrand);
  const feePct = brand ? brand.fee : 0;
  const feeMonto = Math.round(subtotal * (feePct / 100));
  const total = subtotal + feeMonto;

  document.getElementById('method-body').innerHTML = `
    <p class="hint" style="margin-top:0 0 10px;">Elegí con qué tarjeta pagás — cada una tiene su propio recargo, como en una pasarela real.</p>
    <div class="card-brand-grid">
      ${CARD_BRANDS.map(
        (b) => `
        <div class="card-brand-chip ${selectedCardBrand === b.id ? 'selected' : ''}" data-brand="${b.id}">
          <div class="label">${b.label}</div>
          <div class="fee ${b.fee === 0 ? 'free' : ''}">${b.fee === 0 ? 'Sin recargo' : '+' + b.fee + '% recargo'}</div>
        </div>`
      ).join('')}
    </div>

    <div id="card-form-fields" style="${selectedCardBrand ? '' : 'display:none;'}">
      <div class="card-visual">
        <div class="top-row"><span id="cv-brand">${brand ? brand.label : 'Tarjeta'}</span><span>${ICONS.creditCard(20)}</span></div>
        <div class="num" id="cv-number">•••• •••• •••• ••••</div>
        <div class="bottom-row"><span id="cv-name">NOMBRE APELLIDO</span><span id="cv-expiry">MM/AA</span></div>
      </div>
      <form id="card-form">
        <div class="field">
          <label for="card-name">Nombre en la tarjeta</label>
          <input type="text" id="card-name" placeholder="Como figura en la tarjeta" required>
        </div>
        <div class="field">
          <label for="card-number">Número de tarjeta</label>
          <input type="text" id="card-number" placeholder="4111 1111 1111 1111" inputmode="numeric" required>
          <div class="hint">Es una demo: no se envía a ningún lado. Podés usar 4111 1111 1111 1111.</div>
        </div>
        <div class="field-row-2">
          <div class="field">
            <label for="card-expiry">Vencimiento</label>
            <input type="text" id="card-expiry" placeholder="MM/AA" maxlength="5" required>
          </div>
          <div class="field">
            <label for="card-cvv">CVV</label>
            <input type="text" id="card-cvv" placeholder="123" inputmode="numeric" maxlength="4" required>
          </div>
        </div>
        <div class="payment-summary">
          <div class="row"><span>Subtotal</span><span>${formatARS(subtotal)}</span></div>
          <div class="row"><span>Recargo (${feePct}%)</span><span id="ps-fee">${formatARS(feeMonto)}</span></div>
          <div class="row total"><span>Total a pagar</span><span id="ps-total">${formatARS(total)}</span></div>
        </div>
        <p id="card-error" class="hint" style="color:var(--color-danger); display:none;"></p>
        <button type="submit" class="btn btn-primary btn-block" id="pay-btn">Pagar ${formatARS(total)}</button>
      </form>
    </div>
  `;

  document.querySelectorAll('.card-brand-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      selectedCardBrand = chip.dataset.brand;
      renderCardForm(checkoutData);
    });
  });

  if (!selectedCardBrand) return;

  const nameInput = document.getElementById('card-name');
  const numberInput = document.getElementById('card-number');
  const expiryInput = document.getElementById('card-expiry');
  const cvvInput = document.getElementById('card-cvv');

  nameInput.addEventListener('input', () => {
    document.getElementById('cv-name').textContent = nameInput.value.trim().toUpperCase() || 'NOMBRE APELLIDO';
  });
  numberInput.addEventListener('input', () => {
    const digits = numberInput.value.replace(/\D/g, '').slice(0, 19);
    numberInput.value = digits.replace(/(.{4})/g, '$1 ').trim();
    const masked = digits.padEnd(16, '•').replace(/(.{4})/g, '$1 ').trim();
    document.getElementById('cv-number').textContent = masked;
  });
  expiryInput.addEventListener('input', () => {
    let v = expiryInput.value.replace(/\D/g, '').slice(0, 4);
    if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
    expiryInput.value = v;
    document.getElementById('cv-expiry').textContent = v || 'MM/AA';
  });

  document.getElementById('card-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const errorEl = document.getElementById('card-error');
    const errors = validateCard(numberInput.value, expiryInput.value, cvvInput.value, nameInput.value);
    if (errors.length) {
      errorEl.textContent = errors[0];
      errorEl.style.display = 'block';
      return;
    }
    errorEl.style.display = 'none';
    const cardDigits = numberInput.value.replace(/\D/g, '');
    processCardPayment(checkoutData, selectedCardBrand, cardDigits.slice(-4));
  });
}

function luhnValid(digits) {
  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10);
    if (alt) { n *= 2; if (n > 9) n -= 9; }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

function validateCard(numberRaw, expiry, cvv, name) {
  const errors = [];
  const digits = numberRaw.replace(/\D/g, '');
  if (!name.trim()) errors.push('Ingresá el nombre como figura en la tarjeta.');
  if (digits.length < 13 || digits.length > 19 || !luhnValid(digits)) {
    errors.push('El número de tarjeta no es válido. Probá con 4111 1111 1111 1111.');
  }
  const m = expiry.match(/^(\d{2})\/(\d{2})$/);
  if (!m || parseInt(m[1], 10) < 1 || parseInt(m[1], 10) > 12) {
    errors.push('El vencimiento tiene que tener el formato MM/AA.');
  } else {
    const expDate = new Date(2000 + parseInt(m[2], 10), parseInt(m[1], 10), 1);
    if (expDate < new Date()) errors.push('Esa tarjeta figura vencida.');
  }
  if (!/^\d{3,4}$/.test(cvv)) errors.push('El CVV tiene que tener 3 o 4 dígitos.');
  return errors;
}

function processCardPayment(checkoutData, cardBrandId, cardLast4) {
  const payBtn = document.getElementById('pay-btn');
  payBtn.disabled = true;
  document.getElementById('method-body').innerHTML = `
    <div class="processing-overlay">
      <div class="spinner"></div>
      <p><strong>Procesando pago…</strong></p>
      <p class="text-muted" style="font-size:13.5px;">No cierres ni recargues la página.</p>
    </div>
  `;
  setTimeout(() => {
    const order = createPaidOrder({
      clienteNombre: checkoutData.nombre,
      clienteEmail: checkoutData.email,
      tipoEntrega: checkoutData.tipoEntrega,
      direccion: checkoutData.direccion,
      cardBrandId,
      cardLast4,
    });
    if (!order) { renderEmptyCart(); return; }
    sessionStorage.removeItem(SS_CHECKOUT_DATA);
    window.location.href = 'pedido-confirmado.html?id=' + order.id;
  }, 1400);
}

/* -------- Transferencia -------- */

function renderTransferForm(checkoutData) {
  const existingOrderId = sessionStorage.getItem(SS_ORDER_ID);
  let order = existingOrderId ? getOrder(existingOrderId) : null;

  if (!order) {
    order = createOrder({
      clienteNombre: checkoutData.nombre,
      clienteEmail: checkoutData.email,
      tipoEntrega: checkoutData.tipoEntrega,
      direccion: checkoutData.direccion,
    });
    if (!order) { renderEmptyCart(); return; }
    sessionStorage.setItem(SS_ORDER_ID, order.id);
  }

  if (order.estado === 'cancelado') { renderCancelled(); return; }
  if (order.estado !== 'pendiente_pago') {
    window.location.href = 'pedido-confirmado.html?id=' + order.id;
    return;
  }

  document.getElementById('method-body').innerHTML = `
    <div class="transfer-box">
      <div class="text-muted" style="font-size:13px;">Alias de Mercado Pago</div>
      <div class="alias" id="alias-text">${ALIAS_MP}</div>
      <button class="btn btn-secondary btn-sm copy-btn" id="copy-alias">Copiar alias</button>
      <div class="text-muted" style="font-size:13px; margin-top:18px;">Monto exacto a transferir</div>
      <div class="amount">${formatARS(order.monto_total)}</div>
      <div class="countdown" id="countdown">${ICONS.clock(14)} Reserva de stock: 15:00</div>
    </div>

    <div style="margin-top:22px;">
      <label style="display:block; font-size:13.5px; font-weight:600; margin-bottom:8px;">Comprobante de transferencia</label>
      <div class="upload-box" id="upload-box">
        <div id="upload-placeholder">${ICONS.paperclip(16)} Hacé clic para subir la foto o captura del comprobante</div>
        <input type="file" id="file-input" accept="image/*" style="display:none;">
      </div>
    </div>

    <button class="btn btn-primary btn-block" id="submit-comprobante" style="margin-top:20px;" disabled>Ya transferí y subí el comprobante</button>
    <p class="hint" style="margin-top:10px;">Pedido <strong>${order.id}</strong> — recibimos tu comprobante y confirmamos a mano. Nunca marcamos "pagado" automáticamente por una imagen.</p>
  `;

  document.getElementById('copy-alias').addEventListener('click', () => {
    navigator.clipboard?.writeText(ALIAS_MP).catch(() => {});
    showToast('Alias copiado');
  });

  const uploadBox = document.getElementById('upload-box');
  const fileInput = document.getElementById('file-input');
  const submitBtn = document.getElementById('submit-comprobante');
  uploadBox.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      uploadedDataUrl = reader.result;
      uploadBox.classList.add('has-file');
      uploadBox.innerHTML = `<div>${ICONS.checkCircle(16)} Comprobante cargado</div><div class="upload-preview"><img src="${uploadedDataUrl}" alt="Comprobante"></div><div class="hint" style="margin-top:8px;">Hacé clic para cambiar la imagen</div>`;
      uploadBox.appendChild(fileInput);
      submitBtn.disabled = false;
    };
    reader.readAsDataURL(file);
  });

  submitBtn.addEventListener('click', () => {
    if (!uploadedDataUrl) return;
    const updated = attachComprobante(order.id, uploadedDataUrl);
    if (!updated) { renderCancelled(); return; }
    stopCountdown();
    sessionStorage.removeItem(SS_CHECKOUT_DATA);
    window.location.href = 'pedido-confirmado.html?id=' + order.id;
  });

  startCountdown(order.vence_en);
}

function startCountdown(venceEnIso) {
  stopCountdown();
  const el = document.getElementById('countdown');
  function tick() {
    const msLeft = new Date(venceEnIso).getTime() - Date.now();
    if (msLeft <= 0) {
      stopCountdown();
      expireStaleOrders();
      renderCancelled();
      return;
    }
    const totalSec = Math.floor(msLeft / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    if (el) el.innerHTML = `${ICONS.clock(14)} Reserva de stock: ${m}:${String(s).padStart(2, '0')}`;
  }
  tick();
  countdownTimer = setInterval(tick, 1000);
}
function stopCountdown() {
  if (countdownTimer) clearInterval(countdownTimer);
  countdownTimer = null;
}

function renderCancelled() {
  stopCountdown();
  sessionStorage.removeItem(SS_ORDER_ID);
  sessionStorage.removeItem(SS_CHECKOUT_DATA);
  renderSteps('pago');
  document.getElementById('checkout-content').innerHTML = `
    <div class="status-screen" style="margin:20px auto 0;">
      <div class="status-icon cancelled">${ICONS.hourglass(30)}</div>
      <h2>Se venció la reserva</h2>
      <p class="text-muted">Pasaron los 15 minutos y no llegó el comprobante, así que liberamos el stock. Podés volver a armar tu pedido cuando quieras.</p>
      <a href="index.html" class="btn btn-primary" style="margin-top:18px;">Volver al catálogo</a>
    </div>
  `;
}

/* ---------------- Arranque ---------------- */

document.addEventListener('DOMContentLoaded', () => {
  const existingOrderId = sessionStorage.getItem(SS_ORDER_ID);
  if (existingOrderId) {
    const order = getOrder(existingOrderId);
    if (order && order.estado === 'pendiente_pago') {
      const saved = JSON.parse(sessionStorage.getItem(SS_CHECKOUT_DATA) || 'null');
      selectedMethod = 'transferencia';
      renderStepPago(saved || { nombre: order.cliente_nombre, email: order.cliente_email, tipoEntrega: order.tipo_entrega, direccion: order.direccion });
      return;
    }
    if (order && order.estado === 'cancelado') { renderCancelled(); return; }
    if (order && order.estado !== 'pendiente_pago') sessionStorage.removeItem(SS_ORDER_ID);
  }
  if (!cartLines().length) { renderEmptyCart(); return; }
  renderStepDatos();
});
