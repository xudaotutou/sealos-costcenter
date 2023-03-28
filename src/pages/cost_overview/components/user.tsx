/* eslint-disable @next/next/no-img-element */
import request from '@/service/request';
import useSessionStore from '@/stores/session';
import { formatMoney } from '@/utils/format';
import { Flex, Text, Box, Button } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import styles from './user.module.scss';

export default function UserCard() {
  const session = useSessionStore().getSession();

  const { data } = useQuery(['getAccount'], () => request('/api/account/getAmount'));

  let real_balance = data?.data?.data?.balance ?? 0;
  if (data?.data?.data?.deductionBalance) {
    real_balance = real_balance - data.data.data.deductionBalance;
  }
  console.log(real_balance);

  return (
    <div className={styles.userCard}>
      <Flex alignItems={'center'}>
        <Text>188***dsadasd</Text>
        <Text ml="auto" mr="6px">
          {session?.user?.name}
        </Text>

        <img
          src={session?.user?.avatar || ''}
          alt="user"
          width={90}
          height={90}
          className={styles.avatar}
        />
      </Flex>
      <Text fontSize="12px" fontWeight="400" mt="30px">
        当前余额
      </Text>
      <Flex alignItems="center">
        <Text fontSize="24px" fontWeight="500">
          ¥ {formatMoney(real_balance)}
        </Text>
        <Button ml="auto">充值</Button>
      </Flex>
    </div>
  );
}
