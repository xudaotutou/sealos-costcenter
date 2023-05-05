
import { Heading, Box } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

const LineChart = dynamic(
  () => import('./components/lineChart'),
  { ssr: false }
)

export function Trend() {
  return <Box>
    <Heading size={'sm'}>成本趋势</Heading>
    <LineChart></LineChart>
  </Box>
}