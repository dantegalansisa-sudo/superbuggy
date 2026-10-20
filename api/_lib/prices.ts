// Precios que usa el servidor para cobrar con PayPal (el monto NUNCA se toma del navegador).
// Deben coincidir con src/data.ts: el build de la web falla si no coinciden (ver vite.config.ts).
// base = precio por persona; options = precio por buggy (familiar: US$44 × 3, 4 o 5 personas).

export const DEPOSIT_PERCENT = 50;

export const PRICES: Record<string, { base?: number; options?: Record<string, number> }> = {
  'buggy-maimon-playa-teco': { options: { 'buggy-2': 99, 'buggy-f3': 132, 'buggy-f4': 176, 'buggy-f5': 220 } },
  'four-wheel-4x4': { base: 69 },
  'party-boat': { base: 99 },
  'cascadas-toboganes': { base: 59 },
  'pesca-de-altura': { base: 99 },
};

// Calcula el monto a cobrar a partir de lo que eligió el cliente. Devuelve null si algo no es válido.
export function computeAmount(slug: string, counts: Record<string, number>, mode: 'full' | 'deposit') {
  const p = PRICES[slug];
  if (!p || typeof counts !== 'object' || counts === null) return null;
  let total = 0;
  for (const [id, raw] of Object.entries(counts)) {
    const n = Number(raw);
    if (!Number.isInteger(n) || n < 0 || n > 30) return null;
    if (!n) continue;
    const price = id === 'base' ? p.base : p.options?.[id];
    if (price == null) return null;
    total += price * n;
  }
  if (!total) return null;
  const amount = mode === 'deposit' ? Math.ceil((total * DEPOSIT_PERCENT) / 100) : total;
  return { total, amount };
}
