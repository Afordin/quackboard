import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Quackboard from '../../components/Quackboard.jsx'

export default function New() {
  const supabase = useSupabaseClient()
  return (
        <section>
      <Quackboard supabase={supabase} />
        </section>
  )
}
