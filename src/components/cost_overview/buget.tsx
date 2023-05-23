import { Flex, Box, Text, Heading, Img } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import down_icon from '@/assert/ic_round-trending-down.svg'
import up_icon from '@/assert/ic_round-trending-up.svg'
import { useState } from "react";
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
  const list = [
    {title:"扣费" ,src: down_icon.src, value:'￥'+ formatMoney(out)},
    {title:"充值" ,src: up_icon.src,value:'￥'+ formatMoney(_in)},
  ]
  return <Flex direction={'column'} mb={'34px'}>
    <Flex alignItems={'center'} justify="space-between">
      <Heading size='sm'>收支</Heading>
      {/* <SelectMonth ></SelectMonth> */}
    </Flex>
    <Flex mt="20px" 
    justify={'space-evenly'} 
    gap='6'>
      {list.map(v=><Card variant='filled' bg={['#f1f4f6','#f1f4f6','#f1f4f6','white']} key={v.title}>
        <CardBody alignItems={'center'} flexDirection="column" justifyContent={'center'}>
          <Flex bg={'#24282C'} w='31.75px' h='28.7px' justify={'center'} align="center"
            borderRadius={'2px'}
          ><Img src={v.src}></Img></Flex>
          <Text fontSize={'12px'} mt={'6px'}>{v.title}</Text>
          <Text fontWeight='500' fontSize='16px' mt={'8px'}>{v.value}</Text>
        </CardBody>
      </Card>)}
    </Flex>
  </Flex>
}