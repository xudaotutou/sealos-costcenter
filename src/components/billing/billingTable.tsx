import { TableHeaders } from '@/constants/billing';
import { BillingItem } from '@/types/billing';
import lineDown from '@/assert/lineDown.svg'
import lineUp from '@/assert/lineUp.svg'
import {
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
import { format, parseISO } from 'date-fns';
import { formatMoney } from '@/utils/format';
export function BillingTable({ data }: { data: BillingItem[] }) {
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
            <Tr key={item.order_id} fontSize={'12px'}>
              <Td >{item.order_id}</Td>
              <Td>{format(parseISO(item.time), 'MM-dd HH:mm')}</Td>
              <Td>
                <Flex w={'66px'} h={'28px'} bg={!item.type ? '#EBF7FD': '#E6F6F6'} borderRadius='24px' color={!item.type ? '#0884DD' : '#00A9A6'} align={'center'} justify={'space-evenly'}>
                  <Img src={!item.type ? lineDown.src : lineUp.src} w='13.14px' ></Img>
                  <Text>{!item.type ? '扣费' : '充值'}</Text>
                </Flex>
                </Td>

              <Td>{!item.type ? '￥'+ formatMoney(item.costs.cpu) : '-'}</Td>
              <Td>{!item.type ? '￥'+ formatMoney(item.costs.memory) :'-'}</Td>
              <Td>{!item.type ? '￥'+ formatMoney(item.costs.storage) :'-'}</Td>
              <Td>{'￥'+ formatMoney(item.amount)}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  </TableContainer>
}