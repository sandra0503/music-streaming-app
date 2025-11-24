import { useCallback } from 'react';
import { Release, File as ReleaseFile } from '../models/release';
import { usePlayer } from '../contexts/PlayerContext';

export function useReleasePlayback(
  selectedRelease: Release | null,
  setSelectedRelease: (release: Release | null) => void
) {
  const { setCurrentRelease, setPlaylist, chooseTrack, currentTrack } =
    usePlayer();

  const getTrackId = useCallback(
    (release: Release, file: ReleaseFile) =>
      `${release.publicKey}-${file.track}`,
    []
  );

  const isActive = useCallback(
    (publicKey: string) => selectedRelease?.publicKey === publicKey,
    [selectedRelease]
  );

  const isPlayingFromRelease = useCallback(
    (release: Release) =>
      !!currentTrack &&
      release.metadata.properties.files.some(
        (f) => getTrackId(release, f) === currentTrack.id
      ),
    [currentTrack, getTrackId]
  );

  const playRelease = useCallback(
    (release: Release) => {
      const playlist = release.metadata.properties.files.map((file) => ({
        id: getTrackId(release, file),
        name: file.track_title,
        src: file.uri,
      }));

      setCurrentRelease(release);
      setPlaylist(playlist);
      chooseTrack(playlist[0]);
      setSelectedRelease(release);
    },
    [
      chooseTrack,
      setCurrentRelease,
      setPlaylist,
      setSelectedRelease,
      getTrackId,
    ]
  );

  return {
    getTrackId,
    isActive,
    isPlayingFromRelease,
    playRelease,
  };
}
