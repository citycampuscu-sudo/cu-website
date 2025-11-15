export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

export interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  category?: string;
  imageUrl: string;
  storagePath: string;
  createdAt: Date;
}