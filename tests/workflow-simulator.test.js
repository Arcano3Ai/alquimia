import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const htmlPath = path.resolve('index.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

test('Workflow Simulator - 3 Use Case Cards Present in index.html', () => {
  const workflowCardMatches = [...htmlContent.matchAll(/class="[^"]*workflow-card[^"]*"/g)];
  assert.equal(
    workflowCardMatches.length,
    3,
    'Expected exactly 3 workflow-card elements for the 3 core use cases in index.html'
  );
});

test('Workflow Simulator - Simulation Trigger Buttons Present', () => {
  const triggerBtnMatches = [...htmlContent.matchAll(/class="[^"]*btn-simulate-wf[^"]*"/g)];
  assert.equal(
    triggerBtnMatches.length,
    3,
    'Expected 3 btn-simulate-wf buttons for interactive pipeline simulation'
  );
});

test('Workflow Simulator - Status Log Containers Present', () => {
  const statusLogMatches = [...htmlContent.matchAll(/class="[^"]*wf-status-log[^"]*"/g)];
  assert.equal(
    statusLogMatches.length,
    3,
    'Expected 3 wf-status-log elements for displaying step execution status'
  );
});
