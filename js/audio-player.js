/**
 * ALQUIMIA TÁCTICA - AMBIENT AUDIO PLAYER & EQUALIZER CONTROLLER
 * Reproducción de audio ambiente con control interactivo, cumplimiento de políticas Autoplay de navegadores y ecualizador animado.
 */

class AmbientAudioPlayer {
  constructor() {
    this.audio = document.getElementById('bgMusic');
    this.toggleBtn = document.getElementById('musicToggleBtn');
    this.isPlaying = false;
    this.hasInteracted = false;
    this.targetVolume = 0.35; // Volumen de fondo agradable (35%)

    if (!this.audio || !this.toggleBtn) return;

    this.init();
  }

  init() {
    // Configurar volumen inicial en 0 para desvanecimiento suave (fade-in)
    this.audio.volume = 0;

    // Escuchar el evento click del botón de control de audio
    this.toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.hasInteracted = true;
      this.togglePlayPause();
    });

    // Intentar iniciar audio automáticamente en la primera interacción del usuario con la página (scroll/click)
    const handleFirstInteraction = () => {
      if (this.hasInteracted) return;
      this.hasInteracted = true;
      this.playAudio();

      // Remover listeners una vez activado
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('scroll', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.pauseAudio();
    } else {
      this.playAudio();
    }
  }

  playAudio() {
    if (!this.audio) return;
    this.audio.play().then(() => {
      this.isPlaying = true;
      this.updateUI(true);
      this.fadeInVolume();
    }).catch(err => {
      console.log('Autoplay prevenido por el navegador hasta la siguiente interacción:', err);
      this.updateUI(false);
    });
  }

  pauseAudio() {
    if (!this.audio) return;
    this.fadeOutVolume(() => {
      this.audio.pause();
      this.isPlaying = false;
      this.updateUI(false);
    });
  }

  fadeInVolume() {
    let currentVol = this.audio.volume;
    const interval = setInterval(() => {
      if (currentVol < this.targetVolume) {
        currentVol = Math.min(currentVol + 0.03, this.targetVolume);
        this.audio.volume = currentVol;
      } else {
        clearInterval(interval);
      }
    }, 50);
  }

  fadeOutVolume(callback) {
    let currentVol = this.audio.volume;
    const interval = setInterval(() => {
      if (currentVol > 0.02) {
        currentVol = Math.max(currentVol - 0.04, 0);
        this.audio.volume = currentVol;
      } else {
        this.audio.volume = 0;
        clearInterval(interval);
        if (callback) callback();
      }
    }, 40);
  }

  updateUI(playing) {
    if (!this.toggleBtn) return;
    if (playing) {
      this.toggleBtn.classList.add('is-playing');
      this.toggleBtn.setAttribute('aria-label', 'Pausar Música de Ambiente');
      this.toggleBtn.setAttribute('title', 'Pausar Música de Ambiente');
      const textSpan = this.toggleBtn.querySelector('.music-btn-text');
      if (textSpan) textSpan.textContent = 'Audio: ON';
    } else {
      this.toggleBtn.classList.remove('is-playing');
      this.toggleBtn.setAttribute('aria-label', 'Reproducir Música de Ambiente');
      this.toggleBtn.setAttribute('title', 'Reproducir Música de Ambiente');
      const textSpan = this.toggleBtn.querySelector('.music-btn-text');
      if (textSpan) textSpan.textContent = 'Audio: OFF';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new AmbientAudioPlayer();
});
