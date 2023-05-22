
import { Box, Flex, Heading, Img, Text, } from '@chakra-ui/react';
import { BillingTable } from '@/components/billing/billingTable';
import UserCard from '../../components/cost_overview/components/user';
import bar_icon from '@/assert/bar_chart_4_bars.png'
// import { SelectYear } from '../../components/cost_overview/components/selectYear';
import { Trend } from '../../components/cost_overview/trend';
import { Buget } from '../../components/cost_overview/buget';
import { Cost } from '../../components/cost_overview/cost';
import { useEffect } from 'react';
import useOverviewStore from '@/stores/overview';
import SelectRange from '@/components/billing/selectDateRange';

function CostOverview() {
  const { updateSource, items: billingItems, startTime, endTime } = useOverviewStore()
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    timer = setTimeout(() => {
      updateSource()
    }, 1000);
    console.log('updateSource')
    return () => {
      clearTimeout(timer)
    }
  }, [startTime, endTime])
  // const billingItems = useOverviewStore(state => state.items)
  return <Flex h={'100%'}>
    <Flex bg='white' p="24px" borderRadius="12px" direction='column'
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
          <Heading size={'sm'}>最近交易</Heading>
          <Box overflowX={'auto'}>
            <BillingTable data={
              billingItems
                .filter((v, i) => i < 3) || []
            }></BillingTable>
          </Box>
        </Flex>
      </Flex>
    </Flex>
    <Flex
      flexShrink={0}
      w={'375px'}
      h="100%"
      pt={'32px'}
      px={'24px'}
      overflowY="auto"
      overflowX={'hidden'}
      display={['none', 'none', 'none', 'flex']}
      direction={'column'}
      justify={'space-evenly'}
    >
      <UserCard />
      <Buget></Buget>
      <Cost></Cost>
    </Flex>
  </Flex>
}
export default CostOverview