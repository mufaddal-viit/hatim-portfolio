import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";

const person: Person = {
  firstName: "First",
  lastName: "Last",
  name: `First Last`,
  role: "Your Role",
  avatar: "/images/avatar.jpg",
  email: "hello@example.com",
  location: "Asia/Kolkata", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: [], // optional: Leave the array empty if you don't want to display languages
  locale: "en", // BCP 47 language tag for the HTML lang attribute, e.g., 'en', 'ja', 'zh-TW'
};

const newsletter: Newsletter = {
  display: false, // set to true once a Mailchimp action URL is configured in once-ui.config.ts
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>Occasional updates on my latest work and writing</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in src/resources/icons.ts
  // Set essential: true for links you want to show on the about page
  // Remove any entry you don't need, or leave link empty to hide it
  {
    name: "GitHub",
    icon: "github",
    link: "",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "",
    essential: false,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Your headline goes here</>,
  featured: {
    display: false, // set to true and point href at a project to highlight it on the home page
    title: <>Featured work</>,
    href: "",
  },
  subline: (
    <>
      I'm {person.firstName}, a {person.role.toLowerCase()}. A short introduction goes here —
      one or two sentences about what you do and who you do it for.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false, // set to true and add a booking link to show the "Schedule a call" button
    link: "",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        A short bio goes here. Introduce yourself, what you specialise in, and the kind of
        problems you enjoy solving.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Company Name",
        timeframe: "20XX - Present",
        role: "Your Role",
        achievements: [
          <>First achievement or responsibility in this role.</>,
          <>Second achievement or responsibility in this role.</>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
        ],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Institution Name",
        description: <>What you studied.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Skill Name",
        description: <>A short description of your experience with this skill.</>,
        tags: [
          // Available icons are registered in src/resources/icons.ts
          {
            name: "Next.js",
            icon: "nextjs",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to src/app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to src/app/work/projects
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
