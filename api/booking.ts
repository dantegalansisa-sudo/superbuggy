// Función de Vercel: recibe una reserva del checkout y la envía por correo con Resend.
// La clave NUNCA va en el código del sitio: se lee de las variables de entorno de Vercel.
//
// Variables de entorno (Vercel → Settings → Environment Variables):
//   RESEND_API_KEY        clave de Resend (solo envío)                         [obligatoria]
//   BOOKING_TO            correo que recibe las reservas                        [por defecto: superbuggiesmaimonpop@gmail.com]
//   RESEND_FROM           remitente. Hasta verificar el dominio en Resend se usa onboarding@resend.dev
//                         Luego: "Super Buggies <reservas@superbuggyspop.com>"
//   SEND_CUSTOMER_EMAIL   "true" para enviar también la confirmación al cliente (requiere dominio verificado)

type Booking = {
  type?: 'request' | 'booking'; // request = solicitud sin pago (inicio); booking = reserva desde la excursión
  payment?: string; // método de pago elegido en el checkout
  message?: string; // comentarios del cliente
  code: string;
  status?: string;
  excursion: string;
  date: string;
  quantity: string;
  total: string;
  name: string;
  phone: string;
  email?: string;
  pickup?: string;
  lang?: string;
  website?: string; // campo trampa anti-spam: los humanos lo dejan vacío
};

const TO = process.env.BOOKING_TO || 'superbuggiesmaimonpop@gmail.com';
const FROM = process.env.RESEND_FROM || 'Super Buggies <onboarding@resend.dev>';
const SITE = 'https://www.superbuggyspop.com';
const ORANGE = '#e0561b';

const esc = (v: unknown) =>
  String(v ?? '').replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]!);
const clip = (v: unknown, max = 200) => String(v ?? '').trim().slice(0, max);
const json = (body: object, status = 200) => Response.json(body, { status });

function row(label: string, value: string) {
  return value
    ? `<tr><td style="padding:8px 12px;color:#7a6f63;font-size:13px;white-space:nowrap">${esc(label)}</td><td style="padding:8px 12px;font-size:15px;color:#1b1712"><strong>${value}</strong></td></tr>`
    : '';
}

function layout(title: string, intro: string, rows: string, footer: string) {
  return `<!doctype html><html><body style="margin:0;background:#fbf6ee;font-family:Arial,Helvetica,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#fbf6ee;padding:24px 12px"><tr><td align="center">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden">
      <tr><td style="background:#1b1712;padding:20px 24px;color:#fff;font-size:22px;font-weight:bold">
        <span style="color:${ORANGE};font-style:italic">Super</span> Buggies
      </td></tr>
      <tr><td style="padding:24px">
        <h1 style="margin:0 0 8px;font-size:22px;color:#1b1712">${title}</h1>
        <p style="margin:0 0 16px;color:#4a423a;font-size:15px;line-height:1.5">${intro}</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#fbf6ee;border-radius:12px">${rows}</table>
        ${footer}
      </td></tr>
    </table>
  </td></tr></table></body></html>`;
}

const FALLBACK_FROM = 'Super Buggies <onboarding@resend.dev>';

function post(payload: object) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

// Envía con el remitente del dominio; si Resend lo rechaza (dominio aún sin verificar),
// reintenta con el remitente de prueba de Resend para que la reserva no se pierda.
async function send(payload: Record<string, unknown>, allowFallback = true) {
  let res = await post({ from: FROM, ...payload });
  if (!res.ok && allowFallback && FROM !== FALLBACK_FROM && (res.status === 403 || res.status === 422)) {
    console.warn('Remitente rechazado, usando el de prueba:', await res.text());
    res = await post({ from: FALLBACK_FROM, ...payload });
  }
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  return res.json();
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) return json({ ok: false, error: 'not_configured' }, 500);

  let b: Booking;
  try {
    b = await request.json();
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }

  // Bots: si llenan el campo trampa, se responde OK sin enviar nada
  if (b.website) return json({ ok: true });

  const data = {
    code: clip(b.code, 20),
    status: clip(b.status || 'Pendiente de pago', 60),
    excursion: clip(b.excursion),
    date: clip(b.date, 20),
    quantity: clip(b.quantity, 80),
    total: clip(b.total, 40),
    name: clip(b.name, 120),
    phone: clip(b.phone, 40),
    email: clip(b.email, 160),
    pickup: clip(b.pickup),
    lang: b.lang === 'en' ? 'en' : 'es',
    type: b.type === 'request' ? 'request' : 'booking',
    payment: clip(b.payment, 120),
    message: clip(b.message, 1000),
  };
  const isRequest = data.type === 'request';
  if (!data.code || !data.name || !data.phone) return json({ ok: false, error: 'missing_fields' }, 400);
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);

  const waNumber = data.phone.replace(/\D/g, '');
  const waUrl = `https://wa.me/${waNumber.length === 10 ? '1' + waNumber : waNumber}`;

  // 1) Aviso a la empresa
  const companyRows = [
    row('Código', esc(data.code)),
    row('Estado', esc(data.status)),
    row('Excursión', esc(data.excursion)),
    row('Fecha', esc(data.date)),
    row('Cantidad', esc(data.quantity)),
    row('Total', esc(data.total)),
    row('Pago', esc(data.payment)),
    row('Cliente', esc(data.name)),
    row('WhatsApp', `<a href="${esc(waUrl)}" style="color:${ORANGE}">${esc(data.phone)}</a>`),
    row('Correo', validEmail ? `<a href="mailto:${esc(data.email)}" style="color:${ORANGE}">${esc(data.email)}</a>` : ''),
    row('Recogida', esc(data.pickup)),
    row('Comentarios', esc(data.message).replace(/\n/g, '<br>')),
    row('Idioma', data.lang === 'en' ? 'Inglés' : 'Español'),
  ].join('');

  try {
    await send({
      to: [TO],
      subject: isRequest
        ? `Nueva solicitud ${data.code}: ${data.excursion} — ${data.name}`
        : `Nueva reserva ${data.code} (${data.payment || 'sin método'}): ${data.excursion} — ${data.name}`,
      ...(validEmail ? { reply_to: data.email } : {}),
      html: layout(
        isRequest ? 'Nueva solicitud desde la web' : 'Nueva reserva desde la web',
        isRequest
          ? 'Un cliente quiere reservar. Escríbele por WhatsApp para confirmar disponibilidad, precio y punto de encuentro.'
          : data.payment.startsWith('Efectivo')
            ? 'Reserva con pago en efectivo el día de la excursión. Confirma hora y punto de encuentro con el cliente.'
            : 'El cliente indicó que ya pagó. Verifica el comprobante que te enviará por WhatsApp antes de confirmar.',
        companyRows,
        `<p style="margin:20px 0 0"><a href="${esc(waUrl)}" style="display:inline-block;background:#25d366;color:#fff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:bold">Escribir al cliente por WhatsApp</a></p>`,
      ),
    });
  } catch (err) {
    console.error(err);
    return json({ ok: false, error: 'send_failed' }, 502);
  }

  // 2) Confirmación al cliente (solo con dominio verificado en Resend)
  if (validEmail && process.env.SEND_CUSTOMER_EMAIL === 'true') {
    const en = data.lang === 'en';
    const customerRows = [
      row(en ? 'Code' : 'Código', esc(data.code)),
      row(en ? 'Excursion' : 'Excursión', esc(data.excursion)),
      row(en ? 'Date' : 'Fecha', esc(data.date)),
      row(en ? 'Quantity' : 'Cantidad', esc(data.quantity)),
      row('Total', esc(data.total)),
      row(en ? 'Payment' : 'Pago', esc(data.payment)),
      row(en ? 'Your comments' : 'Tus comentarios', esc(data.message).replace(/\n/g, '<br>')),
    ].join('');
    const intro = isRequest
      ? en
        ? "We received your request. Our team will contact you on WhatsApp or email to confirm availability and price."
        : 'Recibimos tu solicitud. Nuestro equipo te contactará por WhatsApp o correo para confirmar disponibilidad y precio.'
      : data.payment.startsWith('Efectivo')
        ? en
          ? "Your booking is registered. You'll pay cash on the day of the excursion. We'll contact you to confirm the time and meeting point."
          : 'Tu reserva quedó registrada. Pagas en efectivo el día de la excursión. Te contactaremos para confirmar hora y punto de encuentro.'
        : en
          ? 'We received your booking. Once we verify your payment receipt on WhatsApp, your spot is confirmed.'
          : 'Recibimos tu reserva. Cuando verifiquemos tu comprobante por WhatsApp, tu cupo queda confirmado.';
    try {
      await send({
        to: [data.email],
        reply_to: TO,
        subject: isRequest
          ? en ? `Your request ${data.code} · Super Buggies` : `Tu solicitud ${data.code} · Super Buggies`
          : en ? `Your booking ${data.code} · Super Buggies` : `Tu reserva ${data.code} · Super Buggies`,
        html: layout(
          en ? `Thanks, ${esc(data.name)}!` : `¡Gracias, ${esc(data.name)}!`,
          intro,
          customerRows,
          `<p style="margin:20px 0 0"><a href="https://wa.me/18098414125" style="display:inline-block;background:#25d366;color:#fff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:bold">WhatsApp 809-841-4125</a></p>
           <p style="margin:16px 0 0;font-size:13px;color:#7a6f63"><a href="${SITE}/formas-de-pago" style="color:${ORANGE}">${en ? 'Payment options' : 'Formas de pago'}</a> · <a href="${SITE}/terminos" style="color:${ORANGE}">${en ? 'Terms' : 'Términos'}</a></p>`,
        ),
      }, false); // al cliente solo con el remitente del dominio verificado
    } catch (err) {
      // El aviso a la empresa ya salió; un fallo aquí no invalida la reserva
      console.error(err);
    }
  }

  return json({ ok: true });
}

export function GET() {
  return json({ ok: true, service: 'booking', configured: Boolean(process.env.RESEND_API_KEY) });
}
