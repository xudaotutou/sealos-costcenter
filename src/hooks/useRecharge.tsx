import request from '@/service/request';
import useOverviewStore from '@/stores/overview';
import { useQueryClient } from '@tanstack/react-query';
import {
  Box,
  Button,
  Flex,
  Img,
  Input,
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
import { useCallback, useEffect, useState } from 'react';
import wechat_icon from '@/assert/ic_baseline-wechat.svg';
import vector from '@/assert/Vector.svg';
import all_arrow from '@/assert/VectorAll.svg';
import { formatMoney } from '@/utils/format';
import { useTranslation } from 'next-i18next';
function useRecharge() {
  const { t } = useTranslation();
  const RechargeModal = () => {
    const { reCharge: isOpen, setRecharge: set_ } = useOverviewStore();
    const balance = useOverviewStore((state) => state.balance);
    const [step, setStep] = useState(1);
    const [amount, setAmount] = useState(1);
    const [paymentName, setPaymentName] = useState('');
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

    // useEffect(() => {
    //   let timer: ReturnType<typeof setTimeout>
    //   timer = setTimeout(() => {
    //     if (data?.data?.status && data?.data?.status === 'SUCCESS') {
    //       createPaymentRes.reset()
    //       queryClient.resetQueries({ queryKey: ['query-charge-res'], exact: true })
    //       onClose()
    //       queryClient.invalidateQueries({ queryKey: ['billing'], exact: false })
    //       queryClient.invalidateQueries({ queryKey: ['getAccount'] })
    //     }
    //   }, 3000);

    //   return () => {
    //     clearTimeout(timer)
    //   }
    // }, [data?.data?.status])
    //   return () => clearTimeout(timer)
    // }, [data?.data?.status, onClose, queryClient, updatesource])
    const handleConfirm = () => {
      createPaymentRes.mutate();
    };
    // const [id, setId] = useState(-1);
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="390px">
          <ModalHeader>{t('Recharge Amount')}</ModalHeader>
          <ModalCloseButton />
          <Flex
            pt="4px"
            mb="36px"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Text color="#7B838B" fontWeight={'normal'}>
              {t('Balance')}
            </Text>
            <Text mt="4px" color="#24282C" fontSize="24px" fontWeight={'medium'}>
              ¥ {formatMoney(balance)}
            </Text>
            <Text color="#7B838B" mt="20px">
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
              /* White/600 */
              background="#F4F6F8"
              px={'14px'}
              /* Gray modern/100 */
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
              // onMouseDown={
              //   ()=> {
              //     now = Date.now();
              //     const intervalId = setInterval(() => {
              //     count += step;
              //     }, 100);
              //   }
              // }
              >
                <NumberIncrementStepper>
                  <Img src={vector.src}></Img>
                </NumberIncrementStepper>
                <NumberDecrementStepper>
                  <Img src={vector.src} transform={'rotate(180deg)'}></Img>
                </NumberDecrementStepper>
              </NumberInputStepper>
            </NumberInput>
            <Button
              size="primary"
              variant="primary"
              mt="12px"
              onClick={() => handleConfirm()}
              isDisabled={data?.data?.status || !!data?.data?.codeURL || createPaymentRes.isLoading}
            >
              {t('Confirm')}
            </Button>
            <Flex flexDirection="column" w="100%" mt="20px" px="37px">
              {!!data?.data?.codeURL ? (
                <>
                  <Text color="#7B838B" mb="8px" textAlign="center">
                    {t('Scan with WeChat')}
                  </Text>
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
                </>
              ) : null}
            </Flex>
          </Flex>
        </ModalContent>
      </Modal>
    );
  };

  return {
    RechargeModal
  };
}

export default useRecharge;
