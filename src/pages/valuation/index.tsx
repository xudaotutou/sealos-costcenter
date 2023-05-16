import { Box, Flex, Heading, Text, Img } from '@chakra-ui/react';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';
import letter_icon from '@/assert/format_letter_spacing_standard.svg'

import { useQuery } from '@tanstack/react-query';
import request from '@/service/request';
import { ValuationData } from '@/types/valuation';
import { valuationMap } from '@/constants/payment';
export default function Valuation() {
  const { data: _data } = useQuery(['valuation'], () => request<ValuationData>('/api/price'));
  const data =
    _data?.data.status.billingRecords
      .filter(x => valuationMap.has(x.resourceType))
      .map(x => {
        const props = valuationMap.get(x.resourceType)!
        return ({
          title: x.resourceType,
          price: [1, 24, 168, 720, 8760].map(v => v * x.price * (props.scale || 1) / 1000000),
          unit: props.unit,
          bg: props.bg
        })
      })
  const cycle = ['天', '周', '月', '年']
  return (
    // <KeepAlive cacheKey='VALUATION'>
    <Flex w="100%" h="100%" bg={'white'} flexDirection="column" alignItems="center" p={'24px'}>

      <Flex w={'116px'} justify="space-between" mr='24px' alignSelf={'flex-start'} mb='80px'>
        <Img src={letter_icon.src} w={'24px'} h={'24px'}></Img>
        <Heading size='lg'>计价标准</Heading>
      </Flex>
      <Flex gap={'24px'}>
        {data?.map((item) => <Flex direction={"column"} key={item.title} justify="space-evenly" align={"center"} boxSizing='border-box' width='240px' height='339px' background='#F1F4F6' borderWidth={'1px'} borderColor='#EFF0F1' borderRadius='4px'>
          {/* <Flex  direction={"column"}> */}
          <Flex align={'center'}>
            <Box borderRadius='2px' bg={item.bg} w={'16px'} h={'16px'} mr={'8px'}></Box>
            <Text fontSize={'16px'}>{item.title}</Text>
          </Flex>
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
    // </KeepAlive>
  );
}
