import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import { SessionProvider } from "next-auth/react"
import DefaultLayout from '../layouts/DefaultLayout'
import type { NextPage } from 'next'
import { wrapper } from "../store/store";
import { Provider } from 'react-redux';
import { initAxios } from '../src/axios';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

const MyApp = function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout

  initAxios(store)

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <SessionProvider session={pageProps.session}>
          <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {getLayout ? getLayout(<Component {...pageProps} />) : (
              <DefaultLayout>
                <Component {...pageProps} />
              </DefaultLayout>
            )}
          </ThemeProvider>
        </SessionProvider>
      </CacheProvider>
    </Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
