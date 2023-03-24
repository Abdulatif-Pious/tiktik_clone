import Head from 'next/head';
import { GoogleOAuthProvider } from '@react-oauth/google';

import '../styles/globals.css';
import  Navbar  from '../components/Navbar';
import  Sidebar  from '../components/Sidebar';
import AppContext from '../globalContext/context'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>my_own tikitik</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppContext>
        <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}>
          <div className='h-screen overflow-hidden'>
            <Navbar />
            <main className='flex'>
              <div >
                <Sidebar />
              </div>
              <div className='flex justify-center w-full mb-10'>
                  <div className='flex justify-center w-full max-w-[1600px] h-[82vh] overflow-auto'>
                    <Component {...pageProps} />
                  </div>
              </div>
            </main>
          </div> 
        </GoogleOAuthProvider>    
      </AppContext>  
    </>
  )
}
