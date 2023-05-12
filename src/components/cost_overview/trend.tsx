
import { Heading, Box, Flex } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { memo } from 'react'
import { SelectMonth } from './components/selectMonth'

const LineChart = dynamic(
  () => import('./components/lineChart'),
  { ssr: false }
)

export const Trend = memo(function Trend() {
  return <Box>
    <Flex mt='25px' justify={'space-between'} align={'center'}>
      <Heading size={'sm'}>成本趋势</Heading>
      <SelectMonth></SelectMonth>
    </Flex>
    <LineChart></LineChart>
  </Box>
})