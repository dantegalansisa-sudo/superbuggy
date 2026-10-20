import type { Excursion } from '../data';
import type { Dict } from '../i18n/es';

// Líneas de precio de una excursión: tipos de vehículo (cada uno se reserva por buggy) o precio por persona
export type Line = {
  id: string;
  label: string;
  unit: string;
  price?: number;
  seats?: number;
  group?: string;
  groupLabel?: string;
  rowLabel?: string;
  display?: string;
};
export type Counts = Record<string, number>;
export type Opt = NonNullable<Excursion['options']>[number];

export const fmt = (n: number) => `US$${n.toLocaleString('en-US')}`;

export function priceLines(ex: Excursion | undefined, t: Dict): Line[] {
  if (!ex) return [];
  if (ex.options?.length)
    return ex.options.map((o) => ({
      id: o.id, label: o.label, unit: o.unit, price: o.priceUSD, seats: o.seats,
      group: o.group, groupLabel: o.groupLabel, rowLabel: o.rowLabel, display: o.display,
    }));
  return [{ id: 'base', label: t.checkout.people, unit: t.checkout.unitPerson, price: ex.priceUSD }];
}

// Grupos para tarjetas y bloque "Elige tu buggy": el doble solo, y el familiar con sus 3 tamaños
export type OptGroup = { key: string; label: string; image?: string; short?: string; price: number; unit: string; defaultId: string; rows: Opt[] };
export function optionGroups(options: Opt[] = []): OptGroup[] {
  const groups: OptGroup[] = [];
  for (const o of options) {
    const key = o.group ?? o.id;
    let g = groups.find((x) => x.key === key);
    if (!g) {
      g = { key, label: o.groupLabel ?? o.label, image: o.image, short: o.short, price: o.perPersonUSD ?? o.priceUSD, unit: o.unit, defaultId: o.id, rows: [] };
      groups.push(g);
    }
    g.rows.push(o);
  }
  // En el familiar se propone por defecto el de 4 personas
  for (const g of groups) g.defaultId = (g.rows.find((r) => r.seats === 4) ?? g.rows[0]).id;
  return groups;
}

// Precio más bajo para "Desde …" (por persona si la opción lo indica)
export const minPrice = (ex: Excursion) =>
  ex.options?.length ? Math.min(...ex.options.map((o) => o.perPersonUSD ?? o.priceUSD)) : ex.priceUSD;

// Cantidades iniciales: 1 del primer vehículo, o N personas
export function defaultCounts(ex: Excursion | undefined, people?: string): Counts {
  if (ex?.options?.length) return { [ex.options[0].id]: 1 };
  return { base: Math.max(1, parseInt(people ?? '2', 10) || 2) };
}

export const optionCounts = (o: { id: string }): Counts => ({ [o.id]: 1 });

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

// Texto para correo/WhatsApp: "1 × Buggy doble (2 personas) + 2 × Buggy familiar (4 personas) (10 personas)"
export function countsLabel(lines: Line[], counts: Counts, t: Dict): string {
  const used = lines.filter((l) => (counts[l.id] ?? 0) > 0);
  if (used.length === 1 && used[0].id === 'base') {
    const n = counts.base;
    return `${n} ${n === 1 ? t.quick.person : t.quick.persons}`;
  }
  const people = used.reduce((a, l) => a + (l.seats ?? 0) * (counts[l.id] ?? 0), 0);
  const parts = used.map((l) => `${counts[l.id]} × ${l.label}`).join(' + ');
  return people ? `${parts} (${t.checkout.upTo(people)})` : parts;
}
