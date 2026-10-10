const IMAGE_BASE = "/images";

const blogs = [
  {
    id: 1,
    author: "Nafis",
    blog_title: "A Quiet Film That Stayed With Me Long After the Credits",
    slug: "a-quiet-film-that-stayed-with-me",
    blog_content:
      "I went into the theatre expecting a slow evening and walked out thinking about it for days. The story is simple: two estranged brothers drive across the country to scatter their father's ashes. Nothing explosive happens, and that is exactly the point.\n\n" +
      "What works is the restraint. Long silences carry more weight than the dialogue, and the cinematography lets wide, empty landscapes say what the characters can't. The soundtrack is mostly a single piano theme that returns at just the right moments.\n\n" +
      "It isn't perfect. The middle act drags, and one subplot about a stolen wallet goes nowhere. But the final ten minutes earn every slow scene before them. If you like character-driven stories, give it a watch. My rating: 8/10.",
    blog_image: `${IMAGE_BASE}/01-movie-review.png`,
    publish_date: "2026-01-12T18:30:00+06:00",
    update_date: "2026-01-13T09:15:00+06:00",
    comment: [
      {
        id: 1,
        name: "Rafi",
        text: "Added it to my watchlist. The road-trip setup sounds great.",
        date: "2026-01-12T21:04:00+06:00",
      },
      {
        id: 2,
        name: "Tasnia",
        text: "Agree about the middle part, but that ending though!",
        date: "2026-01-13T10:22:00+06:00",
      },
    ],
    likes: 42,
  },
  {
    id: 2,
    author: "Nafis",
    blog_title: "Why I Started Journaling Again (and How I Keep It Going)",
    slug: "why-i-started-journaling-again",
    blog_content:
      "I tried journaling a dozen times and quit every time within a week. The problem was pressure: I thought every entry had to be long and meaningful. This year I lowered the bar to three lines a day, and it finally stuck.\n\n" +
      "My routine is simple. Every night, with a cup of tea, I write one thing that happened, one thing I felt, and one thing I want to do tomorrow. Some nights it's thirty seconds. Some nights it turns into two pages.\n\n" +
      "Looking back over a few months of entries has been surprisingly useful. Patterns show up — what drains me, what gives me energy, which worries never actually came true. If you've given up on journaling before, try making it smaller, not bigger.",
    blog_image: `${IMAGE_BASE}/02-journal.png`,
    publish_date: "2026-02-03T21:00:00+06:00",
    update_date: "2026-02-03T21:00:00+06:00",
    comment: [
      {
        id: 1,
        name: "Mehedi",
        text: "The three-line rule is genius. Trying it tonight.",
        date: "2026-02-04T08:41:00+06:00",
      },
    ],
    likes: 67,
  },
  {
    id: 3,
    author: "Nafis",
    blog_title: "Three Days in the Hills: Notes From a Slow Trip",
    slug: "three-days-in-the-hills",
    blog_content:
      "This trip had no itinerary, and that was the best decision I made. We took the early bus, checked into a small guesthouse, and spent three days doing whatever felt right.\n\n" +
      "Day one was all walking — narrow roads, tea stalls every few kilometres, and clouds rolling over the ridges by late afternoon. On day two we hiked up to a viewpoint before sunrise. The climb was harder than expected, but watching the valley light up made it worth every step.\n\n" +
      "Day three was for doing nothing: reading on the balcony, chatting with the guesthouse owner, eating far too much. A few practical tips: carry cash, pack a light jacket even in warm months, and don't over-plan. The hills reward people who slow down.",
    blog_image: `${IMAGE_BASE}/03-travel-visit.png`,
    publish_date: "2026-03-15T10:00:00+06:00",
    update_date: "2026-03-17T14:30:00+06:00",
    comment: [
      {
        id: 1,
        name: "Sadia",
        text: "Which guesthouse was it? Planning a trip next month.",
        date: "2026-03-15T13:12:00+06:00",
      },
      {
        id: 2,
        name: "Nafis",
        text: "Sent you the details on messenger!",
        date: "2026-03-15T15:47:00+06:00",
      },
      {
        id: 3,
        name: "Arif",
        text: "Sunrise hikes are always worth it.",
        date: "2026-03-16T07:05:00+06:00",
      },
    ],
    likes: 88,
  },
  {
    id: 4,
    author: "Nafis",
    blog_title: "Hunting for the City's Best Burger: The New Spot Downtown",
    slug: "new-burger-spot-downtown-review",
    blog_content:
      "A new burger place opened near my old office, and after weeks of seeing it on my feed I finally went. Verdict: mostly worth the hype.\n\n" +
      "I ordered the classic beef burger with cheese and a side of fries. The patty was juicy and properly seasoned, and the bun was soft without falling apart — a rare combination. The house sauce is tangy with a little heat, and I'd go back just for that.\n\n" +
      "The fries were the weak point: under-salted and a bit soggy by the time they arrived. Service was friendly but slow during the lunch rush. Price is fair for the portion. Taste 8.5/10, value 7.5/10, ambience 7/10. Go on a weekday evening to skip the queue.",
    blog_image: `${IMAGE_BASE}/04-food-review.png`,
    publish_date: "2026-04-06T19:45:00+06:00",
    update_date: "2026-04-06T19:45:00+06:00",
    comment: [
      {
        id: 1,
        name: "Imran",
        text: "Totally agree about the fries. The burger is solid though.",
        date: "2026-04-06T22:30:00+06:00",
      },
      {
        id: 2,
        name: "Nusrat",
        text: "Did you try the chicken one? Curious how it compares.",
        date: "2026-04-07T11:18:00+06:00",
      },
    ],
    likes: 54,
  },
  {
    id: 5,
    author: "Nafis",
    blog_title: "Small Café, Big Comfort: My New Favourite Work Spot",
    slug: "small-cafe-favourite-work-spot",
    blog_content:
      "Since I left my job, I've been looking for a place outside home to think and work. After trying half a dozen cafés, I found one that checks every box: good coffee, a quiet corner, decent Wi-Fi, and nobody rushing you out.\n\n" +
      "The latte is smooth and not too sweet, and the butter croissant is flaky enough to leave crumbs everywhere. There's a window table with soft morning light that I now claim almost every day.\n\n" +
      "What I love most is the pace. People read, sketch, or just sit. It's a reminder that a few hours in a calm space can do more for focus than any productivity app.",
    blog_image: `${IMAGE_BASE}/05-cafe-moments.png`,
    publish_date: "2026-05-02T09:30:00+06:00",
    update_date: "2026-05-04T16:00:00+06:00",
    comment: [],
    likes: 31,
  },
  {
    id: 6,
    author: "Nafis",
    blog_title: "The Book That Changed How I Think About Habits",
    slug: "book-that-changed-how-i-think-about-habits",
    blog_content:
      "I picked up this book on habits expecting the usual self-help advice. Instead, I found a practical framework that I've actually been using for three months.\n\n" +
      "The core idea is that small, consistent changes compound over time, and that systems matter more than goals. Rather than aiming to 'read more', you design your environment so reading is the easiest option — a book on your pillow, the phone in another room.\n\n" +
      "Some chapters repeat themselves, and a few examples feel stretched. Still, it's one of the few non-fiction books I've finished and then immediately applied. Recommended if you want a clear, actionable read. My rating: 4/5.",
    blog_image: `${IMAGE_BASE}/06-book-review.png`,
    publish_date: "2026-05-28T20:15:00+06:00",
    update_date: "2026-05-28T20:15:00+06:00",
    comment: [
      {
        id: 1,
        name: "Farhan",
        text: "The 'environment design' part helped me a lot too.",
        date: "2026-05-29T08:00:00+06:00",
      },
    ],
    likes: 73,
  },
  {
    id: 7,
    author: "Nafis",
    blog_title: "A Weekend by the Sea: Sunsets, Seafood and Sand Everywhere",
    slug: "weekend-by-the-sea",
    blog_content:
      "Some weekends you just need the sea. We left on Friday night and arrived in time to watch the sunrise over the water — tired, but instantly glad we came.\n\n" +
      "Most of the trip was spent doing very little: long walks along the shore, naps under a beach umbrella, and fresh fried fish from a small stall run by a family who have been there for twenty years.\n\n" +
      "The sunset on Saturday was the highlight — the whole sky went orange and pink for almost half an hour. Tips: go off-season if you can, bring sunscreen (I forgot), and leave your laptop at home.",
    blog_image: `${IMAGE_BASE}/07-beach-getaway.png`,
    publish_date: "2026-06-20T17:00:00+06:00",
    update_date: "2026-06-21T10:40:00+06:00",
    comment: [
      {
        id: 1,
        name: "Rumana",
        text: "Those sunsets are unreal. Jealous!",
        date: "2026-06-20T19:25:00+06:00",
      },
      {
        id: 2,
        name: "Tanvir",
        text: "Forgetting sunscreen is a beach rite of passage 😄",
        date: "2026-06-21T12:02:00+06:00",
      },
    ],
    likes: 96,
  },
  {
    id: 8,
    author: "Nafis",
    blog_title: "Walking the City at Night",
    slug: "walking-the-city-at-night",
    blog_content:
      "There's a different city that shows up after 10 p.m. The traffic thins, the shop shutters come down, and the streets finally have room to breathe.\n\n" +
      "Lately I've been taking late walks to clear my head. I've noticed things I never saw in daylight: the tea seller who plays old songs on a tiny radio, the lit-up windows of tall buildings that look like a puzzle, the rhythm of rickshaw bells fading into the distance.\n\n" +
      "Night walks have become my way of resetting after a long day of coding. No headphones, no destination — just the city and my thoughts. Stay on well-lit roads and walk with a friend if you can.",
    blog_image: `${IMAGE_BASE}/08-city-nights.png`,
    publish_date: "2026-07-14T23:10:00+06:00",
    update_date: "2026-07-14T23:10:00+06:00",
    comment: [
      {
        id: 1,
        name: "Adnan",
        text: "Beautifully written. Night walks hit different.",
        date: "2026-07-15T09:33:00+06:00",
      },
    ],
    likes: 49,
  },
  {
    id: 9,
    author: "Nafis",
    blog_title: "My Playlist for Deep Focus (and Why Old Records Work Best)",
    slug: "playlist-for-deep-focus",
    blog_content:
      "I can't code in silence, but lyrics break my concentration. Over the years I've built a focus playlist that keeps me in the zone for hours.\n\n" +
      "It's mostly instrumental: lo-fi beats, slow jazz, ambient electronic, and a few classical pieces. Recently I've been drawn to older recordings — the slight crackle of vinyl adds a warmth that makes long sessions feel less mechanical.\n\n" +
      "A few rules I follow: keep the tempo steady, avoid songs with big surprises, and use the same playlist so my brain links it with work. Within a few minutes of pressing play, I'm usually locked in.",
    blog_image: `${IMAGE_BASE}/09-music-mood.png`,
    publish_date: "2026-08-09T15:20:00+06:00",
    update_date: "2026-08-11T18:05:00+06:00",
    comment: [
      {
        id: 1,
        name: "Shuvo",
        text: "Please share the playlist link!",
        date: "2026-08-09T16:47:00+06:00",
      },
      {
        id: 2,
        name: "Lamia",
        text: "Same playlist every day is such a good trick.",
        date: "2026-08-10T10:10:00+06:00",
      },
    ],
    likes: 61,
  },
  {
    id: 10,
    author: "Nafis",
    blog_title: "An Autumn Walk and a Few Thoughts on Change",
    slug: "autumn-walk-thoughts-on-change",
    blog_content:
      "This year has been full of change — leaving a job, planning a master's abroad, rethinking what I want from work. On a cool afternoon last week I went for a long walk, and the trees seemed to have something to say about it.\n\n" +
      "Every leaf turning orange and drifting down is a small ending, but nobody looks at autumn and calls it a failure. It's just a season, a step before something new grows.\n\n" +
      "I came home with muddy shoes and a clearer head. Change is uncomfortable, but it's also how things get room to grow. If you're in a season of transition too, take a walk. It helps more than you'd think.",
    blog_image: `${IMAGE_BASE}/10-nature-walk.png`,
    publish_date: "2026-10-05T16:45:00+06:00",
    update_date: "2026-10-05T16:45:00+06:00",
    comment: [
      {
        id: 1,
        name: "Nabila",
        text: "Needed to read this today. Thank you.",
        date: "2026-10-05T20:12:00+06:00",
      },
      {
        id: 2,
        name: "Rafi",
        text: "All the best with the master's plans!",
        date: "2026-10-06T08:54:00+06:00",
      },
    ],
    likes: 112,
  },
];

export default blogs;
