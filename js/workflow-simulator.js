/**
 * ALQUIMIA TÁCTICA - SIMULADOR INTERACTIVO DE PIPELINES DE AUTOMATIZACIÓN
 * Simula visualmente el paso de datos en tiempo real para los 3 casos de uso
 */

class WorkflowSimulator {
  constructor() {
    this.workflows = document.querySelectorAll('.workflow-card');
    if (!this.workflows.length) return;
    this.init();
  }

  init() {
    this.workflows.forEach((card, index) => {
      const triggerBtn = card.querySelector('.btn-simulate-wf');
      const nodes = card.querySelectorAll('.wf-step-node');
      const logStatus = card.querySelector('.wf-status-log');

      if (triggerBtn && nodes.length) {
        triggerBtn.addEventListener('click', () => {
          this.runSimulation(triggerBtn, nodes, logStatus);
        });
      }

      // Auto-trigger suave en el primer caso cuando entre en pantalla
      if (index === 0) {
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            this.runSimulation(triggerBtn, nodes, logStatus);
            observer.disconnect();
          }
        }, { threshold: 0.5 });
        observer.observe(card);
      }
    });
  }

  runSimulation(btn, nodes, logElement) {
    if (btn.dataset.running === 'true') return;
    btn.dataset.running = 'true';
    btn.disabled = true;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="badge-dot"></span> Procesando Pipeline...';

    // Reiniciar nodos
    nodes.forEach(node => {
      node.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      node.style.boxShadow = 'none';
      node.style.background = 'rgba(10, 13, 24, 0.9)';
    });

    let currentStep = 0;
    const totalSteps = nodes.length;

    const executeStep = () => {
      if (currentStep < totalSteps) {
        const node = nodes[currentStep];
        const stepName = node.querySelector('.wf-step-title')?.textContent || `Paso ${currentStep + 1}`;

        // Iluminar nodo actual con luz cian/azul
        node.style.borderColor = 'var(--accent-cyan)';
        node.style.boxShadow = '0 0 20px rgba(0, 242, 254, 0.5)';
        node.style.background = 'rgba(0, 242, 254, 0.12)';

        if (logElement) {
          logElement.textContent = `[Paso ${currentStep + 1}/${totalSteps}]: ${stepName} ejecutado en ${Math.floor(Math.random() * 80 + 30)}ms ✓`;
          logElement.style.color = 'var(--accent-cyan)';
        }

        // Dejar nodo en verde tenue cuando pasa
        if (currentStep > 0) {
          const prevNode = nodes[currentStep - 1];
          prevNode.style.borderColor = 'rgba(16, 185, 129, 0.6)';
          prevNode.style.boxShadow = '0 0 10px rgba(16, 185, 129, 0.2)';
          prevNode.style.background = 'rgba(16, 185, 129, 0.08)';
        }

        currentStep++;
        setTimeout(executeStep, 450);
      } else {
        // Fin de la simulación
        const lastNode = nodes[totalSteps - 1];
        lastNode.style.borderColor = 'rgba(16, 185, 129, 0.8)';
        lastNode.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.4)';

        if (logElement) {
          logElement.textContent = `[Pipeline Completado con Éxito]: Flujo ejecutado al 100% sin intervención manual (Tiempo total: 1.8s) ⚡`;
          logElement.style.color = 'var(--accent-emerald)';
        }

        setTimeout(() => {
          btn.dataset.running = 'false';
          btn.disabled = false;
          btn.innerHTML = originalText;
        }, 1200);
      }
    };

    executeStep();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new WorkflowSimulator();
});
