import Layout from '@/layout';
import { theme } from '@/styles/chakraTheme';
import '@/styles/globals.scss';
import { ChakraProvider } from '@chakra-ui/react';
import { persistQueryClient, removeOldestQuery } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import Fonts from '@/styles/fonts';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import 'react-day-picker/dist/style.css';

// import '@/utils/i18n';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // refetchOnWindowFocus: false,
      // retry: false,
      cacheTime: 1000 * 60
    }
  }
});
if (typeof window !== 'undefined') {
  const syncStoragePersister = createSyncStoragePersister({ storage: window.localStorage, retry: removeOldestQuery })

  persistQueryClient({
    // queryClient,
    persister: syncStoragePersister,
    queryClient: queryClient
  })
 }


//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  // const aliveScopeProps = useMemo(() => ({ timeout: 300 }), []);
  return (

    <QueryClientProvider

      client={queryClient}
    >
      <ChakraProvider theme={theme}>
        <Fonts></Fonts>
        <Layout>
          {/* <AliveScope {...aliveScopeProps}> */}
          <Component {...pageProps} />
          {/* </AliveScope > */}

        </Layout>
      </ChakraProvider>
    </QueryClientProvider>

  );
}
