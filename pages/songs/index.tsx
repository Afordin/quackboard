import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import SongRow from "@/components/SongRow";
import type { Song } from "@/types";

export default function List() {
  const supabase = useSupabaseClient();
  // const [playing, setPlaying] = useState(false);
  const [songs, setSongs] = useState<Song[] | null>(null);
  const getSongsFromSupabase = async () => {
    const { data, error } = await supabase.from("canciones").select("*");
    error ? console.log(error) : setSongs(data as Song[]);
  };

  useEffect(() => {
    getSongsFromSupabase();
  }, []);

  return (
    <section>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Lista de canciones
      </h2>
      <ul role="list" className="grid grid-cols-2 gap-4 mt-6">
        {songs?.map((song) => {
          return (
            <li key={song.id.toString()}>
              <article>
                <SongRow song={song} />
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
