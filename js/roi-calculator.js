/**
 * ALQUIMIA TÁCTICA - CALCULADORA DE ROI Y COSTO DE INEFICIENCIA
 * Cálculo en tiempo real con animaciones de números y derivación a diagnóstico
 */

class TacticalRoiCalculator {
  constructor() {
    this.employeesInput = document.getElementById('calcEmployees');
    this.hoursInput = document.getElementById('calcHours');
    this.rateInput = document.getElementById('calcRate');

    this.valEmployees = document.getElementById('valEmployees');
    this.valHours = document.getElementById('valHours');
    this.valRate = document.getElementById('valRate');

    this.outWastedHours = document.getElementById('outWastedHours');
    this.outMonthlyLoss = document.getElementById('outMonthlyLoss');
    this.outPotentialSavings = document.getElementById('outPotentialSavings');
    this.outAnnualSavings = document.getElementById('outAnnualSavings');

    this.ctaCalcBtn = document.getElementById('btnCtaFromCalc');

    if (!this.employeesInput || !this.hoursInput || !this.rateInput) return;

    this.init();
  }

  init() {
    const inputs = [this.employeesInput, this.hoursInput, this.rateInput];
    inputs.forEach(input => {
      input.addEventListener('input', () => this.updateCalculation());
    });

    if (this.ctaCalcBtn) {
      this.ctaCalcBtn.addEventListener('click', () => {
        const modal = document.getElementById('diagnosisModal');
        if (modal) {
          modal.classList.add('is-open');
          // Prellenar notas en el formulario
          const notesField = document.getElementById('diagNotes');
          if (notesField) {
            const employees = this.employeesInput.value;
            const hours = this.hoursInput.value;
            const monthlySavings = this.outPotentialSavings.textContent;
            notesField.value = `[Estimación ROI]: ${employees} colaboradores pierden ~${hours} hrs/sem en tareas manuales. Ahorro potencial estimado: ${monthlySavings}/mes.`;
          }
        }
      });
    }

    this.updateCalculation(true);
  }

  formatCurrency(num) {
    return '$' + Math.round(num).toLocaleString('es-MX');
  }

  updateSliderBackground(slider) {
    const min = parseFloat(slider.min) || 0;
    const max = parseFloat(slider.max) || 100;
    const val = parseFloat(slider.value) || 0;
    const percentage = ((val - min) / (max - min)) * 100;
    slider.style.backgroundSize = `${percentage}% 100%`;
  }

  updateCalculation(isInitial = false) {
    const employees = parseInt(this.employeesInput.value, 10);
    const hours = parseInt(this.hoursInput.value, 10);
    const rate = parseInt(this.rateInput.value, 10);

    // Actualizar badges numéricos de los controles
    this.valEmployees.textContent = `${employees} personas`;
    this.valHours.textContent = `${hours} hrs/sem`;
    this.valRate.textContent = `$${rate}/hr`;

    this.updateSliderBackground(this.employeesInput);
    this.updateSliderBackground(this.hoursInput);
    this.updateSliderBackground(this.rateInput);

    // Fórmulas tácticas
    // Promedio de semanas al mes: 4.33
    const monthlyWastedHours = Math.round(employees * hours * 4.33);
    const monthlyLoss = Math.round(monthlyWastedHours * rate);
    // Tasa de recuperación estándar con automatización: 72%
    const monthlySavings = Math.round(monthlyLoss * 0.72);
    const annualSavings = Math.round(monthlySavings * 12);

    if (isInitial) {
      this.outWastedHours.textContent = `${monthlyWastedHours.toLocaleString()} hrs`;
      this.outMonthlyLoss.textContent = this.formatCurrency(monthlyLoss);
      this.outPotentialSavings.textContent = this.formatCurrency(monthlySavings);
      if (this.outAnnualSavings) {
        this.outAnnualSavings.textContent = this.formatCurrency(annualSavings);
      }
    } else {
      this.animateValue(this.outWastedHours, monthlyWastedHours, ' hrs');
      this.animateCurrency(this.outMonthlyLoss, monthlyLoss);
      this.animateCurrency(this.outPotentialSavings, monthlySavings);
      if (this.outAnnualSavings) {
        this.animateCurrency(this.outAnnualSavings, annualSavings);
      }
    }
  }

  animateValue(element, target, suffix = '') {
    const current = parseInt(element.textContent.replace(/[^0-9]/g, ''), 10) || 0;
    const diff = target - current;
    const duration = 250;
    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const val = Math.round(current + diff * progress);
      element.textContent = `${val.toLocaleString()}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };
    requestAnimationFrame(update);
  }

  animateCurrency(element, target) {
    const current = parseInt(element.textContent.replace(/[^0-9]/g, ''), 10) || 0;
    const diff = target - current;
    const duration = 250;
    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const val = Math.round(current + diff * progress);
      element.textContent = '$' + val.toLocaleString('es-MX');
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };
    requestAnimationFrame(update);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TacticalRoiCalculator();
});
