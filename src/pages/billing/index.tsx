import { MockBillData } from '@/mock/billing';
import {
  Box,
  Flex,
  Input,
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
import { TableHeaders } from '@/constants/billing';

export default function Billing() {
  return (
    <Flex flexDirection="column" w="100%" h="100%" bg={'white'} pl="32px">
      <Text fontWeight={500} fontSize="20px" mt="32px">
        账单明细
      </Text>
      <Flex mt="24px" alignItems={'center'}>
        <Box>
          <Text>交易时间</Text>
        </Box>
        <Box>
          <Text>类型</Text>
        </Box>

        <Flex alignItems={'center'}>
          <Text fontSize={'12px'} w="80px">
            计费周期
          </Text>
          <Select>
            <option value="option1">小时</option>
            <option value="option2">dsa</option>
            <option value="option3">Option 3</option>
          </Select>
        </Flex>
        <Box>
          <Input size="sm"></Input>
        </Box>
      </Flex>
      <TableContainer w="100%" mt="36px" pr="46px" className={styles.container}>
        <Table variant="simple">
          <Thead>
            <Tr>
              {TableHeaders?.map((item) => (
                <Th key={item}>{item} </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {MockBillData?.map((item) => {
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
  );
}
