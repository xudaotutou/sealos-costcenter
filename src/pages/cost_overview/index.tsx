import { TableHeaders } from '@/constants/billing';
import { MockBillingData } from '@/mock/billing';
import {
  Box,
  Flex,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import styles from './index.module.scss';

export default function CostOverview() {
  return (
    <Flex w="100%" h="100%">
      <Box w="100%" bg={'white'} pt="29px" pl="33px" pr="24px">
        <Flex flexDirection={'column'}>
          <div>成本总览</div>
          <div>成本趋势</div>
          <div>最近交易</div>
          <TableContainer w="100%" mt="36px" className={styles.container}>
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
      >
        <div className={styles.userCard}></div>
        <Box mt="20px">
          <Text>收支</Text>
          <Select>
            <option value="option1">小时</option>
            <option value="option2">dsa</option>
            <option value="option3">Option 3</option>
          </Select>
        </Box>
        <Flex justifyContent={'space-around'} mt="20px">
          <Box w={'127px'} h={'146px'} bg={'#F9FAFD'} borderRadius={'8px'}></Box>
          <Box w={'127px'} h={'146px'} bg={'#F9FAFD'} borderRadius={'8px'}></Box>
        </Flex>
        <Box mt="20px">
          <Text>成本分布</Text>
          <Select>
            <option value="option1">小时</option>
            <option value="option2">dsa</option>
            <option value="option3">Option 3</option>
          </Select>
        </Box>
      </Box>
    </Flex>
  );
}
