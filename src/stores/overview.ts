import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { NOW_MONTH, NOW_WEEK, NOW_YEAR } from '@/constants/payment';
import request from '@/service/request';
import { BillingData, BillingSpec } from '@/types/billing';
export enum By {
  month,
  week
}
type OverviewState = {
  selectedMonth: number;
  selectedYear: number;
  selectedWeek: number;
  source: any[][];
  cpu:number;
  storage:number;
  memory:number;
  by: By;
  items: BillingData['status']['item'];
  setMonth: (month: number) => void;
  setYear: (year: number) => void;
  setWeek: (week: number) => void;
  setSource: (source: any[][]) => void;
  swithBy: (target: By) => void;
  updateSource:()=>void
};

const useOverviewStore = create<OverviewState>()(
  devtools(
    persist(
      immer((set, get) => ({
        selectedMonth: NOW_MONTH,
        selectedYear: NOW_YEAR,
        selectedWeek: NOW_WEEK,
        by: By.month,
        cpu: -1,
        storage: -1,
        memory: -1,
        items:[],
        source: [['name', 'line', 'pie']],
        setWeek: (week) => set({ selectedWeek: week }),
        setMonth: (month) => set({ selectedMonth: month }),
        setYear: (year) => set({ selectedYear: year }),
        setSource: (source) => set({ source: source }),
        swithBy: (target: By) => set({ by: target }),
        updateSource: async () => {
          const spec: BillingSpec = {
            startTime: '2023-05-08T11:00:00Z',
            endTime: '2023-05-15T11:00:00Z',
            page: 1,
            pageSize: 100,
            type: -1
          };
          const {data} = await request<BillingData>('/api/billing', {
            method: 'POST',
            data:{spec}
          });
          
          set((state)=>{
            const deductionAmount = data.status.deductionAmount
            state.cpu = deductionAmount.cpu
            state.storage = deductionAmount.storage
            state.memory = deductionAmount.memory
            state.items = data.status.item
            console.log(state)
          })
        }
      })),
      { name: 'overview_store' }
    )
  )
);

export default useOverviewStore;
