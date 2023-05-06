import { CURRENT_MONTH, MONTHS, NOW_MONTH } from "@/constants/payment";
import useOverviewStore from "@/stores/overview";
import { memo } from "react";
import { Select } from "@chakra-ui/react";
export const SelectMonth = memo(function SelectMonth() {
  const { setMonth, selectedMonth } = useOverviewStore()
  return <Select value={selectedMonth} onChange={(e) => setMonth(+e.target.value)} bg="#F4F6F8" borderRadius="4px" w="105px" h="32px">
    {
      MONTHS.map((item, index) => {
        return <option key={index} value={index} >{index === NOW_MONTH ? CURRENT_MONTH : item}</option>
      })
    }

  </Select>
})