import Head from 'next/head'
import '@/styles/globals.css'
import Sidebar from '@/components/Navigation/Sidebar'
import SearchBar from '@/components/Navigation/SearchBar' // Updated import path

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Health Monitor</title>
      </Head>
      <div className="flex h-screen">
        <Sidebar>
          <div className="">
            {' '}
            {/* Adjust padding to match sidebar width */}
            <SearchBar />
            {/* <main className="flex-1 overflow-y-auto p-4"> */}
              <Component {...pageProps} />
            {/* </main> */}
          </div>
        </Sidebar>
      </div>
    </>
  )
}
