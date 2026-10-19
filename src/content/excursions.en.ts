import type { Excursion } from '../data.ts';

// English text for each excursion (same slug as in data.ts). Photos, prices and duration numbers come from data.ts.
type Translated = Pick<Excursion, 'name' | 'short' | 'description' | 'tags' | 'includes' | 'bring' | 'highlights'> &
  Partial<Pick<Excursion, 'priceUnit' | 'note' | 'duration' | 'schedule' | 'options'>>;

const LOCAL_NOTE = 'Book on our website and goggles are included. Local customer? Ask about our deals.';
const WEB_GOGGLES = 'Protective goggles (included when you book online)';

export const EXCURSIONS_EN: Record<string, Translated> = {
  'buggy-maimon-playa-teco': {
    name: 'Maimón Guzmancito Buggy & Teco Beach',
    short: 'River, mud, rocky trails and Teco Beach in one tour.',
    description:
      "One single 2.5-hour excursion with everything on the same route. We leave from Maimón Guzmancito and you'll drive through the river, rocky trails, puddles, mud and dust. First stop: a traditional Dominican house with coffee, water, fresh fruit and a shot of Mamajuana (bathroom available, and you can buy local accessories). Second stop: Teco Beach, with time to swim, walk and relax (you can buy food if you like). After the beach we head back to the company. Choose a double buggy (2 people) or a family buggy (4 people).",
    tags: ['River', 'Mud', 'Teco Beach'],
    duration: '2 hours 30 minutes',
    schedule: 'Morning and afternoon departures, every day from 8:00 AM to 6:00 PM.',
    priceUnit: 'per person',
    options: [
      { id: 'buggy-2', label: 'Double buggy (2 people)', unit: 'per buggy', seats: 2, priceUSD: 99, image: '/images/buggy-18-agua.webp', short: 'For couples or friends. River, mud and Teco Beach.' },
      { id: 'buggy-4', label: 'Family buggy (4 people)', unit: 'per person', seats: 4, priceUSD: 44, perPerson: true, image: '/images/buggy-naranja.webp', short: 'For families and groups of 4. The same full route.' },
    ],
    note: LOCAL_NOTE,
    includes: [
      'Double buggy (2 people) or family buggy (4 people)',
      'Protective helmet',
      WEB_GOGGLES,
      'Drinking water',
      'Safety instructions and a quick driving briefing before departure',
      'Coffee, fresh fruit and water at the traditional house',
      'Mamajuana shot',
      'Stop at Teco Beach',
    ],
    bring: ["Clothes and shoes you don't mind getting dirty or wet", 'Swimsuit', 'Sunscreen', 'Towel', 'Cash if you want to buy food or souvenirs'],
    highlights: ['River, rocky trails, mud and dust', '1st stop: traditional Dominican house', '2nd stop: Teco Beach', 'Double or family buggy'],
  },
  'four-wheel-4x4': {
    name: 'ATV 4x4',
    short: 'The same route on your own ATV.',
    description:
      'The Maimón Guzmancito and Teco Beach route, but driving your own ATV: puddles, mud and rocky trails, a stop at the traditional Dominican house with coffee, fruit and Mamajuana, and time to enjoy Teco Beach. Perfect if you want to ride solo.',
    tags: ['ATV', 'Mud', 'Teco Beach'],
    duration: '2 hours 30 minutes',
    schedule: 'Morning and afternoon departures, every day from 8:00 AM to 6:00 PM.',
    note: LOCAL_NOTE,
    includes: ['Single-rider ATV / quad', 'Protective helmet', WEB_GOGGLES, 'Drinking water', 'Safety briefing before departure', 'Coffee, fruit and a Mamajuana shot at the traditional house', 'Stop at Teco Beach'],
    bring: ["Clothes and shoes you don't mind getting dirty or wet", 'Swimsuit', 'Sunscreen', 'Towel'],
    highlights: ['Single-rider ATV', 'Puddles, mud and rocky trails', 'Traditional Dominican house', 'Teco Beach'],
  },
  'party-boat': {
    name: 'Party Boat',
    short: '4 hours with BBQ and open bar.',
    description:
      'Four hours sailing the Puerto Plata coast with music, BBQ and open bar, plus swim stops in turquoise water. The perfect plan to celebrate with friends or wrap up your vacation.',
    tags: ['Sea', 'BBQ', 'Open bar'],
    duration: '4 hours',
    includes: ['4-hour boat ride', 'BBQ', 'Open bar', 'Music on board', 'Swim stops', 'Crew'],
    bring: ['Swimsuit', 'Towel', 'Sunscreen', 'Sunglasses'],
    highlights: ['BBQ on board', 'Open bar', 'Slide into the sea', 'Party vibe'],
  },
  'cascadas-toboganes': {
    name: 'Waterfalls & Natural Slides',
    short: 'Half day with lunch and transport.',
    description:
      'Climb up the river through the waterfalls and slide down natural rock slides. A refreshing experience in the middle of the jungle, with life vest, helmet and guides who know every jump.',
    tags: ['Waterfalls', 'Jumps', 'Nature'],
    duration: 'Half day',
    includes: ['Pickup and drop-off at the port or your hotel', 'Park admission', 'Lunch', 'Drinks', 'Life vest and helmet', 'Local guide'],
    bring: ['Swimsuit', 'Water shoes', 'A change of clothes', 'Towel'],
    highlights: ['Natural slides', 'Jumps into the water', 'Jungle trails', 'Waterfall photos'],
  },
  'pesca-de-altura': {
    name: 'Deep Sea Fishing',
    short: 'Open sea with snacks and drinks.',
    description:
      'Head out to the open sea off the Puerto Plata coast and fish with a local crew. Snacks and drinks on board to enjoy the day, whether or not you have fishing experience.',
    tags: ['Fishing', 'Open sea', 'Drinks'],
    includes: ['Fishing boat trip', 'Fishing gear', 'Snacks', 'Beer and sodas', 'Cuba libre', 'Crew'],
    bring: ['Sunscreen', 'Cap', 'Sunglasses', 'Seasickness pill if you need it'],
    highlights: ['Open sea', 'Beginner friendly', 'Drinks on board', 'Great for groups'],
  },
  cabalgata: {
    name: 'Horseback Riding',
    short: 'On horseback through country trails.',
    description: 'A horseback ride along country and mountain trails at a relaxed pace on gentle horses. Suitable for beginners and families.',
    tags: ['Horses', 'Countryside', 'Family'],
    includes: ['Horse', 'Local guide', 'Water'],
    bring: ['Long pants', 'Closed-toe shoes', 'Sunscreen', 'Cap'],
    highlights: ['Gentle horses', 'Beginner friendly', 'Mountain views', 'Relaxed pace'],
  },
  'parque-de-monos': {
    name: 'Monkey Park',
    short: 'Squirrel monkeys on your shoulders.',
    description:
      'Visit the park where squirrel monkeys climb onto your shoulders to eat. A fun experience for kids and adults, easy to combine with a buggy tour.',
    tags: ['Monkeys', 'Kids', 'Photos'],
    includes: ['Park admission', 'Food for the monkeys', 'Guide'],
    bring: ['Camera or phone', 'Comfortable clothes', 'Sunscreen'],
    highlights: ['Up close with monkeys', 'Great for kids', 'Unique photos', 'Combine with a buggy tour'],
  },
  playas: {
    name: 'Paradise Beaches',
    short: 'White sand and crystal-clear water.',
    description:
      'We take you to the best beaches on the north coast to swim, relax and enjoy the Dominican Caribbean. Can be combined with a buggy or ATV tour.',
    tags: ['Beach', 'Relax', 'Caribbean'],
    includes: ['Transport to the beach', 'Local guide', 'Free time to swim'],
    bring: ['Swimsuit', 'Towel', 'Sunscreen', 'Sunglasses'],
    highlights: ['Crystal-clear water', 'White sand', 'Time to relax', 'Combine with a buggy tour'],
  },
};
