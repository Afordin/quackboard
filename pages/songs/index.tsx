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
    error ? console.log(error) : setSongs(data as Song[])
  }

  useEffect(() => {
    getSongsFromSupabase()
  }, [])

  return (
    <section>
      <h1 className="text-xl font-bold supershadow-title text-green-400 sm:text-5xl">Lista de canciones</h1>
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
