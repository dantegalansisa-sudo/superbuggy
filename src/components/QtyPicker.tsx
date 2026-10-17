import { Minus, Plus } from 'lucide-react';
import { fmt, type Counts, type Line } from '../content/pricing';

// Selector de cantidades por tipo (buggy de 2 / de 4 personas) o por persona
export default function QtyPicker({ lines, counts, onChange, personLabel = ['persona', 'personas'] }: { lines: Line[]; counts: Counts; onChange: (c: Counts) => void; personLabel?: [string, string] }) {
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const change = (id: string, delta: number) => {
    const next = Math.max(0, Math.min(30, (counts[id] ?? 0) + delta));
    // Siempre debe quedar al menos uno elegido
    if (total + (next - (counts[id] ?? 0)) < 1) return;
    onChange({ ...counts, [id]: next });
  };
  return (
    <ul className="qp">
      {lines.map((l) => (
        <li key={l.id} className={(counts[l.id] ?? 0) > 0 ? 'is-on' : undefined}>
          <div className="qp__info">
            <strong>{l.label}</strong>
            {l.price != null && <small>{fmt(l.price)} {l.unit}</small>}
            {l.perPerson && <small className="qp__people">{(counts[l.id] ?? 0)} {(counts[l.id] ?? 0) === 1 ? personLabel[0] : personLabel[1]}</small>}
          </div>
          <div className="co__qty">
            <button type="button" onClick={() => change(l.id, -1)} aria-label={`- ${l.label}`}><Minus size={16} /></button>
            <strong>{counts[l.id] ?? 0}</strong>
            <button type="button" onClick={() => change(l.id, 1)} aria-label={`+ ${l.label}`}><Plus size={16} /></button>
          </div>
        </li>
      ))}
    </ul>
  );
}
