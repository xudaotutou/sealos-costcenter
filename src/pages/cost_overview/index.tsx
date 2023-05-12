
import { Box, Flex, Heading, Img, Text, } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { BillingTable } from '@/components/billing/billingTable';
import { SelectMonth } from '../../components/cost_overview/components/selectMonth';
import UserCard from '../../components/cost_overview/components/user';
import bar_icon from '@/assert/bar_chart_4_bars.png'
import { SelectYear } from '../../components/cost_overview/components/selectYear';
import { Trend } from '../../components/cost_overview/trend';
import { Buget } from '../../components/cost_overview/buget';
import { Cost } from '../../components/cost_overview/cost';
import { memo, useCallback, useEffect } from 'react';
import useOverviewStore from '@/stores/overview';
import { LIST_TYPE } from '@/constants/billing';
import { BillingTableItem, BillingItem } from '@/types/billing';
import { formatMoney } from '@/utils/format';


export default function CostOverview() {
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
  const billingdata = useOverviewStore(state => state.billingData)
  return <Flex h={'100%'}>
    <Box bg='white' pt="29px" pl="33px" pr="24px" overflow={'auto'} borderRadius="12px" minW={'963px'}>
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
          <BillingTable data={billingdata.status.item
            .map<BillingTableItem>((item: BillingItem) => ({
              order: item.order_id,
              type: LIST_TYPE[item.type + 1].title,
              cpu: '￥' + formatMoney(item.costs.cpu),
              memory: '￥' + formatMoney(item.costs.memory),
              storage: '￥' + formatMoney(item.costs.storage),
              amount: '￥' + formatMoney(item.amount),
              transactionHour: item.time
            }))
            .filter((v, i) => i < 5)
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
