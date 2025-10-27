import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Page, Expense, Category, EarnedBadge, Badge } from './types';
import { INITIAL_CATEGORIES, BADGE_DEFINITIONS } from './constants';
import Welcome from './pages/Welcome';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Achievements from './pages/Achievements';
import BottomNav from './components/BottomNav';
import AddExpenseModal from './components/AddExpenseModal';
import { v4 as uuidv4 } from 'uuid';
import { IconComponent } from './components/icons';

export default function App() {
  const [hasVisited, setHasVisited] = useLocalStorage('saveit-od-visited', false);
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('saveit-od-expenses', []);
  const [categories, setCategories] = useLocalStorage<Category[]>('saveit-od-categories', INITIAL_CATEGORIES);
  const [earnedBadges, setEarnedBadges] = useLocalStorage<EarnedBadge[]>('saveit-od-earned-badges', []);
  const [newlyEarnedBadge, setNewlyEarnedBadge] = useState<Badge | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePage, setActivePage] = useState<Page>('dashboard');

  const checkAndAwardBadges = (currentExpenses: Expense[]) => {
    const newBadges: Badge[] = [];

    const isBadgeEarned = (badgeId: string) => earnedBadges.some(b => b.badgeId === badgeId);

    // 1. First Expense Badge
    if (currentExpenses.length === 1 && !isBadgeEarned('first-expense')) {
        const badge = BADGE_DEFINITIONS.find(b => b.id === 'first-expense');
        if (badge) newBadges.push(badge);
    }

    // 2. Streak Badges
    const uniqueDays = [...new Set(currentExpenses.map(e => new Date(e.datetime).setHours(0, 0, 0, 0)))].sort((a, b) => b - a);
    
    if (uniqueDays.length > 0) {
        let streak = 0;
        const today = new Date().setHours(0,0,0,0);
        if(uniqueDays[0] === today){
            streak = 1;
            const oneDay = 24 * 60 * 60 * 1000;
            for (let i = 0; i < uniqueDays.length - 1; i++) {
                if (uniqueDays[i] - uniqueDays[i+1] === oneDay) {
                    streak++;
                } else {
                    break;
                }
            }
        }

        const streakBadges = [
            { id: 'streak-14', days: 14 },
            { id: 'streak-7', days: 7 },
            { id: 'streak-3', days: 3 },
        ];

        for (const sb of streakBadges) {
            if (streak >= sb.days && !isBadgeEarned(sb.id)) {
                const badge = BADGE_DEFINITIONS.find(b => b.id === sb.id);
                if (badge) newBadges.push(badge);
            }
        }
    }

    if (newBadges.length > 0) {
        const badgesToAward = newBadges.filter(b => !isBadgeEarned(b.id));
        if (badgesToAward.length > 0) {
            setEarnedBadges(prev => [
                ...prev,
                ...badgesToAward.map(b => ({ badgeId: b.id, earnedAt: new Date().toISOString() }))
            ]);
            // Show toast for the most important new badge
            setNewlyEarnedBadge(badgesToAward[0]);
            setTimeout(() => setNewlyEarnedBadge(null), 4000);
        }
    }
  };


  const handleAddExpense = (expense: Omit<Expense, 'id' | 'datetime'>) => {
    const newExpense: Expense = {
      ...expense,
      id: uuidv4(),
      datetime: new Date().toISOString(),
    };
    const updatedExpenses = [newExpense, ...expenses];
    setExpenses(updatedExpenses);
    checkAndAwardBadges(updatedExpenses);
  };

  if (!hasVisited) {
    return <Welcome onStart={() => setHasVisited(true)} />;
  }

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard expenses={expenses} categories={categories} />;
      case 'reports':
        return <Reports expenses={expenses} categories={categories} />;
      case 'achievements':
        return <Achievements />;
      case 'settings':
        return <Settings expenses={expenses} setExpenses={setExpenses} categories={categories} setCategories={setCategories} />;
      default:
        return <Dashboard expenses={expenses} categories={categories} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="container mx-auto max-w-lg p-4 pb-24">
        {renderPage()}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40">
        <BottomNav activePage={activePage} setActivePage={setActivePage} onAddClick={() => setIsModalOpen(true)} />
      </div>

      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddExpense={handleAddExpense}
        categories={categories}
      />
       {newlyEarnedBadge && (
          <div className="fixed bottom-20 right-1/2 bg-white text-gray-800 px-4 py-3 rounded-lg shadow-2xl flex items-center border border-yellow-400 toast-in">
            <div className="p-2 bg-yellow-100 rounded-full mr-3">
               <IconComponent iconName={newlyEarnedBadge.iconName} className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p className="font-bold">تهانينا! لقد حصلت على شارة:</p>
              <p className="text-sm text-gray-600">{newlyEarnedBadge.name}</p>
            </div>
          </div>
      )}
    </div>
  );
}