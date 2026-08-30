/**
 * ALQUIMIA TÁCTICA - FLOATING WHATSAPP WIDGET
 * CTA contextual y disparador de mensaje directo
 */

class WhatsAppWidget {
  constructor() {
    this.widget = document.querySelector('.floating-wa-btn');
    if (!this.widget) return;
    this.init();
  }

  init() {
    // Configurar enlace con mensaje inicial
    const defaultMsg = encodeURIComponent("Hola Alquimia Táctica, quiero información para automatizar procesos en mi empresa.");
    this.widget.href = `https://wa.me/5218110155686?text=${defaultMsg}`;
    this.widget.target = "_blank";
    this.widget.rel = "noopener noreferrer";

    // Crear tooltip flotante sutil
    const tooltip = document.createElement('div');
    tooltip.className = 'wa-tooltip-bubble';
    tooltip.innerHTML = '¿Dudas operativas? <strong>Habla con un estratega</strong>';
    tooltip.style.position = 'fixed';
    tooltip.style.bottom = '2.4rem';
    tooltip.style.right = '5.5rem';
    tooltip.style.background = 'rgba(10, 13, 24, 0.92)';
    tooltip.style.border = '1px solid rgba(0, 242, 254, 0.3)';
    tooltip.style.borderRadius = '8px';
    tooltip.style.padding = '0.5rem 0.9rem';
    tooltip.style.fontSize = '0.8rem';
    tooltip.style.color = '#FFF';
    tooltip.style.boxShadow = '0 10px 25px rgba(0,0,0,0.6)';
    tooltip.style.backdropFilter = 'blur(10px)';
    tooltip.style.zIndex = '840';
    tooltip.style.opacity = '0';
    tooltip.style.transform = 'translateX(10px)';
    tooltip.style.transition = 'all 0.4s ease';
    tooltip.style.pointerEvents = 'none';

    document.body.appendChild(tooltip);

    // Mostrar tooltip después de 4 segundos
    setTimeout(() => {
      tooltip.style.opacity = '1';
      tooltip.style.transform = 'translateX(0)';
    }, 3800);

    // Ocultar al hacer hover en el botón
    this.widget.addEventListener('mouseenter', () => {
      tooltip.style.opacity = '0';
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new WhatsAppWidget();
});
