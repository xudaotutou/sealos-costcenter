import { Flex, Box, Text, Heading, Img } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import down_icon from '@/assert/ic_round-trending-down.png'
import up_icon from '@/assert/ic_round-trending-up.png'
import { useState } from "react";
import { SelectMonth } from "./components/selectMonth";
import useOverviewStore from "@/stores/overview";
import { getTime, parseISO } from "date-fns";
import { formatMoney } from "@/utils/format";

export function Buget() {
  // const [_in, setIn] = useState(1200)
  // const [out, setOut] = useState(1300)
  const preItems = useOverviewStore(state => state.preItems)
  const items = useOverviewStore(state => state.items)
  const [preOut, preIn] = preItems
    .reduce<[number, number]>((pre, cur) => {
      if (cur.type === 0) {
        pre[0] += cur.amount
      }
      else if (cur.type === 1) {
        pre[1] += cur.amount
      }
      return pre
    }, [0, 0])
  const [out, _in] = items.reduce<[number, number]>((pre, cur) => {
    if (cur.type === 0) {
      pre[0] += cur.amount
    }
    else if (cur.type === 1) {
      pre[1] += cur.amount
    }
    return pre
  }, [0, 0])
  return <Flex direction={'column'}>
    <Flex alignItems={'center'} justify="space-between">
      <Heading size='sm'>收支</Heading>
      {/* <SelectMonth ></SelectMonth> */}
    </Flex>
    <Flex mt="20px" justify={'space-evenly'}>
      <Card variant='filled'>
        <CardBody alignItems={'center'} flexDirection="column" justifyContent={'center'}>
          <Flex bg={'#24282C'} w='31.75px' h='28.7px' justify={'center'} align="center"><Img src={down_icon.src}></Img></Flex>
          <Text fontSize={'12px'}>扣费</Text>
          <Text fontWeight='500' fontSize='16px' mt={'8px'}>¥ {formatMoney(out)}</Text>
          {/* {
            preIn > 0 ? <Text fontWeight='400' fontSize='10px' color='#5A646E' mt={'4px'}>据上月{preIn > _in ? `减少${((preIn - _in) / preIn * 100).toFixed(2)}%` : `增长${((_in - preIn) / preIn * 100).toFixed(2)}`}%</Text>
              : 
              <></>
              // <Box h='14px'></Box>
          } */}
        </CardBody>
      </Card>
      <Card variant='filled'>
        <CardBody alignItems={'center'} flexDirection="column" justifyContent={'center'}>
          <Flex bg={'#24282C'} w='31.75px' h='28.7px' justify={'center'} align="center"><Img src={up_icon.src}></Img></Flex>
          <Text fontSize={'12px'}>充值</Text>
          <Text fontWeight='500' fontSize='16px' mt={'8px'}>¥ {formatMoney(_in)}</Text>
          {/* {
            preOut > 0 ? <Text fontWeight='400' fontSize='10px' color='#5A646E' mt={'4px'}>据上月{preOut > out ? `减少${((preOut - out) / preOut * 100).toFixed(2)}%` : `增长${((out - preOut) / preOut * 100).toFixed(2)}`}%</Text>
              : 
              <></>
              // <Box h='14px'></Box>
          } */}
        </CardBody>
      </Card>
    </Flex>
  </Flex>
}