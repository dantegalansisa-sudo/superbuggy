import type { Excursion } from '../data';
import type { Dict } from '../i18n/es';

// Líneas de precio de una excursión: tipos de vehículo (ej. buggy de 2 o de 4 personas) o precio por persona
export type Line = { id: string; label: string; unit: string; price?: number; seats?: number; perPerson?: boolean };
export type Counts = Record<string, number>;

export const fmt = (n: number) => `US$${n.toLocaleString('en-US')}`;

export function priceLines(ex: Excursion | undefined, t: Dict): Line[] {
  if (!ex) return [];
  if (ex.options?.length) return ex.options.map((o) => ({ id: o.id, label: o.label, unit: o.unit, price: o.priceUSD, seats: o.seats, perPerson: o.perPerson }));
  return [{ id: 'base', label: t.checkout.people, unit: t.checkout.unitPerson, price: ex.priceUSD }];
}

// Cantidades iniciales: 1 del primer vehículo, o N personas
export function defaultCounts(ex: Excursion | undefined, people?: string): Counts {
  if (ex?.options?.length) return optionCounts(ex.options[0]);
  return { base: Math.max(1, parseInt(people ?? '2', 10) || 2) };
}

// Al elegir un tipo: 1 buggy, o las personas que caben si se cobra por persona
export const optionCounts = (o: { id: string; seats: number; perPerson?: boolean }): Counts => ({ [o.id]: o.perPerson ? o.seats : 1 });

export const units = (counts: Counts) => Object.values(counts).reduce((a, b) => a + b, 0);

export function totalOf(lines: Line[], counts: Counts): number | undefined {
  let sum = 0;
  for (const l of lines) {
    const n = counts[l.id] ?? 0;
    if (!n) continue;
    if (l.price == null) return undefined;
    sum += l.price * n;
  }
  return sum || undefined;
}

// Texto para correo/WhatsApp: "1 × Buggy para 2 personas + 1 × Buggy para 4 personas (6 personas)"
export function countsLabel(lines: Line[], counts: Counts, t: Dict): string {
  const used = lines.filter((l) => (counts[l.id] ?? 0) > 0);
  if (used.length === 1 && used[0].id === 'base') {
    const n = counts.base;
    return `${n} ${n === 1 ? t.quick.person : t.quick.persons}`;
  }
  const people = used.reduce((a, l) => a + (l.perPerson ? 1 : l.seats ?? 0) * (counts[l.id] ?? 0), 0);
  const parts = used
    .map((l) => (l.perPerson ? `${l.label}: ${counts[l.id]} ${counts[l.id] === 1 ? t.quick.person : t.quick.persons}` : `${counts[l.id]} × ${l.label}`))
    .join(' + ');
  // El total de personas solo aporta información si hay buggies que se cuentan por unidad
  return people && used.some((l) => !l.perPerson) ? `${parts} (${t.checkout.upTo(people)})` : parts;
}
