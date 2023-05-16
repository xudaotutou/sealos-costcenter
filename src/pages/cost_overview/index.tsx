
import { Box, Flex, Heading, Img, Text, } from '@chakra-ui/react';
import { BillingTable } from '@/components/billing/billingTable';
import UserCard from '../../components/cost_overview/components/user';
import bar_icon from '@/assert/bar_chart_4_bars.png'
import { SelectYear } from '../../components/cost_overview/components/selectYear';
import { Trend } from '../../components/cost_overview/trend';
import { Buget } from '../../components/cost_overview/buget';
import { Cost } from '../../components/cost_overview/cost';
import { useEffect } from 'react';
import useOverviewStore from '@/stores/overview';


function CostOverview() {
  const { updateSource, selectedMonth, selectedWeek, selectedYear, by } = useOverviewStore()
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    timer = setTimeout(() => {
      updateSource()
    }, 1000);
    return () => {
      clearTimeout(timer)
    }
  }, [selectedMonth, selectedWeek, selectedYear, by])
  const billingItems = useOverviewStore(state => state.items)
  return <Flex h={'100%'}>
    <Box bg='white' p="24px" overflow={'auto'} borderRadius="12px" minW={'980px'}>
      <Flex>
        <Flex w={'116px'} justify="space-between" mr='24px'>
          <Img src={bar_icon.src} w={'24px'} h={'24px'}></Img>
          <Heading size='lg'>成本总览</Heading>
        </Flex>
        <SelectYear></SelectYear>
      </Flex>
      <Flex flexDirection={'column'}>
        <Trend></Trend>
        <Box>
          <Heading size={'sm'}>最近交易</Heading>
          <BillingTable data={
            billingItems
              .filter((v, i) => i < 5) || []
          }></BillingTable>
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
  </Flex>
}
export default CostOverview