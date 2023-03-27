import { MockValuationStandard } from '@/mock/valuation';
import {
  Box,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import styles from './index.module.scss';

export default function Valuation() {
  return (
    <Flex w="100%" h="100%" bg={'white'} flexDirection="column" alignItems="center">
      <Text mt="60px" fontSize={'xl'} fontWeight="medium">
        计价标准
      </Text>
      <TableContainer maxW="720px" w="100%" mt="36px" className={styles.container}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>资源名</Th>
              <Th>单位</Th>
              <Th>金额</Th>
            </Tr>
          </Thead>
          <Tbody>
            {MockValuationStandard?.map((item) => {
              return (
                <Tr key={item?.name}>
                  <Td>{item?.name}</Td>
                  <Td>{item?.unit}</Td>
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
