import { TableHeaders } from '@/constants/billing';
import { Billing } from '@/types/billing';
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
export function BillingTable({data}: {data: Billing[]}) {
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
        {data.map((item) => {
          return (
            <Tr key={item.order}>
              <Td>{item.order}</Td>
              <Td>{item.transactionHour}</Td>
              <Td>{item.type}</Td>
              <Td>{item.cpu}</Td>
              <Td>{item.memory}</Td>
              <Td>{item.disk}</Td>
              <Td>{item.pv}</Td>
              <Td>{item.price}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  </TableContainer>
}