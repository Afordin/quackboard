import Image from 'next/image'
import { useState } from 'react'
import Quackboard from './Quackboard'

import type { Song } from '@/types'
interface SongRowProps {
  song: Song
}

const SongRow = ({ song }: SongRowProps) => {
  const [playing, setPlaying] = useState(false)
  const date = new Date(song.created_at)
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1
    }/${date.getFullYear()}`
  return (
    <div className='flex flex-col justify-center gap-2'>
      <div
        className="flex items-center justify-between px-4 py-2 mb-1 text-black bg-white border-2 border-black rounded-xl"
        key={song.id}
      >
        <div className="flex items-center gap-6">
          <Image
            src={song.profilePicture}
            alt="profile image"
            width={40}
            height={40}
            className="w-auto h-16 rounded-full aspect-square"
          />
          <div>
            <h3 className="pl-1 text-lg font-bold text-white comic-text relevance">{song.title}</h3>
            <span className='font-medium'>@{song.username} · {formattedDate}</span>
          </div>
        </div>
        <div>
          <button
            className="!bg-amber-300 items-center flex  button"
            onClick={() => setPlaying(!playing)}
          >
            ▷ Reproducir
          </button>
        </div>
      </div>
      {playing && <Quackboard song={song.message} width={535} />}
    </div>
  )
}

export default SongRow
