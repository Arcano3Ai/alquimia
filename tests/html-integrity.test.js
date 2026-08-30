import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const htmlPath = path.resolve('index.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Extract all id="..." attributes from index.html
const idMatches = [...htmlContent.matchAll(/id=["']([^"']+)["']/g)].map(m => m[1]);
const existingIds = new Set(idMatches);

test('HTML Integrity - Mandatory IDs required by roi-calculator.js', () => {
  const requiredRoiIds = [
    'calcEmployees',
    'calcHours',
    'calcRate',
    'valEmployees',
    'valHours',
    'valRate',
    'outWastedHours',
    'outMonthlyLoss',
    'outPotentialSavings',
    'outAnnualSavings',
    'btnCtaFromCalc'
  ];

  requiredRoiIds.forEach(id => {
    assert.ok(
      existingIds.has(id),
      `Missing element id="${id}" in index.html required by roi-calculator.js`
    );
  });
});

test('HTML Integrity - Mandatory IDs required by form-handler.js', () => {
  const requiredFormIds = [
    'diagnosisModal',
    'diagnosisForm',
    'diagName',
    'diagCompany',
    'diagPhone',
    'diagEmail',
    'diagIndustry',
    'diagBottleneck',
    'diagNotes',
    'diagFormStatus'
  ];

  requiredFormIds.forEach(id => {
    assert.ok(
      existingIds.has(id),
      `Missing element id="${id}" in index.html required by form-handler.js`
    );
  });
});

test('HTML Integrity - Canvas element required by alchemy-canvas.js', () => {
  assert.ok(
    existingIds.has('alchemyHeroCanvas'),
    'Missing canvas id="alchemyHeroCanvas" in index.html required by alchemy-canvas.js'
  );
});

test('HTML Integrity - Floating WhatsApp button required by whatsapp-widget.js', () => {
  assert.ok(
    htmlContent.includes('class="floating-wa-btn"'),
    'Missing element with class="floating-wa-btn" in index.html required by whatsapp-widget.js'
  );
});

test('HTML Integrity - Mobile toggle button required by main.js', () => {
  assert.ok(
    htmlContent.includes('class="mobile-toggle-btn"'),
    'Missing mobile menu toggle button in index.html'
  );
  assert.ok(
    htmlContent.includes('class="nav-links"'),
    'Missing nav links container in index.html'
  );
});
