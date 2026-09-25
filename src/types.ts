export type ContentCategory = 'all' | 'fashion' | 'beauty' | 'editorial' | 'lifestyle';

export interface ReelItem {
  id: string;
  title: string;
  category: 'beauty' | 'lifestyle' | 'editorial' | 'fashion';
  duration: string;
  views: string;
  likes: string;
  videoUrl: string;
  posterUrl: string;
  description: string;
  tags: string[];
  audioTrack: string;
}

export interface LookbookItem {
  id: string;
  title: string;
  category: 'editorial' | 'fashion' | 'lifestyle';
  imageUrl: string;
  aspectRatio: 'tall' | 'square' | 'wide';
  caption: string;
  year: string;
}

export interface CollaborationService {
  id: string;
  title: string;
  badge: string;
  description: string;
  basePrice: number;
  turnaroundDays: string;
  deliverables: string[];
  recommendedFor: string;
}

export interface MetricHighlight {
  label: string;
  value: string;
  description: string;
}
