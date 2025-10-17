import { useContext, useCallback, useState } from 'react';
import { Box, Grid, ResponsiveContext, Spinner, Text } from 'grommet';
import { Release, File as ReleaseFile } from '../../models/release';
import { usePlayer } from '../../contexts/PlayerContext';
import { useReleases } from '../../hooks/useReleases';
import FilterBar from '../FilterBar';
import ReleaseCard from '../ReleaseCard';

export default function MusicList({ token }: { token: string | null }) {
  const { setCurrentRelease, setPlaylist, chooseTrack, currentTrack } =
    usePlayer();
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
  const [query, setQuery] = useState('');
  const { releases, loading, error } = useReleases(query, token);
  const size = useContext(ResponsiveContext);

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

  const handlePlayRelease = useCallback(
    (release: Release) => {
      const playlist = release.metadata.properties.files.map((file) => ({
        id: getTrackId(release, file),
        name: file.track_title,
        src: file.uri,
      }));
      setCurrentRelease(release);
      setPlaylist(playlist);
      chooseTrack(playlist[0]);
    },
    [chooseTrack, setCurrentRelease, setPlaylist, getTrackId]
  );

  if (loading) {
    return (
      <Box align="center" justify="center" pad="large" fill>
        <Spinner />
        <Text margin={{ top: 'small' }}>Loading releases...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box align="center" justify="center" pad="large" fill>
        <Text color="status-critical">{error}</Text>
      </Box>
    );
  }

  return (
    <Box fill>
      <FilterBar onSearch={setQuery} initialQuery={query} />
      <Box
        fill
        overflow="auto"
        pad={{ vertical: 'small', horizontal: 'large' }}
        align="center"
      >
        {releases.length === 0 ? (
          <Box align="center" justify="center" pad="large" fill>
            <Text>No releases found.</Text>
          </Box>
        ) : null}
        <Grid
          columns={size !== 'small' ? ['1fr', '1fr', '1fr', '1fr'] : ['100%']}
          gap="small"
        >
          {releases.map((release) => (
            <ReleaseCard
              key={release.publicKey}
              release={release}
              isActive={isActive(release.publicKey)}
              isPlaying={isPlayingFromRelease(release)}
              onSelect={setSelectedRelease}
              onPlay={handlePlayRelease}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
