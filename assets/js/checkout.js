/* Checkout — datos + entrega -> transferencia -> comprobante */

const SS_ORDER_ID = 'ac_checkout_order_id';
let countdownTimer = null;
let uploadedDataUrl = null;

function renderSteps(current) {
  const steps = [
    { key: 'datos', label: 'Datos y entrega' },
    { key: 'pago', label: 'Transferencia' },
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
      <div class="icon">🛒</div>
      <h3>Tu carrito está vacío</h3>
      <p>Agregá productos del catálogo antes de continuar.</p>
      <a href="index.html" class="btn btn-primary" style="margin-top:14px;">Ver catálogo</a>
    </div>`;
}

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
          <div class="hint">Ahí te vamos a avisar apenas confirmemos tu pago.</div>
        </div>

        <label style="display:block; font-size:13.5px; font-weight:600; margin-bottom:8px;">Entrega</label>
        <label class="delivery-option selected">
          <input type="radio" name="entrega" value="retiro_feria" checked>
          <div>
            <div class="title">Retiro en feria</div>
            <div class="desc">Plaza San Martín — Villa Origen — Sáb 10-19h, dom y feriados 10-18h. Sin costo adicional.</div>
          </div>
        </label>
        <label class="delivery-option disabled">
          <input type="radio" name="entrega" value="envio_domicilio" disabled>
          <div>
            <div class="title">Envío a domicilio <span class="badge-soon">Próximamente</span></div>
            <div class="desc">Cálculo automático por código postal (Andreani / Correo Argentino). Módulo opcional, a confirmar con la tienda.</div>
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

  document.getElementById('datos-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    if (!nombre || !email) return;
    const order = createOrder({ clienteNombre: nombre, clienteEmail: email, tipoEntrega: 'retiro_feria' });
    if (!order) return;
    sessionStorage.setItem(SS_ORDER_ID, order.id);
    renderStepPago(order.id);
  });
}

function renderStepPago(orderId) {
  const order = getOrder(orderId);
  if (!order) { renderEmptyCart(); return; }

  if (order.estado === 'cancelado') {
    renderCancelled();
    return;
  }
  if (order.estado !== 'pendiente_pago') {
    window.location.href = 'pedido-confirmado.html?id=' + orderId;
    return;
  }

  renderSteps('pago');
  document.getElementById('checkout-content').innerHTML = `
    <div class="card">
      <h3 class="mt-0">Transferí y subí tu comprobante</h3>
      <div class="transfer-box">
        <div class="text-muted" style="font-size:13px;">Alias de Mercado Pago</div>
        <div class="alias" id="alias-text">${ALIAS_MP}</div>
        <button class="btn btn-secondary btn-sm copy-btn" id="copy-alias">Copiar alias</button>
        <div class="text-muted" style="font-size:13px; margin-top:18px;">Monto exacto a transferir</div>
        <div class="amount">${formatARS(order.monto_total)}</div>
        <div class="countdown" id="countdown">⏱ Reserva de stock: 15:00</div>
      </div>

      <div style="margin-top:22px;">
        <label style="display:block; font-size:13.5px; font-weight:600; margin-bottom:8px;">Comprobante de transferencia</label>
        <div class="upload-box" id="upload-box">
          <div id="upload-placeholder">📎 Hacé clic para subir la foto o captura del comprobante</div>
          <input type="file" id="file-input" accept="image/*" style="display:none;">
        </div>
      </div>

      <button class="btn btn-primary btn-block" id="submit-comprobante" style="margin-top:20px;" disabled>Ya transferí y subí el comprobante</button>
      <p class="hint" style="margin-top:10px;">Pedido <strong>${order.id}</strong> — recibimos tu comprobante y confirmamos a mano, mirando la app de Mercado Pago. Nunca marcamos "pagado" automáticamente por una imagen.</p>
    </div>
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
      uploadBox.innerHTML = `<div>✅ Comprobante cargado</div><div class="upload-preview"><img src="${uploadedDataUrl}" alt="Comprobante"></div><div class="hint" style="margin-top:8px;">Hacé clic para cambiar la imagen</div>`;
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
    window.location.href = 'pedido-confirmado.html?id=' + order.id;
  });

  startCountdown(order.vence_en, order.id);
}

function startCountdown(venceEnIso, orderId) {
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
    if (el) el.textContent = `⏱ Reserva de stock: ${m}:${String(s).padStart(2, '0')}`;
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
  renderSteps('pago');
  document.getElementById('checkout-content').innerHTML = `
    <div class="status-screen" style="margin:20px auto 0;">
      <div class="status-icon cancelled">⏳</div>
      <h2>Se venció la reserva</h2>
      <p class="text-muted">Pasaron los 15 minutos y no llegó el comprobante, así que liberamos el stock. Podés volver a armar tu pedido cuando quieras.</p>
      <a href="index.html" class="btn btn-primary" style="margin-top:18px;">Volver al catálogo</a>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  const existingOrderId = sessionStorage.getItem(SS_ORDER_ID);
  if (existingOrderId) {
    const order = getOrder(existingOrderId);
    if (order && order.estado === 'pendiente_pago') {
      renderStepPago(existingOrderId);
      return;
    }
    if (order && order.estado === 'cancelado') {
      renderCancelled();
      return;
    }
    if (order && order.estado !== 'pendiente_pago') {
      sessionStorage.removeItem(SS_ORDER_ID);
    }
  }
  if (!cartLines().length) {
    renderEmptyCart();
    return;
  }
  renderStepDatos();
});
