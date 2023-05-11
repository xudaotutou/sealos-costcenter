import { MockBillingData } from '@/mock/billing';
import { BillingTable } from './components/billingTable';
import {
  Box,
  Button,
  Flex,
  Img,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  NumberInput,
  NumberInputField,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import { ChangeEventHandler, useState } from 'react';
import { format, isAfter, isBefore, isValid, parse } from 'date-fns';
import { DateRange, DayPicker, SelectRangeEventHandler } from 'react-day-picker';
import clander_icon from '@/assert/clander.svg'
import vectorAll_icon from '@/assert/VectorAll.svg'
import 'react-day-picker/dist/style.css';
import arrow_icon from "@/assert/Vector.svg"
import magnifyingGlass_icon from "@/assert/magnifyingGlass.svg"
export default function Billing() {

  const [selectedRange, setSelectedRange] = useState<DateRange>();
  const [fromValue, setFromValue] = useState<string>('');
  const [toValue, setToValue] = useState<string>('');
  const [selectType, setType] = useState<number>(-1)
  const listType: { title: string, value: number }[] = [
    { title: '全部', value: -1 },
    { title: '充值', value: 0 },
    { title: '消费', value: 1 },
  ]
  const handleFromChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFromValue(e.target.value);
    const date = parse(e.target.value, 'y-MM-dd', new Date());
    if (!isValid(date)) {
      return setSelectedRange({ from: undefined, to: undefined });
    }
    if (selectedRange?.to && isAfter(date, selectedRange.to)) {
      setSelectedRange({ from: selectedRange.to, to: date });
    } else {
      setSelectedRange({ from: date, to: selectedRange?.to });
    }
  };

  const handleToChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setToValue(e.target.value);
    const date = parse(e.target.value, 'y-MM-dd', new Date());

    if (!isValid(date)) {
      return setSelectedRange({ from: selectedRange?.from, to: undefined });
    }
    if (selectedRange?.from && isBefore(date, selectedRange.from)) {
      setSelectedRange({ from: date, to: selectedRange.from });
    } else {
      setSelectedRange({ from: selectedRange?.from, to: date });
    }
  };

  const handleRangeSelect: SelectRangeEventHandler = (
    range: DateRange | undefined
  ) => {
    setSelectedRange(range);
    if (range?.from) {
      setFromValue(format(range.from, 'y-MM-dd'));
    } else {
      setFromValue('');
    }
    if (range?.to) {
      setToValue(format(range.to, 'y-MM-dd'));
    } else {
      setToValue('');
    }
  };


  return (
    <Flex flexDirection="column" w="100%" h="100%" bg={'white'} pl="32px" pr="46px">
      <Text fontWeight={500} fontSize="20px" mt="32px">
        账单明细
      </Text>
      <Flex mt="24px" alignItems={'center'}>
        <Text fontSize={'12px'} mr={'12px'}>交易时间</Text>
        <Flex w={'310px'} h={'32px'} bg="#F6F8F9" mr={'32px'} gap={'12px'} align={'center'} px={'6px'} justify={'space-between'}
          border={'1px solid #DEE0E2'}
          borderRadius='2px'>
          <Input
            variant={'unstyled'}
            value={fromValue}
            onChange={handleFromChange}
          // type='date'
          />
          <span>-</span>
          <Input
            variant={'unstyled'}
            value={toValue}
            onChange={handleToChange}
          />
          <Popover >
            <PopoverTrigger>
              <Button display={'flex'} variant={'unstyled'} w='24px' justifyContent={'space-between'}>
                <Img src={clander_icon.src}></Img>
                <Img src={vectorAll_icon.src}></Img>
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <DayPicker
                mode="range"
                selected={selectedRange}
                onSelect={handleRangeSelect}
              />
            </PopoverContent>
          </Popover>
        </Flex>
        <Text fontSize={'12px'} mr={'12px'}>类型</Text>
        <Menu >
          <MenuButton
            border='1px solid #DEE0E2'
            w={'110px'} h={'32px'} bg="#F4F6F8" mr={'32px'}
            fontStyle='normal'
            fontWeight='400'
            fontSize='12px'
            borderRadius='2px'
          >{listType[selectType + 1].title}</MenuButton>
          <MenuList maxW={'110px'} w='110px'>
            {listType.map(v => <MenuItem key={v.value} onClick={() => setType(v.value)}>{v.title}</MenuItem>)}
          </MenuList>
        </Menu>
        {/* <Text fontSize={'12px'}>计费周期</Text>
        <Box w={'104px'} h={'32px'} bg="#F4F6F8" mx={'16px'}></Box> */}
        <Flex ml={'auto'} mr='16px' border='1px solid #DEE0E2' h='32px' align={'center'} py={'10.3px'} pl={'9.3px'} borderRadius={'2px'}>
          <Img src={magnifyingGlass_icon.src} w={'14px'} mr={'8px'}></Img>
          <Input variant={'unstyled'} placeholder='订单号'></Input>
        </Flex>
        <Button
          variant={'unstyled'}

          display='flex'
          justifyContent={'center'}
          alignContent={'center'}

          width='88px'
          height='32px'
          bg='#24282C'
          borderRadius='4px'
          color={'white'}
          fontWeight='500'
          fontSize='14px'
          _hover={{
            opacity: '0.5'
          }}
        >搜索</Button>
      </Flex>
      {MockBillingData && <BillingTable data={MockBillingData}></BillingTable>}
    </Flex>
  );
}
