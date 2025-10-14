import { useCallback, useEffect, useRef, memo } from 'react';
import { Audio, AudioTrack, useAudio } from '@sina_byn/re-audio';
import { usePlayer } from '../../contexts/PlayerContext';
import { Anchor, Box, Button, Heading, RangeInput } from 'grommet';
import { Next, Pause, Play, Previous } from 'grommet-icons';

const PlayBackControlsSkeleton = memo(() => (
  <Box direction="column" margin="medium">
    <Heading level={4} margin="none" color="text-weak">
      No track selected
    </Heading>

    <Box direction="row" align="center" gap="small">
      <RangeInput
        a11yTitle="Track progress"
        value={0}
        min={0}
        max={10}
        disabled
      />
      <Button icon={<Previous />} disabled />
      <Button icon={<Play />} disabled />
      <Button icon={<Next />} disabled />
    </Box>

    <Anchor
      label="Collect"
      size="small"
      style={{ textDecoration: 'none', fontWeight: 'bold' }}
      disabled
    />
  </Box>
));
PlayBackControlsSkeleton.displayName = 'PlayBackControlsSkeleton';

const PlayBackControls: React.FC = () => {
  const lastTrackRef = useRef<AudioTrack | null>(null);

  const {
    currentTrack,
    currentTime,
    duration,
    playing,
    setCurrentTime,
    togglePlay,
    prevTrack,
    nextTrack,
  } = useAudio();

  const {
    currentRelease,
    playlist,
    currentTrack: playerTrack,
    chooseTrack,
  } = usePlayer();

  const getTrackName = useCallback(
    (id: string | number): string =>
      playlist.find((track) => track.id === id)?.name ?? 'Unknown track',
    [playlist]
  );

  // Keep player context in sync with audio state
  useEffect(() => {
    if (!currentTrack) return;
    if (playerTrack?.id === currentTrack.id) return;

    chooseTrack({ ...currentTrack, name: getTrackName(currentTrack.id) });
  }, [currentTrack, playerTrack?.id, chooseTrack, getTrackName]);

  // Auto-play when a new track is loaded and ready
  useEffect(() => {
    if (!playerTrack || playing) return;

    lastTrackRef.current = playerTrack;
    const audioEl = document.querySelector<HTMLAudioElement>('audio');
    if (!audioEl) return;

    const handleReady = () => togglePlay();
    audioEl.addEventListener('loadeddata', handleReady);

    return () => audioEl.removeEventListener('loadeddata', handleReady);
  }, [playerTrack, playing, togglePlay]);

  const title = currentRelease?.metadata?.name ?? 'Unknown release';
  const trackName = playerTrack
    ? getTrackName(playerTrack.id)
    : 'No track selected';

  return (
    <Box direction="column" margin="medium">
      <Heading
        level={4}
        margin="none"
        truncate
        title={`${title} - ${trackName}`}
      >
        {title} — {trackName}
      </Heading>

      <Box direction="row" align="center" gap="small">
        <RangeInput
          a11yTitle="Track progress"
          value={currentTime}
          min={0}
          max={duration || 0}
          onChange={(e) => setCurrentTime(Number(e.currentTarget.value))}
        />

        <Button
          type="button"
          onClick={prevTrack}
          aria-label="Previous track"
          icon={<Previous />}
        />

        <Button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? 'Pause' : 'Play'}
          icon={playing ? <Pause /> : <Play />}
        />

        <Button
          type="button"
          onClick={nextTrack}
          aria-label="Next track"
          icon={<Next />}
        />
      </Box>

      {currentRelease?.metadata?.external_url && (
        <Anchor
          label="Collect"
          href={currentRelease.metadata.external_url}
          size="small"
          style={{ textDecoration: 'none', fontWeight: 'bold' }}
          target="_blank"
          rel="noopener noreferrer"
        />
      )}
    </Box>
  );
};

const AudioPlayer: React.FC = () => {
  const { playlist } = usePlayer();

  if (!playlist?.length) return <PlayBackControlsSkeleton />;

  return (
    <Audio playlist={playlist}>
      <Box className="audio-player">
        <PlayBackControls />
      </Box>
    </Audio>
  );
};

export default memo(AudioPlayer);
