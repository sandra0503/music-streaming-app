import React, { useCallback } from 'react';
import { Box, Button, Card, Heading, Image, Paragraph } from 'grommet';
import { Release } from '../../models/release';
import { Play } from 'grommet-icons';

type ReleaseCardProps = {
  release: Release;
  isActive: boolean;
  isPlaying: boolean;
  onSelect: (release: Release | null) => void;
  onPlay: (release: Release) => void;
};

export default function ReleaseCard({
  release,
  isActive,
  isPlaying,
  onSelect,
  onPlay,
}: ReleaseCardProps) {
  const handleClick = useCallback(() => {
    onSelect(isActive ? null : release);
  }, [isActive, release, onSelect]);

  const handlePlayClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      onPlay(release);
    },
    [onPlay, release]
  );

  return (
    <Card
      key={release.publicKey}
      fill
      role="button"
      hoverIndicator
      onClick={handleClick}
      style={{ position: 'relative', cursor: 'pointer', minWidth: '10rem' }}
    >
      {/* Overlay */}
      <Box
        pad="medium"
        background="light-2"
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          opacity: isActive ? 0.9 : 0,
          pointerEvents: isActive ? 'auto' : 'none',
          transition: 'opacity 0.2s ease-in-out',
        }}
      >
        <Button
          icon={<Play size="16" />}
          onClick={handlePlayClick}
          disabled={isPlaying}
          label={isPlaying ? 'Playing' : 'Play'}
          primary
          size="small"
          alignSelf="end"
          margin={{ bottom: 'small' }}
        />
        <Heading
          level={3}
          margin="none"
          style={{ fontSize: '1rem', lineHeight: '1.5rem' }}
        >
          {release.metadata.name}
        </Heading>
        <Box overflow="auto" margin={{ top: 'xsmall' }}>
          <Paragraph size="small" margin="0">
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
}
