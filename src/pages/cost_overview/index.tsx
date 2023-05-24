
import { Box, Flex, Heading, Img } from '@chakra-ui/react';
import { BillingTable } from '@/components/billing/billingTable';
import UserCard from '../../components/cost_overview/components/user';
import bar_icon from '@/assert/bar_chart_4_bars_black.svg'
import { Trend } from '../../components/cost_overview/trend';
import { Buget } from '../../components/cost_overview/buget';
import { Cost } from '../../components/cost_overview/cost';
import { useEffect, useMemo } from 'react';
import useOverviewStore from '@/stores/overview';
import SelectRange from '@/components/billing/selectDateRange';
import useNotEnough from '@/hooks/useNotEnough';
import { useQuery } from '@tanstack/react-query';
import { INITAL_SOURCE } from '@/constants/billing';
import { BillingSpec, BillingData } from '@/types/billing';
import { formatMoney } from '@/utils/format';
import { subSeconds, addDays, differenceInDays, subDays, formatISO, set, isAfter, parseISO, format, isBefore } from 'date-fns';
import request from '@/service/request';
function CostOverview() {
  // const updateSource = useOverviewStore(state => state.updateSource)
  // const billingItems = useOverviewStore(state => state.items)
  const startTime = useOverviewStore(state => state.startTime)
  const endTime = useOverviewStore(state => state.endTime)
  const { NotEnoughModal } = useNotEnough();

  const { data, isLoading, isSuccess, isError } = useQuery(
    ['billing', { startTime, endTime }],
    () => {
      const start = startTime;
      const end = subSeconds(addDays(endTime, 1), 1);
      const delta = differenceInDays(end, start);
      // console.log(delta, start, end);
      const pre = subDays(start, delta);
      // console.log(pre, start, end)
      const spec: BillingSpec = {
        startTime: formatISO(pre, { representation: 'complete' }),
        // pre,
        endTime: formatISO(end, { representation: 'complete' }),
        // start,
        page: 1,
        pageSize: (delta + 1) * 48,
        type: -1,
        orderID: ''
      };
      return request<any, { data: BillingData }, { spec: BillingSpec }>('/api/billing', {
        method: 'POST',
        data: {
          spec
        }
      })
    }
  )
  const billingItems = useMemo(() => data?.data.status.item.filter((v, i) => i < 3) || [], [data])

  return <><Flex h={'100%'}>
    <Flex bg='white' p="24px" borderRadius="8px" direction='column'
      flexGrow={'1'}
      flex={'1'}
      overflowY={'auto'}

    >
      <Flex wrap={'wrap'}>
        <Flex
          w={'116px'}
          mb={'24px'}
          justify="space-between" mr='24px'
          align={'center'}
        >
          <Img src={bar_icon.src} w={'24px'} h={'24px'}></Img>
          <Heading size='lg'>成本总览</Heading>
        </Flex>
        <Box mb={'24px'}>
          <SelectRange isDisabled={false}></SelectRange>
        </Box>
      </Flex>

      <Flex flexDirection={'column'}>
        <Box
          borderRadius="12px"
          display={['block', 'block', 'block', 'none']}
        >
          <Flex direction={['column', 'column', 'row', 'row']} justify={'space-between'} >
            <Box alignSelf={'center'}><UserCard />
            </Box>
            <Buget></Buget>
          </Flex>
          <Cost></Cost>
        </Box>
        <Trend></Trend>
        <Flex direction={'column'} h={'0'} flex={1}>
          <Heading size={'sm'} mb={'36px'}>最近交易</Heading>
          <Box overflowX={'auto'}>
            <BillingTable data={
              billingItems
            }></BillingTable>
          </Box>
        </Flex>
      </Flex>
    </Flex>
    <Flex
      flexShrink={0}
      w={'375px'}
      h="100%"
      pt={'24px'}
      px={'24px'}
      overflowY="auto"
      overflowX={'hidden'}
      display={['none', 'none', 'none', 'flex']}
      direction={'column'}
      justify={'flex-start'}
    >
      <UserCard />
      <Buget></Buget>
      <Cost></Cost>
    </Flex>
  </Flex>
    <NotEnoughModal></NotEnoughModal>
  </>
}
export default CostOverview