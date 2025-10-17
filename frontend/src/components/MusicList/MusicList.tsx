import { useContext, useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Grid,
  Heading,
  Image,
  Paragraph,
  ResponsiveContext,
  Spinner,
  Text,
} from 'grommet';
import { Release, File as ReleaseFile } from '../../models/release';
import { usePlayer } from '../../contexts/PlayerContext';
import { useReleases } from '../../hooks/useReleases';
import FilterBar from '../FilterBar';

export default function MusicList() {
  const { setCurrentRelease, setPlaylist, chooseTrack, currentTrack } =
    usePlayer();
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
  const [query, setQuery] = useState('');
  const { releases, loading, error } = useReleases(query);
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
    [chooseTrack, setPlaylist, getTrackId]
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
          {releases.map((release) => {
            const active = isActive(release.publicKey);
            const playing = isPlayingFromRelease(release);
            return (
              <Card
                key={release.publicKey}
                fill
                role="button"
                hoverIndicator
                onClick={() => setSelectedRelease(active ? null : release)}
                style={{ position: 'relative', cursor: 'pointer' }}
              >
                <Box
                  pad="medium"
                  background="light-2"
                  width="100%"
                  height="100%"
                  style={{
                    position: 'absolute',
                    opacity: active ? 0.9 : 0,
                    pointerEvents: active ? 'auto' : 'none',
                    transition: 'opacity 0.2s ease-in-out',
                  }}
                >
                  <Button
                    onClick={(event) => {
                      event.stopPropagation();
                      handlePlayRelease(release);
                    }}
                    disabled={playing}
                    label={playing ? 'Playing' : 'Play'}
                    primary
                    size="small"
                    alignSelf="start"
                    margin={{ vertical: 'small' }}
                  />
                  <Heading level={3} size="small" margin="none">
                    {release.metadata.name}
                  </Heading>
                  <Box overflow="auto" margin={{ top: 'xsmall' }}>
                    <Paragraph size="small">
                      {release.metadata.description}
                    </Paragraph>
                  </Box>
                </Box>

                <Image
                  src={release.metadata.image}
                  fit="cover"
                  alt={`${release.metadata.name} cover art`}
                />
              </Card>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}
