// Cliente mínimo de la API REST de PayPal (Orders v2).
// Variables de entorno en Vercel:
//   PAYPAL_CLIENT_ID      Client ID de la app de PayPal (cuenta empresarial)
//   PAYPAL_CLIENT_SECRET  Secret de la app (solo en el servidor)
//   PAYPAL_ENV            "sandbox" para pruebas o "live" para cobros reales (por defecto: sandbox)

export const paypalEnv = () => (process.env.PAYPAL_ENV === 'live' ? 'live' : 'sandbox');
export const paypalEnabled = () => Boolean(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET);
const base = () => (paypalEnv() === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com');

async function accessToken() {
  const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64');
  const res = await fetch(`${base()}/v1/oauth2/token`, {
    method: 'POST',
    headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials',
  });
  if (!res.ok) throw new Error(`PayPal token ${res.status}: ${await res.text()}`);
  return ((await res.json()) as { access_token: string }).access_token;
}

export async function paypalApi<T>(path: string, body?: object): Promise<T> {
  const token = await accessToken();
  const res = await fetch(`${base()}${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', Prefer: 'return=representation' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`PayPal ${path} ${res.status}: ${JSON.stringify(data)}`);
  return data as T;
}
