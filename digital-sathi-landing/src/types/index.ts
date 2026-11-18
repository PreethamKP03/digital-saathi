export interface ServiceGuideItem {
  id: string;
  title: string;
  category: 'Government Services' | 'Digital Learning' | 'Help & Support';
  shortDesc: string;
  steps: string[];
  requiredDocs?: string[];
  iconName: string;
}

export interface FeatureSectionItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  points: string[];
  accentColor: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  review: string;
  rating: number;
  initials: string;
  avatarBg: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
