import test from 'node:test';
import assert from 'node:assert/strict';

function generateWhatsAppUrl(phone, text) {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

test('WhatsApp Widget - URL Generation & Encoding', () => {
  const phone = '5215500000000';
  const message = 'Hola Alquimia Táctica, quiero información para automatizar procesos en mi empresa.';
  const url = generateWhatsAppUrl(phone, message);

  assert.ok(url.startsWith('https://wa.me/5215500000000?text='));
  assert.ok(url.includes('Hola%20Alquimia%20T%C3%A1ctica'));
});

test('WhatsApp Widget - Diagnosis Form Payload Encoding', () => {
  const phone = '+52 55 1234 5678';
  const name = 'Carlos Mendoza';
  const company = 'Logística Andina S.A.';
  const bottleneck = 'Tareas repetitivas en Excel';

  const waText = `¡Hola Alquimia Táctica! Quiero solicitar un Diagnóstico de Automatización para mi empresa:
- Nombre: ${name}
- Empresa: ${company}
- Teléfono / WhatsApp: ${phone}
- Principal cuello de botella: ${bottleneck}`;

  const url = generateWhatsAppUrl('5215500000000', waText);

  assert.ok(url.includes(encodeURIComponent(name)));
  assert.ok(url.includes(encodeURIComponent(company)));
  assert.ok(url.includes(encodeURIComponent(bottleneck)));
});
