import React, { useContext, useEffect, useState } from 'react';
import { Release } from '../../models/release';
import { fetchNinaReleases } from '../../api';
import { Box, Card, Grid, Heading, Image, ResponsiveContext } from 'grommet';

export default function MusicList() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [selectedReleases, setSelectedReleases] = useState<Release | null>(
    null
  );

  const size = useContext(ResponsiveContext);

  const isActive = (publicKey: string): boolean => {
    return selectedReleases?.publicKey === publicKey;
  };

  useEffect(() => {
    const fetchTracks = async () => {
      const releases = await fetchNinaReleases();
      setReleases(releases);
    };
    fetchTracks();
  }, []);

  return (
    <Grid
      columns={size !== 'small' ? ['25%', '25%', '25%', '25%'] : ['100%']}
      gap="small"
    >
      {releases.map((release) => (
        <Card
          fill
          key={release.publicKey}
          style={{ position: 'relative' }}
          onClick={() => {
            console.log('Clicked release', release.publicKey);
            if (isActive(release.publicKey)) {
              setSelectedReleases(null);
            } else {
              setSelectedReleases(release);
            }
          }}
        >
          <Box
            pad="small"
            background="light-2"
            width={'100%'}
            height={'100%'}
            style={{
              position: 'absolute',
              opacity: 0.8,
              visibility: isActive(release.publicKey) ? 'visible' : 'hidden',
            }}
          >
            <Heading level={3} size="small">
              {release.metadata.name}
            </Heading>
          </Box>

          <Image
            src={release.metadata.image}
            fit="contain"
            alt="release cover"
          />
        </Card>
      ))}
    </Grid>
  );
}
