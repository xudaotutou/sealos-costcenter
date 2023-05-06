
import { Heading, Box } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { memo } from 'react'

const LineChart = dynamic(
  () => import('./components/lineChart'),
  { ssr: false }
)

export const Trend = memo(function Trend() {
  return <Box>
    <Heading size={'sm'}>成本趋势</Heading>
    <LineChart></LineChart>
  </Box>
})