export type MemoryPhoto = {
  src: string
  alt: string
  caption: string
  date?: string
}

export type FunnyMoment = {
  title: string
  detail: string
}

export type LoveReason = {
  title: string
  message: string
}

export type PromiseCard = {
  title: string
  message: string
}

export type SurpriseNote = {
  title: string
  message: string
}

export type StarWish = {
  title: string
  wish: string
}

export type Award = {
  title: string
  description: string
}

export type OpenWhenNote = {
  category: string
  message: string
}

export type QuizQuestion = {
  question: string
  options: string[]
  feedback: string
}

export type StoryChapter = {
  title: string
  era: string
  paragraphs: string[]
  photo?: {
    src: string
    alt: string
  }
}

export const birthdayContent = {
  recipientName: 'Nanna',
  introMessages: [
    'Some people make life beautiful…',
    'And then there is the person who makes my world feel like home.',
    'For my Nanna, with all my love. ❤️',
  ],
  hero: {
    title: 'Happy Birthday, Nanna ❤️',
    subheading:
      'Today, the world celebrates you. And I get to celebrate the person who makes my world a little more beautiful.',
    supportingLine: 'My favourite person. My favourite memories. My favourite love story.',
  },
  loveLetter: `My dearest Nanna,

Happy Birthday, my love.

If I could give you one gift today, I would want you to see yourself through my eyes for just a moment. Maybe then you would understand how special you are to me and how much happiness your presence brings into my life.

I love the big moments we share, but I think I love the little ones just as much. The ordinary conversations, the laughter, the silly moments, the comfort of being ourselves, and the memories that may seem small to the world but mean so much to me.

You make so many things in life feel more meaningful simply by being part of them.

I hope this new year brings you good health, peace, exciting opportunities, success in your dreams, and countless reasons to smile.

I hope you always feel appreciated for who you are, not just for what you do for others.

I cannot promise that every day will be perfect. But I hope we keep finding reasons to laugh, listen, understand each other, and make beautiful memories through every season of life.

Thank you for being the person you are.

Today is your birthday, but celebrating you is something my heart wants to do in a thousand little ways.

Happy Birthday, my Nanna.

You mean more to me than this little letter can ever explain.

With all my love,
Your person, always. ❤️`,
  memoryPhotos: [
    {
      src: '/images/memories/memory-01.jpeg',
      alt: 'The two of us sitting close together among green plants',
      caption: 'A little moment together in our own green corner.',
    },
    {
      src: '/images/memories/memory-02.jpeg',
      alt: 'The two of us smiling together outdoors',
      caption: 'A bright day, a favourite smile, and us.',
    },
    {
      src: '/images/memories/memory-03.jpeg',
      alt: 'The two of us looking at one another in traditional outfits',
      caption: 'One of those looks that says everything.',
    },
    {
      src: '/images/memories/memory-04.jpeg',
      alt: 'The two of us walking together beneath leafy trees',
      caption: 'Side by side, wherever the path takes us.',
    },
    {
      src: '/images/memories/memory-05.jpeg',
      alt: 'A tender moment together beneath a leafy tree',
      caption: 'A little tenderness, tucked into an ordinary day.',
    },
    {
      src: '/images/memories/memory-06.jpeg',
      alt: 'The two of us sharing a playful moment together',
      caption: 'A moment that feels unmistakably ours.',
    },
    {
      src: '/images/memories/memory-07.jpeg',
      alt: 'The two of us together by the sea',
      caption: 'A little seaside chapter to keep close.',
    },
    {
      src: '/images/memories/memory-08.jpeg',
      alt: 'The two of us standing together beneath the trees',
      caption: 'Finding our way through the day, together.',
    },
    {
      src: '/images/memories/memory-09.jpeg',
      alt: 'The two of us enjoying a day out together',
      caption: 'My favourite kind of day out: one with you.',
    },
    {
      src: '/images/memories/memory-10.jpeg',
      alt: 'The two of us standing together by the ocean',
      caption: 'A little fresh air and a lot to be grateful for.',
    },
    {
      src: '/images/memories/memory-11.jpeg',
      alt: 'The two of us sharing a playful moment outside',
      caption: 'A moment full of laughter and affection.',
    },
    {
      src: '/images/memories/memory-12.jpeg',
      alt: 'Our hands held together near the water',
      caption: 'The smallest details can hold the biggest feelings.',
    },
    {
      src: '/images/memories/memory-13.jpeg',
      alt: 'The two of us together on a special day',
      caption: 'A memory I am so glad we made together.',
    },
    {
      src: '/images/memories/memory-14.jpeg',
      alt: 'The two of us standing together among plants',
      caption: 'Just being beside you is one of my favourite places.',
    },
    {
      src: '/images/memories/memory-15.jpeg',
      alt: 'The two of us standing close together outdoors',
      caption: 'A favourite frame from a day spent together.',
    },
    {
      src: '/images/memories/memory-16.jpeg',
      alt: 'The two of us holding hands and smiling at each other',
      caption: 'A little hand to hold, a whole lot of love.',
    },
  ] as MemoryPhoto[],
  favouriteMemoryRef: '/images/memories/memory-01.jpeg',
  ourStory: {
    title: 'The story that began in a classroom',
    opening: 'Some love stories begin with fireworks. Ours began quietly… in a classroom.',
    chapters: [
      {
        era: '4th–10th class',
        title: 'The same classroom, the same corridors',
        paragraphs: [
          'We were just kids when we first met — from 4th class to 10th at Ravindra Bharathi School. Back then, we didn’t know that the person sitting in the same classroom, walking the same corridors, sharing the same school memories would one day become the most important person in our lives.',
          'But somewhere in those innocent years, my heart chose you.',
          'I still don’t know how or when it happened. There was no big moment. No dramatic confession. Just a feeling — pure, simple, and certain. My heart knew before my mind understood, and one day, I gathered all my courage and proposed to you.',
        ],
        photo: {
          src: '/images/memories/memory-02.jpeg',
          alt: 'A recent photo of us together outdoors, a memory from our story.',
        },
      },
      {
        era: 'A brave little beginning',
        title: 'The first “no”… and the yes that changed everything',
        paragraphs: [
          'You rejected me.',
          'That moment hurt more than I can explain… but even then, my heart didn’t change. Because when love is real, it doesn’t disappear with one “no.”',
          'And then… you came back. You accepted me.',
          'That day changed everything. From that moment on, life became a journey — not just mine, not just yours — but ours.',
        ],
      },
      {
        era: 'Growing up together',
        title: 'Best friends, in our own little world',
        paragraphs: [
          'We grew up together. We laughed endlessly. We fought over silly things. We made up like nothing ever happened. We shared secrets, dreams, fears, and countless funny moments that only we understand.',
          'You became my best friend. My safe place. My priority. My world.',
        ],
        photo: {
          src: '/images/memories/memory-06.jpeg',
          alt: 'A playful, affectionate moment we shared outdoors.',
        },
      },
      {
        era: 'After 10th · Inter and B.Tech',
        title: 'Love, across the distance',
        paragraphs: [
          'Then life tested us.',
          'After 10th, our paths separated. Inter and B.Tech took us in different directions. We entered a long-distance relationship — and that phase taught us what true love really means.',
          'No daily meetings. No casual walks. No random hangouts.',
          'Only trust. Only patience. Only commitment.',
          'And we survived it. Not just survived — we grew stronger.',
          'Every call mattered. Every message felt special. Every “I miss you” came from the deepest part of our hearts.',
          'Distance didn’t reduce our love. It proved it.',
        ],
        photo: {
          src: '/images/memories/memory-12.jpeg',
          alt: 'A close-up of our hands held together.',
        },
      },
      {
        era: 'A new chapter in Hyderabad',
        title: 'Finding our way back to each other',
        paragraphs: [
          'And then life surprised us again.',
          'I got an opportunity for a job in Hyderabad — the same city where you were already building your life. When I moved to Hyderabad, it felt like destiny was finally aligning everything for us.',
          'And when we met again, it was like falling in love all over again.',
          'Stronger. Deeper. More mature.',
          'Weekend outings in Hyderabad. Long conversations. Random food dates. Walking together. Laughing about our school days. Planning our future.',
          'Every moment with you feels like home.',
        ],
        photo: {
          src: '/images/memories/memory-09.jpeg',
          alt: 'The two of us sharing a day out together.',
        },
      },
      {
        era: 'After 13 years · Always choosing you',
        title: 'Our forever story',
        paragraphs: [
          'After 13 years, my heart still chooses you. Every single day.',
          'You are not just my boyfriend. You are my partner in growth. You are my comfort in chaos. You are the person who understands my silence. You are the reason behind my smile.',
          'Without you, I feel incomplete. With you, I feel unstoppable.',
          'We’ve seen childhood, teenage years, college struggles, career beginnings — and we are still standing together.',
          'That is not luck. That is love.',
          'I don’t want this to be just a beautiful love story. I want it to be our forever story.',
          'If you are ready… Let’s start our married life together. Let’s build our own little world. Let’s grow as king and queen of our kingdom. Let’s build a life filled with respect, laughter, understanding, and unconditional love.',
          'After 13 years… I don’t just love you. I choose you. Again and again. For life. Forever yours ❤️',
        ],
        photo: {
          src: '/images/memories/memory-16.jpeg',
          alt: 'The two of us holding hands and smiling at each other.',
        },
      },
    ] as StoryChapter[],
  },
  funnyMoments: [
    { title: 'Our most unnecessary little arguments.', detail: 'A tiny disagreement, a dramatic pause, and then both of us laughing at ourselves before we can even finish the sentence.' },
    { title: 'The moments when we cannot stop laughing.', detail: 'The kind that make us forget what we were doing and just enjoy the ridiculous happiness of the moment.' },
    { title: 'Things you do that make me roll my eyes… and smile anyway.', detail: 'The sweet little habits that are somehow impossible to resist and impossible to forget.' },
    { title: 'Our conversations that make absolutely no sense to anyone else.', detail: 'The only kind of conversations worth having, because they make us feel like we are in our own little world.' },
    { title: 'The cute little habits that are so unmistakably you.', detail: 'Small things that say a lot about the warmth and comfort you bring into my life.' },
    { title: 'Our own little world, with our own little rules.', detail: 'The kind of love that feels natural, easy, and completely ours.' },
  ] as FunnyMoment[],
  reasons: [
    { title: 'Your smile', message: 'Your smile has a way of making an ordinary day feel better.' },
    { title: 'The little moments', message: 'You make the little moments worth remembering.' },
    { title: 'Your authenticity', message: 'I love the person you are when you are simply being yourself.' },
    { title: 'Your laughter', message: 'You can make me laugh even when I pretend I am not amused.' },
    { title: 'Our world', message: 'I love that we can have our own little world.' },
    { title: 'The memories', message: 'You make so many memories feel special.' },
    { title: 'The discovery', message: 'I love discovering new things about you.' },
    { title: 'The support', message: 'You are someone I want to keep cheering for.' },
    { title: 'The simplicity', message: 'I love sharing the simplest things with you.' },
    { title: 'The joy', message: 'You give me so many reasons to smile.' },
    { title: 'The future', message: 'I look forward to the memories we have yet to make.' },
    { title: 'My heart', message: 'Because, Nanna, my heart has a reason that words cannot fully explain.' },
  ] as LoveReason[],
  secretMessage: `If life gave me a thousand different paths, I would still be grateful for the path that brought you into my world.

I hope we keep making each other laugh over the smallest things, supporting each other's dreams, and finding comfort in being ourselves together.

I hope we keep celebrating the big achievements and the little victories, too.

And when life gets busy, I hope we never forget to make time for the people and moments that matter most.

You deserve happiness, kindness, and all the beautiful things you work so hard for.

Happy Birthday, Nanna.

Today, tomorrow, and through all the chapters still waiting for us, I hope you always feel how special you are to me. ❤️`,
  futurePromises: [
    { title: 'More reasons to laugh together.', message: 'More times to smile at the same silly thing and feel like the whole world slows down for a moment.' },
    { title: 'More little adventures.', message: 'More places to explore, stories to tell, and new memories to tuck into our everyday life.' },
    { title: 'More dreams to cheer each other toward.', message: 'More encouragement, more quiet pride, and more belief in the beautiful things we are building.' },
    { title: 'More beautiful ordinary days.', message: 'More gentle moments, more ease, and more comfort in simply being together.' },
  ] as PromiseCard[],
  secretDoor: [
    { title: 'A little thing I adore about you', message: 'It is the way being near you can make an ordinary moment feel like the right place to be.' },
    { title: 'A secret from my heart', message: 'Even on the busiest days, there is always a little part of my heart quietly cheering for you.' },
    { title: 'Something that always makes me smile', message: 'Remembering that the simplest, most ordinary moments are often the ones I treasure most.' },
    { title: 'One more reason you are special to me', message: 'You are wonderfully yourself, and I feel lucky to share this life and all its little chapters with you.' },
  ] as SurpriseNote[],
  starWishes: [
    { title: 'Happiness', wish: 'May happiness find its way into the little moments and the big ones, too.' },
    { title: 'Health', wish: 'May the year ahead bring you good health, strength, and gentle days.' },
    { title: 'Success', wish: 'May your hard work open doors to the success and fulfilment you deserve.' },
    { title: 'Peace', wish: 'May you find room to breathe, rest, and feel at peace with where you are.' },
    { title: 'New opportunities', wish: 'May new possibilities meet you at just the right moment.' },
    { title: 'Beautiful memories', wish: 'May this next chapter make space for beautiful memories we will share.' },
  ] as StarWish[],
  awards: [
    { title: 'Best Smile in My Universe', description: 'For being the person whose smile deserves its very own standing ovation.' },
    { title: 'Chief Happiness Officer', description: 'For making the everyday feel brighter, just by being part of it.' },
    { title: 'My Favourite Person Award', description: 'A highly competitive category with one very clear winner: you.' },
    { title: 'Lifetime Achievement in Stealing My Heart', description: 'For a truly remarkable and ongoing contribution to my favourite love story.' },
    { title: 'The One and Only Nanna Award', description: 'For being entirely, irreplaceably, and perfectly yourself.' },
  ] as Award[],
  openWhenNotes: [
    { category: 'Open when you miss me', message: 'Take a slow breath and remember: wherever our day takes us, you are always close to my heart. I am sending you the warmest little hug.' },
    { category: 'Open when you need a smile', message: 'Here is your reminder that you are loved, appreciated, and very much allowed to laugh at something silly today.' },
    { category: 'Open when you have had a difficult day', message: 'You do not have to solve everything at once. Rest for a moment, be kind to yourself, and remember I am always in your corner.' },
    { category: 'Open when you want to feel loved', message: 'You are loved for who you are, in the grand moments and the quiet, ordinary ones. Nothing more is required.' },
    { category: 'Open when you need encouragement', message: 'I believe in you and in the patience and effort you bring to what matters. One small step at a time is still forward.' },
    { category: 'Open when you want to remember how special you are to me', message: 'There is only one you, and my life is sweeter, warmer, and more meaningful because I get to share it with you.' },
  ] as OpenWhenNote[],
  treasureHunt: {
    clues: [
      'Clue one: a sealed surprise has been opened.',
      'Clue two: the night sky has shared its wishes.',
      'Clue three: you have explored the awards made just for you.',
    ],
    finalMessage: 'The best treasure was never hidden: it is getting to love you, Nanna. Happy Birthday, my favourite person. ❤️',
  },
  bucketList: [
    'Explore a new place together.',
    'Try a new food.',
    'Celebrate more birthdays together.',
    'Have a little adventure.',
    'Watch a beautiful sunset.',
    'Create a new favourite memory.',
  ],
  relationshipQuiz: [
    {
      question: 'Which kind of moment would I most love to keep?',
      options: ['A grand occasion', 'A little everyday moment together', 'A perfectly planned surprise'],
      feedback: 'For me, even the simplest moments become special when they are shared with you.',
    },
    {
      question: 'What kind of day would make me smile?',
      options: ['A day with a little laughter', 'A quiet and peaceful day', 'A day full of new possibilities'],
      feedback: 'There is something lovely in every one of those, especially when we get to share them.',
    },
    {
      question: 'Which little adventure sounds lovely to share?',
      options: ['Explore somewhere new', 'Find a beautiful sunset', 'Make an ordinary day feel special'],
      feedback: 'The place matters less than having you beside me for it.',
    },
    {
      question: 'What is one of my favourite things about us?',
      options: ['The way we can be ourselves', 'The memories we keep making', 'The laughter along the way'],
      feedback: 'All of those make our little world feel like ours.',
    },
    {
      question: 'Which birthday wish would I make for you?',
      options: ['Health and peace', 'Happiness and new opportunities', 'Beautiful memories and reasons to smile'],
      feedback: 'I hope this new year brings you all of these and so much more.',
    },
  ] as QuizQuestion[],
  quizFinalMessage: 'There is no answer key to us. I love discovering what matters to you, and I hope we keep learning each other in all the chapters ahead. ❤️',
  keepsake: {
    title: 'A birthday keepsake',
    message: 'May this new year bring you good health, peaceful days, new opportunities, and more happiness than you imagined. Thank you for being exactly you. I am so grateful to share this life and all its chapters with you.',
  },
  birthdayWish: {
    main: 'Okay, birthday boy… this moment is yours. 🎂',
    support: 'Close your eyes, make a wish, and save a little happiness for yourself.',
    afterBlowOut:
      'May life surprise you with beautiful opportunities, good health, peaceful days, and more happiness than you imagined.',
    closing: 'And may you always know how loved you are, Nanna. ❤️',
  },
  finalMessage: {
    opening: 'Of all the beautiful things life could give me…',
    middle: '…getting to love you is one of my favourites.',
    title: 'HAPPY BIRTHDAY, MY NANNA ❤️',
    paragraph: 'Today is your special day. But the happiness of having you in my life is a gift I get to appreciate every day.',
    closing: 'Here’s to your dreams, your happiness, your beautiful future, and all the memories waiting for us.',
    signature: 'With all my love,\nYour person, always. ❤️',
  },
  signature: 'With all my love,\nYour person, always. ❤️',
  audioPath: '',
  // Replace this value with a local file inside public/audio/ if you want music on the page.
  // Example: '/audio/our-song.mp3'
} as const
