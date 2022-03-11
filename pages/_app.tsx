import * as React from 'react';
import Head from 'next/head';
import './styles.css';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { CacheProvider, EmotionCache } from '@emotion/react';

import theme from '@theme/muiTheme';
import { createEmotionCache } from '@config/emotion';
import { SocketProvider } from 'src/contexts/SocketContext';
import { UserProvider } from 'src/contexts/UserContext';
import { useRouter } from 'next/router';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const denyList = [
    '/teacher/classroom/[classroomName]',
    '/student/classroom/[classroomName]',
  ];
  const router = useRouter();
  const [userIsAuthorized, setUserIsAuth] = React.useState(false);
  React.useEffect(() => {
    if (denyList.includes(router.pathname)) {
      window.location.assign('/');
    } else {
      setUserIsAuth(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (userIsAuthorized)
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
              <Component {...pageProps} />
            </UserProvider>
          </SocketProvider>
        </ThemeProvider>
      </CacheProvider>
    );

  return <></>;
}
