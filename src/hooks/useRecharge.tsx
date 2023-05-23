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
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { QRCodeSVG } from 'qrcode.react';
import { useCallback, useEffect, useState } from 'react';
import wechat_icon from '@/assert/ic_baseline-wechat.svg';

import all_arrow from '@/assert/VectorAll.svg';
import { formatMoney } from '@/utils/format';
function useRecharge() {

  const RechargeModal = () => {
    const { reCharge: isOpen, setRecharge: set_ } = useOverviewStore();

    const balance = useOverviewStore(state => state.balance)
    const [amount, setAmount] = useState(1);
    const [paymentName, setPaymentName] = useState('');
    const toast = useToast();
    const updatesource = useOverviewStore(state => state.updateSource)
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
        enabled: paymentName !== ''
      }
    );
    const queryClient = useQueryClient()
    const onClose = useCallback(() => {
      set_(false)
      createPaymentRes.reset()
      queryClient.resetQueries({ queryKey: ['query-charge-res'], exact: true })
    }, [createPaymentRes, queryClient, set_])

      useEffect(() => {
        let timer: ReturnType<typeof setTimeout>
        timer = setTimeout(() => {
          if (data?.data?.status && data?.data?.status === 'SUCCESS') {
            createPaymentRes.reset()
            queryClient.resetQueries({ queryKey: ['query-charge-res'], exact: true })
            onClose()
            updatesource()
            queryClient.invalidateQueries({ queryKey: ['getAccount'] })
          }
        }, 3000);
    
        return () => {
          clearTimeout(timer)
        }
      }, [data?.data?.status])
    //   return () => clearTimeout(timer)
    // }, [data?.data?.status, onClose, queryClient, updatesource])
    const handleConfirm = () => {
      createPaymentRes.mutate();

    };

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="390px">
          <ModalHeader>余额充值</ModalHeader>
          <ModalCloseButton />
          <Flex
            pt="4px"
            mb="36px"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Text color="#7B838B" fontWeight={'normal'}>
              当前余额
            </Text>
            <Text mt="4px" color="#24282C" fontSize="24px" fontWeight={'medium'}>
              ¥ {formatMoney(balance)}
            </Text>
            <Text color="#7B838B" mt="20px">
              充值金额
            </Text>
            <Flex
              mt="8px"
              w="215px"
              h="42px"
              boxSizing='border-box'
              /* White/600 */
              background='#F4F6F8'
              px={'14px'}
              /* Gray modern/100 */
              border='1px solid #EFF0F1'
              borderRadius='2px'
              alignItems="center"
            >

              <Text mr='4px'>¥</Text>
              <Input
                value={amount}
                variant={'unstyled'}
                onChange={(e) => setAmount(parseInt(e?.target?.value))}
                min={0}
                type={'number'}
                isDisabled={data?.data?.status || !!data?.data?.codeURL || createPaymentRes.isLoading}
              />
              <Img src={all_arrow.src}></Img>
            </Flex>

            <Button
              size="primary"
              variant="primary"
              mt="12px"
              onClick={() => handleConfirm()}
              isDisabled={data?.data?.status || !!data?.data?.codeURL || createPaymentRes.isLoading}
            >
              确定
            </Button>
            <Flex flexDirection="column" w="100%" mt="20px" px="37px">
              {!!data?.data?.codeURL ? (
                <>
                  <Text color="#7B838B" mb="8px" textAlign="center">
                    微信扫码支付
                  </Text>
                  <QRCodeSVG size={185} value={data?.data?.codeURL} style={{ margin: '0 auto' }} imageSettings={{ // 二维码中间的logo图片
                    src: wechat_icon.src,
                    height: 40,
                    width: 40,
                    excavate: true, // 中间图片所在的位置是否镂空
                  }} />
                  <Box mt="8px">
                    <Text color="#717D8A" fontSize="12px" fontWeight="normal">
                      订单号： {data?.data?.tradeNO}
                    </Text>

                    <Text color="#717D8A" fontSize="12px">
                      支付结果：
                      {data?.data?.status && data?.data?.status === 'SUCCESS'
                        ? '支付成功!'
                        : '支付中...'
                      }
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
