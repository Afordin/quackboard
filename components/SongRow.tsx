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
    <div className='flex flex-col gap-2 justify-center'>
      <div
        className="flex justify-between items-center px-4 py-2 border-2 border-black bg-white text-black rounded-xl mb-1"
        key={song.id}
      >
        <div className="flex gap-6 items-center">
          <Image
            src={song.profilePicture}
            alt="profile image"
            width={40}
            height={40}
            className="rounded-full aspect-square h-16 w-auto"
          />
          <div>
            <h3 className="text-lg font-bold pl-1 supershadow-text text-white test">{song.title}</h3>
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
