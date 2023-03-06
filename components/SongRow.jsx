import Image from "next/image";
import { useState } from "react";
import Quackboard from "./Quackboard";

const SongRow = ({ song }) => {
  const [playing, setPlaying] = useState(false);
  const date = new Date(song.created_at);
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  return (
    <div className="flex-col ">
      <div
        className=" p-5 mt-5 flex justify-start items-center gap-8 border-2 rounded-xl"
        key={song.id}
      >
        <Image
          src={song.profilePicture}
          alt="profileImg"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="w-24">
          <h3 className="text-lg font-bold">{song.title}</h3>
          <span>{song.username}</span>
          <p>{formattedDate}</p>
        </div>
        <div className="flex justify-end w-3/4">
          <button
            className="bg-pink-500 items-center flex  text-white button"
            onClick={() => setPlaying(!playing)}
          >
            Play
          </button>
        </div>
      </div>
      {playing && <Quackboard song={song.message} />}
    </div>
  );
};

export default SongRow;
