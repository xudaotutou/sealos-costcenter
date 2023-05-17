
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
  const { updateSource, selectedMonth, selectedWeek, selectedYear, by, items: billingItems } = useOverviewStore()
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    timer = setTimeout(() => {
      updateSource()
      console.log(billingItems)
    }, 1000);
    return () => {
      clearTimeout(timer)
    }
  }, [selectedMonth, selectedWeek, selectedYear, by])
  // const billingItems = useOverviewStore(state => state.items)
  return <Flex h={'100%'}>
    <Flex bg='white' p="28px" borderRadius="12px" direction='column'
      flexGrow={'1'}
      flex={'1'}
      overflowY={'auto'}
    >
      <Flex>
        <Flex
          w={'116px'}
          justify="space-between" mr='24px'>
          <Img src={bar_icon.src} w={'24px'} h={'24px'}></Img>
          <Heading size='lg'>成本总览</Heading>
        </Flex>
        <SelectYear></SelectYear>
      </Flex>

      <Flex flexDirection={'column'}
      ><Box
        borderRadius="12px"
        mt={'24px'}
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
        <Box>
          <Heading size={'sm'}>最近交易</Heading>
          <Box w={'100%'} overflow={'scroll'}>
            <BillingTable data={
              billingItems
                .filter((v, i) => i < 5) || []
            }></BillingTable>
          </Box>
        </Box>
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
      // borderRadius="12px"
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