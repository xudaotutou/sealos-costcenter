import { MockValuationStandard } from '@/mock/valuation';
import { Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';

export default function Valuation() {
  const { t } = useTranslation();

  return (
    <Flex w="100%" h="100%" bg={'white'} flexDirection="column" alignItems="center">
      <Text mt="60px" fontSize={'xl'} fontWeight="medium" color={'black'}>
        {t('Valuation.Standard')}
      </Text>
      <TableContainer maxW="720px" w="100%" mt="36px" px={'12px'} className={styles.container}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>{t('Valuation.Name')}</Th>
              <Th>{t('Valuation.Unit')}</Th>
              <Th>{t('Valuation.Price')}</Th>
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
