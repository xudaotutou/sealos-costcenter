import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { NOW_DAY, NOW_MONTH, NOW_YEAR } from '@/constants/payment';

type OverviewState = {
  selectedMonth: number;
  selectedYear: number;
  selectedDay: number;
  source:any[][]
  setMonth: (month: number) => void;
  setYear: (year: number) => void;
  setDay: (day: number) => void;
  setSource: (source:any[][]) => void;
};

const useOverviewStore = create<OverviewState>()(
  devtools(
    persist(
      immer((set, get) => ({
        selectedMonth: NOW_MONTH,
        selectedYear: NOW_YEAR,
        selectedDay: NOW_DAY,
        source:[["name","v1","v2"]],
        setDay: day => set({ selectedDay: day }),
        setMonth: month => set({ selectedMonth: month }),
        setYear: year => set({ selectedYear: year }),
        setSource: source => set({ source: source }),
      })),
      { name: 'overview_store' }
    )
  )
);

export default useOverviewStore;