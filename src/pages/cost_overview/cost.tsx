import { Box, Flex, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("./components/pieChart"), {
  ssr: false
})
export function Cost() {
  return <Flex direction={'column'}>
    <Flex alignItems={'center'} mt="33px">
      <Text color={'#747F88'}>成本分布</Text>
      <Box ml="auto" bg="#F4F6F8" borderRadius="4px" w="105px" h="32px"></Box>
    </Flex>
    <Chart></Chart>
  </Flex>
}