import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'

import type { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <SessionProvider session={session}>
    <Component {...pageProps} />
  </SessionProvider>
)

export default MyApp
