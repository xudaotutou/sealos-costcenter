import { Box, Flex, Text, Img } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import bar_a_icon from '@/assert/bar_chart_4_bars.png'
import bar_icon from '@/assert/bar_chart_4_bars.svg'
import letter_icon from '@/assert/format_letter_spacing_standard.png'
import letter_a_icon from '@/assert/format_letter_spacing_standard.svg'
import receipt_icon from '@/assert/receipt_long.png'
import receipt_a_icon from '@/assert/receipt_long_black.png'
import type { StaticImageData } from 'next/image';

type Menu = {
  id: string;
  url: string;
  value: string;
  icon: StaticImageData;
  aicon: StaticImageData;
};

export default function SideBar() {
  const router = useRouter();
  // const { t, i18n } = useTranslation();
  const menus: Menu[] = [
    {
      id: 'CostOverview',
      url: '/cost_overview',
      // value: t('SideBar.CostOverview'),
      value: '成本总览',
      icon: bar_icon,
      aicon: bar_a_icon
    },
    {
      id: 'BillingDetails',
      url: '/billing',
      // value: String(t('SideBar.BillingDetails')),
      value: '账单明细',
      icon: receipt_icon,
      aicon: receipt_a_icon
    },
    {
      id: 'ValuationStandard',
      url: '/valuation',
      // value: String(t('SideBar.ValuationStandard')),
      value: '计价标准',
      icon: letter_icon,
      aicon: letter_a_icon
    }
  ];
  return (
    <Flex flexDirection="column">
      {/* <Text
        cursor={'pointer'}
        fontSize={'12px'}
        onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en')}
      >
        {t('SwitchLanguage')}
      </Text> */}
      {menus.map((item) => {
        return (
          <Flex
            key={item.value}
            // mt={'37px'}

            p={'16px'}
            alignItems={"center"}
            onClick={() => {
              router.push(item.url);
            }}
            as="button"
          >
            <Flex
              h={4}
              alignItems={'center'}
            >
              <Img
                src={router.route == item.url ? item.aicon.src : item.aicon.src}
                width={3}
                alt="icon of module"
              />
            </Flex>
            <Text color={router.route === item.url ? '#000000' : '#7B838B'} ml='10px' my='18px' display={[
              'none',
              'none',
              'none',
              'flex'              
            ]}>
              {item.value}
            </Text>
          </Flex>
        );
      })}
    </Flex>
  );
}
