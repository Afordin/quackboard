import { useEffect, useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import SongRow from '@/components/SongRow'
import type { Song } from '@/types'

export default function List() {
  const supabase = useSupabaseClient()
  // const [playing, setPlaying] = useState(false);
  const [songs, setSongs] = useState<Song[] | null>(null)
  const getSongsFromSupabase = async () => {
    const { data, error } = await supabase.from('canciones').select('*')
    error
      ? console.log(error)
      : setSongs(data as Song[])
  }

  useEffect(() => {
    getSongsFromSupabase()
  }, [])

  return (
    <section>
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Lista de canciones
        </h2>
      </div>
      <ul role="list">
        <li>
          <article>
            <header>
              {songs?.map((song) => {
                return (
                  <SongRow song={song} key={song.id.toString()} />
                )
              })}
            </header>
          </article>
        </li>
      </ul>
    </section>
  )
}
