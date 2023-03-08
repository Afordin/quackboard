import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import SongRow from '@/components/SongRow'
import type { Song } from '@/types'

export default function List({ songs }: { songs: Song[] }) {
  return (
    <section>
      <h1 className="text-xl font-bold comic-title text-green-400 sm:text-5xl">Lista de canciones</h1>
      <ul role="list" className="grid grid-cols-2 gap-4 mt-6">
        {songs?.map((song) => {
          return (
            <li key={song.id.toString()}>
              <article>
                <SongRow song={song} />
              </article>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
export const getServerSideProps = async (ctx: any) => {
  const supabase = createServerSupabaseClient(ctx)
  const { data, error } = await supabase.from('canciones').select('*')

  if (error)
    return { props: { songs: null } }

  return { props: { songs: data as Song[] } }
}
