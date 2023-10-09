import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import type { AppProps } from 'next/app'
import { ProtectedLayout } from '@/layouts/protectedLayouts'

type AppPropsWithAuth = AppProps & {
  Component: {
    requireAuth?: boolean
  }
}

export default function App({ Component, pageProps }: AppPropsWithAuth) {
  return (
    <SessionProvider session={pageProps.session}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {Component.requireAuth ? (
        <ProtectedLayout>
          <Component {...pageProps} />
        </ProtectedLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}
