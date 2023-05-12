import { CURRENT_MONTH, MONTHS, NOW_MONTH } from "@/constants/payment";
import useOverviewStore, { By } from "@/stores/overview";
import { memo } from "react";
import { Box, Button, Flex, Img, Menu, MenuButton, MenuGroup, MenuItem, MenuList, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Select, useDisclosure } from "@chakra-ui/react";
import arrow_icon from "@/assert/Vector.svg"

export const SelectMonth = memo(function SelectMonth() {
  const { setMonth, selectedMonth, selectedWeek, by, swithBy, setWeek } = useOverviewStore()
  const items: { item: string, unit: string, value: number, cb: (_: number) => void, max: number }[] = [
    {
      item: '按月', unit: '月', value: selectedMonth + 1, cb: (v) => {
        setMonth(v - 1)
        // if(v===2)
        // 暂时不考虑闰年
      }, max: 12
    },
    { item: '按周', unit: '周', value: selectedWeek + 1, cb: (v) => setWeek(v - 1), max: 5 }
  ]


  // </Menu>
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          w='110px'
          h='32px'
          fontStyle='normal'
          fontWeight='400'
          fontSize='12px'
          lineHeight='140%'
          shadow={'0px 0px 4px 0px #A8DBFF'}
          bg={'#F6F8F9'}
          _expanded={{
            background: '#F8FAFB',
            border: `1px solid #36ADEF`
          }}
          _hover={{
            background: '#F8FAFB',
            border: `1px solid #36ADEF`
          }}
          borderRadius={'2px'}>{items[by].item}
          <Img src={arrow_icon.src} transition={'all'} _expanded={
            {
              transform: 'rotate(-180deg)'
            }
          }></Img>
        </Button>
      </PopoverTrigger>
      <PopoverContent p={'6px'}
        boxSizing='border-box'
        w={'110px'}
        shadow={'0px 0px 1px 0px #798D9F40, 0px 2px 4px 0px #A1A7B340'}
        border={'none'}
      >
        {items.map((v, idx) => (<Popover key={v.item} placement='left'  >
          <PopoverTrigger>
            <Button color={idx === by ? '#0884DD' : '#5A646E'}
              h='30px'
              fontFamily='PingFang SC'
              fontSize='12px'
              fontWeight='400'
              lineHeight='18px'
              p={'0'}
              bg={idx === by ? '#F4F6F8' : '#FDFDFE'}
              onClick={() => {
                swithBy(idx)
              }}
            >{v.item} </Button>
          </PopoverTrigger>
          <PopoverContent height='84px'
            width='127px'
            borderRadius='2px'
            p='8px'
            display={'flex'}
            flexDir={'column'}
            justifyContent={'space-between'}
          >
            <Box>{idx === By.week && '第'}{v.value}{v.unit}</Box>
            <NumberInput
              boxSizing='border-box'
              maxW='111px'
              maxH='30px'
              bg='#F8FAFB'
              border='1px solid #EFF0F1'
              borderRadius='2px'
              defaultValue={v.value} min={1} max={v.max} onChange={_v => v.cb(+_v)}>
              <NumberInputField h={'100%'} borderRadius='2px' pl={'8px'} />
              <NumberInputStepper>
                <NumberIncrementStepper>
                  <Img src={arrow_icon.src} w='10px'></Img>
                </NumberIncrementStepper>
                <NumberDecrementStepper >
                  <Img src={arrow_icon.src} transform='rotate(-180deg)' w='10px'></Img>
                </NumberDecrementStepper>
              </NumberInputStepper>
            </NumberInput>
          </PopoverContent>
        </Popover>))}
      </PopoverContent >
    </Popover >
  );
})