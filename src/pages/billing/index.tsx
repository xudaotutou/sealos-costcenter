// import { MockBillingData } from '@/mock/billing';
import { BillingTable } from '../../components/billing/billingTable';
import {
  Box,
  Button,
  Flex,
  Heading,
  Img,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { formatISO } from 'date-fns';
import receipt_icon from '@/assert/receipt_long_black.svg'
import arrow_icon from "@/assert/Vector.svg"
import arrow_left_icon from "@/assert/toleft.svg"
import magnifyingGlass_icon from "@/assert/magnifyingGlass.svg"
import { useMutation } from '@tanstack/react-query';
import request from '@/service/request';
import { BillingData, BillingSpec, BillingItem } from '@/types/billing';
import { LIST_TYPE } from '@/constants/billing';
import SelectRange from '@/components/billing/selectDateRange';
import useOverviewStore from '@/stores/overview';
// import useOverviewStore from '@/stores/overview';
// function SelectRange({isDisabled}:{isDisabled:boolean}) {
//   const startTime = useOverviewStore(state=>state.startTime)
//   const endTime = useOverviewStore(state=>state.endTime)
//   const [selectedRange, setSelectedRange] = useState<DateRange>(() => ({ from: startTime, to: endTime }));
//   const [fromValue, setFromValue] = useState<string>(format(selectedRange.from || 0, 'y-MM-dd'));
//   const [toValue, setToValue] = useState<string>(format(selectedRange.to || 0, 'y-MM-dd'));
//   const handleFromChange: ChangeEventHandler<HTMLInputElement> = (e) => {
//     setFromValue(e.target.value);
//     const date = parse(e.target.value, 'y-MM-dd', new Date());
//     if (!isValid(date)) {
//       return setSelectedRange({ from: undefined, to: undefined });
//     }
//     if (selectedRange?.to && isAfter(date, selectedRange.to)) {
//       setSelectedRange({ from: selectedRange.to, to: date });
//     } else {
//       setSelectedRange({ from: date, to: selectedRange?.to });
//     }
//     // mutationResult.mutate()
//   };

//   const handleToChange: ChangeEventHandler<HTMLInputElement> = (e) => {
//     setToValue(e.target.value);
//     const date = parse(e.target.value, 'y-MM-dd', new Date());

//     if (!isValid(date)) {
//       return setSelectedRange({ from: selectedRange?.from, to: undefined });
//     }
//     if (selectedRange?.from && isBefore(date, selectedRange.from)) {
//       setSelectedRange({ from: date, to: selectedRange.from });
//     } else {
//       setSelectedRange({ from: selectedRange?.from, to: date });
//     }
//     mutationResult.mutate()
//   };

//   const handleRangeSelect: SelectRangeEventHandler = (
//     range: DateRange | undefined
//   ) => {
//     setSelectedRange(range!);
//     if (range?.from) {
//       setFromValue(format(range.from, 'y-MM-dd'));
//     } else {
//       setFromValue('');
//     }
//     if (range?.to) {
//       setToValue(format(range.to, 'y-MM-dd'));
//     } else {
//       setToValue('');
//     }
//     // mutationResult.mutate()
//   };
//   return <Flex w={'310px'} h={'32px'} bg="#F6F8F9" mr={'32px'} gap={'12px'} align={'center'} px={'6px'} justify={'space-between'}
//     border={'1px solid #DEE0E2'}
//     borderRadius='2px'>
//     <Input
//       isDisabled={isDisabled}
//       variant={'unstyled'}
//       value={fromValue}
//       onChange={handleFromChange}
//     />
//     <span>-</span>
//     <Input
//       isDisabled={isDisabled}
//       variant={'unstyled'}
//       value={toValue}
//       onChange={handleToChange}
//     />
//     <Popover >
//       <PopoverTrigger>
//         <Button display={'flex'} variant={'unstyled'} w='24px' justifyContent={'space-between'} isDisabled={isDisabled}>
//           <Img src={clander_icon.src}></Img>
//           <Img src={vectorAll_icon.src}></Img>
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent>
//         <DayPicker
//           mode="range"
//           selected={selectedRange}
//           onSelect={handleRangeSelect}
//         />
//       </PopoverContent>
//     </Popover>
//   </Flex>
// }
export default function Billing() {
  const startTime = useOverviewStore(state => state.startTime)
  const endTime = useOverviewStore(state => state.endTime)
  const [selectType, setType] = useState<-1 | 0 | 1>(-1)
  const [searchValue, setSearch] = useState('')
  const [tableResult, setTableResult] = useState<BillingItem[]>([])
  const [totalPage, setTotalPage] = useState(1)
  const [currentPage, setcurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)


  const mutationResult = useMutation(
    ['billing'],
    () => {
      let spec = {} as BillingSpec
      spec = {
        page: currentPage,
        pageSize: pageSize,
        type: -1,
        startTime:
          formatISO(startTime, { representation: 'complete' }),
        // startTime,
        endTime:
          formatISO(endTime, { representation: 'complete' }),
        // endTime,
        orderID: searchValue.trim()
      }
      return request<any, { data: BillingData }, { spec: BillingSpec }>('/api/billing', {
        method: 'POST',
        data: {
          spec
        }
      })
    },
    {
      onSuccess(data) {
        setTableResult(data.data.status?.item || [])
        setTotalPage(data.data.status.pageLength)
      }
    }
  )

  useEffect(() => mutationResult.mutate(), [])
  useEffect(() => {

    let timer: ReturnType<typeof setTimeout>
    timer = setTimeout(() => {
      !searchValue && mutationResult.mutate()
    }, 1000);
    return () => {
      clearTimeout(timer)
    }
  }, [startTime, endTime, searchValue])
  return (
    <Flex flexDirection="column" w="100%" h="100%" bg={'white'} p='24px'>
      <Flex w={'116px'} justify="space-between" mr='24px' align={'center'}>
        <Img src={receipt_icon.src} w={'24px'} h={'24px'} dropShadow={'#24282C'}></Img>
        <Heading size='lg'>账单明细</Heading>
      </Flex>
      <Flex mt="24px" alignItems={'center'} flexWrap={'wrap'}>
        <Flex align={'center'} mb={'24px'}>
          <Text fontSize={'12px'} mr={'12px'}
            width={['60px', '60px', 'auto', 'auto']}
          >交易时间</Text>
          <SelectRange isDisabled={mutationResult.isLoading}></SelectRange>
        </Flex>
        <Flex align={'center'} mb={'24px'}>
          <Text fontSize={'12px'} mr={'12px'}
            width={['60px', '60px', 'auto', 'auto']}>类型</Text>
          {/* <Menu >
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
              {LIST_TYPE.map(v => <MenuItem key={v.value} onClick={() => {
                setType(v.value)
              }}>{v.title}</MenuItem>)}
            </MenuList>
          </Menu> */}
          <Popover>
            <PopoverTrigger>
              <Button
                w='110px'
                h='32px'
                fontStyle='normal'
                fontWeight='400'
                fontSize='12px'
                lineHeight='140%'
                // bgColor={'#F6F8F9'}
                // shadow={'0px 0px 4px 0px #A8DBFF'}
                border={'1px solid #DEE0E2'}
                bg={'#F6F8F9'}
                _expanded={{
                  background: '#F8FAFB',
                  border: `1px solid #36ADEF`
                }}
                _hover={{
                  background: '#F8FAFB',
                  border: `1px solid #36ADEF`
                }}
                borderRadius={'2px'}>{LIST_TYPE[selectType + 1].title}
                {/* <Img src={arrow_icon.src} transition={'all'} _expanded={
                {
                  transform: 'rotate(-180deg)'
                }
              }></Img> */}
              </Button>
            </PopoverTrigger>
            <PopoverContent p={'6px'}
              boxSizing='border-box'
              w={'110px'}
              shadow={'0px 0px 1px 0px #798D9F40, 0px 2px 4px 0px #A1A7B340'}
              border={'none'}
            >
              {LIST_TYPE.map((v, idx) =>
                <Button
                  key={v.value}
                  color={v.value === selectType ? '#0884DD' : '#5A646E'}
                  h='30px'
                  fontFamily='PingFang SC'
                  fontSize='12px'
                  fontWeight='400'
                  lineHeight='18px'
                  p={'0'}
                  bg={v.value === selectType ? '#F4F6F8' : '#FDFDFE'}
                  onClick={() => {
                    setType(v.value)
                  }}
                >{v.title}
                </Button>
              )
              }

            </PopoverContent >
          </Popover >
        </Flex>

        {/* <Text fontSize={'12px'}>计费周期</Text>
        <Box w={'104px'} h={'32px'} bg="#F4F6F8" mx={'16px'}></Box> */}
        <Flex align={'center'} ml={'auto'} mb={'24px'}>
          <Flex mr='16px' border='1px solid #DEE0E2' h='32px' align={'center'} py={'10.3px'} pl={'9.3px'} borderRadius={'2px'}>
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
      </Flex>
      {mutationResult.isSuccess ? <>
        <Box overflow={'auto'}>
          <BillingTable data={tableResult.filter(x => !!searchValue || selectType === -1 || x.type === selectType)}></BillingTable>
        </Box>
        <Flex w='370px' h='32px' ml='auto' align={'center'} mt={'20px'}>
          <Text>总数:</Text>
          <Flex w='40px'>{totalPage * pageSize}</Flex>
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
              bg={currentPage !== totalPage ? '#EDEFF1' : '#F1F4F6'}
              onClick={e => {
                e.preventDefault()
                setcurrentPage(currentPage + 1)
                mutationResult.mutateAsync()
              }}
            ><Img src={arrow_icon.src} transform={'rotate(90deg)'}></Img></Button>
            <Button variant={'switchPage'} isDisabled={currentPage === totalPage}
              bg={currentPage !== totalPage ? '#EDEFF1' : '#F1F4F6'}
              mr={'10px'}
              onClick={e => {
                e.preventDefault()
                setcurrentPage(totalPage)
                mutationResult.mutateAsync()
              }}><Img w='6px' h='6px' src={arrow_left_icon.src} transform={'rotate(180deg)'}></Img></Button>
          </Flex>
          <Text>{pageSize}</Text>
          <Text>/ 页</Text>
        </Flex>
      </> : (
        <Flex direction={'column'} w='full' align={'center'} flex={'1'} h={'0'} justify={'center'}>
          {mutationResult.isError && <div>retry</div>}
        </Flex>
      )}

    </Flex>
  );
}
