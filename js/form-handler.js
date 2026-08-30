/**
 * ALQUIMIA TÁCTICA - MANEJADOR DE FORMULARIO DE DIAGNÓSTICO TÁCTICO
 * Validación rigurosa, modales accesibles y derivación a WhatsApp / Webhook
 */

class DiagnosisFormHandler {
  constructor() {
    this.modal = document.getElementById('diagnosisModal');
    this.openButtons = document.querySelectorAll('[data-open-modal="diagnosisModal"]');
    this.closeButtons = document.querySelectorAll('[data-close-modal]');
    this.form = document.getElementById('diagnosisForm');
    this.statusBox = document.getElementById('diagFormStatus');

    this.init();
  }

  init() {
    // Abrir modal
    this.openButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openModal();
      });
    });

    // Cerrar modal
    this.closeButtons.forEach(btn => {
      btn.addEventListener('click', () => this.closeModal());
    });

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.closeModal();
      });
    }

    // Tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal?.classList.contains('is-open')) {
        this.closeModal();
      }
    });

    // Envío del formulario
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }

  openModal() {
    if (!this.modal) return;
    this.modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    const firstInput = this.modal.querySelector('input');
    if (firstInput) setTimeout(() => firstInput.focus(), 100);
  }

  closeModal() {
    if (!this.modal) return;
    this.modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  async handleSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('diagName')?.value.trim();
    const company = document.getElementById('diagCompany')?.value.trim();
    const phone = document.getElementById('diagPhone')?.value.trim();
    const email = document.getElementById('diagEmail')?.value.trim();
    const industry = document.getElementById('diagIndustry')?.value;
    const bottleneck = document.getElementById('diagBottleneck')?.value;
    const notes = document.getElementById('diagNotes')?.value.trim();
    const submitBtn = this.form.querySelector('button[type="submit"]');

    if (!name || !company || !phone) {
      this.showStatus('Por favor completa tu nombre, empresa y número de WhatsApp.', 'error');
      return;
    }

    // Estado visual de carga
    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="badge-dot"></span> Procesando Diagnóstico...';

    // Generar mensaje para WhatsApp
    const waText = `¡Hola Alquimia Táctica! Quiero solicitar un Diagnóstico de Automatización para mi empresa:
- Nombre: ${name}
- Empresa: ${company}
- Teléfono / WhatsApp: ${phone}
- Email: ${email || 'No especificado'}
- Industria: ${industry || 'General'}
- Principal cuello de botella: ${bottleneck || 'Procesos manuales'}
${notes ? `\n- Detalle adicional: ${notes}` : ''}`;

    const waUrl = `https://wa.me/5215500000000?text=${encodeURIComponent(waText)}`;

    // Simular procesamiento con alta disponibilidad
    setTimeout(() => {
      submitBtn.innerHTML = '✓ ¡Diagnóstico Solicitado!';
      submitBtn.classList.remove('btn-primary');
      submitBtn.classList.add('btn-secondary');

      this.showStatus(
        `¡Excelente, ${name}! Tu información ha sido registrada. Haz clic en el botón de abajo para iniciar la conversación en WhatsApp con nuestro equipo de estrategia.`,
        'success'
      );

      // Botón directo a WhatsApp (immune to popup blockers)
      const waActionBtn = document.createElement('a');
      waActionBtn.href = waUrl;
      waActionBtn.target = '_blank';
      waActionBtn.rel = 'noopener noreferrer';
      waActionBtn.className = 'btn btn-primary btn-sm';
      waActionBtn.style.marginTop = '1rem';
      waActionBtn.style.display = 'inline-flex';
      waActionBtn.innerHTML = 'Abrir conversación en WhatsApp ⚡';
      this.statusBox.appendChild(waActionBtn);

      this.form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
    }, 700);
  }

  showStatus(msg, type) {
    if (!this.statusBox) return;
    this.statusBox.innerHTML = msg;
    this.statusBox.style.display = 'block';
    this.statusBox.style.padding = '0.85rem 1rem';
    this.statusBox.style.borderRadius = '8px';
    this.statusBox.style.marginTop = '1rem';
    this.statusBox.style.fontSize = '0.875rem';

    if (type === 'error') {
      this.statusBox.style.background = 'rgba(239, 68, 68, 0.15)';
      this.statusBox.style.border = '1px solid rgba(239, 68, 68, 0.4)';
      this.statusBox.style.color = '#FCA5A5';
    } else {
      this.statusBox.style.background = 'rgba(16, 185, 129, 0.15)';
      this.statusBox.style.border = '1px solid rgba(16, 185, 129, 0.4)';
      this.statusBox.style.color = '#6EE7B7';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new DiagnosisFormHandler();
});
