import { create } from 'zustand';
import { getCurrentYear } from '../utils/dateHelper';

export const useRevenueStore = create((set) => ({
  selectedYear: getCurrentYear(),
  setSelectedYear: (year) => set({ selectedYear: year }),
}));
