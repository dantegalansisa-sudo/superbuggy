import type { Excursion } from '../data';

// English text for each excursion (same slug as in data.ts). Photos, prices and duration numbers come from data.ts.
type Translated = Pick<Excursion, 'name' | 'short' | 'description' | 'tags' | 'includes' | 'bring' | 'highlights'> &
  Partial<Pick<Excursion, 'priceUnit' | 'note' | 'duration'>>;

const BRING_DEFAULT = ['Clothes that can get muddy or wet', 'Sunscreen', 'A change of clothes', 'Closed-toe shoes'];
const RIDE_INCLUDES = ['Protective helmet', 'Goggles', 'Bottle of water per person', 'Shot of mamajuana', 'Local guide', 'Full insurance'];
const LOCAL_NOTE = 'Local customer? Ask about our deals for groups and families.';
const DOUBLE_BUGGY = 'per double buggy (2 people)';

export const EXCURSIONS_EN: Record<string, Translated> = {
  'buggy-rio-lodo': {
    name: 'River & Mud Buggy',
    short: 'Rivers, puddles and dirt trails.',
    description:
      'Our most popular tour: drive your own buggy along the country roads of Puerto Plata, cross rivers and splash through mud with a local guide leading the group. Pure adrenaline and Dominican countryside views.',
    tags: ['River', 'Mud', 'Trails'],
    priceUnit: DOUBLE_BUGGY,
    note: LOCAL_NOTE,
    includes: ['Double 4x4 buggy', ...RIDE_INCLUDES],
    bring: BRING_DEFAULT,
    highlights: ['River crossings', 'Muddy roads', 'Countryside views', 'Photo stops'],
  },
  'buggy-costa-playa': {
    name: 'Coast & Beach Buggy',
    short: 'Sand, sea and cruise ship views.',
    description:
      'Ride the Puerto Plata coastline by buggy: sand, Atlantic breeze and views of the cruise ships arriving in the bay. A calmer route, perfect for couples and families.',
    tags: ['Beach', 'Views', 'Coast'],
    priceUnit: DOUBLE_BUGGY,
    note: LOCAL_NOTE,
    includes: ['Double 4x4 buggy', ...RIDE_INCLUDES, 'Beach stop'],
    bring: [...BRING_DEFAULT, 'Swimsuit'],
    highlights: ['Driving on the sand', 'Cruise ship views', 'Photo stop', 'Swim at the beach'],
  },
  'four-wheel-4x4': {
    name: 'ATV 4x4',
    short: 'Your own ATV through water and hills.',
    description:
      'An ATV just for you. Climb mountain roads, cross the river and feel the speed on every turn. Perfect if you want to ride solo.',
    tags: ['ATV', 'Water', 'Adrenaline'],
    includes: ['ATV / quad', ...RIDE_INCLUDES],
    bring: BRING_DEFAULT,
    highlights: ['Single-rider ATV', 'River crossings', 'Mountain roads', 'Beach'],
  },
  'buggy-en-grupo': {
    name: 'Group & Family Buggies',
    short: 'Buggy convoy for friends and families.',
    description:
      'We organize buggy convoys for groups of friends, families, companies and celebrations. We plan the route around your group and the ages of the riders.',
    tags: ['Groups', 'Family', 'Convoy'],
    note: LOCAL_NOTE,
    includes: ['Buggies for the group', ...RIDE_INCLUDES, 'Custom route'],
    bring: BRING_DEFAULT,
    highlights: ['US$44 per person', '2 and 4 seat buggies', 'Great for celebrations', 'Group photos'],
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
