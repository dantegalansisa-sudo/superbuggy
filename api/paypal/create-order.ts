import { paypalApi, paypalEnabled } from '../_lib/paypal.js';
import { computeAmount } from '../_lib/prices.js';

type Body = { slug?: string; counts?: Record<string, number>; mode?: 'full' | 'deposit'; code?: string; excursion?: string };

// Crea la orden de PayPal con el monto calculado en el servidor
export async function POST(request: Request) {
  if (!paypalEnabled()) return Response.json({ error: 'not_configured' }, { status: 503 });
  let b: Body;
  try {
    b = await request.json();
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 });
  }
  const mode = b.mode === 'deposit' ? 'deposit' : 'full';
  const price = computeAmount(String(b.slug ?? ''), b.counts ?? {}, mode);
  if (!price) return Response.json({ error: 'invalid_booking' }, { status: 400 });

  const code = String(b.code ?? '').slice(0, 20);
  const label = `${String(b.excursion ?? b.slug).slice(0, 90)}${mode === 'deposit' ? ' (depósito)' : ''}`;
  try {
    const order = await paypalApi<{ id: string }>('/v2/checkout/orders', {
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: code || 'web',
          custom_id: code,
          description: `Super Buggies · ${label}`.slice(0, 127),
          amount: { currency_code: 'USD', value: price.amount.toFixed(2) },
        },
      ],
      application_context: { brand_name: 'Super Buggies', shipping_preference: 'NO_SHIPPING', user_action: 'PAY_NOW' },
    });
    return Response.json({ id: order.id, amount: price.amount, total: price.total });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'paypal_error' }, { status: 502 });
  }
}
