/* Botón flotante de contacto rápido — presente en toda la tienda.
   El WhatsApp y el teléfono son links reales (wa.me / tel:), así que
   "andan" de verdad. El formulario de consulta, al no haber backend,
   guarda el mensaje en localStorage y aparece en el panel admin. */

function buildContactWidget() {
  const wrap = document.createElement('div');
  wrap.className = 'contact-widget';
  wrap.innerHTML = `
    <button class="contact-fab" id="contact-fab" aria-label="Contacto rápido">${ICONS.messageCircle(24)}</button>
    <div class="contact-panel" id="contact-panel" hidden>
      <div class="contact-panel-head">
        <strong>¿Tenés dudas?</strong>
        <button class="contact-panel-close" id="contact-panel-close" aria-label="Cerrar">✕</button>
      </div>
      <p class="hint" style="margin:2px 0 12px;">Por WhatsApp te respondemos más rápido.</p>
      <a class="contact-row" href="${WHATSAPP_WA_LINK}" target="_blank" rel="noopener">
        ${ICONS.messageCircle(18)} <span><strong>WhatsApp</strong><br><span class="text-muted">${WHATSAPP}</span></span>
      </a>
      <a class="contact-row" href="${CONTACT_PHONE_TEL}">
        ${ICONS.phone(18)} <span><strong>Llamar</strong><br><span class="text-muted">${WHATSAPP}</span></span>
      </a>
      <a class="contact-row" href="mailto:${CONTACT_EMAIL}">
        ${ICONS.mail(18)} <span><strong>Email</strong><br><span class="text-muted">${CONTACT_EMAIL}</span></span>
      </a>
      <div class="contact-divider">o dejanos tu consulta</div>
      <form id="contact-form">
        <div class="field">
          <input type="text" id="cw-nombre" placeholder="Tu nombre" required>
        </div>
        <div class="field">
          <input type="text" id="cw-contacto" placeholder="Tu teléfono o email" required>
        </div>
        <div class="field">
          <textarea id="cw-mensaje" rows="2" placeholder="¿En qué te ayudamos?" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary btn-block btn-sm">Enviar consulta</button>
      </form>
      <p class="hint" id="contact-success" style="display:none; color:var(--color-secondary-dark); text-align:center; margin-top:10px;">${ICONS.checkCircle(14)} ¡Listo! Te contactamos a la brevedad.</p>
    </div>
  `;
  document.body.appendChild(wrap);

  const panel = document.getElementById('contact-panel');
  document.getElementById('contact-fab').addEventListener('click', () => {
    panel.hidden = !panel.hidden;
  });
  document.getElementById('contact-panel-close').addEventListener('click', () => {
    panel.hidden = true;
  });

  document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('cw-nombre').value.trim();
    const contacto = document.getElementById('cw-contacto').value.trim();
    const mensaje = document.getElementById('cw-mensaje').value.trim();
    if (!nombre || !contacto || !mensaje) return;
    saveConsulta({ nombre, contacto, mensaje });
    document.getElementById('contact-form').style.display = 'none';
    document.getElementById('contact-success').style.display = 'block';
    setTimeout(() => {
      panel.hidden = true;
      document.getElementById('contact-form').reset();
      document.getElementById('contact-form').style.display = '';
      document.getElementById('contact-success').style.display = 'none';
    }, 2200);
  });
}

document.addEventListener('DOMContentLoaded', buildContactWidget);
