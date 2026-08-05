/* Admin — shell compartido (sidebar, logout, modales) */

function renderAdminShell(active) {
  document.querySelectorAll('[data-admin-nav]').forEach((a) => {
    a.classList.toggle('active', a.dataset.adminNav === active);
  });
}

function showReceiptModal(order) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-box">
      <button class="modal-close" data-close>✕</button>
      <h3 class="mt-0">Comprobante — ${order.id}</h3>
      <p class="hint" style="margin-top:-8px;">Subido el ${formatDateTime(order.comprobante_subido_en)}. Antes de confirmar, mirá la app de Mercado Pago para chequear que la plata haya llegado.</p>
      <img src="${order.comprobante}" alt="Comprobante" style="width:100%; border-radius:12px; margin-top:10px;">
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.hasAttribute('data-close')) overlay.remove();
  });
}

function showEmailPreviewModal(order) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-box">
      <button class="modal-close" data-close>✕</button>
      <h3 class="mt-0">✉️ Mail enviado automáticamente</h3>
      <p class="hint" style="margin-top:-8px;">Simulación — en producción esto lo dispara un mail transaccional real al confirmarse el pago.</p>
      <div class="email-preview">
        <div class="email-head">Para: ${order.cliente_email}<br>Asunto: Tu pedido ${order.id} está confirmado ✅</div>
        <div class="email-body">
          <p>¡Hola ${order.cliente_nombre.split(' ')[0]}!</p>
          <p>Confirmamos tu pedido <strong>${order.id}</strong>:</p>
          <ul>${order.items.map((i) => `<li>${i.qty} × ${i.name}</li>`).join('')}</ul>
          <p><strong>Total: ${formatARS(order.metodo_pago === 'tarjeta' ? order.monto_pagado : order.monto_total)}</strong></p>
          <p>${entregaInfoHtml(order)}</p>
          <p>¡Gracias por tu compra!<br>Bazario</p>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.hasAttribute('data-close')) overlay.remove();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  requireAdmin();
  const logoutBtn = document.querySelector('[data-admin-logout]');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      adminLogout();
      window.location.href = 'index.html';
    });
  }
});
