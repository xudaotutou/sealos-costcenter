import { Box, Flex, Select, Text } from '@chakra-ui/react';
import styles from './index.module.scss';

export default function CostOverview() {
  return (
    <Flex w="100%" h="100%">
      <Box w="100%" bg={'white'}>
        <Flex>
          <Flex>
            <Text>成本总览</Text>
            <Select>
              <option value="option1">小时</option>
              <option value="option2">dsa</option>
              <option value="option3">Option 3</option>
            </Select>
          </Flex>
        </Flex>
        <Flex></Flex>
      </Box>
      <Box
        flexShrink={0}
        w={'375px'}
        h="100%"
        ml={2}
        bg={'white'}
        py={'32px'}
        px={'24px'}
        overflowY="auto"
      >
        <div className={styles.userCard}></div>
        <Box mt="20px">
          <Text>收支</Text>
          <Select>
            <option value="option1">小时</option>
            <option value="option2">dsa</option>
            <option value="option3">Option 3</option>
          </Select>
        </Box>
        <Flex justifyContent={'space-around'} mt="20px">
          <Box w={'127px'} h={'146px'} bg={'#F9FAFD'} borderRadius={'8px'}></Box>
          <Box w={'127px'} h={'146px'} bg={'#F9FAFD'} borderRadius={'8px'}></Box>
        </Flex>
        <Box mt="20px">
          <Text>成本分布</Text>
          <Select>
            <option value="option1">小时</option>
            <option value="option2">dsa</option>
            <option value="option3">Option 3</option>
          </Select>
        </Box>
      </Box>
    </Flex>
  );
}
