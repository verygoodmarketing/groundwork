export interface BlogPostSection {
  id?: string;
  type: "heading2" | "paragraph" | "list" | "orderedList" | "divider" | "cta";
  text?: string;
  items?: (string | { bold: string; rest: string })[];
  href?: string;
  linkText?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  publishedAt: string;
  excerpt: string;
  sections: BlogPostSection[];
}

const plumbersPost: BlogPost = {
  slug: "best-website-for-plumbers",
  title: "The Best Website for Plumbers in 2026",
  metaTitle: "The Best Website for Plumbers in 2026 | Versa",
  metaDescription:
    "Looking for the best website builder for your plumbing business? See what plumbers actually need in a website — and why Versa is built specifically for the trades.",
  publishedAt: "2026-04-13",
  excerpt:
    "When a pipe bursts at 9 PM, the first thing a homeowner does is reach for their phone and search \u2018plumber near me.\u2019 If your business isn\u2019t showing up, you\u2019re handing that job to a competitor.",
  sections: [
    { type: "heading2", text: "Why Plumbers Need a Real Website in 2026" },
    {
      type: "paragraph",
      text: "When a pipe bursts at 9 PM, the first thing a homeowner does is reach for their phone and search \u201cplumber near me.\u201d If your business isn\u2019t showing up \u2014 or worse, you\u2019re showing up but the website looks unprofessional \u2014 you\u2019re handing that job to a competitor.",
    },
    {
      type: "paragraph",
      text: "A professional website isn\u2019t just a digital business card. It\u2019s how new customers find you, decide to trust you, and call you instead of the next guy on the list. In 2026, not having one is like not having a phone number.",
    },
    {
      type: "paragraph",
      text: "The good news: you don\u2019t need to be a tech person to have a great website. You just need the right tool.",
    },
    { type: "divider" },
    { type: "heading2", text: "What to Look for in a Plumber Website" },
    {
      type: "paragraph",
      text: "Not every website builder is built with a plumber\u2019s business in mind. Here\u2019s what actually matters:",
    },
    {
      type: "list",
      items: [
        {
          bold: "Works on mobile.",
          rest: " Most people searching for a plumber are on their phone, often in the middle of an emergency. Your site needs to load fast and look clean on a 5-inch screen.",
        },
        {
          bold: "Fast load times.",
          rest: " Google ranks faster sites higher. And a customer waiting more than 3 seconds will hit the back button. Speed matters.",
        },
        {
          bold: "A clear contact form (and click-to-call).",
          rest: " The goal of your website is one thing: get the phone to ring. Every page should make it dead simple to reach you.",
        },
        {
          bold: "Service area pages.",
          rest: " If you serve five towns, you should have a page for each one. \u201cPlumber in [town name]\u201d searches are high-intent \u2014 those are people ready to hire.",
        },
        {
          bold: "Reviews and trust signals.",
          rest: " Showing Google or Facebook reviews directly on your site builds credibility fast. Most homeowners read at least 3\u20135 reviews before calling.",
        },
      ],
    },
    { type: "divider" },
    {
      type: "heading2",
      text: "Why Versa Is Built for Plumbers (Not Generic Like Wix or Squarespace)",
    },
    {
      type: "paragraph",
      text: "There\u2019s nothing wrong with Wix or Squarespace \u2014 if you\u2019re selling handmade candles. But those tools are built for everyone, which means they\u2019re not really built for you.",
    },
    {
      type: "paragraph",
      text: "Versa is different. It\u2019s made specifically for service businesses like plumbing, HVAC, electrical, and cleaning. That means:",
    },
    {
      type: "list",
      items: [
        { bold: "Service area pages built in", rest: " \u2014 no need to figure out templates" },
        { bold: "Lead capture forms that go straight to your email or phone", rest: "" },
        { bold: "Local SEO features baked in", rest: ", so Google can actually find you" },
        {
          bold: "Review request tools",
          rest: " \u2014 automatically ask happy customers to leave a review after a job",
        },
        {
          bold: "No coding, no hiring a web designer",
          rest: " \u2014 you can have a real site live in under 5 minutes",
        },
      ],
    },
    {
      type: "paragraph",
      text: "When you\u2019re running a plumbing business, you don\u2019t have time to wrestle with drag-and-drop editors or figure out SEO plugins. Versa handles the hard stuff so you can focus on the job.",
    },
    { type: "divider" },
    { type: "heading2", text: "How to Get Started in 5 Minutes" },
    {
      type: "orderedList",
      items: [
        "Go to versa-kohl.vercel.app/for/plumbers",
        "Enter your business name and service area",
        "Pick a look that fits your brand",
        "Add your services and contact info",
        "Go live",
      ],
    },
    {
      type: "paragraph",
      text: "That\u2019s it. No credit card required to try it. Most plumbers are live in under 10 minutes.",
    },
    {
      type: "cta",
      linkText: "Get your plumber website started today \u2192",
      href: "/for/plumbers",
    },
    { type: "divider" },
    { type: "heading2", text: "FAQ: What Plumbers Ask About Getting a Website" },
    {
      type: "list",
      items: [
        {
          bold: "Do I really need a website if I already have a Facebook page?",
          rest: " Facebook is useful, but it\u2019s not a replacement for a website. Google doesn\u2019t rank Facebook pages the same way it ranks websites. If someone searches \u201cplumber in [your city]\u201d on Google, they\u2019re going to find businesses with websites \u2014 not Facebook profiles. You need both.",
        },
        {
          bold: "How much does a plumber website cost?",
          rest: " A custom website from a web design agency can run $2,000\u2013$8,000 upfront, plus ongoing hosting fees. Versa gives you a professional site for a flat monthly rate \u2014 a fraction of the cost, and you own it from day one. No waiting weeks for a developer to make changes.",
        },
        {
          bold: "Will a website actually get me more customers?",
          rest: " Yes \u2014 if it\u2019s built right. A website that shows up in local search results and makes it easy to contact you will bring in leads while you\u2019re on the job. Plumbers who have local SEO set up often say it becomes their single best source of new customers within a few months.",
        },
      ],
    },
    { type: "divider" },
    {
      type: "cta",
      linkText:
        "Build your plumber website with Versa \u2014 free trial, no credit card needed.",
      href: "/for/plumbers",
    },
  ],
};

const landscapersPost: BlogPost = {
  slug: "best-website-for-landscapers",
  title: "The Best Website for Landscapers in 2026",
  metaTitle: "The Best Website for Landscapers in 2026 | Versa",
  metaDescription:
    "Looking for the best website builder for your landscaping business? Here\u2019s what landscapers actually need in a website \u2014 and why Versa is purpose-built for the trades.",
  publishedAt: "2026-04-13",
  excerpt:
    "Spring rolls around and homeowners start Googling \u201classcapers near me.\u201d If your business isn\u2019t showing up with a professional website, you\u2019re invisible \u2014 and your competitor two towns over is getting that call.",
  sections: [
    {
      type: "heading2",
      text: "Why Landscapers Need a Professional Website in 2026",
    },
    {
      type: "paragraph",
      text: "Spring rolls around and homeowners start Googling \u201classcapers near me.\u201d If your business isn\u2019t showing up with a professional website, you\u2019re invisible \u2014 and your competitor two towns over is getting that call.",
    },
    {
      type: "paragraph",
      text: "Word of mouth is great. But it has a ceiling. A professional website works for you 24/7, turning local searches into phone calls, quote requests, and booked jobs \u2014 even when you\u2019re elbow-deep in a mulching project.",
    },
    {
      type: "paragraph",
      text: "In 2026, not having a website means missing out on the customers who never asked around. They searched. They clicked. They called someone else.",
    },
    { type: "divider" },
    {
      type: "heading2",
      text: "What to Look for in a Landscaper Website",
    },
    {
      type: "paragraph",
      text: "A generic website won\u2019t cut it for a landscaping business. Here\u2019s what actually moves the needle:",
    },
    {
      type: "list",
      items: [
        {
          bold: "Mobile-first design.",
          rest: " Homeowners are searching for landscapers on their phones while they\u2019re standing in their yard. Your site needs to load fast and look sharp on every device.",
        },
        {
          bold: "Photo galleries that show your work.",
          rest: " Landscaping is a visual trade. A simple before-and-after gallery can turn a browser into a buyer faster than any amount of copy.",
        },
        {
          bold: "Easy contact forms and click-to-call.",
          rest: " The goal is one thing: get them to reach out. Every page should make it simple \u2014 a form, a phone number, a \u201cGet a Quote\u201d button that\u2019s impossible to miss.",
        },
        {
          bold: "Service area pages.",
          rest: " If you serve multiple towns or zip codes, each should have its own page. \u201cLandscaper in [town]\u201d is a high-intent search \u2014 those are people ready to hire right now.",
        },
        {
          bold: "Seasonal content.",
          rest: " Spring cleanups, fall leaf removal, snow plowing \u2014 each service has its season. A website that can highlight what you\u2019re offering right now captures jobs you\u2019d otherwise miss.",
        },
      ],
    },
    { type: "divider" },
    {
      type: "heading2",
      text: "Why Versa Is Built for Landscapers (Not Generic Like Wix or Squarespace)",
    },
    {
      type: "paragraph",
      text: "Wix and Squarespace are built for everyone. That sounds good until you realize \u201ceveryone\u201d includes bloggers, online stores, and artists \u2014 not exactly your competition for local lawn care jobs.",
    },
    {
      type: "paragraph",
      text: "Versa is built specifically for service businesses like landscaping, HVAC, plumbing, and cleaning. The difference shows:",
    },
    {
      type: "list",
      items: [
        {
          bold: "Service area pages built in",
          rest: " \u2014 no plugins or developer work required",
        },
        {
          bold: "Lead capture forms that send inquiries straight to your phone or inbox",
          rest: "",
        },
        {
          bold: "Local SEO features baked in",
          rest: " \u2014 Google can find your business without you having to figure out keyword settings",
        },
        {
          bold: "Review request tools",
          rest: " \u2014 after you finish a job, Versa can automatically ask happy customers to leave a Google review",
        },
        {
          bold: "No coding required",
          rest: " \u2014 you can have a real, professional site live in under 10 minutes",
        },
      ],
    },
    {
      type: "paragraph",
      text: "Landscapers are busy people. You\u2019re managing crews, equipment, and a full job schedule. The last thing you need is to spend hours wrestling with a website builder. Versa handles the hard stuff so you can focus on the work.",
    },
    { type: "divider" },
    { type: "heading2", text: "How to Get Started in 5 Minutes" },
    {
      type: "orderedList",
      items: [
        "Go to versa-kohl.vercel.app/for/landscapers",
        "Enter your business name and service area",
        "Pick a look that fits your brand",
        "Add your services, photos, and contact info",
        "Go live",
      ],
    },
    {
      type: "paragraph",
      text: "No credit card required to try it. Most landscapers are up and running in under 10 minutes.",
    },
    {
      type: "cta",
      linkText: "Get your landscaping website started today \u2192",
      href: "/for/landscapers",
    },
    { type: "divider" },
    {
      type: "heading2",
      text: "FAQ: What Landscapers Ask About Getting a Website",
    },
    {
      type: "list",
      items: [
        {
          bold: "I already get business from referrals. Do I still need a website?",
          rest: " Referrals are great \u2014 but they\u2019re unpredictable. A website gives you a second, more reliable lead source. When a referred customer wants to vet you before calling, they\u2019ll Google your name. If nothing comes up, you look less credible. A professional website makes you look established and trustworthy, even before the first conversation.",
        },
        {
          bold: "How do I show off my work on a website?",
          rest: " A photo gallery is the most effective thing a landscaper can have on their website. Versa makes it easy to upload photos of completed projects \u2014 before and after shots, seasonal cleanups, patio installations \u2014 so potential customers can see exactly what you do before they ever call.",
        },
        {
          bold: "Will a website help me get more jobs in the off-season?",
          rest: " Yes. A well-built website with the right content can rank for off-season searches like \u201cfall lawn care\u201d or \u201csnow plowing [your city]\u201d \u2014 bringing in leads year-round. It can also capture email addresses so you can reach out to past customers when the right season hits.",
        },
      ],
    },
    { type: "divider" },
    {
      type: "cta",
      linkText:
        "Build your landscaping website with Versa \u2014 free trial, no credit card needed.",
      href: "/for/landscapers",
    },
  ],
};

const cleanersPost: BlogPost = {
  slug: "best-website-for-cleaning-businesses",
  title: "The Best Website for Cleaning Businesses in 2026",
  metaTitle: "The Best Website for Cleaning Businesses in 2026 | Versa",
  metaDescription:
    "Looking for the best website builder for your cleaning business? Here\u2019s what house cleaners and cleaning companies actually need in a website \u2014 and why Versa is built for the trades.",
  publishedAt: "2026-04-13",
  excerpt:
    "When someone moves into a new neighborhood and needs a house cleaner, they don\u2019t ask around \u2014 they Google it. If you\u2019re not showing up, you don\u2019t exist to those potential customers.",
  sections: [
    {
      type: "heading2",
      text: "Why Cleaning Businesses Need a Professional Website in 2026",
    },
    {
      type: "paragraph",
      text: "When someone moves into a new neighborhood and needs a house cleaner, they don\u2019t ask around \u2014 they Google it. \u201cHouse cleaning service near me.\u201d \u201cBest cleaning company in [city].\u201d If you\u2019re not showing up, you don\u2019t exist to those potential customers.",
    },
    {
      type: "paragraph",
      text: "The cleaning industry is competitive. There are a lot of independent cleaners and small companies in every market. What separates the ones growing their business from the ones stuck at the same client count? A professional online presence.",
    },
    {
      type: "paragraph",
      text: "Your website is your storefront. It\u2019s where people go to figure out if they trust you with their home. If it looks unprofessional \u2014 or doesn\u2019t exist \u2014 they\u2019ll move on to the next result.",
    },
    { type: "divider" },
    {
      type: "heading2",
      text: "What to Look for in a Cleaning Business Website",
    },
    {
      type: "paragraph",
      text: "Not all website builders are right for a cleaning business. Here\u2019s what actually matters:",
    },
    {
      type: "list",
      items: [
        {
          bold: "Mobile-friendly and fast-loading.",
          rest: " Most searches for cleaning services happen on a phone. Your site needs to be readable, fast, and easy to navigate on a small screen.",
        },
        {
          bold: "Clear service list with pricing (or a quote form).",
          rest: " Cleaning customers want to know what you offer and roughly what it costs. A clear list of services \u2014 with the option to request a quote \u2014 reduces friction and gets more inquiries.",
        },
        {
          bold: "Contact form and click-to-call.",
          rest: " Every page should make it easy to reach you. A prominent phone number and a short contact form are essential.",
        },
        {
          bold: "Testimonials and reviews.",
          rest: " Cleaning is a trust business \u2014 you\u2019re coming into someone\u2019s home. Displaying real reviews from happy customers is one of the most powerful things you can have on your website.",
        },
        {
          bold: "Before-and-after photos.",
          rest: " A clean home speaks for itself. If you have photos of your work, show them. It builds confidence instantly.",
        },
      ],
    },
    { type: "divider" },
    {
      type: "heading2",
      text: "Why Versa Is Built for Cleaning Businesses (Not Generic Like Wix or Squarespace)",
    },
    {
      type: "paragraph",
      text: "Generic website builders aren\u2019t designed with cleaning companies in mind. They\u2019re built for everyone \u2014 which means they\u2019re not really built for you.",
    },
    {
      type: "paragraph",
      text: "Versa is purpose-built for service businesses like cleaning, landscaping, plumbing, and HVAC. That means:",
    },
    {
      type: "list",
      items: [
        {
          bold: "Lead capture forms that send new inquiries directly to your inbox or phone",
          rest: "",
        },
        {
          bold: "Local SEO features built in",
          rest: " \u2014 so Google can find your business when someone in your area searches for a cleaner",
        },
        {
          bold: "Review request tools",
          rest: " \u2014 automatically prompt satisfied clients to leave a Google review after a job",
        },
        {
          bold: "Service area targeting",
          rest: " \u2014 set up your coverage area so you attract the right customers",
        },
        {
          bold: "No technical setup required",
          rest: " \u2014 your site can be live in under 10 minutes",
        },
      ],
    },
    {
      type: "paragraph",
      text: "Running a cleaning business means long days, early mornings, and managing schedules. You don\u2019t have time to figure out website platforms. Versa is designed to be set up once and work for you automatically.",
    },
    { type: "divider" },
    { type: "heading2", text: "How to Get Started in 5 Minutes" },
    {
      type: "orderedList",
      items: [
        "Go to versa-kohl.vercel.app/for/cleaners",
        "Enter your business name and service area",
        "Choose a look that fits your brand",
        "Add your services, photos, and contact info",
        "Go live",
      ],
    },
    {
      type: "paragraph",
      text: "No credit card required to get started. Most cleaning businesses are up and running in under 10 minutes.",
    },
    {
      type: "cta",
      linkText: "Get your cleaning business website started today \u2192",
      href: "/for/cleaners",
    },
    { type: "divider" },
    {
      type: "heading2",
      text: "FAQ: What Cleaning Businesses Ask About Getting a Website",
    },
    {
      type: "list",
      items: [
        {
          bold: "How do I get more cleaning clients from my website?",
          rest: " The most important thing is showing up when people search for cleaners in your area \u2014 that requires local SEO. Versa handles the technical side automatically: your business gets the right metadata, local structured data, and service area targeting so Google can match you with nearby customers. Beyond that, a clear quote request form converts browsers into leads.",
        },
        {
          bold: "Do I need a website if I\u2019m already on Google Business Profile?",
          rest: " Your Google Business Profile is important \u2014 but it\u2019s not a substitute for a website. A website lets you tell your full story: your services, your prices, your photos, your reviews. It also gives Google more information to rank you higher in local searches. They work best together.",
        },
        {
          bold: "What should I put on my cleaning business website?",
          rest: " At minimum: your services, your service area, your contact info, and a way to request a quote or book. Photos of your work and a handful of customer reviews will set you apart from competitors who just have a basic listing. Versa gives you a template designed specifically for cleaning businesses \u2014 so you\u2019re not starting from scratch.",
        },
      ],
    },
    { type: "divider" },
    {
      type: "cta",
      linkText:
        "Build your cleaning business website with Versa \u2014 free trial, no credit card needed.",
      href: "/for/cleaners",
    },
  ],
};

const hvacPost: BlogPost = {
  slug: "best-website-for-hvac-companies",
  title: "The Best Website for HVAC Companies in 2026",
  metaTitle: "The Best Website for HVAC Companies in 2026 | Versa",
  metaDescription:
    "Looking for the best website builder for your HVAC business? Here\u2019s what HVAC contractors actually need in a website \u2014 and why Versa is purpose-built for service businesses.",
  publishedAt: "2026-04-13",
  excerpt:
    "It\u2019s July. A homeowner\u2019s AC stops working at 8 PM. They\u2019re not calling their neighbor for a referral \u2014 they\u2019re searching \u201cHVAC company near me\u201d and calling the first business that looks trustworthy.",
  sections: [
    {
      type: "heading2",
      text: "Why HVAC Companies Need a Professional Website in 2026",
    },
    {
      type: "paragraph",
      text: "It\u2019s July. A homeowner\u2019s AC stops working at 8 PM. They\u2019re not calling their neighbor for a referral \u2014 they\u2019re searching \u201cHVAC company near me\u201d and calling the first business that looks trustworthy.",
    },
    {
      type: "paragraph",
      text: "That moment happens thousands of times every summer. And every time it happens without your business showing up, you\u2019re leaving a job on the table.",
    },
    {
      type: "paragraph",
      text: "HVAC is a high-ticket, high-urgency trade. A professional website doesn\u2019t just make you look good \u2014 it\u2019s often the deciding factor between getting that emergency call or losing it to a competitor. In 2026, customers expect to be able to find you online, read your reviews, and contact you in 30 seconds.",
    },
    { type: "divider" },
    {
      type: "heading2",
      text: "What to Look for in an HVAC Website",
    },
    {
      type: "paragraph",
      text: "The best HVAC websites aren\u2019t just online brochures. They\u2019re lead generation tools. Here\u2019s what matters:",
    },
    {
      type: "list",
      items: [
        {
          bold: "Fast and mobile-optimized.",
          rest: " Most HVAC searches happen on phones, often in the middle of an emergency. A site that loads slowly or looks broken on mobile costs you jobs before the phone even rings.",
        },
        {
          bold: "Clear services and service areas.",
          rest: " Be explicit about what you do \u2014 AC installation, heating repair, furnace replacement, duct cleaning \u2014 and where you serve. This helps both Google and your customers.",
        },
        {
          bold: "Emergency and 24/7 contact options.",
          rest: ' If you take emergency calls, say so loudly. A prominent "Call Now" button or after-hours form can capture high-value emergency jobs that other contractors miss.',
        },
        {
          bold: "Seasonal offers and promotions.",
          rest: " A site that can highlight a spring AC tune-up deal or fall furnace inspection special helps you stay relevant year-round and gives customers a reason to call before something breaks.",
        },
        {
          bold: "Reviews and credentials.",
          rest: " HVAC is a licensed trade. Showing your credentials, certifications (NATE, EPA 608), and customer reviews builds trust fast \u2014 especially for new customers who\u2019ve never heard of you.",
        },
      ],
    },
    { type: "divider" },
    {
      type: "heading2",
      text: "Why Versa Is Built for HVAC Companies (Not Generic Like Wix or Squarespace)",
    },
    {
      type: "paragraph",
      text: "Wix and Squarespace are general-purpose tools. They work fine for a portfolio site or an online store \u2014 but they weren\u2019t designed with HVAC contractors in mind.",
    },
    {
      type: "paragraph",
      text: "Versa is built specifically for service businesses: HVAC, plumbing, electrical, landscaping, and cleaning. That means:",
    },
    {
      type: "list",
      items: [
        {
          bold: "Service area pages built in",
          rest: " \u2014 rank for \u201c[city] HVAC\u201d searches without hiring a developer",
        },
        {
          bold: "Lead capture forms routed directly to your phone or inbox",
          rest: " \u2014 so you never miss a quote request",
        },
        {
          bold: "Local SEO features baked in",
          rest: " \u2014 your business gets properly indexed for local searches without any technical setup",
        },
        {
          bold: "Review request automation",
          rest: " \u2014 after a job is complete, Versa can ask your customers to leave a Google review",
        },
        {
          bold: "No coding, no design background required",
          rest: " \u2014 get a professional site live in under 10 minutes",
        },
      ],
    },
    {
      type: "paragraph",
      text: "HVAC technicians are running jobs, managing service calls, and keeping customers\u2019 homes comfortable. The last thing you need is to spend hours building a website. Versa is designed so you can set it up once and let it work for you.",
    },
    { type: "divider" },
    { type: "heading2", text: "How to Get Started in 5 Minutes" },
    {
      type: "orderedList",
      items: [
        "Go to versa-kohl.vercel.app/for/hvac",
        "Enter your business name and service area",
        "Choose a look that fits your company",
        "Add your services, credentials, and contact info",
        "Go live",
      ],
    },
    {
      type: "paragraph",
      text: "No credit card required. Most HVAC businesses are up and running in under 10 minutes.",
    },
    {
      type: "cta",
      linkText: "Get your HVAC company website started today \u2192",
      href: "/for/hvac",
    },
    { type: "divider" },
    {
      type: "heading2",
      text: "FAQ: What HVAC Contractors Ask About Getting a Website",
    },
    {
      type: "list",
      items: [
        {
          bold: "How do I compete online against bigger HVAC companies?",
          rest: " Larger companies have marketing budgets, but they don\u2019t always have better local presence. A focused local website that targets your specific service area \u2014 with real reviews and a clear list of services \u2014 can outrank bigger companies for searches in your territory. Google favors relevance and proximity, not just company size. Local SEO done right levels the playing field.",
        },
        {
          bold: "Should I list pricing on my HVAC website?",
          rest: " Most HVAC contractors don\u2019t list exact pricing because jobs vary too much. What you should have is a way to request a quote quickly. A clear \u201cGet a Free Estimate\u201d form or phone number does more than a price list \u2014 it starts the conversation. Versa makes it easy to add a quote request form to every page.",
        },
        {
          bold: "Do I need a website if I\u2019m already on Yelp and Google Business?",
          rest: " Yelp and Google Business are helpful, but they\u2019re not replacements for a website. Your website is the only place where you fully control the message, the layout, and the customer experience. It\u2019s also what Google uses to validate your business and rank you higher in local searches. Platforms come and go \u2014 your website is yours.",
        },
      ],
    },
    { type: "divider" },
    {
      type: "cta",
      linkText:
        "Build your HVAC company website with Versa \u2014 free trial, no credit card needed.",
      href: "/for/hvac",
    },
  ],
};

export const allPosts: BlogPost[] = [
  plumbersPost,
  landscapersPost,
  cleanersPost,
  hvacPost,
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((post) => post.slug === slug);
}
