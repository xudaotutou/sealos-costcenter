import { MockBillingData } from '@/mock/billing';
import { BillingTable } from './components/billingTable';
import {
  Box,
  Flex,
  Input,
  Text,
} from '@chakra-ui/react';
import styles from './index.module.scss';

export default function Billing() {
  return (
    <Flex flexDirection="column" w="100%" h="100%" bg={'white'} pl="32px" pr="46px">
      <Text fontWeight={500} fontSize="20px" mt="32px">
        账单明细
      </Text>
      <Flex mt="24px" alignItems={'center'}>
        <Text fontSize={'12px'}>交易时间</Text>
        <Box w={'310px'} h={'32px'} bg="#F4F6F8" mx={'16px'}></Box>
        <Text fontSize={'12px'}>类型</Text>
        <Box w={'104px'} h={'32px'} bg="#F4F6F8" mx={'16px'}></Box>

        <Text fontSize={'12px'}>计费周期</Text>
        <Box w={'104px'} h={'32px'} bg="#F4F6F8" mx={'16px'}></Box>
        <Box ml={'auto'}>
          <Input size="sm"></Input>
        </Box>
      </Flex>
      {/* <TableContainer w="100%" mt="36px" className={styles.container}>
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
      </TableContainer> */}
      {MockBillingData && <BillingTable data={MockBillingData}></BillingTable>}
    </Flex>
  );
}
