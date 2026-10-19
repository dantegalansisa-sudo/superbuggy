import { paypalApi, paypalEnabled } from '../_lib/paypal.js';

type Capture = {
  id: string;
  status: string;
  purchase_units?: { payments?: { captures?: { id: string; status: string; amount: { value: string; currency_code: string } }[] } }[];
};

type Body = { orderID?: string; booking?: Record<string, unknown> };

// Cobra la orden aprobada por el cliente y, si quedó pagada, avisa a la empresa (y al cliente) por correo
export async function POST(request: Request) {
  if (!paypalEnabled()) return Response.json({ error: 'not_configured' }, { status: 503 });
  let b: Body;
  try {
    b = await request.json();
  } catch {
    return Response.json({ error: 'invalid_json' }, { status: 400 });
  }
  const orderID = String(b.orderID ?? '');
  if (!/^[A-Z0-9-]{5,40}$/i.test(orderID)) return Response.json({ error: 'invalid_order' }, { status: 400 });

  let result: Capture;
  try {
    result = await paypalApi<Capture>(`/v2/checkout/orders/${orderID}/capture`);
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'capture_failed' }, { status: 502 });
  }

  const cap = result.purchase_units?.[0]?.payments?.captures?.[0];
  const paid = result.status === 'COMPLETED' && cap?.status === 'COMPLETED';
  if (!paid) return Response.json({ ok: false, status: cap?.status ?? result.status }, { status: 402 });

  // Aviso por correo con la función de reservas (mismo diseño de correo)
  const amount = `US$${cap!.amount.value}`;
  try {
    await fetch(new URL('/api/booking', request.url), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-internal-key': process.env.PAYPAL_CLIENT_SECRET ?? '' },
      body: JSON.stringify({
        ...(b.booking ?? {}),
        type: 'booking',
        status: 'PAGADO con PayPal',
        payment: `PayPal / tarjeta ${amount} · Transacción ${cap!.id}`,
      }),
    });
  } catch (err) {
    // El pago ya se cobró; un fallo del correo no lo invalida
    console.error(err);
  }
  return Response.json({ ok: true, captureId: cap!.id, amount });
}
