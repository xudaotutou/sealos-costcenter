import { Box, Flex, Heading, Text, Img } from '@chakra-ui/react';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';
import letter_icon from '@/assert/format_letter_spacing_standard.png'
export default function Valuation() {
  const { t } = useTranslation();
  const data = [
    { title: 'CPU', price: [0.1, 0.1, 0.1, 0.1, 0.1], unit: '核' },
    { title: '内存', price: [0.1, 0.1, 0.1, 0.1, 0.1], unit: 'G' },
    { title: '存储', price: [0.1, 0.1, 0.1, 0.1, 0.1], unit: 'G' },
    { title: '带宽', price: [0.1, 0.1, 0.1, 0.1, 0.1], unit: 'M' }]
  const cycle = ['天', '周', '月', '年']
  return (
    <Flex w="100%" h="100%" bg={'white'} flexDirection="column" alignItems="center" p={'24px'}>
      {/* <Text mt="60px" fontSize={'xl'} fontWeight="medium" color={'black'} mb="12px" alignSelf={"flex-start"}>
        {t('Valuation.Standard')}
      </Text> */}

      <Flex w={'116px'} justify="space-between" mr='24px' alignSelf={'flex-start'} mb='80px'>
        <Img src={letter_icon.src} w={'24px'} h={'24px'}></Img>
        <Heading size='lg'>计价标准</Heading>
      </Flex>
      {/* <TableContainer maxW="720px" w="100%" mt="36px" px={'12px'} className={styles.container}>
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
      </TableContainer> */}
      <Flex gap={'24px'}>
        {data.map((item) => <Flex direction={"column"} key={item.title} justify="space-evenly" align={"center"} boxSizing='border-box' width='240px' height='339px' background='#F1F4F6' borderWidth={'1px'} borderColor='#EFF0F1' borderRadius='4px'>
          {/* <Flex  direction={"column"}> */}
          <Text>{item.title}</Text>
          <Heading w='127px' h='63px' display={'flex'} justifyContent="center" alignContent={'center'}>￥{item.price[0]}</Heading>
          <Text ml="4px">{item.unit}/小时</Text>
          <Box>
            {cycle.map((_item, idx) => <Flex key={idx} justify="space-between" w='192px' borderTop={"dashed 1px #DEE0E2"}>
              <Box>{item.price[idx + 1]}</Box>
              <Box>{`￥${item.unit}/${_item}`}</Box>
            </Flex>)}
          </Box>
          {/* </Flex> */}
        </Flex>)}
      </Flex>
    </Flex>
  );
}
