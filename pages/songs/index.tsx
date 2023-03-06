import Image from "next/image.js";
import { useState, useEffect } from "react";
import Quackboard from "../../components/Quackboard.jsx";
import { supabase } from "../../utils/supabaseClient";
import SongRow from "../../components/SongRow.jsx";
import { randomUUID } from "crypto";

export default function List() {
  const [songs, setSongs] = useState([]);
  //const [playing, setPlaying] = useState(false);

  const getSongsFromSupabase = async () => {
    const { data, error } = await supabase.from("canciones").select("*");
    if (error) {
      console.log(error);
    } else {
      setSongs(data);
    }
  };

  useEffect(() => {
    getSongsFromSupabase();
  }, []);

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
                  <>
                    <SongRow song={song} />
                  </>
                );
              })}
            </header>
          </article>
        </li>
      </ul>
    </section>
  );
}
