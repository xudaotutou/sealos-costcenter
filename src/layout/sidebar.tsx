import { Box, Flex, Text } from '@chakra-ui/react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './index.module.scss';

type Menu = {
  url: string;
  value: string;
};

export default function SideBar() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState('成本总览');

  const menus: Menu[] = [
    {
      url: '/cost_overview',
      value: '成本总览'
    },
    {
      url: '/billing',
      value: '账单明细'
    },
    {
      url: '/valuation',
      value: '计价标准'
    }
  ];

  return (
    <Flex flexDirection="column" justifyContent="cneter" alignItems="center" w={28}>
      {menus.map((item) => {
        return (
          <Box
            key={item.value}
            mt={6}
            p={2}
            cursor="pointer"
            onClick={() => {
              setActiveMenu(item.value);
              router.push(item.url);
            }}
          >
            <Text className={clsx(styles.baseText, activeMenu === item.value && styles.activeText)}>
              {item.value}
            </Text>
          </Box>
        );
      })}
    </Flex>
  );
}
