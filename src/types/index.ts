export interface ProjectItem {
  id: string;
  number: string;
  name: string;
  type: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  images: string[];
  metrics?: { label: string; value: string }[];
  liveUrl?: string;
  featured?: boolean;
}

export interface WhatIDoItem {
  number: string;
  title: string;
  description: string;
  skills: string[];
}

export interface MomentItem {
  id: string;
  title: string;
  category: string;
  location: string;
  aspectRatio: 'portrait' | 'landscape' | 'square' | 'wide';
  image: string;
  caption: string;
}

export interface JourneyItem {
  id?: string;
  number: string;
  stage: string;
  period: string;
  title: string;
  description: string;
  tags: string[];
}

export interface ContactLink {
  name: string;
  handle: string;
  url: string;
  category: string;
  isPrimary?: boolean;
}

export interface StoryCardItem {
  id: string;
  category: 'WORK' | 'HOME' | 'MOMENT' | 'JOURNEY';
  title: string;
  image: string;
  subtitle: string;
}

export interface ServiceItem {
  id: string;
  category: string;
  icon?: string;
  accentColor?: string;
  title: string;
  tagline: string;
  features: string[];
  ctaUrl?: string;
  ctaText?: string;
  highlight?: boolean;
  sortOrder?: number;
}
