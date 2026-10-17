import { CONFIG } from '../config';

// Textos legales. Plantilla adaptada a un operador de excursiones en República Dominicana.
// ⚠️ Revisar con el cliente (y si es posible con su abogado) antes de publicar: plazos de cancelación, edades y depósitos.

export type LegalDoc = { title: string; updated: string; intro: string; sections: { h: string; p: string[] }[] };

const company = `${CONFIG.legalName} (RNC ${CONFIG.rnc}), que opera comercialmente como "${CONFIG.brand}", con domicilio en ${CONFIG.address}, República Dominicana`;
const contact = `por WhatsApp o teléfono al ${CONFIG.phoneDisplay} o por correo a ${CONFIG.email}`;

export const PRIVACY: LegalDoc = {
  title: 'Política de privacidad',
  updated: '17 de octubre de 2026',
  intro: `En ${CONFIG.brand} respetamos tu privacidad. Esta política explica qué datos recopilamos cuando usas este sitio web o reservas una excursión, para qué los usamos y qué derechos tienes. El responsable del tratamiento es ${company}.`,
  sections: [
    {
      h: '1. Datos que recopilamos',
      p: [
        'Datos que nos das al reservar o escribirnos: nombre, número de WhatsApp o teléfono, correo electrónico, excursión elegida, fecha, cantidad de personas y cualquier información que incluyas en tu mensaje.',
        'Datos de pago: cuando pagas por PayPal o por transferencia, el pago lo procesa PayPal o tu banco. Nosotros no vemos ni guardamos los números completos de tu tarjeta. Solo conservamos el comprobante o la confirmación del pago.',
        'Datos técnicos básicos: tu navegador puede registrar información estándar (tipo de dispositivo, páginas visitadas) para que el sitio funcione correctamente.',
      ],
    },
    {
      h: '2. Para qué usamos tus datos',
      p: [
        'Gestionar y confirmar tu reserva, coordinar el punto de encuentro y comunicarnos contigo antes y después de la excursión.',
        'Procesar y verificar pagos, emitir comprobantes y cumplir obligaciones fiscales y legales.',
        'Responder tus preguntas y mejorar nuestros servicios. Solo te enviaremos promociones si nos das tu autorización, y puedes retirarla en cualquier momento.',
      ],
    },
    {
      h: '3. Con quién compartimos tus datos',
      p: [
        'No vendemos ni alquilamos tus datos. Solo los compartimos cuando es necesario para prestar el servicio: proveedores de pago (PayPal, Banco Popular Dominicano), servicios de mensajería (WhatsApp), el servicio que nos entrega los formularios por correo, socios que operan una parte de la excursión (por ejemplo, catamarán o parque) y las autoridades cuando la ley lo exija.',
      ],
    },
    {
      h: '4. Cuánto tiempo los conservamos',
      p: ['Conservamos tus datos el tiempo necesario para gestionar tu reserva y cumplir con nuestras obligaciones legales y contables. Después los eliminamos o anonimizamos.'],
    },
    {
      h: '5. Tus derechos',
      p: [
        `Conforme a la Ley No. 172-13 sobre Protección de Datos Personales de la República Dominicana, puedes solicitar acceso, rectificación, actualización o eliminación de tus datos, y oponerte a su uso con fines promocionales. Escríbenos ${contact}.`,
      ],
    },
    {
      h: '6. Seguridad',
      p: ['Aplicamos medidas razonables para proteger tu información. Ningún sistema es 100% seguro, pero solo el personal que necesita tus datos para atender tu reserva tiene acceso a ellos.'],
    },
    {
      h: '7. Fotos y videos',
      p: ['Durante las excursiones podemos tomar fotos o videos del grupo. Solo publicaremos imágenes en las que aparezcas si nos das tu permiso. Si no quieres aparecer, avísale al guía o escríbenos.'],
    },
    {
      h: '8. Menores de edad',
      p: ['Las reservas deben hacerlas personas mayores de 18 años. Los datos de menores solo se usan para su participación en la excursión, con la autorización de su padre, madre o tutor.'],
    },
    {
      h: '9. Cambios a esta política',
      p: ['Podemos actualizar esta política. Publicaremos cualquier cambio en esta misma página con su fecha de actualización.'],
    },
    { h: '10. Contacto', p: [`Para cualquier consulta sobre privacidad, contáctanos ${contact}.`] },
  ],
};

export const TERMS: LegalDoc = {
  title: 'Términos y condiciones',
  updated: '17 de octubre de 2026',
  intro: `Estos términos regulan el uso de este sitio web y la reserva de excursiones con ${company}. Al reservar aceptas estas condiciones.`,
  sections: [
    {
      h: '1. Reservas',
      p: [
        'Puedes solicitar tu reserva por el formulario de la web, por WhatsApp o por teléfono. La solicitud no es una reserva confirmada: la reserva queda confirmada cuando te enviamos la confirmación con fecha, hora, punto de encuentro y precio, y recibimos el pago o depósito acordado.',
        'Los cupos son limitados y dependen de la disponibilidad de vehículos y guías en cada salida.',
      ],
    },
    {
      h: '2. Precios y pagos',
      p: [
        'Los precios se expresan en dólares estadounidenses (US$) o pesos dominicanos (RD$) y se confirman al momento de la reserva. Pueden variar según temporada, tamaño del grupo o servicios adicionales.',
        `Aceptamos pagos por PayPal (incluye tarjetas de crédito y débito) y por transferencia o depósito a las cuentas de ${CONFIG.legalName} en Banco Popular Dominicano. Para confirmar la reserva puede requerirse un depósito o el pago total por adelantado. Envía tu comprobante por WhatsApp para validar el pago.`,
        'Las comisiones de tu banco, de PayPal o de cambio de moneda corren por cuenta de quien paga.',
      ],
    },
    {
      h: '3. Cancelaciones y cambios',
      p: [
        'Cancelación por el cliente con 24 horas o más de anticipación: reembolso completo o cambio de fecha sin costo.',
        'Cancelación con menos de 24 horas o no presentarse a la hora acordada: no hay reembolso.',
        'Cambios de fecha: sujetos a disponibilidad, sin costo si se solicitan con 24 horas o más de anticipación.',
        'Los reembolsos se hacen por el mismo medio de pago en un plazo razonable. Las comisiones cobradas por terceros (PayPal, bancos) pueden no ser reembolsables.',
      ],
    },
    {
      h: '4. Clima y causas de fuerza mayor',
      p: [
        'Por tu seguridad, podemos posponer, modificar la ruta o cancelar una excursión por lluvia fuerte, crecidas de ríos, alertas meteorológicas u otras causas fuera de nuestro control. En ese caso te ofreceremos una nueva fecha o el reembolso de lo pagado.',
      ],
    },
    {
      h: '5. Requisitos para participar',
      p: [
        'Para manejar un buggy o four wheel debes ser mayor de 18 años y seguir en todo momento las instrucciones del guía. Los menores pueden participar como acompañantes según la edad y el tipo de vehículo; consúltanos antes de reservar.',
        'No se permite manejar bajo los efectos del alcohol u otras sustancias. Es obligatorio usar el equipo de seguridad entregado (casco, gafas, chaleco, según la actividad).',
        'Debes informarnos de cualquier condición médica, embarazo o limitación física que pueda afectar tu participación. Algunas actividades no son recomendables en esos casos.',
      ],
    },
    {
      h: '6. Seguridad y responsabilidad',
      p: [
        'Nuestros vehículos cuentan con seguro (full insurance) y nuestros guías conocen las rutas. Aun así, las actividades de aventura implican riesgos propios del terreno, el agua y la naturaleza, que el participante acepta al reservar.',
        'El participante es responsable de los daños causados al vehículo o a terceros por manejo imprudente o por no seguir las instrucciones del guía. Nos reservamos el derecho de suspender la participación de quien ponga en riesgo su seguridad o la del grupo, sin derecho a reembolso.',
        'No nos hacemos responsables por la pérdida de objetos personales durante la excursión. Recomendamos no llevar objetos de valor.',
      ],
    },
    {
      h: '7. Servicios de terceros',
      p: ['Algunas experiencias (por ejemplo, catamarán, cascadas o parques) pueden ser operadas junto a socios locales. Cada operador responde por su propio servicio, y nosotros te acompañamos en la coordinación.'],
    },
    {
      h: '8. Fotos y contenido del sitio',
      p: [`Las fotos, videos, textos y marcas de este sitio pertenecen a ${CONFIG.brand} o se usan con autorización. No se permite copiarlos con fines comerciales sin permiso.`],
    },
    {
      h: '9. Derechos del consumidor y ley aplicable',
      p: [
        'Estos términos se rigen por las leyes de la República Dominicana, incluida la Ley No. 358-05 General de Protección de los Derechos del Consumidor o Usuario. Cualquier reclamación puede presentarse primero ante nosotros para buscar una solución, sin perjuicio de tu derecho a acudir a Pro Consumidor o a los tribunales competentes de Puerto Plata.',
      ],
    },
    { h: '10. Contacto', p: [`Para dudas sobre estos términos o sobre tu reserva, contáctanos ${contact}.`] },
  ],
};
