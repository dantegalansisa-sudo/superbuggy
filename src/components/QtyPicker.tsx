import { Minus, Plus } from 'lucide-react';
import { fmt, type Counts, type Line } from '../content/pricing';

// Selector de cantidades. Cada fila cuenta buggies (o personas si es precio por persona).
// Las opciones del mismo grupo (buggy familiar de 3, 4 o 5 personas) se muestran juntas bajo un título.
export default function QtyPicker({ lines, counts, onChange }: { lines: Line[]; counts: Counts; onChange: (c: Counts) => void; personLabel?: [string, string] }) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const change = (id: string, delta: number) => {
    const next = Math.max(0, Math.min(30, (counts[id] ?? 0) + delta));
    // Siempre debe quedar al menos uno elegido
    if (total + (next - (counts[id] ?? 0)) < 1) return;
    onChange({ ...counts, [id]: next });
  };
  const stepper = (l: Line) => (
    <div className="co__qty">
      <button type="button" onClick={() => change(l.id, -1)} aria-label={`- ${l.label}`}><Minus size={16} /></button>
      <strong>{counts[l.id] ?? 0}</strong>
      <button type="button" onClick={() => change(l.id, 1)} aria-label={`+ ${l.label}`}><Plus size={16} /></button>
    </div>
  );
  const priceText = (l: Line) => l.display ?? (l.price != null ? `${fmt(l.price)} ${l.unit}` : '');

  // Agrupa respetando el orden original
  const blocks: { key: string; lines: Line[] }[] = [];
  for (const l of lines) {
    const key = l.group ?? l.id;
    const b = blocks.find((x) => x.key === key);
    if (b) b.lines.push(l);
    else blocks.push({ key, lines: [l] });
  }

  return (
    <ul className="qp">
      {blocks.map((b) =>
        b.lines.length === 1 && !b.lines[0].group ? (
          <li key={b.key} className={(counts[b.lines[0].id] ?? 0) > 0 ? 'is-on' : undefined}>
            <div className="qp__info">
              <strong>{b.lines[0].label}</strong>
              <small>{priceText(b.lines[0])}</small>
            </div>
            {stepper(b.lines[0])}
          </li>
        ) : (
          <li key={b.key} className={`qp__group${b.lines.some((l) => (counts[l.id] ?? 0) > 0) ? ' is-on' : ''}`}>
            <div className="qp__info">
              <strong>{b.lines[0].groupLabel ?? b.lines[0].label}</strong>
              <small>{priceText(b.lines[0])}</small>
            </div>
            <div className="qp__rows">
              {b.lines.map((l) => (
                <div key={l.id} className={`qp__row${(counts[l.id] ?? 0) > 0 ? ' is-on' : ''}`}>
                  <span>{l.rowLabel ?? l.label}</span>
                  {stepper(l)}
                </div>
              ))}
            </div>
          </li>
        ),
      )}
    </ul>
  );
}
