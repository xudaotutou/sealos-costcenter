import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { NOW_MONTH, NOW_WEEK, NOW_YEAR } from '@/constants/payment';
import request from '@/service/request';
import { BillingData, BillingItem, BillingSpec } from '@/types/billing';
import {
  addMonths,
  addWeeks,
  formatISO,
  getDay,
  getTime,
  isAfter,
  parseISO,
  subDays,
  subMonths,
  subWeeks
} from 'date-fns';
import { INITAL_SOURCE } from '@/constants/billing';
import { formatMoney } from '@/utils/format';
export enum By {
  month,
  week
}
type OverviewState = {
  selectedMonth: number;
  selectedYear: number;
  selectedWeek: number;
  source: any[][];
  cpu: number;
  storage: number;
  memory: number;
  by: By;
  preItems: BillingItem[],
  // amount: number,
  // rechargeAmount: number,
  // pre: {
  //   preIn: number;
  //   preOut: number;
  // };
  // billingData:BillingData;
  items: BillingItem[];
  setMonth: (month: number) => void;
  setYear: (year: number) => void;
  setWeek: (week: number) => void;
  setSource: (source: any[][]) => void;
  swithBy: (target: By) => void;
  updateSource: () => void;
};

const useOverviewStore = create<OverviewState>()(
  devtools(
    // persist(
      immer((set, get) => ({
        selectedMonth: NOW_MONTH,
        selectedYear: NOW_YEAR,
        selectedWeek: NOW_WEEK,
        by: By.month,
        cpu: -1,
        storage: -1,
        memory: -1,
        preItems: [],
        items: [],
        source: INITAL_SOURCE as any,
        setWeek: (week) => set({ selectedWeek: week }),
        setMonth: (month) => set({ selectedMonth: month }),
        setYear: (year) => set({ selectedYear: year }),
        setSource: (source) => set({ source: source }),
        swithBy: (target: By) => set({ by: target }),
        updateSource: async () => {
          let start = new Date(get().selectedYear, get().selectedMonth)

          let end: Date;
          let pre: Date;
          if (get().by === By.month) {
            end = addMonths(start, 1);
            pre = subMonths(start, 1);
          } else {
            // 保证是第一个周的周日
            start = addWeeks(subDays(start, getDay(start)),get().selectedWeek)
            end = addWeeks(start, 1);
            pre = subWeeks(start, 1);
          }
          console.log(pre, start, end)
          // addDays(get().by===By.month ? )
          const spec: BillingSpec = {
            startTime: formatISO(start, { representation: 'complete' }),
            endTime: formatISO(end, { representation: 'complete' }),
            page: 1,
            pageSize: 100,
            type: -1,
            orderID: ''
          };
          const { data } = await request<BillingData>('/api/billing', {
            method: 'POST',
            data: { spec }
          });

          set((state) => {
            state.source = INITAL_SOURCE as any;
            state.items = [];
            state.preItems = [];
            state.cpu = 0
            state.storage = 0
            state.memory = 0
          });
          if (data.status.pageLength === 0) {
            return;
          }
          set((state) => {
            const deductionAmount = data.status.deductionAmount;
            state.cpu = deductionAmount.cpu;
            state.storage = deductionAmount.storage;
            state.memory = deductionAmount.memory;
            state.items = data.status.item;
            // 扣费source
            state.source.push(
              ...data.status.item
                .filter((item) => item.type === 0 && isAfter(parseISO(item.time), start))
                .map<[number, number, number, number, number]>((item) => [
                  getTime(parseISO(item.time)),
                  item.costs.cpu,
                  item.costs.memory,
                  item.costs.storage,
                  item.amount
                ])
                .reduce<[number, number, number, number, number][]>((pre, cur) => {
                  if (pre.length !== 0) {
                    const precost = pre[pre.length - 1];
                    if (precost[0] === cur[0]) {
                      precost[1] += cur[1];
                      precost[2] += cur[2];
                      precost[3] += cur[3];
                      precost[4] += cur[4];
                      return pre;
                    }
                  }
                  pre.push(cur);

                  return pre;
                }, [])
                .map((x) => [
                  x[0],
                  formatMoney(x[1]),
                  formatMoney(x[2]),
                  formatMoney(x[3]),
                  formatMoney(x[4])
                ])
                .reverse()
            );
            state.preItems = data.status.item.filter(item=>getTime(parseISO(item.time)) < getTime(pre))

          });
        }
      }))
      // { name: 'overview_store' }
    // )
  )
);

export default useOverviewStore;
