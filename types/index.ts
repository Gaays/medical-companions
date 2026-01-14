// 陪护人员类型
export interface Companion {
  id: number;
  name: string;
  avatar: string;
  gender: 'male' | 'female';
  languages: string[];
  rating: number;
  price: number;
  bio: string;
  region: string;
  distance: number;
  specialties: string[];
  introduction: string;
}

// 筛选条件类型
export interface Filters {
  languages: string[];
  gender: 'any' | 'male' | 'female';
  minPrice: number;
  maxPrice: number;
  region: string;
}

// 排序条件类型
export interface Sorting {
  field: 'price' | 'distance';
  direction: 'asc' | 'desc';
}

// 区域类型
export type Region = 
  | 'nanshan' 
  | 'futian' 
  | 'luohu' 
  | 'baoan' 
  | 'longgang' 
  | 'longhua' 
  | '光明' 
  | 'pingshan' 
  | 'dapeng' 
  | 'yantian';

// 语言类型
export type Language = 
  | 'english' 
  | 'chinese' 
  | 'spanish' 
  | 'french' 
  | 'german' 
  | 'japanese' 
  | 'korean';