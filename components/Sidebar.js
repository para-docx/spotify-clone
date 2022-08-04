import { useState, useEffect } from 'react'
import { HomeIcon, SearchIcon, LibraryIcon, PlusCircleIcon, HeartIcon, RssIcon } from '@heroicons/react/outline'
import { signOut, useSession } from "next-auth/react"
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atom/playlistAtom';
import useSpotify from '../hooks/useSpotify'

function Sidebar() {
    const spotifyAPI = useSpotify();
    const { data: session, status } = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

    console.log("you have selected>>>>>", playlistId)

    useEffect(() => {
        if (spotifyAPI.getAccessToken()) {
            spotifyAPI.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items);
            }
            )
        }
    }, [session, spotifyAPI])

    


    return (
        <div className="text-gray-500 p-5 border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen">
            <div className="space-y-3">
                <button className="flex item-center space-x-2 hover:text-white">
                    <HomeIcon className="h-5 w-5" />
                    <p>Home</p>
                </button>
                <button className="flex item-center space-x-2 hover:text-white" onClick={() => signOut()}>
                    <HomeIcon className="h-5 w-5" />
                    <p>Logout</p>
                </button>
                <button className="flex item-center space-x-2 hover:text-white">
                    <SearchIcon className="h-5 w-5" />
                    <p>Search</p>
                </button>
                <button className="flex item-center space-x-2 hover:text-white">
                    <LibraryIcon className="h-5 w-5" />
                    <p>Your Library</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900" />

                <button className="flex item-center space-x-2 hover:text-white">
                    <PlusCircleIcon className="h-5 w-5" />
                    <p>Create New Playlist</p>
                </button>
                <button className="flex item-center space-x-2 hover:text-white">
                    <HeartIcon className="h-5 w-5" />
                    <p>Liked Songs</p>
                </button>
                <button className="flex item-center space-x-2 hover:text-white">
                    <RssIcon className="h-5 w-5" />
                    <p>Your Eps</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900" />

                {/* playlist */}
                {playlists.map((playlist) => ( 
                    <p key={playlist.id}
                        onClick={() => setPlaylistId(playlist.id)}
                        className="cursor-pointer hover:text-white">
                        {playlist.name}
                    </p>
                ))}


            </div>
        </div>
    )
}

export default Sidebar