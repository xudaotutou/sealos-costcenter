/* eslint-disable @next/next/no-img-element */
import useRecharge from '@/hooks/useRecharge';
import request from '@/service/request';
import useSessionStore from '@/stores/session';
import { formatMoney } from '@/utils/format';
import { Box, Button, Flex, Img, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import styles from './user.module.scss';

export default function UserCard() {
  const session = useSessionStore().getSession();
  const { isOpen, onOpen, RechargeModal } = useRecharge();
  const { data } = useQuery(['getAccount'], () => request('/api/account/getAmount'));

  let real_balance = data?.data?.balance ?? 0;
  if (data?.data?.deductionBalance) {
    real_balance = real_balance - data.data.deductionBalance;
  }

  return (
    <Flex className={styles.userCard} boxShadow={'0 4px #BCBFC3,0 8px #DFE2E6'} aspectRatio={'2/1'} mb={'12px'} shrink={[1,1,1,0]}>
      <Box zIndex='2' flex={'1'} >
        <Flex alignItems={'center'} >
          
          {/* <Text></Text> */}
          <Text>
            {session?.user?.name}
          </Text>

          <Img
            ml='auto'
            src={session?.user?.avatar || ''}
            alt="user"
            width={'36px'}
            height={'36px'}
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
          <Button ml="auto" w="78px" h="32px" bg={'white'} color="black" onClick={onOpen}>
            充值
          </Button>
        </Flex>
        {isOpen && <RechargeModal balance={'' + formatMoney(real_balance)} />}
      </Box>
    </Flex>
  );
}
