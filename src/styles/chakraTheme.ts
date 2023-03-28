// import { selectAnatomy } from '@chakra-ui/anatomy';
import {
  ComponentStyleConfig,
  createMultiStyleConfigHelpers,
  defineStyleConfig,
  extendTheme
} from '@chakra-ui/react';
// const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
//   selectAnatomy.keys
// );

const Button = defineStyleConfig({
  baseStyle: {
    _active: {
      transform: 'scale(0.98)'
    }
  },
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 3,
      py: 0,
      fontWeight: 'normal',
      height: '26px',
      borderRadius: '2px'
    },
    md: {
      fontSize: 'md',
      px: 6,
      py: 0,
      height: '34px',
      fontWeight: 'normal',
      borderRadius: '4px'
    },
    lg: {
      fontSize: 'lg',
      px: 8,
      py: 0,
      height: '42px',
      fontWeight: 'normal',
      borderRadius: '8px'
    }
  },
  variants: {
    base: {
      backgroundColor: '#EAEEF1',
      color: '#54585C',
      px: 6,
      py: 1,
      _hover: {
        filter: 'brightness(95%)'
      },
      _disabled: {
        backgroundColor: 'gray.300 !important'
      }
    }
  },
  defaultProps: {
    size: 'md',
    colorScheme: 'blue'
  }
});

const Input: ComponentStyleConfig = {
  baseStyle: {
    field: {}
  },
  variants: {
    outline: {
      field: {
        backgroundColor: 'transparent',
        border: '1px solid',
        borderColor: 'gray.300',
        _focus: {
          backgroundColor: 'transparent',
          borderColor: 'blue.500'
        }
      }
    }
  },
  defaultProps: {
    size: 'md',
    variant: 'outline'
  }
};

const Select = defineStyleConfig({
  variants: {
    filled: {
      field: {
        backgroundColor: '#F4F6F8'
      }
    }
  },
  defaultProps: {
    size: 'md',
    variant: 'filled'
  }
});

export const theme = extendTheme({
  components: {
    Button,
    Input,
    Select
  }
});
