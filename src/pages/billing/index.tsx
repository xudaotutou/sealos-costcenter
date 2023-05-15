// import { MockBillingData } from '@/mock/billing';
import { BillingTable } from '../../components/billing/billingTable';
import {
  Button,
  Flex,
  Img,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { format, formatISO, isAfter, isBefore, isValid, parse, parseISO } from 'date-fns';
import { DateRange, DayPicker, SelectRangeEventHandler } from 'react-day-picker';
import clander_icon from '@/assert/clander.svg'
import vectorAll_icon from '@/assert/VectorAll.svg'
import 'react-day-picker/dist/style.css';
import arrow_icon from "@/assert/Vector.svg"
import arrow_left_icon from "@/assert/toleft.svg"
import magnifyingGlass_icon from "@/assert/magnifyingGlass.svg"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import request from '@/service/request';
import { BillingTableItem, BillingData, BillingSpec, BillingItem } from '@/types/billing';
import { LIST_TYPE } from '@/constants/billing';
import { formatMoney } from '@/utils/format';
export default function Billing() {

  const [selectedRange, setSelectedRange] = useState<DateRange>(() => ({ from: new Date(2022, 1, 1), to: new Date() }));
  const [fromValue, setFromValue] = useState<string>(format(selectedRange.from || 0, 'y-MM-dd'));
  const [toValue, setToValue] = useState<string>(format(selectedRange.to || 0, 'y-MM-dd'));
  const [selectType, setType] = useState<-1 | 0 | 1>(-1)
  const [searchValue, setSearch] = useState('')
  const [tableResult, setTableResult] = useState<BillingTableItem[]>([])
  const [totalPage, setTotalPage] = useState(1)
  const [currentPage, setcurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)


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
    setSelectedRange(range!);
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
  const mutationResult = useMutation(
    () => {
      let spec = {} as BillingSpec
      spec = {
        page: currentPage,
        pageSize: pageSize,
        type: selectType,
        startTime:
          // format(selectedRange.from || 0,'yyyy-MM-dd HH:mm:ss zzz'),
          formatISO(selectedRange.from || 0, { representation: 'complete' }),
        // '2023-05-01T11:00:00Z',
        endTime:
          // format(selectedRange.to || 0,'yyyy-MM-dd HH:mm:ss zzz')
          formatISO(selectedRange.to || 0, { representation: 'complete' }),
        // '2023-05-15T11:00:00Z',
        orderID: searchValue.trim()
      }
      // }
      return request<any, { data: BillingData }, { spec: BillingSpec }>('/api/billing', {
        method: 'POST',
        data: {
          spec
        }
      })
    },
    {
      onSuccess(data) {
        console.log(data)
        setTableResult(data.data.status?.item?.map<BillingTableItem>((item: BillingItem) => ({
          order: item.order_id,
          type: item.type,
          cpu: '￥' + formatMoney(item.costs.cpu),
          memory: '￥' + formatMoney(item.costs.memory),
          storage: '￥' + formatMoney(item.costs.storage),
          amount: '￥' + formatMoney(item.amount),
          transactionHour: format(parseISO(item.time),'MM-dd hh:mm')
        }) || [])
        )
        setTotalPage(data.data.status.pageLength)
      }
    }
  )
  useEffect(() => mutationResult.mutate(), [])
  return (
    <Flex flexDirection="column" w="100%" h="100%" bg={'white'} pl="32px" pr="46px" >
      <Text fontWeight={500} fontSize="20px" mt="32px">
        账单明细
      </Text>
      <Flex mt="24px" alignItems={'center'}>
        <Text fontSize={'12px'} mr={'12px'}>交易时间</Text>
        <Flex w={'310px'} h={'32px'} bg="#F6F8F9" mr={'32px'} gap={'12px'} align={'center'} px={'6px'} justify={'space-between'}
          border={'1px solid #DEE0E2'}
          borderRadius='2px'>
          <Input
            isDisabled={mutationResult.isLoading}
            variant={'unstyled'}
            value={fromValue}
            onChange={handleFromChange}
          // type='date'
          />
          <span>-</span>
          <Input
            isDisabled={mutationResult.isLoading}
            variant={'unstyled'}
            value={toValue}
            onChange={handleToChange}
          />
          <Popover >
            <PopoverTrigger>
              <Button display={'flex'} variant={'unstyled'} w='24px' justifyContent={'space-between'} isDisabled={mutationResult.isLoading}>
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
            disabled={mutationResult.isLoading}
            border='1px solid #DEE0E2'
            w={'110px'} h={'32px'} bg="#F4F6F8" mr={'32px'}
            fontStyle='normal'
            fontWeight='400'
            fontSize='12px'
            borderRadius='2px'
          >{LIST_TYPE[selectType + 1].title}</MenuButton>
          <MenuList maxW={'110px'} w='110px'>
            {LIST_TYPE.map(v => <MenuItem key={v.value} onClick={() => setType(v.value)}>{v.title}</MenuItem>)}
          </MenuList>
        </Menu>
        {/* <Text fontSize={'12px'}>计费周期</Text>
        <Box w={'104px'} h={'32px'} bg="#F4F6F8" mx={'16px'}></Box> */}
        <Flex ml={'auto'} mr='16px' border='1px solid #DEE0E2' h='32px' align={'center'} py={'10.3px'} pl={'9.3px'} borderRadius={'2px'}>
          <Img src={magnifyingGlass_icon.src} w={'14px'} mr={'8px'}></Img>
          <Input
            isDisabled={mutationResult.isLoading}
            variant={'unstyled'} placeholder='订单号' value={searchValue} onChange={v => setSearch(v.target.value)}></Input>
        </Flex>
        <Button
          isDisabled={mutationResult.isLoading}
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
          onClick={e => {
            e.preventDefault()
            mutationResult.mutate()
          }}
        >搜索</Button>
      </Flex>
      {mutationResult.isSuccess ? <>
        <BillingTable data={tableResult}></BillingTable>
        <Flex w='361px' h='32px' ml='auto' align={'center'} mt={'20px'}>
          <Flex mr={'16px'}>总数:{totalPage * pageSize}</Flex>
          <Flex gap={'8px'}>
            <Button variant={'switchPage'} isDisabled={currentPage === 1}
              onClick={e => {
                e.preventDefault()
                setcurrentPage(1)
                mutationResult.mutateAsync()
              }}
            ><Img w='6px' h='6px' src={arrow_left_icon.src}
            ></Img></Button>
            <Button variant={'switchPage'} isDisabled={currentPage === 1}
              onClick={e => {
                e.preventDefault()
                setcurrentPage(currentPage - 1)
                mutationResult.mutateAsync()
              }}><Img src={arrow_icon.src} transform={'rotate(-90deg)'}></Img></Button>
            <Text >{currentPage}</Text>/
            <Text >{totalPage}</Text>
            <Button variant={'switchPage'} isDisabled={currentPage === totalPage}
              onClick={e => {
                e.preventDefault()
                setcurrentPage(currentPage + 1)
                mutationResult.mutateAsync()
              }}
            ><Img src={arrow_icon.src} transform={'rotate(90deg)'}></Img></Button>
            <Button variant={'switchPage'} isDisabled={currentPage === totalPage}
              onClick={e => {
                e.preventDefault()
                setcurrentPage(totalPage)
                mutationResult.mutateAsync()
              }}><Img w='6px' h='6px' src={arrow_left_icon.src} transform={'rotate(180deg)'}></Img></Button>
          </Flex>
          <Text>{pageSize} / 页</Text>
        </Flex>
      </> : (
        <Flex direction={'column'} w='full' align={'center'} flex={'1'} h={'0'} justify={'center'}>
          {mutationResult.isError && <div>retry</div>}
          {mutationResult.isLoading && <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          >loading</Spinner>}
        </Flex>
      )}

    </Flex>
  );
}
