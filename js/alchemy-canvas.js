/**
 * ALQUIMIA TÁCTICA - ALCHEMY ENGINE CANVAS
 * Visualización interactiva de la transmutación de procesos:
 * Caos Manual (Izquierda) -> Núcleo Alquímico Táctico (Centro) -> Flujo Automatizado (Derecha)
 */

class AlchemyEngineCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.coreAngle = 0;
    this.corePulse = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.isHovered = false;
    this.animationFrameId = null;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Interacción con mouse
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
      this.isHovered = true;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.isHovered = false;
    });

    // Iniciar partículas iniciales
    this.spawnParticles();
    this.render();
  }

  resize() {
    const parent = this.canvas.parentElement;
    const dpr = window.devicePixelRatio || 1;
    this.width = parent.clientWidth;
    this.height = parent.clientHeight;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    if (this.ctx.resetTransform) {
      this.ctx.resetTransform();
    } else {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
    this.ctx.scale(dpr, dpr);
  }

  spawnParticles() {
    this.particles = [];
    const count = 42;
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle(Math.random() * this.width));
    }
  }

  createParticle(forcedX = null) {
    const coreX = this.width * 0.5;
    const x = forcedX !== null ? forcedX : -10;
    const isPastCore = x > coreX;

    return {
      x: x,
      y: isPastCore ? (this.height * 0.5 + (Math.sin(x * 0.05) * 20)) : (Math.random() * this.height),
      targetY: Math.random() * this.height,
      vx: isPastCore ? 3.5 + Math.random() * 2 : 1.2 + Math.random() * 0.8,
      vy: isPastCore ? 0 : (Math.random() - 0.5) * 1.5,
      size: isPastCore ? 3.5 : 2.5 + Math.random() * 2,
      state: isPastCore ? 'optimized' : 'chaotic', // chaotic -> core -> optimized
      color: isPastCore ? '#00F2FE' : (Math.random() > 0.5 ? '#F87171' : '#FBBF24'),
      trail: []
    };
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    const coreX = this.width * 0.5;
    const coreY = this.height * 0.5;
    this.corePulse += 0.03;
    this.coreAngle += 0.015;

    // 1. Dibujar líneas de conducción de datos de fondo
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    this.ctx.lineWidth = 1;
    for (let i = -2; i <= 2; i++) {
      const yOffset = coreY + i * 28;
      this.ctx.beginPath();
      this.ctx.moveTo(coreX, coreY);
      this.ctx.lineTo(this.width, yOffset);
      this.ctx.stroke();
    }

    // 2. Dibujar aura del Núcleo Alquímico
    const pulseSize = Math.sin(this.corePulse) * 8;
    const coreRadius = 38 + pulseSize + (this.isHovered ? 6 : 0);

    const grad = this.ctx.createRadialGradient(coreX, coreY, 5, coreX, coreY, coreRadius * 1.8);
    grad.addColorStop(0, 'rgba(0, 242, 254, 0.8)');
    grad.addColorStop(0.35, 'rgba(59, 130, 246, 0.5)');
    grad.addColorStop(0.7, 'rgba(139, 92, 246, 0.2)');
    grad.addColorStop(1, 'transparent');

    this.ctx.fillStyle = grad;
    this.ctx.beginPath();
    this.ctx.arc(coreX, coreY, coreRadius * 1.8, 0, Math.PI * 2);
    this.ctx.fill();

    // 3. Geometría Alquímica Táctica Central (Triángulo y Círculo giratorios)
    this.ctx.save();
    this.ctx.translate(coreX, coreY);
    this.ctx.rotate(this.coreAngle);

    // Triángulo
    this.ctx.strokeStyle = '#00F2FE';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    const triRadius = 26;
    for (let i = 0; i < 3; i++) {
      const a = (i * 2 * Math.PI) / 3 - Math.PI / 2;
      const px = Math.cos(a) * triRadius;
      const py = Math.sin(a) * triRadius;
      if (i === 0) this.ctx.moveTo(px, py);
      else this.ctx.lineTo(px, py);
    }
    this.ctx.closePath();
    this.ctx.stroke();

    // Nodos en vértices
    for (let i = 0; i < 3; i++) {
      const a = (i * 2 * Math.PI) / 3 - Math.PI / 2;
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.beginPath();
      this.ctx.arc(Math.cos(a) * triRadius, Math.sin(a) * triRadius, 3, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.restore();

    // Anillo exterior con línea punteada
    this.ctx.save();
    this.ctx.translate(coreX, coreY);
    this.ctx.rotate(-this.coreAngle * 0.7);
    this.ctx.strokeStyle = 'rgba(139, 92, 246, 0.6)';
    this.ctx.setLineDash([4, 6]);
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 36, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.restore();

    // Núcleo central brillante
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.beginPath();
    this.ctx.arc(coreX, coreY, 4, 0, Math.PI * 2);
    this.ctx.fill();

    // 4. Procesar y dibujar partículas
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Almacenar rastro
      p.trail.push({ x: p.x, y: p.y });
      if (p.trail.length > 6) p.trail.shift();

      // Fase 1: Caos (izquierda del núcleo)
      if (p.x < coreX - 20) {
        p.state = 'chaotic';
        p.color = p.color === '#00F2FE' ? '#F87171' : p.color;
        p.x += p.vx;
        // Fluctuación caótica
        p.y += p.vy + (Math.sin(p.x * 0.08) * 1.5);
        if (p.y < 10) p.vy = Math.abs(p.vy);
        if (p.y > this.height - 10) p.vy = -Math.abs(p.vy);
      }
      // Fase 2: Transmutación en el Núcleo (atracción hacia el centro)
      else if (p.x >= coreX - 20 && p.x <= coreX + 20) {
        p.state = 'transmuting';
        p.x += p.vx * 1.3;
        // Se alinea rápidamente hacia el eje central de salida
        p.y += (coreY - p.y) * 0.18;
        p.color = '#FFFFFF';
      }
      // Fase 3: Flujo Optimizado (derecha del núcleo)
      else {
        p.state = 'optimized';
        p.color = '#00F2FE';
        p.vx = 4;
        p.x += p.vx;
        // Línea estabilizada en canales armónicos
        const channel = Math.round(i % 5) - 2;
        const targetChannelY = coreY + channel * 28;
        p.y += (targetChannelY - p.y) * 0.08;
      }

      // Dibujar estela
      for (let t = 0; t < p.trail.length; t++) {
        const pt = p.trail[t];
        const alpha = (t / p.trail.length) * 0.4;
        this.ctx.fillStyle = p.state === 'optimized' ? `rgba(0, 242, 254, ${alpha})` : `rgba(248, 113, 113, ${alpha})`;
        this.ctx.beginPath();
        this.ctx.arc(pt.x, pt.y, p.size * 0.6, 0, Math.PI * 2);
        this.ctx.fill();
      }

      // Dibujar partícula principal
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();

      // Si sobrepasa la pantalla, reaparece en el extremo izquierdo como proceso manual caótico
      if (p.x > this.width + 10) {
        this.particles[i] = this.createParticle(-10);
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.render());
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new AlchemyEngineCanvas('alchemyHeroCanvas');
});
