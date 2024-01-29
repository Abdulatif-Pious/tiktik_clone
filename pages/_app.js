import { useEffect } from 'react';

import Head from 'next/head';
import { GoogleOAuthProvider } from '@react-oauth/google';

import '@/styles/globals.css';
import AppContext from '@/globalContext/context';
import  {   MobileSidebar }  from '@/components';
import  useAuthStore  from "@/store/auth-store";

import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

export default function App({ Component, pageProps }) {
  const { fetchAllUsers,  allUsers} = useAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, [allUsers.length]);

  return (
    <>
      <Head>
        <title>new generation of tiktok</title>
        <meta name="description" content="new version of tiktik" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png"  href="./tiktik-logo.png" />
      </Head>

      <AppContext>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
          <div className='h-screen overflow-y-scroll'>
            <nav className='fixed flex items-center justify-between w-full h-[80px] bg-gray-50  px-2 z-10 shadow-md shadow-[#f519973a]'>
              <Navbar />
            </nav>
            <div className='flex w-full h-full'>
              <aside className='fixed bottom-0 top-0 h-full pt-[80px] md:bg-gray-50 overflow-y-hidden hover:overflow-y-scroll transition'>
                <Sidebar />
              </aside>
              <aside className='fixed bottom-0 top-0 z-20'>
                <MobileSidebar />
              </aside>
              
              <main className='w-full h-full pt-[80px]'>
                <Component {...pageProps} />
              </main>
            </div>
          </div> 
        </GoogleOAuthProvider>    
      </AppContext>  
    </>
  )
}
