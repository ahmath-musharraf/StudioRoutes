export enum ServiceType {
  WEDDING = 'Wedding',
  COMMERCIAL = 'Commercial',
  PORTRAIT = 'Portrait',
  EVENT = 'Event'
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: ServiceType;
  imageUrl: string;
  width: 'full' | 'half' | 'third';
}