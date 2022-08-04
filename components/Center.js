import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ChevronDownIcon } from '@heroicons/react/outline';
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistAtom } from '../atom/playlistAtom';
import useSpotify from '../hooks/useSpotify';
import Songs from './Songs'


const colors = [
  "from-indigo-500",
  "from-orange-500",
  "from-green-500",
  "from-blue-500",
  "from-gray-500",
  "from-purple-500",
  "from-pink-500",
  "from-red-600"
]

function Center() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlists, setPlaylists] = useRecoilState(playlistAtom);


  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylists(data.body);
      })
      .catch((err) => console.log('Something went wrong!', err));
  }, [spotifyApi, playlistId]);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide select-none relative text-white">
      <header className="absolute top-5 right-8">
        <div className="flex flex-items-center bg-black space-x-3 opacity-90 hover: opacity-80 cursor-pointer rounded-full p-1 pr-2">
          <img className="rounded-full w-10 h-18" src={session?.user.image} alt="" />
          <h2 className=""> {session?.user.name} </h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>


      <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 w-full`}>


        <img className="h-44 w-44 shadow-2x1" src={playlists?.images?.[0]?.url} alt="" />

        <div>
          <p>Playlist</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl">{playlists?.name}</h1>
        </div>
      </section>

      <div>
          <Songs />
      </div>

    </div>
    

  )
}

export default Center