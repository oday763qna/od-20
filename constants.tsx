import React from 'react';
import type { Category, Badge } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'طعام وبقالة', color: '#3b82f6', iconName: 'banknotes' },
  { id: 'cat-2', name: 'سكن وفواتير', color: '#10b981', iconName: 'home' },
  { id: 'cat-3', name: 'مواصلات', color: '#f97316', iconName: 'truck' },
  { id: 'cat-4', name: 'صحة', color: '#ef4444', iconName: 'heart' },
  { id: 'cat-5', name: 'ترفيه', color: '#8b5cf6', iconName: 'film' },
  { id: 'cat-6', name: 'هدايا', color: '#ec4899', iconName: 'gift' },
  { id: 'cat-7', name: 'أخرى', color: '#6b7280', iconName: 'question' },
  { id: 'cat-8', name: 'تسوق', color: '#f59e0b', iconName: 'cart' },
];

export const SAVING_TIPS = [
    { title: 'تحدي "لا مشتريات"', description: 'جرّب قضاء يوم واحد في الأسبوع بدون إنفاق أي مبلغ على الإطلاق. هذا يساعد في كسر عادة الشراء الاندفاعي.' },
    { title: 'قاعدة الـ 24 ساعة', description: 'قبل شراء أي شيء غير ضروري، انتظر 24 ساعة. إذا كنت لا تزال تريده بعد ذلك، ففكّر في شرائه.' },
    { title: 'أتمتة التوفير', description: 'قم بإعداد تحويل تلقائي لمبلغ صغير من حسابك الجاري إلى حساب التوفير كل شهر.' },
    { title: 'وجبات منزلية', description: 'خطط لوجباتك الأسبوعية وقم بالطهي في المنزل. ستندهش من مقدار ما يمكنك توفيره مقارنة بتناول الطعام في الخارج.' }
];

export const BADGE_DEFINITIONS: Badge[] = [
  {
    id: 'first-expense',
    name: 'بداية الرحلة',
    description: 'تسجيل أول مصروف لك. أهلاً بك!',
    iconName: 'star',
  },
  {
    id: 'streak-3',
    name: 'مثابرة',
    description: 'التسجيل لمدة 3 أيام متتالية.',
    iconName: 'calendar',
  },
  {
    id: 'streak-7',
    name: 'عادة جديدة',
    description: 'التسجيل لمدة 7 أيام متتالية.',
    iconName: 'calendar',
  },
  {
    id: 'streak-14',
    name: 'خبير مالي',
    description: 'التسجيل لمدة 14 يومًا على التوالي!',
    iconName: 'calendar',
  },
];