import { useContext, useState, useMemo } from 'react';
import { Box, Grid, ResponsiveContext, Spinner, Text } from 'grommet';
import { Release } from '../../models/release';
import { useFavourites } from '../../hooks/useFavourites';
import ReleaseCard from '../ReleaseCard';
import { useReleasePlayback } from '../../hooks/useReleasePlayback';

export default function FavouritesList({ token }: { token: string | null }) {
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
  const { releases, loading, error } = useFavourites(token);
  const size = useContext(ResponsiveContext);

  const { isActive, isPlayingFromRelease, playRelease } = useReleasePlayback(
    selectedRelease,
    setSelectedRelease
  );

  // Sort + group by month
  const releasesByMonth = useMemo(() => {
    if (!releases || releases.length === 0) return {};

    // 1. Sort descending
    const sorted = [...releases].sort(
      (a, b) =>
        new Date(b.addedAt ? b.addedAt : b.metadata.properties.date).getTime() -
        new Date(a.addedAt ? a.addedAt : a.metadata.properties.date).getTime()
    );

    // 2. Group by Month + Year (e.g., "January 2024")
    return sorted.reduce((acc: Record<string, Release[]>, release) => {
      const d = new Date(
        release.addedAt ? release.addedAt : release.metadata.properties.date
      );
      const label = d.toLocaleString('default', {
        month: 'long',
        year: 'numeric',
      });

      if (!acc[label]) acc[label] = [];
      acc[label].push(release);
      return acc;
    }, {});
  }, [releases]);

  if (loading) {
    return (
      <Box fill align="center" justify="center" pad="large">
        <Spinner />
        <Text margin={{ top: 'small' }}>Loading your favourites...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box fill align="center" justify="center" pad="large">
        <Text color="status-critical">{error}</Text>
      </Box>
    );
  }

  const monthLabels = Object.keys(releasesByMonth);

  return (
    <Box fill overflow="auto" pad="large" align="center">
      {monthLabels.length === 0 && (
        <Box align="center" justify="center" pad="large">
          <Text>No favourites yet.</Text>
        </Box>
      )}

      {monthLabels.map((month) => (
        <Box
          key={month}
          width="100%"
          margin={{ bottom: 'large' }}
          style={{ minHeight: 'auto' }}
        >
          <Text size="large" weight="bold" margin={{ bottom: 'small' }}>
            {month}
          </Text>

          <Grid
            columns={size !== 'small' ? ['1fr', '1fr', '1fr', '1fr'] : ['100%']}
            gap="small"
            fill="horizontal"
          >
            {releasesByMonth[month].map((release) => (
              <ReleaseCard
                key={release.publicKey}
                release={release}
                isActive={isActive(release.publicKey)}
                isPlaying={isPlayingFromRelease(release)}
                onSelect={setSelectedRelease}
                onPlay={playRelease}
              />
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
}
