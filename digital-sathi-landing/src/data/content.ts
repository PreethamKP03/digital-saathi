import {
  ServiceGuideItem,
  FeatureSectionItem,
  StepItem,
  BenefitItem,
  TestimonialItem,
  FaqItem,
} from '../types';

export const FEATURES_DATA: FeatureSectionItem[] = [
  {
    id: 'government-services',
    badge: 'Citizen Guidance',
    title: 'Government Services',
    description:
      'Navigate everyday public services with clarity and confidence. Digital Sathi organizes essential portal information and step-by-step instructions in plain, easy-to-follow language.',
    points: [
      'Access government-related services and portal directions in one place.',
      'Find clear information about Aadhaar, PAN, certificates, and welfare schemes.',
      'Easy navigation and step-by-step service guidance for first-time users.',
    ],
    accentColor: '#145BFF',
  },
  {
    id: 'digital-learning',
    badge: 'Skill Empowerment',
    title: 'Digital Learning',
    description:
      'Build practical everyday confidence with smartphones, online portals, and digital tools through beginner-friendly guides designed for citizens of all ages.',
    points: [
      'Learn essential digital skills from smartphone basics to online applications.',
      'Access structured tutorials and beginner-friendly educational resources.',
      'Improve digital awareness, online safety habits, and self-reliance.',
    ],
    accentColor: '#0EA5E9',
  },
  {
    id: 'help-support',
    badge: 'Guided Assistance',
    title: 'Help & Support',
    description:
      'Never feel stuck while filling out an online form or exploring a new digital tool. Get straightforward answers and structured guidance whenever you need a hand.',
    points: [
      'Get step-by-step assistance with navigating digital services.',
      'Access comprehensive FAQs, checklists, and support resources.',
      'Simple, jargon-free, and user-friendly guidance built for everyone.',
    ],
    accentColor: '#2563EB',
  },
];

export const SERVICE_GUIDES: ServiceGuideItem[] = [
  {
    id: 'aadhaar-guide',
    title: 'Aadhaar Information & Updates',
    category: 'Government Services',
    shortDesc: 'Understand how to check Aadhaar status, update address details, and locate enrollment centers.',
    steps: [
      'Keep your 12-digit Aadhaar number and registered mobile number ready.',
      'Visit the official UIDAI citizen portal for self-service address updates or status checks.',
      'Verify your identity with the one-time passcode (OTP) sent to your mobile.',
      'Download your acknowledgement slip to track update status.',
    ],
    requiredDocs: ['Registered Mobile Number', 'Valid Proof of Address (for address updates)'],
    iconName: 'Fingerprint',
  },
  {
    id: 'pan-services',
    title: 'PAN Card Guidance',
    category: 'Government Services',
    shortDesc: 'Step-by-step checklists for new PAN applications, corrections, and Aadhaar-PAN linking.',
    steps: [
      'Identify whether you need a new PAN application or correction to existing details.',
      'Prepare identity, address, and date-of-birth proof documents.',
      'Follow official portal instructions carefully and double-check spelling.',
      'Save the 15-digit acknowledgement number for status tracking.',
    ],
    requiredDocs: ['Aadhaar Card', 'Passport-size Photo', 'Date of Birth Proof'],
    iconName: 'CreditCard',
  },
  {
    id: 'certificates',
    title: 'Certificates & Schemes',
    category: 'Government Services',
    shortDesc: 'Guidance on income, caste, and domicile certificates along with citizen welfare schemes.',
    steps: [
      'Select your state citizen service portal or visit a nearby service center.',
      'Review the eligibility criteria and document checklist before applying.',
      'Fill in accurate personal and household information.',
      'Track application approval and download digital copies securely.',
    ],
    requiredDocs: ['Identity Proof', 'Residence Proof', 'Supporting Income / Community Records'],
    iconName: 'FileText',
  },
  {
    id: 'smartphone-basics',
    title: 'Smartphone & Internet Basics',
    category: 'Digital Learning',
    shortDesc: 'Beginner tutorials covering app installation, browser usage, email setup, and phone settings.',
    steps: [
      'Learn essential touch gestures, notification bars, and Wi-Fi / mobile data controls.',
      'Install applications safely from verified app stores only.',
      'Set up an email account for receiving important service updates.',
      'Organize important digital documents safely on your device.',
    ],
    iconName: 'Smartphone',
  },
  {
    id: 'digital-safety',
    title: 'Online Safety & Digital Awareness',
    category: 'Digital Learning',
    shortDesc: 'Essential habits to protect your passwords, recognize suspicious links, and stay safe online.',
    steps: [
      'Never share OTPs, bank PINs, or passwords with anyone over phone or chat.',
      'Check website addresses carefully before entering personal information.',
      'Avoid clicking unfamiliar prize or urgent account-block links.',
      'Use strong, memorable passcodes to lock your phone and accounts.',
    ],
    iconName: 'ShieldCheck',
  },
  {
    id: 'guided-help',
    title: 'FAQ & Support Assistance',
    category: 'Help & Support',
    shortDesc: 'Clear answers to common questions and direct contact channels when you need guidance.',
    steps: [
      'Search our FAQ library for quick answers to common digital questions.',
      'Follow visual checklists before starting any online application.',
      'Use the Contact Support form if you need further clarification.',
    ],
    iconName: 'LifeBuoy',
  },
];

export const HOW_IT_WORKS_STEPS: StepItem[] = [
  {
    number: '01',
    title: 'Register or Open Digital Sathi',
    description:
      'Open Digital Sathi on your phone or computer and create a quick profile — or browse public service guides immediately with zero friction.',
  },
  {
    number: '02',
    title: 'Select the Required Service',
    description:
      'Choose from clearly organized categories including Government Services, Digital Learning tutorials, or Help & Support resources.',
  },
  {
    number: '03',
    title: 'Follow Instructions & Get Assistance',
    description:
      'Use our step-by-step checklists, simple visual guides, and built-in FAQs to complete your digital tasks independently and safely.',
  },
];

export const WHY_CHOOSE_ITEMS: BenefitItem[] = [
  {
    id: 'easy-interface',
    title: 'Easy-to-Use Interface',
    description:
      'Clean layouts, clear typography, and intuitive navigation designed so beginners and elders feel comfortable from the very first tap.',
    iconName: 'Sparkles',
  },
  {
    id: 'accessible-info',
    title: 'Accessible Digital Information',
    description:
      'Complex procedures broken down into clear, plain-language steps and practical document checklists anyone can understand.',
    iconName: 'BookOpen',
  },
  {
    id: 'secure-experience',
    title: 'Secure & User-Friendly Experience',
    description:
      'Privacy-conscious guidance that never asks for your banking PINs or OTPs, promoting safe online practices at every step.',
    iconName: 'Shield',
  },
  {
    id: 'centralized-info',
    title: 'Centralized Service Information',
    description:
      'Stop jumping across confusing pages. Discover guidance for identity documents, certificates, schemes, and learning resources in one hub.',
    iconName: 'Layers',
  },
  {
    id: 'digital-awareness',
    title: 'Digital Awareness & Education',
    description:
      'Go beyond single tasks by building lasting skills in internet literacy, online safety, and everyday digital confidence.',
    iconName: 'GraduationCap',
  },
];

export const SAMPLE_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'sample-1',
    name: 'Aarav Sharma',
    role: 'Small Business Owner',
    location: 'Jaipur, Rajasthan',
    review:
      'Finding the exact document checklist for PAN updates and local certificates used to take hours. Digital Sathi made the entire process clear and easy to follow.',
    rating: 5,
    initials: 'AS',
    avatarBg: 'bg-blue-100 text-[#145BFF]',
  },
  {
    id: 'sample-2',
    name: 'Meera Nair',
    role: 'Homemaker & Community Volunteer',
    location: 'Kochi, Kerala',
    review:
      'The step-by-step digital learning tutorials helped me teach smartphone safety and online portal basics to my parents without overwhelming them.',
    rating: 5,
    initials: 'MN',
    avatarBg: 'bg-sky-100 text-sky-700',
  },
  {
    id: 'sample-3',
    name: 'Rajesh Kulkarni',
    role: 'College Student',
    location: 'Hubballi, Karnataka',
    review:
      'Everything is cleanly organized in one place. Whether checking scholarship certificate requirements or guiding neighbors through FAQs, it saves so much time.',
    rating: 5,
    initials: 'RK',
    avatarBg: 'bg-indigo-100 text-indigo-700',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What is Digital Sathi?',
    answer:
      'Digital Sathi is a citizen-friendly digital companion platform designed to simplify access to information about government services, build essential digital skills through tutorials, and offer clear, step-by-step assistance — all in one easy-to-navigate place.',
  },
  {
    id: 'faq-2',
    question: 'How can I access government services?',
    answer:
      'Simply explore the Government Services section on Digital Sathi to find structured guides, document checklists, and clear instructions for services such as Aadhaar, PAN, certificates, and welfare schemes. Digital Sathi guides you step by step so you know what to prepare before using official portals.',
  },
  {
    id: 'faq-3',
    question: 'Is Digital Sathi free?',
    answer:
      'Yes! Accessing Digital Sathi’s informational guides, digital learning tutorials, checklists, and FAQ resources is completely free for citizens.',
  },
  {
    id: 'faq-4',
    question: 'How can I learn digital skills?',
    answer:
      'Visit the Digital Learning section to explore beginner-friendly guides covering smartphone essentials, internet browsing, email communication, and everyday online safety awareness at your own pace.',
  },
  {
    id: 'faq-5',
    question: 'Is my information secure?',
    answer:
      'Digital Sathi is built with a user-first, privacy-conscious approach. You can browse guides and tutorials without sharing sensitive credentials, and we never ask for your banking passwords, UPI PINs, or OTPs.',
  },
  {
    id: 'faq-6',
    question: 'How can I contact support?',
    answer:
      'You can reach out anytime through the Contact Support form at the bottom of this page or check our Help & Support resources for instant answers to common questions.',
  },
];
