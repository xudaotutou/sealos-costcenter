import { Box, Flex, Text } from '@chakra-ui/react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';

type Menu = {
  id: string;
  url: string;
  value: string;
};

export default function SideBar() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [activeMenu, setActiveMenu] = useState('CostOverview');

  const menus: Menu[] = [
    {
      id: 'CostOverview',
      url: '/cost_overview',
      value: String(t('SideBar.CostOverview'))
    },
    {
      id: 'BillingDetails',
      url: '/billing',
      value: String(t('SideBar.BillingDetails'))
    },
    {
      id: 'ValuationStandard',
      url: '/valuation',
      value: String(t('SideBar.ValuationStandard'))
    }
  ];

  return (
    <Flex flexDirection="column" justifyContent="cneter" alignItems="center" w={28}>
      <Text
        cursor={'pointer'}
        fontSize={'12px'}
        onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en')}
      >
        {t('SwitchLanguage')}
      </Text>
      {menus.map((item) => {
        return (
          <Box
            key={item.value}
            mt={6}
            p={2}
            cursor="pointer"
            onClick={() => {
              setActiveMenu(item.id);
              router.push(item.url);
            }}
          >
            <Text className={clsx(styles.baseText, activeMenu === item.id && styles.activeText)}>
              {item.value}
            </Text>
          </Box>
        );
      })}
    </Flex>
  );
}
