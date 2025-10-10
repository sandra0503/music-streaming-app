import React, { useEffect, useState } from 'react';
import { Release } from '../../models/release';
import { fetchNinaReleases } from '../../api';
import { Box, Heading, Image } from 'grommet';

export default function MusicList() {
  const [releases, setReleases] = useState<Release[]>([]);

  useEffect(() => {
    const fetchTracks = async () => {
      const releases = await fetchNinaReleases();
      setReleases(releases);
    };
    fetchTracks();
  }, []);

  return (
    <div>
      <h2>Discover Music</h2>
      {releases.map((release) => (
        <Box height="small" width="small" key={release.publicKey}>
          <Heading level={3} size="small">
            {release.metadata.name}
          </Heading>
          <Image
            src={release.metadata.image}
            fit="contain"
            alt="release cover"
          />
        </Box>
      ))}
    </div>
  );
}
