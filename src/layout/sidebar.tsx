import { Box, Flex, Text, Img } from '@chakra-ui/react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';
import bar_icon from '../assert/bar_chart_4_bars.png'
import letter_icon from '../assert/format_letter_spacing_standard.png'
import receipt_icon from '../assert/receipt_long.png'
import type { StaticImageData } from 'next/image';

type Menu = {
  id: string;
  url: string;
  value: string;
  icon: StaticImageData;
};

export default function SideBar() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [activeMenu, setActiveMenu] = useState('CostOverview');
  const menus: Menu[] = [
    {
      id: 'CostOverview',
      url: '/cost_overview',
      value: t('SideBar.CostOverview'),
      icon:bar_icon
    },
    {
      id: 'BillingDetails',
      url: '/billing',
      value: String(t('SideBar.BillingDetails')),
      icon:receipt_icon
    },
    {
      id: 'ValuationStandard',
      url: '/valuation',
      value: String(t('SideBar.ValuationStandard')),
      icon:letter_icon
    }
  ];

  return (
    <Flex flexDirection="column" justifyContent="cneter" alignItems="stretch" w={28}>
      <Text
        cursor={'pointer'}
        fontSize={'12px'}
        onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en')}
      >
        {t('SwitchLanguage')}
      </Text>
      {menus.map((item) => {
        return (
          <Flex
            key={item.value}
            mt={6}
            p={2}
            alignItems={"center"}
            // justifyContent={"space-between"}
            onClick={() => {
              setActiveMenu(item.id);
              router.push(item.url);
            }}
            as="button"
          > 
          <Flex
            h={4}
            w={4}
            mr='10.4px'
            alignItems={'center'}
          >
              <Img
                src={item.icon.src}
                width={3}
                alt="icon of module"
              />
            </Flex>
            <Text className={clsx(styles.baseText, activeMenu === item.id && styles.activeText)}>
              {item.value}
            </Text>
          </Flex>
        );
      })}
    </Flex>
  );
}
