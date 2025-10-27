import React from 'react';

export interface Expense {
  id: string;
  amount: number;
  categoryId: string;
  note: string;
  datetime: string; // ISO string
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  color: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export interface EarnedBadge {
  badgeId: string;
  earnedAt: string; // ISO string
}

export interface Settings {
  quickValues: number[];
  darkMode: boolean;
}

export interface AppData {
  expenses: Expense[];
  categories: Category[];
  settings: Settings;
  meta: {
    appVersion: string;
    lastBackupTimestamp?: string;
  }
}

export type Page = 'dashboard' | 'reports' | 'settings' | 'achievements';