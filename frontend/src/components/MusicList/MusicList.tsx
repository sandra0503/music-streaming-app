import { useContext, useEffect, useState, useCallback } from 'react';
import { Release, File as ReleaseFile } from '../../models/release';
import { fetchNinaReleases } from '../../api';
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
import { usePlayer } from '../../contexts/PlayerContext';

export default function MusicList() {
  const { setCurrentRelease, setPlaylist, chooseTrack, currentTrack } =
    usePlayer();
  const [releases, setReleases] = useState<Release[]>([]);
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    let isMounted = true;

    const loadReleases = async () => {
      try {
        const data = await fetchNinaReleases();
        if (isMounted) {
          setReleases(data);
        }
      } catch (err) {
        console.error('Failed to fetch releases', err);
        if (isMounted) setError('Failed to load releases');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadReleases();
    return () => {
      isMounted = false;
    };
  }, []);

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
      <Box align="center" justify="center" pad="large">
        <Spinner />
        <Text margin={{ top: 'small' }}>Loading releases...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box align="center" justify="center" pad="large">
        <Text color="status-critical">{error}</Text>
      </Box>
    );
  }

  if (releases.length === 0) {
    return (
      <Box align="center" justify="center" pad="large">
        <Text>No releases found.</Text>
      </Box>
    );
  }

  return (
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
              <Box overflow={'auto'} margin={{ top: 'xsmall', bottom: 'none' }}>
                {' '}
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
  );
}
