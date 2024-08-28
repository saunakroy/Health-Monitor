import Head from 'next/head'
import '@/styles/globals.css'
import Sidebar from '@/components/Navigation/Sidebar'
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Health Monitor</title>
      </Head>
      <Sidebar>
        <Component {...pageProps} />
      </Sidebar>
    </>
  )
}
