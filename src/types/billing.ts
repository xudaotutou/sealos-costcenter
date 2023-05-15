type OneDigitString = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
// 方便起见，用字符串长度代表数值
type HowDigital<T extends string, Ret extends string = ''> = T extends ''
  ? Ret
  : T extends `${infer _}${infer next}`
  ? HowDigital<next, `${OneDigitString}${Ret}`>
  : Ret;
type Four = HowDigital<'1111'>;
type Two = HowDigital<'22'>;
// type TransactionHour = `${Four}-${Four}-${Two} ${Two}:${Two}:${Two}`
export type BillingTableItem = {
  order: string;
  transactionHour: string;
  type: number;
  cpu: string;
  memory: string;
  storage: string;
  // pv: string;
  amount: string;
};

export type BillingSpec =
  | {
      page: number; //给定结果数据的page页
      pageSize: number; //设置返回数据每页数据大小
      startTime: string; //数据在 [startTime-endTime]之间，包括startTime和endTime
      endTime: string;
      type: 0 | 1 | -1; //0为扣费，1为充值；用于billing数据查找：如为-1则查找type为0和1的数据，如果给定type值则查找type为给定值的数据
      owner?: string; //用于billing数据中查找的owner字段值
    }
  | {
      orderID: string; //如果给定orderId，则查找该id的值，该值为唯一值，因此当orderId给定时忽略其他查找限定值
    };
export type BillingItem = {
  amount: number;
  costs: {
    cpu: number;
    memory: number;
    storage: number;
  };
  order_id: string;
  owner: string;
  time: string;
  type: 0 | -1 | 1;
};
export type BillingData = {
  apiVersion: 'account.sealos.io/v1';
  kind: 'BillingRecordQuery';
  metadata: any;
  spec: BillingSpec;
  status: {
    deductionAmount: {
      cpu: number;
      memory: number;
      storage: number;
    };
    item: BillingItem[];
    pageLength: number;
    rechargeAmount: number;
  };
};
