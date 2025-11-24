import { useContext, useState } from 'react';
import { Box, Grid, ResponsiveContext, Spinner, Text } from 'grommet';
import { Release } from '../../models/release';
import { useReleases } from '../../hooks/useReleases';
import FilterBar from '../FilterBar';
import ReleaseCard from '../ReleaseCard';
import { useReleasePlayback } from '../../hooks/useReleasePlayback';

export default function MusicList({ token }: { token: string | null }) {
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
  const [query, setQuery] = useState('');
  const [staffPicksEnabled, setStaffPicksEnabled] = useState(false);

  const { releases, loading, error } = useReleases(
    query,
    staffPicksEnabled,
    token
  );

  const size = useContext(ResponsiveContext);

  const { isActive, isPlayingFromRelease, playRelease } = useReleasePlayback(
    selectedRelease,
    setSelectedRelease
  );

  if (loading) {
    return (
      <Box fill>
        <FilterBar
          onSearch={setQuery}
          onToggleStaffPicks={setStaffPicksEnabled}
          initialQuery={query}
          initialStaffPicks={staffPicksEnabled}
        />
        <Box fill align="center" justify="center" pad="large">
          <Spinner />
          <Text margin={{ top: 'small' }}>Loading releases...</Text>
        </Box>
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

  return (
    <Box fill>
      <FilterBar
        onSearch={setQuery}
        onToggleStaffPicks={setStaffPicksEnabled}
        initialQuery={query}
        initialStaffPicks={staffPicksEnabled}
      />

      <Box
        fill
        overflow="auto"
        pad={{ vertical: 'small', horizontal: 'large' }}
        align="center"
      >
        {releases.length === 0 && (
          <Box align="center" justify="center" pad="large">
            <Text>No releases found.</Text>
          </Box>
        )}

        <Grid
          columns={size !== 'small' ? ['1fr', '1fr', '1fr', '1fr'] : ['100%']}
          gap="small"
          fill="horizontal"
        >
          {releases.map((release) => (
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
    </Box>
  );
}
