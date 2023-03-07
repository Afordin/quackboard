import type { AppProps } from 'next/app'
import { useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { Session } from '@supabase/auth-helpers-react'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import Layout from '@/components/Layout'

import type { Database } from 'types-db'
import 'styles/globals.css'

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session
}>) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>(),
  )

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionContextProvider>
  )
}
