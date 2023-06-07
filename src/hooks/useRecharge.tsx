import request from '@/service/request';
import useOverviewStore from '@/stores/overview';
import { useQueryClient } from '@tanstack/react-query';
import {
  Box,
  Button,
  Flex,
  Img,
  Input,
  Link,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useToast
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { QRCodeSVG } from 'qrcode.react';
import { memo, useCallback, useEffect, useState } from 'react';
import wechat_icon from '@/assert/ic_baseline-wechat.svg';
import vector from '@/assert/Vector.svg';
import { formatMoney } from '@/utils/format';
import { useTranslation } from 'next-i18next';
import { getFavorable } from '@/utils/favorable';
import { AMOUNT_LIST } from '@/constants/payment';
import uil_info_circle from '@/assert/uil_info-circle.svg';
function useRecharge() {
  const { t } = useTranslation();


  const RechargeModal = () => {
    const { reCharge: isOpen, setRecharge: set_ } = useOverviewStore();
    const balance = useOverviewStore((state) => state.balance);
    const [step, setStep] = useState(1);
    const [amount, setAmount] = useState(1);
    const [paymentName, setPaymentName] = useState('');
    const [selectAmount, setSelectAmount] = useState(0);

    const toast = useToast();
    const createPaymentRes = useMutation(
      () => request.post('/api/account/payment', { amount: amount * 1000000 }),
      {
        onSuccess(data) {
          setPaymentName((data?.data?.paymentName as string).trim());
        },
        onError(err: any) {
          toast({
            status: 'error',
            title: err?.message || '',
            isClosable: true,
            position: 'top'
          });
        }
      }
    );

    const { data } = useQuery(
      ['query-charge-res'],
      () =>
        request('/api/account/payment/pay', {
          params: {
            id: paymentName
          }
        }),
      {
        refetchInterval: paymentName !== '' ? 1000 : false,
        enabled: paymentName !== '',
        onSuccess(data) {
          setTimeout(() => {
            if (data?.data?.status === 'SUCCESS') {
              createPaymentRes.reset();
              queryClient.resetQueries({ queryKey: ['query-charge-res'], exact: true });
              onClose();
              queryClient.invalidateQueries({ queryKey: ['billing'], exact: false });
              queryClient.invalidateQueries({ queryKey: ['getAccount'] });
            }
          }, 3000);
        }
      }
    );
    const queryClient = useQueryClient();
    const onClose = useCallback(() => {
      set_(false);
      createPaymentRes.reset();
      queryClient.resetQueries({ queryKey: ['query-charge-res'], exact: true });
    }, [createPaymentRes, queryClient, set_]);

    const handleConfirm = () => {
      // createPaymentRes.mutate();
    };
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="500px" height={'565px'} >
          <ModalHeader>{t('Recharge Amount')}</ModalHeader>
          <ModalCloseButton />
          {/* <Flex > */}
          <Flex
            pt="4px"
            mb={'24px'}
            w="500px"
            px={'24px'}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Flex align={'center'} alignSelf={'flex-start'} mb={'26px'}>
              <Text color="#7B838B" fontWeight={'normal'} mr={'24px'}>
                {t('Balance')}
              </Text>
              <Text mt="4px" color="#24282C" fontSize="24px" fontWeight={'medium'}>
                ¥ {formatMoney(balance)}
              </Text>
            </Flex>
            <Flex direction={'column'}>
              <Text color="#7B838B" fontWeight={'normal'} mb={'16px'}>
                {t('Select Amount')}
              </Text>
              <Flex wrap={'wrap'} gap={'16px'}>
                {
                  AMOUNT_LIST.map((amount, index) => <Flex
                    width='140px'
                    height='92px'
                    justify={'center'}
                    align={'center'}
                    key={index}
                    {
                    ...(selectAmount === index ? {
                      color: '#36ADEF',
                      border: '1.5px solid #36ADEF',
                    } : {
                      border: '1px solid #EFF0F1'
                    })
                    }
                    bg={'#f4f6f8'}
                    borderRadius='4px'
                    position={'relative'}
                    flexGrow='0'
                    cursor={'pointer'}
                    onClick={() => {
                      setSelectAmount(index)
                      setAmount(amount)
                    }}
                  >
                    <Text
                      position={'absolute'}
                      display={'inline-block'}
                      minW={'max-content'}
                      left='78px'
                      top='4px'
                      px={'16px'}
                      color={'#A558C9'}
                      background='#EDDEF4'
                      borderRadius='10px 10px 10px 0px'
                      zIndex={'99'}

                      fontStyle='normal'
                      fontWeight='500'
                      fontSize='12px'
                    >

                      {t('Bonus')}
                      ￥{getFavorable(amount)}
                    </Text>
                    <Text fontStyle='normal'
                      fontWeight='500'
                      fontSize='24px'>￥{amount}</Text>
                  </Flex>)
                }

              </Flex>
            </Flex>
            <Flex alignSelf={'flex-start'} align={'center'}>
              <Text color="#7B838B" mr={'28px'}>
                {t('Recharge Amount')}
              </Text>
              <NumberInput
                defaultValue={15}
                clampValueOnBlur={false}
                min={0}
                step={step}
                isDisabled={data?.data?.status || !!data?.data?.codeURL || createPaymentRes.isLoading}
                mt="8px"
                w="215px"
                h="42px"
                boxSizing="border-box"
                background="#F4F6F8"
                px={'14px'}
                border="1px solid #EFF0F1"
                borderRadius="2px"
                alignItems="center"
                display={'flex'}
                value={amount}
                variant={'unstyled'}
                onChange={(str, v) => (str.trim() ? setAmount(v) : setAmount(0))}
              >
                <Text mr={'4px'}>¥</Text>
                <NumberInputField />
                <NumberInputStepper
                >
                  <NumberIncrementStepper>
                    <Img src={vector.src}></Img>
                  </NumberIncrementStepper>
                  <NumberDecrementStepper>
                    <Img src={vector.src} transform={'rotate(180deg)'}></Img>
                  </NumberDecrementStepper>
                </NumberInputStepper>
              </NumberInput>
              <Text
                py={'1px'}
                px="7px"
                ml={'10px'}
                color={'#A558C9'}
                background='#EDDEF4'
                borderRadius='6px 6px 6px 0px;'
                fontStyle='normal'
                fontWeight='500'
                fontSize='12px'
              >
                {t('Bonus')}
              </Text>
              <Text>￥{getFavorable(amount)}</Text>
            </Flex>
            <Flex alignSelf={'flex-start'} align={'center'} mt={'21px'}>
              <Img src={uil_info_circle.src} w={'18px'} h='18px' mr={'5px'}></Img>
              <Link
                fontStyle='normal'
                fontWeight='400'
                fontSize='12px'
                /* identical to box height, or 18px */
                // textDecorationLine='underline'

                color='#1D8CDC'

              >
                查看优惠规则
              </Link>
            </Flex>
            <Button
              size="primary"
              variant="primary"
              mt="28px"
              onClick={() => handleConfirm()}
              isDisabled={data?.data?.status || !!data?.data?.codeURL || createPaymentRes.isLoading}
            >
              {t('Confirm')}
            </Button>
          </Flex>
          {/* <Flex flexDirection="column" w="100%" mt="73px" px="37px" justify={'center'} align={'center'} mb={'135px'}>

            <Box width={'267px'} height={'295px'}>
              <Text color="#7B838B" mb="8px" textAlign="center">
                {t('Scan with WeChat')}
              </Text>
              {!!data?.data?.codeURL &&
                <QRCodeSVG
                  size={185}
                  value={data?.data?.codeURL}
                  style={{ margin: '0 auto' }}
                  imageSettings={{
                    // 二维码中间的logo图片
                    src: wechat_icon.src,
                    height: 40,
                    width: 40,
                    excavate: true // 中间图片所在的位置是否镂空
                  }}
                />
              }
              <Box mt="8px">
                <Text color="#717D8A" fontSize="12px" fontWeight="normal">
                  {t('Order Number')}： {data?.data?.tradeNO}
                </Text>

                <Text color="#717D8A" fontSize="12px">
                  {t('Payment Result')}:
                  {data?.data?.status && data?.data?.status === 'SUCCESS'
                    ? t('Payment Successful')
                    : t('In Payment')}
                </Text>
              </Box>
            </Box>

          </Flex> */}
          {/* </Flex> */}
        </ModalContent>
      </Modal >
    );
  };

  return {
    RechargeModal
  };
}

export default useRecharge;
