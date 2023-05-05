import {} from "@/constants/payment";
import useOverviewStore from "@/stores/overview";
import { memo } from "react";
import { Select } from "@chakra-ui/react";
export const SelectYear = memo(function SelectYear({years}:{years:number[]}) {
  const {selectedYear,setYear} = useOverviewStore(state=>state)
  return <Select  defaultValue={selectedYear} onChange={(e)=>setYear(+e.target.value)} w='110px' h='32px'>
    {
        years.map((item,index)=>{
        return <option key={index} value={index} >{item}</option>
      })
    }
  
</Select>
})