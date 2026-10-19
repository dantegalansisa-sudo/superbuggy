import { paypalEnabled, paypalEnv } from '../_lib/paypal.js';

// Le dice a la web si la pasarela está activa y le da el Client ID (es público; el Secret nunca sale del servidor)
export function GET() {
  return Response.json(
    paypalEnabled() ? { enabled: true, clientId: process.env.PAYPAL_CLIENT_ID, env: paypalEnv() } : { enabled: false },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
