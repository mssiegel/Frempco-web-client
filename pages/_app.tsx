import Head from 'next/head';
import './styles.css';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { Analytics } from '@vercel/analytics/react';

import theme from '@theme/muiTheme';
import { createEmotionCache } from '@config/emotion';
import { SocketProvider } from 'src/contexts/SocketContext';
import { UserProvider } from 'src/contexts/UserContext';
import CheckAuthentication from 'src/routes/CheckAuthentication';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Create Next App</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SocketProvider>
          <UserProvider>
            <CheckAuthentication>
              <Component {...pageProps} />
              <Analytics />
            </CheckAuthentication>
          </UserProvider>
        </SocketProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
