import { Flex, Box, Text, Heading, Img } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import down_icon from '@/assert/ic_round-trending-down.png'
import up_icon from '@/assert/ic_round-trending-up.png'
import { useState } from "react";
import { SelectMonth } from "./components/selectMonth";

export function Buget() {
  const [_in, setIn] = useState(1200)
  const prein = 1000
  const [out, setOut] = useState(1300)
  const preout = 1000
  return <Flex mt="20px" direction={'column'}>
    <Flex alignItems={'center'} justify="space-between">
      <Heading size='sm'>收支</Heading>
      <SelectMonth ></SelectMonth>
    </Flex>
    <Flex mt="20px" justify={'space-between'}>
      <Card variant='filled'>
        <CardBody alignItems={'center'} flexDirection="column">
          <Flex bg={'#24282C'} w='31.75px' h='28.7px' justify={'center'} align="center"><Img src={down_icon.src}></Img></Flex>
          <Text fontSize={'12px'}>支出</Text>
          <Text fontWeight='500' fontSize='16px' mt={'8px'}>￥{_in}</Text>
          <Text fontWeight='400' fontSize='10px' color='#5A646E' mt={'4px'}>据上月{prein > _in ? `减少${((prein - _in) / prein * 100).toFixed(2)}%` : `增长${((_in - prein) / prein * 100).toFixed(2)}`}%</Text>
        </CardBody>
      </Card>
      <Card variant='filled'>
        <CardBody alignItems={'center'} flexDirection="column">
          <Flex bg={'#24282C'} w='31.75px' h='28.7px' justify={'center'} align="center"><Img src={up_icon.src}></Img></Flex>
          <Text fontSize={'12px'}>充值</Text>
          <Text fontWeight='500' fontSize='16px' mt={'8px'}>￥{_in}</Text>
          <Text fontWeight='400' fontSize='10px' color='#5A646E' mt={'4px'}>据上月{preout > _in ? `减少${((preout - _in) / prein * 100).toFixed(2)}%` : `增长${((_in - preout) / preout * 100).toFixed(2)}`}%</Text>
        </CardBody>
      </Card>
      {/* <Box w={'127px'} h={'146px'} bg={'#F9FAFD'} borderRadius={'8px'}></Box> */}
    </Flex>
  </Flex>
}