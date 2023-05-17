import { Box, Flex, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { memo } from "react";
import { SelectMonth } from "./components/selectMonth";
const Chart = dynamic(() => import("./components/pieChart"), {
  ssr: false
})
export const Cost = memo(function Cost() {
  return <Flex direction={'column'}>
    <Flex alignItems={'center'} justify={"space-between"}>
      <Text color={'#747F88'}>成本分布</Text>
      <SelectMonth></SelectMonth>
    </Flex>
    <Chart></Chart>
  </Flex>
}) 