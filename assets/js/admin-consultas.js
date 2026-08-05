/* Admin — consultas dejadas desde el widget de contacto rápido */

function renderConsultas() {
  const consultas = getConsultas();
  const wrap = document.getElementById('consultas-list');

  if (!consultas.length) {
    wrap.innerHTML = `
      <div class="empty-state">
        <div class="icon">${ICONS.messageCircle(40)}</div>
        <h3>Todavía no llegó ninguna consulta</h3>
        <p>Cuando alguien use el botón de contacto rápido de la tienda, el mensaje va a aparecer acá.</p>
        <a href="../index.html" class="btn btn-secondary" style="margin-top:10px;">Ir a la tienda</a>
      </div>`;
    return;
  }

  wrap.innerHTML = consultas
    .map(
      (c) => `
    <div class="order-card" style="grid-template-columns:1fr auto;">
      <div>
        <h4>${c.nombre} <span class="badge badge-${c.estado === 'nueva' ? 'pendiente_confirmar' : 'pagado_confirmado'}" style="margin-left:6px;">${c.estado === 'nueva' ? 'Nueva' : 'Respondida'}</span></h4>
        <div class="meta">${c.contacto} · ${formatDateTime(c.creado_en)}</div>
        <p style="margin:8px 0 0; font-size:14px;">${c.mensaje}</p>
      </div>
      <div class="actions">
        ${c.estado === 'nueva' ? `<button class="btn btn-primary btn-sm" data-responder="${c.id}">${ICONS.checkCircle(14)} Marcar como respondida</button>` : ''}
      </div>
    </div>`
    )
    .join('');

  wrap.querySelectorAll('[data-responder]').forEach((btn) => {
    btn.addEventListener('click', () => {
      marcarConsultaRespondida(btn.dataset.responder);
      showToast('Consulta marcada como respondida');
      renderConsultas();
      renderConsultasBadge();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderAdminShell('consultas');
  renderConsultas();
});
