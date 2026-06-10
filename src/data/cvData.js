// ========================================
// CV & PORTFOLIO DATA
// Extracted from MehulDinesh_CV.pdf & MUN_Resume.pdf
// ========================================

export const personalInfo = {
  name: 'MEHUL DINESH',
  subtitle: 'Software Developer · AI Enthusiast · Debater · Gamer',
  email: 'mehul.dinu@gmail.com',
  github: 'https://github.com/EgoisticPotato',
  githubHandle: 'EgoisticPotato',
  linkedin: 'https://linkedin.com/in/mehuldinesh',
};

export const education = {
  institution: 'PSG College of Technology',
  location: 'Coimbatore',
  degree: 'B.E. in Computer Science and Engineering (AI & ML)',
  period: 'Oct 2022 – Present',
};

export const experience = [
  {
    role: 'Software Development Engineer Intern',
    company: 'State Street',
    location: 'Coimbatore',
    period: 'Jan 2026 – Present',
    bullets: [
      'Engineered backend microservices and APIs for enterprise financial data systems, ensuring high throughput, robustness, and security.',
      'Optimized analytical data pipelines and database query execution, reducing retrieval latency for internal financial tools.',
    ],
  },
  {
    role: 'Software Engineering Intern',
    company: 'Tech Mahindra',
    location: 'Hyderabad',
    period: 'July – Aug 2025',
    bullets: [
      'Designed scalable GCS folder structures to improve multi-format workflow data ingestion and retrieval for video pipelines, enhancing discoverability.',
      'Automated legacy data restructuring with Python, enabling dynamic schema support and reducing manual pre-processing overhead.',
    ],
  },
];

export const careerTimeline = [
  {
    id: 'education',
    period: 'Oct 2022 – Present',
    org: 'PSG College of Technology',
    location: 'Coimbatore',
    role: 'B.E. CSE (AI & ML)',
    bullets: [],
  },
  {
    id: 'internship',
    period: 'July – Aug 2025',
    org: 'Tech Mahindra',
    location: 'Hyderabad',
    role: 'Software Engineering Intern',
    bullets: [
      'Designed scalable GCS folder structures for video pipelines',
      'Automated legacy data restructuring with Python',
      'Reduced pre-processing overhead with dynamic schema support',
    ],
  },
  {
    id: 'statestreet',
    period: 'Jan 2026 – Present',
    org: 'State Street',
    location: 'Coimbatore',
    role: 'Software Development Engineer Intern',
    bullets: [
      'Developed backend microservices for enterprise financial systems',
      'Optimized query performance and execution paths for data pipelines',
    ],
  },
];

export const featuredProjects = [
  {
    id: 'veronica',
    name: 'Veronica',
    badge: 'Python',
    description: 'Personal AI Assistant & Multimedia Orchestrator',
    tech: ['FastAPI', 'RAG', 'ElevenLabs', 'Qdrant', 'Whisper', 'React'],
    bullets: [
      '30% responsiveness boost via async multi-threading',
      '4+ API integrations: Spotify, Gemini 2.0, ElevenLabs, Tavily',
      'Containerized 10GB+ multi-modal project with CI/CD pipeline',
    ],
    footer: '⭐ Featured',
    repoUrl: null, // private
  },
  {
    id: 'kaizen',
    name: 'Kaizen',
    badge: 'Python',
    description: 'AI-powered RAG assistant with production-grade retrieval',
    tech: ['FastAPI', 'LangChain', 'Qdrant', 'Transformers', 'PostgreSQL'],
    bullets: [
      '40% answer accuracy improvement over baseline',
      '92% test accuracy on fine-tuned transformer',
      'LangChain + Qdrant knowledge-grounded pipeline',
    ],
    footer: '⭐ Featured',
    repoUrl: null,
  },
  {
    id: 'pixelperfect',
    name: 'PixelPerfect',
    badge: 'Python',
    emoji: '🏆',
    description: 'Hackathon winner (3rd place) — AI image enhancement, 5× retrieval speedup',
    tech: ['FastAPI', 'Stable Diffusion', 'ESRGAN', 'Gemini', 'Python'],
    bullets: [
      '3rd Place Hackathon Winner 🏆',
      'Backend handles 1,000 requests/minute',
      'Gemini vector search accelerated retrieval by 5×',
    ],
    footer: '⭐ Featured',
    repoUrl: null,
  },
];

export const publication = {
  title: 'MINT: Meta-Learning for Intelligent Prompt Creation',
  venue: 'Proceedings of NMITCON 2025',
  description: 'Co-authored work on adaptive prompt generation using hierarchical context encoding and RLHF, improving personalization and diversity.',
};

export const skills = [
  'Python', 'FastAPI', 'React', 'LangChain', 'Qdrant', 'Docker',
  'PostgreSQL', 'Transformers', 'Whisper', 'Stable Diffusion', 'GCS',
  'Git', 'Gemini', 'ElevenLabs', 'Tavily', 'ESRGAN',
];

export const hobbies = [
  {
    emoji: '🎾',
    name: 'Tennis',
    description: 'The serve is a commit. The rally is code review. The fault is a merge conflict. I keep playing anyway.',
  },
  {
    emoji: '🎮',
    name: 'Gaming',
    description: 'From open-world narratives to competitive shooters — games taught me about systems design before I knew what it was called.',
  },
  {
    emoji: '🌐',
    name: 'Debate',
    description: 'Building arguments under time pressure, on topics I didn\'t choose, representing views I may not hold. Pure cognitive sport.',
  },
  {
    emoji: '🤖',
    name: 'AI Tinkering',
    description: 'Fine-tuning models, chaining agents, breaking things at midnight, occasionally publishing a paper. The usual.',
  },
];

export const munData = {
  profile: 'Experienced Model United Nations (MUN) delegate with participation in 11 conferences and awards in 8. Demonstrated excellence in diplomacy, negotiation, public speaking, and policy analysis.',
  awards: [
    { conference: 'Amrita MUN 2024', committee: 'UNHRC', award: 'Special Mention' },
    { conference: 'Kumaraguru MUN 2024', committee: 'UNSC', award: 'High Commendation' },
    { conference: 'Anokha (Amrita) 2024', committee: '', award: 'High Commendation' },
    { conference: 'Civitas 2024', committee: 'ECOSOC', award: 'High Commendation' },
    { conference: 'INDIA MUN 2024', committee: 'UNHRC', award: 'High Commendation' },
    { conference: 'Anokha (Amrita) 2025', committee: '', award: 'Special Mention' },
    { conference: 'VITCMUN 2025', committee: 'UNCCC', award: 'Honorable Mention' },
    { conference: 'SOEL MUN 2026', committee: 'UNHRC', award: 'Honorable Mention' },
  ],
  executiveBoard: [
    { conference: 'IIMUN Tiruppur 2025', committee: 'WHO', role: 'Vice-Chair' },
    { conference: 'SNS AIMUN 2025', committee: 'UNGA', role: 'Chair' },
    { conference: 'SIMUN 2026', committee: 'UNHRC', role: 'Chair' },
  ],
  debateSkills: [
    'Public Speaking', 'Strategic Negotiation', 'Policy Analysis',
    'Position Papers', 'Cross-Examination', 'Coalition Building',
    'Active Listening', 'Crisis Management',
  ],
  perspectives: [
    {
      title: 'Global Perspective',
      description: 'Representing nation-states builds a worldview most coders never develop.',
    },
    {
      title: 'Art of Persuasion',
      description: 'Every word is deliberate — same discipline goes into code and documentation.',
    },
    {
      title: 'Under Pressure',
      description: 'Crisis simulations fire the same muscle as a production incident at 3 AM.',
    },
  ],
  focusAreas: ['AI Governance', 'Climate Policy', 'Cybersecurity', 'Economic Sovereignty'],
};
