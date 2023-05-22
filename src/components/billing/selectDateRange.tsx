import useOverviewStore from "@/stores/overview";
import clander_icon from '@/assert/clander.svg'
import vectorAll_icon from '@/assert/VectorAll.svg'
import { Flex, Input, Popover, PopoverTrigger, Img, PopoverContent, Button } from "@chakra-ui/react";
import { format, parse, isValid, isAfter, isBefore } from "date-fns";
import { useState, ChangeEventHandler, useEffect, memo, useMemo } from "react";
import { DateRange, SelectRangeEventHandler, DayPicker } from "react-day-picker";

export default function SelectRange({ isDisabled }: { isDisabled: boolean | undefined }) {
  let {startTime, endTime} = useOverviewStore()
  // setSTartTime
  const setStartTime = useOverviewStore(state => state.setStartTime)
  const setEndTime = useOverviewStore(state => state.setEndTime)
  // const selectedRange = { from: startTime, to: endTime }
  // const initState = useMemo(()=>({ from: startTime, to: endTime }), [])

  const initState = useMemo(()=>({ from: startTime, to: endTime }),[startTime, endTime])
  const [selectedRange, setSelectedRange] = useState<DateRange>(
    initState
  );
  const [fromValue, setFromValue] = useState<string>(format(initState.from,'y-MM-dd'));
  const [toValue, setToValue] = useState<string>(format(initState.to,'y-MM-dd'));
  useEffect(() => {
    console.log(selectedRange)
    selectedRange.from && setStartTime(selectedRange.from)
    selectedRange.to && setEndTime(selectedRange.to)
    console.log('set')
  }, [selectedRange])
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

    if (range) {
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
    }

  };
  return <Flex w={'280px'} h={'32px'} bg="#F6F8F9" mr={'32px'} gap={'12px'} align={'center'} px={'12px'} justify={'space-between'}
    border={'1px solid #DEE0E2'}
    borderRadius='2px'>
    <Input
      isDisabled={!!isDisabled}
      variant={'unstyled'}
      value={fromValue}
      onChange={handleFromChange}
    />
    <span>-</span>
    <Input
      isDisabled={!!isDisabled}
      variant={'unstyled'}
      value={toValue}
      onChange={handleToChange}
    />
    <Popover >
      <PopoverTrigger>
        <Button display={'flex'} variant={'unstyled'} w='24px' justifyContent={'space-between'} isDisabled={isDisabled}>
          <Img src={clander_icon.src}></Img>
          <Img src={vectorAll_icon.src}></Img>
        </Button>
      </PopoverTrigger>
      <PopoverContent zIndex={99}>
        
        <DayPicker
          mode="range"
          selected={selectedRange}
          onSelect={handleRangeSelect}

          styles={{
            day:{
              'borderRadius': 'unset',
              'transition': 'all 0.2s ease-in-out',
            }
          }}
        />
      </PopoverContent>
    </Popover>
  </Flex>
}