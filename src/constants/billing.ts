export const TableHeaders = [
  '订单号',
  '交易时间',
  '类型',
  'CPU',
  '内存',
  '本地硬盘',
  '总金额'
];
export const CATEGORY = ['CPU', '内存', '本地硬盘'];
export const INITAL_SOURCE = [['date', 'cpu', 'memory', 'storage','amount']] as const
export const LIST_TYPE: { title: string, value: -1 | 0 | 1 }[] = [
  { title: '全部', value: -1 },
  { title: '扣费', value: 0 },
  { title: '充值', value: 1 },
]