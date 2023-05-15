import { TableHeaders } from '@/constants/billing';
import { BillingTableItem } from '@/types/billing';
import lineDown from '@/assert/lineDown.svg'
import {
  Box,
  Flex,
  Img,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
export function BillingTable({ data }: { data: BillingTableItem[] }) {
  console.log(data)
  return <TableContainer w="100%" mt="36px">
    <Table variant="simple">
      <Thead>
        <Tr>
          {TableHeaders?.map((item) => (
            <Th key={item}>{item} </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data?.map((item) => {
          return (
            <Tr key={item.order} fontSize={'12px'}>
              <Td >{item.order}</Td>
              <Td>{item.transactionHour}</Td>
              <Td>{item.type === 0 ?
                <Flex w={'66px'} h={'28px'} bg='#EBF7FD' borderRadius='24px' color='#0884DD' align={'center'} justify={'space-evenly'}>
                  <Img src={lineDown.src} w='13.14px'></Img>
                  <Text>支出</Text>
                </Flex>
                : <Flex w={'66px'} h={'28px'} bg='#E6F6F6' borderRadius='24px' color='#00A9A6' align={'center'} justify={'space-evenly'}>
                  <Img src={lineDown.src} w='13.14px' rotate={'180deg'}>
                    <Text>支出</Text>
                  </Img>
                </Flex>
              }</Td>
              <Td>{item.cpu}</Td>
              <Td>{item.memory}</Td>
              <Td>{item.storage}</Td>
              {/* <Td>{item.pv}</Td> */}
              <Td>{item.amount}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  </TableContainer>
}