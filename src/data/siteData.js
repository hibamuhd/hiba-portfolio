// src/data/siteData.js
// Everything the homepage and site chrome display lives here, so copy can be edited
// without touching components. Text marked "from the original site" was captured from
// your Emergent page; lines marked "written from résumé" were composed from your résumé
// because the original text for those tabs was not recoverable. Edit freely.

export const site = {
  name: "Hiba Muhammed",
  wordmark: "HIBA",
  status: "Open to Product & Growth Roles",          // from the original site
  email: "hiba.muhd14@gmail.com",                    // from the original site footer
  linkedin: "https://www.linkedin.com/in/hiba-muhammed-2a040a292/", // from the original site footer
  github: "https://github.com/hibamuhd",             // from the original site footer
  resume: "/Hiba_Muhammed_Resume.pdf",               // ADD this file to /public
  portrait: "/images/profile_hiba_muhammed.jpg",
};

// match: "exact" | "prefix" decides which item gets the active underline
export const navItems = [
  { label: "Home", href: "/", match: "exact" },
  { label: "Projects", href: "/projects", match: "prefix" },
  { label: "Milestones", href: "/#milestones" },
  { label: "Beyond Work", href: "/beyond-work", match: "prefix" },
];

export const intro =
  "I\u2019m an Electrical Engineering student at IIT Hyderabad, curious about how technology works and how people interact with it. I enjoy solving problems across both worlds, from building technical systems to understanding users, identifying opportunities and shaping better products."; // from the original site

export const heroFacts = [
  { title: "Electrical Engineering + Entrepreneurship", detail: "B.Tech, IIT Hyderabad \u00b7 2027" },
  { title: "Product Management Intern", detail: "Country Delight \u00b7 May\u2013Jul 2026" },
  { title: "Semiconductor & Hardware Enthusiast", detail: "Texas Instruments WiSH \u00b7 2025" },
];

// Interest explorer. Tab labels + the first line are from the original site;
// the other three lines and all the small tags are written from your résumé / projects.
export const domains = [
  {
    id: "product", label: "Product & Growth", accent: "#A76D5E",
    tags: ["PRDs & wireframes", "A/B testing", "Funnel analysis", "MoEngage"],
    text: "Understanding users, finding opportunities and shaping product experiences.",
    cta: { label: "See case studies", href: "/projects" },
  },
  {
    id: "hardware", label: "Engineering & Hardware", accent: "#98A086",
    tags: ["Verilog", "LTSpice", "C"],
    text: "Exploring computing from the ground up, from semiconductor devices and circuit design to digital architecture and RTL implementation.",
    cta: { label: "See hardware projects", href: "/projects" },
  },
  {
    id: "data", label: "Data & Analytics", accent: "#C4A071",
    tags: ["Python", "SQL", "Power BI", "Streamlit"],
    text: "Turning complex data into actionable decisions through analytics, AI, and intelligent problem-solving.",
    cta: { label: "See analytics work", href: "/projects" },
  },
  {
    id: "leadership", label: "Creative Leadership", accent: "#846044",
    tags: ["Student\u2019s Gymkhana", "Finance & Consulting Club", "Inter IIT"],
    text: "Bringing people and ideas together, building communities, and turning collective energy into meaningful action.",
    cta: { label: "See milestones", href: "/#milestones" },
  },
];

// Milestones: copy from the original site (lightly trimmed to the first points).
export const milestones = [
  {
    id: "wish", n: "01", accent: "#98A086",
    tag: "Semiconductor & Hardware Mentorship",
    title: "Texas Instruments WiSH Programme",
    org: "WiSH 2025",
    caption: "Selected among top 143 women nationwide \u2014 Texas Instruments WiSH 2025",
    points: [
      "Selected among the top 143 women engineering students nationwide for the Texas Instruments Women in Semiconductor Hardware (WiSH) mentorship.",
      "Developed socially impactful hardware solutions under TI industry mentorship, engineering the RIPPLE rural flood detection early-warning system.",
    ],
    image: { src: "/images/milestones/ti_wish_cohort.png", w: 1600, h: 1067, alt: "Texas Instruments WiSH Programme", fit: "cover", pos: "50% 40%" },
  },
  {
    id: "gymkhana", n: "02", accent: "#A76D5E",
    tag: "Elected Campus Governance",
    title: "UG Representative, Student\u2019s Gymkhana",
    org: "IIT Hyderabad",
    caption: "Representation Begins with Participation \u2014 Gymkhana Elections \u201925",
    points: [
      "Elected by 2,000+ undergraduates as the primary student-administration liaison.",
      "Led 60+ class representatives to identify, consolidate, and prioritize recurring student issues for administrative resolution.",
      "Led end-to-end execution of an \u20b98 Lakh event for 1,600+ attendees, directing 15+ volunteers across theme development, decor, catering, logistics, and faculty coordination.",
    ],
    image: { src: "/images/milestones/gymkhana_poster.jpg", w: 899, h: 1599, alt: "Gymkhana Elections \u201925 campaign poster for UG Rep-II", fit: "contain", pos: "50% 50%" },
  },
  {
    id: "interiit", n: "03", accent: "#C4A071",
    tag: "Competitive Mixology & Culinary Arts",
    title: "Cup Captain & Top 5 Nationwide",
    org: "Inter IIT Cultural Meet 8.0",
    caption: "Presenting before Chef Jitendra & jury panel at Inter IIT Cultural Meet 8.0",
    points: [
      "Led IIT Hyderabad\u2019s culinary and mixology contingent as Cup Captain at Inter IIT Cultural Meet 8.0, securing a Top 5 position nationwide.",
      "Trained and led a team for the culinary arts event under tight deadlines, driving creative ideation and bringing innovative concepts to life through effective teamwork and execution.",
    ],
    image: { src: "/images/milestones/inter_iit_culinary_judging.png", w: 1600, h: 1068, alt: "Presenting to the jury panel at Inter IIT Cultural Meet 8.0", fit: "cover", pos: "60% 50%" },
  },
];

// Bookshelf. Shape: { id, title, author, rating (out of 10), review, cover, color, fg, w, h }
//  - rating / review are optional: a book without them opens a note with title + author only.
//  - cover is an optional image path (e.g. "/images/books/morrie.webp"); leave "" for none.
//  - color / fg / w / h style the spine (background, text colour, width, height in px).
export const books = [
  {
    "id": "tuesdays-with-morrie",
    "title": "Tuesdays with Morrie",
    "author": "Mitch Albom",
    "rating": 9.5,
    "review": "A gentle reminder that we often get so caught up in building a life that we forget to actually live it. What stayed with me was how simply the book explores love, relationships, death and the things that truly make life meaningful.",
    "cover": "",
    "color": "#713A46",
    "fg": "#F4EFEA",
    "w": 44,
    "h": 224
  },
  {
    "id": "girl-nobody",
    "title": "Girl Nobody",
    "author": "Tomek Tryzna",
    "rating": 7,
    "review": "A story that made me think about identity, being seen and the complicated ways people navigate the world around them. An interesting read, even if it didn't leave as lasting an impression as some of my favourites.",
    "cover": "",
    "color": "#5C6B54",
    "fg": "#F4EFEA",
    "w": 36,
    "h": 192
  },
  {
    "id": "the-forty-rules-of-love",
    "title": "The Forty Rules of Love",
    "author": "Elif Shafak",
    "rating": 7,
    "review": "A beautiful exploration of love, spirituality and the idea that transformation often begins from within. I enjoyed the philosophical reflections, although some parts felt more like lessons to absorb than a story to get lost in.",
    "cover": "",
    "color": "#C4A071",
    "fg": "#2D231E",
    "w": 48,
    "h": 240
  },
  {
    "id": "wuthering-heights",
    "title": "Wuthering Heights",
    "author": "Emily Brontë",
    "rating": 8,
    "review": "Messy, intense and far from a conventional love story. The book explores how obsession, resentment and unresolved emotions can shape generations. Definitely not an easy set of characters to like, but a fascinating one to understand.",
    "cover": "",
    "color": "#3E4A5E",
    "fg": "#F4EFEA",
    "w": 46,
    "h": 232
  },
  {
    "id": "animal-farm",
    "title": "Animal Farm",
    "author": "George Orwell",
    "rating": 8,
    "review": "A deceptively simple story with a much bigger message. What stood out to me was how easily ideals can be manipulated when power goes unchecked. A short read that leaves you thinking about politics, leadership and human behaviour.",
    "cover": "",
    "color": "#4A3A30",
    "fg": "#F4EFEA",
    "w": 40,
    "h": 200
  },
  {
    "id": "a-thousand-splendid-suns",
    "title": "A Thousand Splendid Suns",
    "author": "Khaled Hosseini",
    "rating": 9.5,
    "review": "One of those books that stays with you long after you finish it. Its portrayal of friendship, sacrifice, resilience and the strength of women is deeply moving. Heartbreaking, but incredibly powerful.",
    "cover": "",
    "color": "#9C5B3F",
    "fg": "#F4EFEA",
    "w": 50,
    "h": 248
  },
  {
    "id": "midnight-at-the-bright-ideas-bookstore",
    "title": "Midnight at the Bright Ideas Bookstore",
    "author": "Matthew Sullivan",
    "rating": 7,
    "review": "A mystery wrapped around books, memories and unexpected connections. I liked the atmosphere and the way the story gradually reveals its layers. A particularly enjoyable read for anyone who loves the idea of a bookstore holding more than just books.",
    "cover": "",
    "color": "#6E3B44",
    "fg": "#F4EFEA",
    "w": 48,
    "h": 228
  },
  {
    "id": "no-fixed-address",
    "title": "No Fixed Address",
    "author": "Susin Nielsen",
    "rating": 7,
    "review": "A thoughtful story that brings attention to homelessness and the uncertainty that comes with not having a place to call home. It reminded me that circumstances are often far more complicated than the assumptions we make about people.",
    "cover": "",
    "color": "#98A086",
    "fg": "#F4EFEA",
    "w": 38,
    "h": 196
  },
  {
    "id": "the-bell-jar",
    "title": "The Bell Jar",
    "author": "Sylvia Plath",
    "rating": 8.5,
    "review": "An intimate and unsettling look at identity, expectations and the pressure of trying to fit into a world that doesn't always make room for you. What stayed with me was its honesty and the way it captures thoughts that are often difficult to articulate.",
    "cover": "",
    "color": "#3E4A5E",
    "fg": "#F4EFEA",
    "w": 46,
    "h": 236
  },
  {
    "id": "kafka-on-the-shore",
    "title": "Kafka on the Shore",
    "author": "Haruki Murakami",
    "rating": 9,
    "review": "Strange, surreal and wonderfully unpredictable. I loved how it blurs the boundaries between reality, dreams and imagination. Not everything needs to be explained, and perhaps that's exactly what makes this book so memorable.",
    "cover": "",
    "color": "#4A3A30",
    "fg": "#F4EFEA",
    "w": 52,
    "h": 252
  },
  {
    "id": "the-stationery-shop-of-tehran",
    "title": "The Stationery Shop of Tehran",
    "author": "Marjan Kamali",
    "rating": 9,
    "review": "A beautiful yet heartbreaking story of love, missed opportunities and the way political circumstances can alter the course of ordinary lives. It made me think about timing, choices and all the things left unsaid.",
    "cover": "",
    "color": "#A76D5E",
    "fg": "#F4EFEA",
    "w": 44,
    "h": 230
  },
  {
    "id": "zebra-crossing",
    "title": "Zebra Crossing",
    "author": "Meg Vandermerwe",
    "rating": 8,
    "review": "A moving story about displacement, identity and the search for belonging. What stayed with me was its exploration of the human stories behind migration and the vulnerability of people forced to navigate unfamiliar worlds.",
    "cover": "",
    "color": "#7C7A4E",
    "fg": "#F4EFEA",
    "w": 38,
    "h": 194
  },
  {
    "id": "the-age-of-ai",
    "title": "The Age of AI",
    "author": "Henry Kissinger, Eric Schmidt & Daniel Huttenlocher",
    "rating": 8,
    "review": "A fascinating look at how artificial intelligence could reshape the way we live, work and understand the world. I particularly enjoyed how it moves beyond the technology itself to consider its implications for society, power and the future.",
    "cover": "",
    "color": "#5C6B54",
    "fg": "#F4EFEA",
    "w": 50,
    "h": 244
  },
  {
    "id": "it-s-not-about-the-burqa",
    "title": "It's Not About the Burqa",
    "author": "Mariam Khan",
    "rating": 8.5,
    "review": "A collection of perspectives that challenges assumptions and makes space for conversations that are often oversimplified. What I appreciated most was the range of voices and the reminder that no single narrative can represent an entire group of people.",
    "cover": "",
    "color": "#713A46",
    "fg": "#F4EFEA",
    "w": 46,
    "h": 234
  },
  {
    "id": "pyre",
    "title": "Pyre",
    "author": "Perumal Murugan",
    "cover": "",
    "review": "A tale that explores the uncomfortable reality of caste and mindset that still prevails in india",
    "color": "#846044",
    "fg": "#F4EFEA",
    "w": 44,
    "h": 220
  }
];

// Kitchen Journal: captions are from the original site.
export const bakes = [
  {
    "src": "/images/kitchen/food_01.webp",
    "title": "Chocolate Cupcakes",
    "caption": "My first ever baked good — the batch that started the obsession.",
    "w": 812,
    "h": 1100
  },
  {
    "src": "/images/kitchen/food_02.webp",
    "title": "Chocolate Chip Cookies",
    "caption": "Golden, chewy centers with crisp edges.",
    "w": 1093,
    "h": 1100
  },
  {
    "src": "/images/kitchen/food_03.webp",
    "title": "Coffee Caramel Cupcakes",
    "caption": "Espresso sponge topped with salted caramel glaze.",
    "w": 1100,
    "h": 1089
  },
  {
    "src": "/images/kitchen/food_04.webp",
    "title": "Lemon Drizzle Cake",
    "caption": "Citrus soak sponge cake with fresh lemon garnish.",
    "w": 1100,
    "h": 1086
  },
  {
    "src": "/images/kitchen/food_05.webp",
    "title": "Handcrafted Croissants",
    "caption": "Laminated butter layers. Harder to make than it looks!",
    "w": 825,
    "h": 1100
  },
  {
    "src": "/images/kitchen/food_06.webp",
    "title": "Golden Nutella Waffles",
    "caption": "Crisp waffle pockets topped with nutella and fruits",
    "w": 619,
    "h": 1100
  },
  {
    "src": "/images/kitchen/food_07.webp",
    "title": "Ghajar Halwa filled with Shondesh",
    "caption": "Traditional Bengali sweet fusion, Carrot halwa rolled with artisanal shondesh.",
    "w": 1100,
    "h": 733
  },
  {
    "src": "/images/kitchen/food_08.webp",
    "title": "Inter IIT Mixology Trio",
    "caption": "Cup Captain & Top 5 at Inter IIT Cultural Meet 8.0 — Butterfly pea flower layered infusions.",
    "w": 825,
    "h": 1100
  }
];

export const kitchenIntro =
  "A collection of things I\u2019ve baked, recipes I\u2019ve experimented with, and flavours I\u2019ve enjoyed bringing together.";
