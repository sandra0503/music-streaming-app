import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Release } from '../models/release';

export type Track = {
  id: string | number;
  name: string;
  src: string;
};

type PlayerContextType = {
  playlist: Track[];
  currentTrack: Track | null;
  currentRelease: Release | null;
  setCurrentRelease: (release: Release | null) => void;
  setPlaylist: (tracks: Track[]) => void;
  chooseTrack: (track: Track) => void;
  clearPlayer: () => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [playlist, setPlaylistState] = useState<Track[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [currentRelease, setCurrentRelease] = useState<Release | null>(null);

  const setPlaylist = (tracks: Track[]) => {
    setPlaylistState(tracks);
  };

  const chooseTrack = (track: Track) => {
    setCurrentTrack(track);
  };

  const clearPlayer = () => {
    setPlaylistState([]);
    setCurrentTrack(null);
  };

  return (
    <PlayerContext.Provider
      value={{
        playlist,
        currentRelease,
        currentTrack,
        setPlaylist,
        setCurrentRelease,
        chooseTrack,
        clearPlayer,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) throw new Error('usePlayer must be used inside PlayerProvider');
  return context;
}
