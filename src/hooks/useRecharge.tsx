import request from '@/service/request';
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

type RechargeModalProps = {
  balance: string;
};

function useRecharge() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const RechargeModal = (props: RechargeModalProps) => {
    const [amount, setAmount] = useState(0);
    const [paymentName, setPaymentName] = useState('');

    const createPaymentRes = useMutation(
      () => request.post('/api/account/payment', { amount: amount }),
      {
        onSuccess(data) {
          console.log(data);
          setPaymentName(data.data.paymentName);
        }
      }
    );

    const queryChargeRes = useQuery(
      ['query-charge-res'],
      () => request.post(`/api/account/payment/pay`, {}),
      {
        refetchInterval: paymentName !== '' ? 1000 : false,
        enabled: paymentName !== ''
      }
    );

    const handleConfirm = () => {
      createPaymentRes.mutate();
    };
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="390px" h="315px">
          <ModalHeader>余额充值</ModalHeader>
          <ModalCloseButton />
          <ModalBody pt="4px" mb="36px">
            <Flex flexDirection="column" justifyContent="center" alignItems="center">
              <Text color="#7B838B" fontWeight={'normal'}>
                当前余额
              </Text>
              <Text mt="4px" color="#24282C" fontSize="24px" fontWeight={'medium'}>
                ¥ {props?.balance}
              </Text>
              <Text color="#7B838B" mt="20px">
                充值金额
              </Text>
              <Input
                value={amount}
                onChange={(e) => setAmount(parseInt(e?.target?.value))}
                min={0}
                type={'number'}
                mt="8px"
                w="215px"
                h="42px"
              ></Input>
              <Button size="primary" variant="primary" mt="12px" onClick={() => handleConfirm()}>
                确定
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  return {
    onOpen,
    onClose,
    RechargeModal
  };
}

export default useRecharge;
