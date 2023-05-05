
import { Box, Flex, Heading, Img, Text, } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { BillingTable } from '@/pages/billing/components/billingTable';
import { SelectMonth } from './components/selectMonth';
import UserCard from './components/user';
import bar_icon from '@/assert/bar_chart_4_bars.png'
import { SelectYear } from './components/selectYear';
import { Trend } from './trend';
import { Buget } from './buget';
import { Cost } from './cost';


export default function CostOverview() {
  // const { data } = useQuery(['getUserOrders'], () => request('/api/order'));
  // const [year, setYear] = useState(() => 2000);

  return <Flex h={'100%'}>
    <Box bg='white' pt="29px" pl="33px" pr="24px" overflow={'auto'} borderRadius="12px">
      <Flex>
        <Flex w={'116px'} justify="space-between" mr='24px'>
          <Img src={bar_icon.src} w={'24px'} h={'24px'}></Img>
          <Heading size='lg'>成本总览</Heading>
        </Flex>
        <SelectYear years={[2022,2023]} ></SelectYear>
        {/* <SelectMonth></SelectMonth> */}
      </Flex>
      <Flex flexDirection={'column'}>
        <Trend></Trend>
        <Box>
          <Heading size={'sm'}>最近交易</Heading>
          <BillingTable data={[]}></BillingTable>
        </Box>
      </Flex>
    </Box>
    <Box
      flexShrink={0}
      w={'375px'}
      h="100%"
      ml={2}
      py={'32px'}
      px={'24px'}
      overflowY="auto"
      borderRadius="12px"
    >
      <UserCard />
      <Buget></Buget>
      <Cost></Cost>
    </Box>
  </Flex>;
}
