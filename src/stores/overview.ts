import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { NOW_MONTH, NOW_WEEK, NOW_YEAR } from '@/constants/payment';
import request from '@/service/request';
import { BillingData, BillingSpec } from '@/types/billing';
import {
  addDays,
  addMonths,
  addWeeks,
  format,
  formatISO,
  parse,
  parseISO,
  startOfMonth
} from 'date-fns';
import { INITAL_SOURCE } from '@/constants/billing';
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
  items: BillingData['status']['item'];
  setMonth: (month: number) => void;
  setYear: (year: number) => void;
  setWeek: (week: number) => void;
  setSource: (source: any[][]) => void;
  swithBy: (target: By) => void;
  updateSource: () => void;
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
        items: [],
        source: [['name', 'line', 'pie']],
        setWeek: (week) => set({ selectedWeek: week }),
        setMonth: (month) => set({ selectedMonth: month }),
        setYear: (year) => set({ selectedYear: year }),
        setSource: (source) => set({ source: source }),
        swithBy: (target: By) => set({ by: target }),
        updateSource: async () => {
          // console.log(startOfMonth())
          let start = addWeeks(
            new Date(get().selectedYear, get().selectedMonth),
            get().selectedWeek
          );
          let end: Date;
          if (get().by === By.month) {
            end = addMonths(start, 1);
          } else {
            end = addWeeks(start, 1);
          }
          // addDays(get().by===By.month ? )
          const spec: BillingSpec = {
            startTime: formatISO(start, { representation: 'complete' }),
            endTime: formatISO(end, { representation: 'complete' }),
            page: 1,
            pageSize: 100,
            type: -1,
            orderID: ''
          };
          // const { data } = await request<BillingData>('/api/billing', {
          //   method: 'POST',
          //   data: { spec }
          // });
          const data: BillingData = {
            apiVersion: 'account.sealos.io/v1',
            kind: 'BillingRecordQuery',
            metadata: {},
            spec: {
              endTime: '2023-05-12T18:23:46+08:00',
              orderID: '',
              page: 1,
              pageSize: 10,
              startTime: '2022-02-01T00:00:00+08:00',
              type: -1
            },
            status: {
              deductionAmount: { cpu: 2303661, memory: 957726, storage: 67966 },
              item: [
                {
                  amount: 90494,
                  costs: { cpu: 62578, memory: 26004, storage: 1912 },
                  order_id: '3f35d29e-f0ad-11ed-89e5-fe3500250883',
                  owner: 'qdees3ag',
                  time: '2023-05-11T10:00:00Z',
                  type: 0
                },
                {
                  amount: 90494,
                  costs: { cpu: 62578, memory: 26004, storage: 1912 },
                  order_id: 'efc94b93-f0a4-11ed-89e5-fe3500250883',
                  owner: 'qdees3ag',
                  time: '2023-05-12T09:00:00Z',
                  type: 0
                },
                {
                  amount: 87224,
                  costs: { cpu: 60300, memory: 25080, storage: 1844 },
                  order_id: '96204cb6-f09c-11ed-89e5-fe3500250883',
                  owner: 'qdees3ag',
                  time: '2023-05-12T08:00:00Z',
                  type: 0
                },
                {
                  amount: 88859,
                  costs: { cpu: 61439, memory: 25542, storage: 1878 },
                  order_id: '41dd3354-f094-11ed-89e5-fe3500250883',
                  owner: 'qdees3ag',
                  time: '2023-05-13T07:00:00Z',
                  type: 0
                },
                {
                  amount: 93697,
                  costs: { cpu: 64789, memory: 26928, storage: 1980 },
                  order_id: 'b54e9f2a-f08b-11ed-89e5-fe3500250883',
                  owner: 'qdees3ag',
                  time: '2023-05-14T06:00:00Z',
                  type: 0
                },
                {
                  amount: 93697,
                  costs: { cpu: 64789, memory: 26928, storage: 1980 },
                  order_id: '4be83912-f083-11ed-89e5-fe3500250883',
                  owner: 'qdees3ag',
                  time: '2023-05-14T05:00:00Z',
                  type: 0
                },
                {
                  amount: 95332,
                  costs: { cpu: 65928, memory: 27390, storage: 2014 },
                  order_id: '1a8fd40e-f07b-11ed-89e5-fe3500250883',
                  owner: 'qdees3ag',
                  time: '2023-05-14T04:00:00Z',
                  type: 0
                },
                {
                  amount: 93697,
                  costs: { cpu: 64789, memory: 26928, storage: 1980 },
                  order_id: 'a6dfb9d3-f072-11ed-89e5-fe3500250883',
                  owner: 'qdees3ag',
                  time: '2023-05-15T03:00:00Z',
                  type: 0
                },
                {
                  amount: 95332,
                  costs: { cpu: 65928, memory: 27390, storage: 2014 },
                  order_id: '34445b47-f06a-11ed-89e5-fe3500250883',
                  owner: 'qdees3ag',
                  time: '2023-05-15T02:00:00Z',
                  type: 0
                },
                {
                  amount: 95332,
                  costs: { cpu: 65928, memory: 27390, storage: 2014 },
                  order_id: 'e2a9f471-f061-11ed-89e5-fe3500250883',
                  owner: 'qdees3ag',
                  time: '2023-05-16T01:00:00Z',
                  type: 0
                }
              ],
              pageLength: 4,
              rechargeAmount: 0
            }
          };
          console.log('update source');
          set((state) => {
            state.source = INITAL_SOURCE;
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
            console.log(state);
            state.source.push(
              // ...data.status.item.flatMap((item) => [
              //   [format(parseISO(item.time),'MM-dd'), 'cpu', (item.costs.cpu / 1000000)],
              //   [format(parseISO(item.time),'MM-dd'), 'memory', (item.costs.memory/1000000)],
              //   [format(parseISO(item.time),'MM-dd'), 'storage', (item.costs.storage/1000000)]
              // ])
              ...data.status.item
                .map<[string, number, number, number, number]>((item) => [
                  format(parseISO(item.time), 'MM-dd'),
                  item.costs.cpu,
                  item.costs.memory,
                  item.costs.storage,
                  item.amount
                ])
                .reduce<[string, number, number, number, number][]>((pre, cur) => {
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
            );
          });
        }
      })),
      { name: 'overview_store' }
    )
  )
);

export default useOverviewStore;
