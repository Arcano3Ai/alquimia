import test from 'node:test';
import assert from 'node:assert/strict';

// Core ROI calculation formulas extracted for unit testing
function calculateRoi(employees, hours, rate) {
  const monthlyWastedHours = Math.round(employees * hours * 4.33);
  const monthlyLoss = Math.round(monthlyWastedHours * rate);
  const monthlySavings = Math.round(monthlyLoss * 0.72);
  const annualSavings = Math.round(monthlySavings * 12);

  return {
    monthlyWastedHours,
    monthlyLoss,
    monthlySavings,
    annualSavings
  };
}

function formatCurrency(num) {
  return '$' + Math.round(num).toLocaleString('es-MX');
}

test('ROI Calculator - Default Parameters (5 employees, 12 hrs/wk, $15/hr)', () => {
  const res = calculateRoi(5, 12, 15);
  // 5 * 12 * 4.33 = 259.8 -> Math.round = 260
  assert.equal(res.monthlyWastedHours, 260);
  // 260 * 15 = 3900
  assert.equal(res.monthlyLoss, 3900);
  // 3900 * 0.72 = 2808
  assert.equal(res.monthlySavings, 2808);
  // 2808 * 12 = 33696
  assert.equal(res.annualSavings, 33696);
});

test('ROI Calculator - Small Team Parameters (1 employee, 2 hrs/wk, $5/hr)', () => {
  const res = calculateRoi(1, 2, 5);
  // 1 * 2 * 4.33 = 8.66 -> 9
  assert.equal(res.monthlyWastedHours, 9);
  // 9 * 5 = 45
  assert.equal(res.monthlyLoss, 45);
  // 45 * 0.72 = 32.4 -> 32
  assert.equal(res.monthlySavings, 32);
  // 32 * 12 = 384
  assert.equal(res.annualSavings, 384);
});

test('ROI Calculator - Large Enterprise Parameters (40 employees, 25 hrs/wk, $60/hr)', () => {
  const res = calculateRoi(40, 25, 60);
  // 40 * 25 * 4.33 = 4330
  assert.equal(res.monthlyWastedHours, 4330);
  // 4330 * 60 = 259800
  assert.equal(res.monthlyLoss, 259800);
  // 259800 * 0.72 = 187056
  assert.equal(res.monthlySavings, 187056);
  // 187056 * 12 = 2244672
  assert.equal(res.annualSavings, 2244672);
});

test('Currency Formatting', () => {
  assert.equal(formatCurrency(2808), '$2,808');
  assert.equal(formatCurrency(33696), '$33,696');
  assert.equal(formatCurrency(0), '$0');
});
