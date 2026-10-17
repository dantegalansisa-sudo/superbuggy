import { CONFIG } from '../config';
import type { LegalDoc } from './legal';

// English version of the legal texts. The Spanish version (legal.ts) prevails in case of discrepancy.

const company = `${CONFIG.legalName} (Tax ID / RNC ${CONFIG.rnc}), doing business as "${CONFIG.brand}", located at ${CONFIG.address}, Dominican Republic`;
const contact = `on WhatsApp or by phone at +1 ${CONFIG.phoneDisplay} or by email at ${CONFIG.email}`;
const prevails = 'This is a translation for convenience. In case of any discrepancy, the Spanish version prevails.';

export const PRIVACY_EN: LegalDoc = {
  title: 'Privacy policy',
  updated: 'October 17, 2026',
  intro: `At ${CONFIG.brand} we respect your privacy. This policy explains what data we collect when you use this website or book an excursion, how we use it and what rights you have. The data controller is ${company}. ${prevails}`,
  sections: [
    {
      h: '1. Data we collect',
      p: [
        'Data you give us when you book or contact us: name, WhatsApp or phone number, email, chosen excursion, date, number of people and any information you include in your message.',
        'Payment data: when you pay by PayPal or bank transfer, the payment is processed by PayPal or your bank. We never see or store your full card number. We only keep the receipt or payment confirmation.',
        'Basic technical data: your browser may record standard information (device type, pages visited) so the site works properly.',
      ],
    },
    {
      h: '2. How we use your data',
      p: [
        'To manage and confirm your booking, arrange the meeting point and communicate with you before and after the excursion.',
        'To process and verify payments, issue receipts and comply with tax and legal obligations.',
        'To answer your questions and improve our services. We will only send you promotions if you authorize it, and you can withdraw that consent at any time.',
      ],
    },
    {
      h: '3. Who we share your data with',
      p: [
        'We do not sell or rent your data. We only share it when needed to provide the service: payment providers (PayPal, Banco Popular Dominicano), messaging services (WhatsApp), the service that delivers our booking forms by email, partners who operate part of the excursion (for example, the boat or the park) and the authorities when required by law.',
      ],
    },
    {
      h: '4. How long we keep it',
      p: ['We keep your data for as long as needed to manage your booking and meet our legal and accounting obligations. After that we delete or anonymize it.'],
    },
    {
      h: '5. Your rights',
      p: [
        `Under Dominican Republic Law No. 172-13 on Personal Data Protection, you may request access, correction, update or deletion of your data, and object to its use for promotional purposes. Contact us ${contact}.`,
      ],
    },
    {
      h: '6. Security',
      p: ['We apply reasonable measures to protect your information. No system is 100% secure, but only the staff who need your data to handle your booking have access to it.'],
    },
    {
      h: '7. Photos and videos',
      p: ['During excursions we may take photos or videos of the group. We will only publish images where you appear if you give us permission. If you do not want to appear, tell the guide or message us.'],
    },
    {
      h: '8. Minors',
      p: ['Bookings must be made by people over 18. Data of minors is only used for their participation in the excursion, with the authorization of their parent or guardian.'],
    },
    {
      h: '9. Changes to this policy',
      p: ['We may update this policy. Any change will be published on this page with its update date.'],
    },
    { h: '10. Contact', p: [`For any privacy question, contact us ${contact}.`] },
  ],
};

export const TERMS_EN: LegalDoc = {
  title: 'Terms and conditions',
  updated: 'October 17, 2026',
  intro: `These terms govern the use of this website and the booking of excursions with ${company}. By booking you accept these conditions. ${prevails}`,
  sections: [
    {
      h: '1. Bookings',
      p: [
        'You can request a booking through the website form, on WhatsApp or by phone. A request is not a confirmed booking: your booking is confirmed once we send you the confirmation with date, time, meeting point and price, and we receive the agreed payment or deposit.',
        'Spots are limited and depend on the availability of vehicles and guides for each ride.',
      ],
    },
    {
      h: '2. Prices and payments',
      p: [
        'Prices are shown in US dollars (US$) or Dominican pesos (RD$) and are confirmed at the time of booking. They may vary by season, group size or additional services.',
        `We accept payments by PayPal (including credit and debit cards), by transfer or deposit to the ${CONFIG.legalName} accounts at Banco Popular Dominicano, and in cash (US$ or RD$) on the day of the excursion. A deposit or full prepayment may be required to confirm the booking. Send your receipt on WhatsApp so we can validate the payment.`,
        'Fees charged by your bank, PayPal or for currency exchange are paid by the payer.',
      ],
    },
    {
      h: '3. Cancellations and changes',
      p: [
        'Cancellation by the customer 24 hours or more in advance: full refund or free date change.',
        'Cancellation less than 24 hours in advance or no-show at the agreed time: no refund.',
        'Date changes: subject to availability, free of charge if requested 24 hours or more in advance.',
        'Refunds are made through the same payment method within a reasonable time. Fees charged by third parties (PayPal, banks) may not be refundable.',
      ],
    },
    {
      h: '4. Weather and force majeure',
      p: [
        'For your safety, we may postpone, change the route or cancel an excursion due to heavy rain, rising rivers, weather alerts or other causes beyond our control. In that case we will offer you a new date or a refund of the amount paid.',
      ],
    },
    {
      h: '5. Requirements to participate',
      p: [
        'To drive a buggy or ATV you must be over 18 and follow the guide’s instructions at all times. Minors may ride as passengers depending on their age and the type of vehicle; ask us before booking.',
        'Driving under the influence of alcohol or other substances is not allowed. Using the safety gear provided (helmet, goggles, life vest, depending on the activity) is mandatory.',
        'You must tell us about any medical condition, pregnancy or physical limitation that may affect your participation. Some activities are not recommended in those cases.',
      ],
    },
    {
      h: '6. Safety and liability',
      p: [
        'Our vehicles are insured (full insurance) and our guides know the routes. Even so, adventure activities involve risks inherent to the terrain, the water and nature, which the participant accepts when booking.',
        'Participants are responsible for damage caused to the vehicle or to third parties through reckless driving or by not following the guide’s instructions. We reserve the right to suspend the participation of anyone who puts their own safety or the group’s at risk, without refund.',
        'We are not responsible for the loss of personal belongings during the excursion. We recommend not bringing valuables.',
      ],
    },
    {
      h: '7. Third-party services',
      p: ['Some experiences (for example, boat trips, waterfalls or parks) may be operated together with local partners. Each operator is responsible for its own service, and we help you with the coordination.'],
    },
    {
      h: '8. Photos and site content',
      p: [`The photos, videos, texts and trademarks on this site belong to ${CONFIG.brand} or are used with permission. They may not be copied for commercial purposes without authorization.`],
    },
    {
      h: '9. Consumer rights and governing law',
      p: [
        'These terms are governed by the laws of the Dominican Republic, including Law No. 358-05 on Consumer Protection. Any claim can first be raised with us to find a solution, without prejudice to your right to go to Pro Consumidor or the competent courts of Puerto Plata.',
      ],
    },
    { h: '10. Contact', p: [`For questions about these terms or your booking, contact us ${contact}.`] },
  ],
};
