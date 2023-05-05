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
export type Billing = {
  order: string;
  transactionHour: string;
  type: string;
  cpu: string;
  memory: string;
  disk: string;
  pv: string;
  price: string;
};
