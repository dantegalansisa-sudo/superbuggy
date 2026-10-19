// Opiniones reales de Google (selección). Texto original en su idioma; los cortes en reseñas largas se marcan con «…».
// Resumen de Google: 4.3 / 5 con 183 opiniones. Para cambiar las que se muestran, edita esta lista.

export const REVIEW_SUMMARY = { rating: 4.3, count: 183 };

export type Review = { name: string; stars: number; when: string; lang: 'es' | 'en'; text: string };

export const REVIEWS: Review[] = [
  {
    name: 'Jessica Ivgi',
    stars: 5,
    when: 'Hace 2 meses',
    lang: 'en',
    text: "At first it didn't seem like much but then we went to great areas. Highly recommend.",
  },
  {
    name: 'Liza Tolentino',
    stars: 5,
    when: 'Hace 5 años',
    lang: 'es',
    text: 'Estuvimos de crucero la semana pasada y optamos por el tour en buggy y fue la mejor opción.El trato de todo el personal es super amable y profesional.Desde que nos recogieron en el puerto hasta q terminamos el gran tour en buggy.Nuestro guía fue super tanto,responsable, amable y muy profesional.Tuvimos una super aventura de adrenalina y luego nos llevo a la playa donde pudimos ordenar una comida sabrosa de mariscos y darnos un buen chapuzón para refrescarnos en esa playa hermosa y su agua divina.Los recomiendo un 100%.',
  },
  {
    name: 'Matt Froese',
    stars: 5,
    when: 'Hace 4 años',
    lang: 'en',
    text: "The buggies and atv's were in very good condition with appropriate suspension for the task. It had poured a couple of nights before our excursion so the trail was insanely muddy and had fairly deep water holes to travel through. It was incredibly awesome! The staff were very courteous and displayed a good amount of concern regarding our safety. … Prepare to getting outrageously wet and muddy. FANTASTIC EXPERIENCE!!!",
  },
  {
    name: 'Will s',
    stars: 5,
    when: 'Hace 2 años',
    lang: 'en',
    text: 'It was a whole lot of fun! Easy to drive and plenty of speed. For a buggy it was pretty comfortable too. … Wear old clothes. There is a shower to wash off when you get back. The final stop was a stream that you can rinse off in. Mid way you stop at a beach w a bar that had amazing pineapple coladas!',
  },
  {
    name: 'Leandro',
    stars: 5,
    when: 'Hace un año',
    lang: 'es',
    text: 'Super divertido. Van muy rápido y el trayecto es muy emocionante',
  },
  {
    name: 'Toniekia Poole',
    stars: 5,
    when: 'Hace 5 años',
    lang: 'en',
    text: "Unforgettable experience. Warm, friendly bi-lingual staff, mechinically sound, good running atv's. Highly recommend for a memorable tour.",
  },
  {
    name: 'Marquetta Whalbring',
    stars: 5,
    when: 'Hace 4 años',
    lang: 'en',
    text: "We did individual ATVs for 10 people and it was awesome! … The 4 guys doing the ATV tour, we're excellent and made us feel safe while having a blast!! Everyone in our group loved it! It is dusty with no rain and muddy with rain so dress appropriately and be prepared to have FUN!",
  },
  {
    name: 'nashally santiago',
    stars: 5,
    when: 'Hace un año',
    lang: 'es',
    text: 'Super bueno, visitas una playa y un rio. Tienen fotografo por un costo adicional.',
  },
  {
    name: 'Americanexpatindr',
    stars: 5,
    when: 'Hace 5 años',
    lang: 'en',
    text: "Ride was longer than expected which was great. I definitely got my money' s worth. The staff was alert, engaged and exhibited great command and control. … Even the rest stop was better than expected. … I will be doing this activity again from time to time because it was a blast.",
  },
  {
    name: 'Juan Miguel',
    stars: 5,
    when: 'Hace 4 años',
    lang: 'es',
    text: 'Una experiencia increíble, es seguro mientras no hagas locuras y es muy divertido',
  },
  {
    name: 'Ivanka Dashko',
    stars: 5,
    when: 'Hace 3 años',
    lang: 'en',
    text: 'I don’t know where to start. This place deserve more than 5 stars. The owner is awesome guy. I have group of 40 people. We have 20 Atv and 12 buggies. Night before I asker him to add one more 4 seat buggies. And with no question he did it. … Will always recommend him for everyone. Good luck guys. God bless you!',
  },
  {
    name: 'Enrique Villafuerte',
    stars: 5,
    when: 'Hace 5 años',
    lang: 'en',
    text: 'It was amazing, everything was awesome, the beach was beautiful and clear, the river was crystal clear. And the best adventure overall. I reccomend it a lot if you want an adventure check out SUPER BUGGY.',
  },
  {
    name: 'Raul Antonio Lantigua',
    stars: 5,
    when: 'Hace 7 años',
    lang: 'es',
    text: 'Exellente servicio buenas maquinas el recorrido muy interesante!!!!! Viva esa experiencia....',
  },
  {
    name: 'AJ Montana',
    stars: 5,
    when: 'Hace 2 años',
    lang: 'en',
    text: 'Great hosts. Soo much fun. U get dirty. Cover your hair. Try the piña colada at the beach stop. It was amazing. … Overall great experience',
  },
  {
    name: 'Daniel Dell',
    stars: 5,
    when: 'Hace 6 años',
    lang: 'en',
    text: 'It was awesome..make sure u wear old clothes n prepare to get wet n muddy up...staff were mad cool...def coming back next year',
  },
  {
    name: 'Broly R.',
    stars: 5,
    when: 'Hace 3 años',
    lang: 'en',
    text: "Best activity we did on our trip. Buy the pictures they snap of you! … Enjoy your riding and buy the pictures. It's worth the money and they'll get way better pictures than you would have anyway 😉",
  },
];

// Para videos de clientes: agrega aquí cada video (archivo en public/videos y una imagen de portada).
// Mientras la lista esté vacía, la sección no se muestra en la web.
export type CustomerVideo = { src: string; poster?: string; name: string; caption?: string };
export const CUSTOMER_VIDEOS: CustomerVideo[] = [];
