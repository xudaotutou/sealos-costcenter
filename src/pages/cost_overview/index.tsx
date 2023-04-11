import { TableHeaders } from '@/constants/billing';
import { MockBillingData } from '@/mock/billing';
import request from '@/service/request';
import { Box, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import UserCard from './components/user';
import styles from './index.module.scss';

export default function CostOverview() {
  const { data } = useQuery(['getUserOrders'], () => request('/api/order'));

  return (
    <Flex h={'100%'}>
      <Box bg={'white'} pt="29px" pl="33px" pr="24px" overflow={'auto'} borderRadius="12px">
        <Flex flexDirection={'column'}>
          <div>成本总览</div>
          <div>成本趋势</div>
          <div>最近交易</div>
          <TableContainer mt="36px" maxW={'886px'} className={styles.container}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  {TableHeaders?.map((item) => (
                    <Th key={item}>{item} </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {MockBillingData?.map((item) => {
                  return (
                    <Tr key={item?.order}>
                      <Td>{item?.order}</Td>
                      <Td>{item?.transactionHour}</Td>
                      <Td>{item?.type}</Td>
                      <Td>{item?.cpu}</Td>
                      <Td>{item?.memory}</Td>
                      <Td>{item?.disk}</Td>
                      <Td>{item?.pv}</Td>
                      <Td>{item?.price}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Box>
      <Box
        flexShrink={0}
        w={'375px'}
        h="100%"
        ml={2}
        bg={'white'}
        py={'32px'}
        px={'24px'}
        overflowY="auto"
        borderRadius="12px"
      >
        <UserCard />
        <Flex alignItems={'center'} mt="20px">
          <Text color={'#747F88'}>收支</Text>
          <Box ml="auto" bg="#F4F6F8" borderRadius="4px" w="105px" h="32px"></Box>
        </Flex>
        <Flex justifyContent={'space-around'} mt="20px">
          <Box w={'127px'} h={'146px'} bg={'#F9FAFD'} borderRadius={'8px'}></Box>
          <Box w={'127px'} h={'146px'} bg={'#F9FAFD'} borderRadius={'8px'}></Box>
        </Flex>
        <Flex alignItems={'center'} mt="33px">
          <Text color={'#747F88'}>成本分布</Text>
          <Box ml="auto" bg="#F4F6F8" borderRadius="4px" w="105px" h="32px"></Box>
        </Flex>
      </Box>
    </Flex>
  );
}
