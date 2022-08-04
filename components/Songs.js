import { useRecoilValue } from 'recoil';
import { playlistAtom } from '../atom/playlistAtom'
import Song from './Song'


function Songs() {
  const playlists = useRecoilValue(playlistAtom);
  console.log(playlists?.tracks.items[0].track)

  return (
    <div className="px-6 flex flex-col mt-3 space-y-2 pb-28 text-white">
      {playlists?.tracks.items.map((track , index) =>(
       <Song key={track.track.id} track={track} order={index} />
      ))}
         
    </div>
  );
}

export default Songs;