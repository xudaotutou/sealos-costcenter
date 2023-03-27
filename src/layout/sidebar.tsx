import { Box, Flex, Text } from '@chakra-ui/react'

type Menu = {
  url: string
  value: string
}

export default function SideBar() {
  const menus: Menu[] = [
    {
      url: '/valuation_standard',
      value: '计价标准',
    },
    {
      url: '/cost_overview',
      value: '成本总览',
    },
    {
      url: '/billing',
      value: '账单明细',
    },
  ]
  return (
    <Flex
      flexDirection="column"
      justifyContent="cneter"
      alignItems="center"
      w={28}>
      {menus.map((item) => {
        return (
          <Box key={item.value} mt={9}>
            <Text>{item.value}</Text>
          </Box>
        )
      })}
    </Flex>
  )
}
