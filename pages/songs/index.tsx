import Image from "next/image.js";
import { useState, useEffect } from "react";
import Quackboard from "../../components/Quackboard.jsx";
import { supabase } from "../../utils/supabaseClient";




export default function List() {
    const [songs, setSongs] = useState([]);

    const getSongsFromSupabase = async () => {
        const { data, error } = await supabase
            .from('canciones')
            .select('*')
        if (error) {
            console.log(error)
        } else {
            setSongs(data)
        }
    }

    useEffect(() => {
        getSongsFromSupabase()
    }, [])
    





    return (
        <section>
            <div className="max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Lista de canciones</h2>
                <p className="my-2 text-lg leading-8 text-gray-600">
                    Test
                </p>
            </div>
            <ul role="list">
                <li>
                    <article>
                        <header>
                            {songs?.map((song) => {
                                const date = new Date(song.created_at)
                                const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

                                return (
                                    <div className=" p-5 mt-5 flex justify-start items-center gap-8 border-2 rounded-xl" key={song.id}>
                                        <Image src={song.profilePicture} alt='profileImg' width={40} height={40} className="rounded-full"/>
                                        <div>
                                            <h3 className="text-lg font-bold">{song.title}</h3>
                                            <span>{song.username}</span>
                                            <p>{formattedDate}</p>
                                        </div>
                                    </div>
                                  
                                )
                            })}
                        </header>
                    </article>
                </li>    
            </ul>
        </section>
    );
}