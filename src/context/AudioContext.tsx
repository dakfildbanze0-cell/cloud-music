import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Song } from '../types';
import { musicSynth } from '../utils/audioSynth';
import { useApp } from './AppContext';

interface AudioContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackRate: number;
  isShuffle: boolean;
  repeatMode: 'off' | 'all' | 'one';
  queue: Song[];
  history: Song[];
  playSong: (song: Song, customQueue?: Song[]) => void;
  togglePlay: () => void;
  nextSong: () => void;
  previousSong: () => void;
  seek: (timeSeconds: number) => void;
  setVolume: (vol: number) => void;
  setPlaybackRate: (rate: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  addToQueue: (song: Song) => void;
  removeFromQueue: (index: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode; allSongs?: Song[] }> = ({
  children,
  allSongs: propSongs,
}) => {
  const { songs: appSongs } = useApp();
  const allSongs = propSongs || appSongs || [];

  const [currentSong, setCurrentSong] = useState<Song | null>(allSongs[0] || null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(allSongs[0]?.duration || 200);
  const [volume, setVolumeState] = useState<number>(0.8);
  const [playbackRate, setPlaybackRateState] = useState<number>(1.0);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [queue, setQueue] = useState<Song[]>(allSongs);
  const [history, setHistory] = useState<Song[]>([]);

  const timerRef = useRef<any>(null);

  // Sync playback timer
  useEffect(() => {
    if (isPlaying && currentSong) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            handleSongEnded();
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackRate);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentSong, duration, playbackRate]);

  const handleSongEnded = () => {
    if (repeatMode === 'one' && currentSong) {
      setCurrentTime(0);
      musicSynth.playTrack(currentSong.audioUrl);
      return;
    }
    nextSong();
  };

  const playSong = (song: Song, customQueue?: Song[]) => {
    if (customQueue) {
      setQueue(customQueue);
    } else if (queue.length === 0) {
      setQueue(allSongs);
    }

    setCurrentSong(song);
    setCurrentTime(0);
    setDuration(song.duration);
    setIsPlaying(true);
    musicSynth.playTrack(song.audioUrl);

    setHistory((prev) => [song, ...prev.filter((s) => s.id !== song.id)]);
  };

  const togglePlay = () => {
    if (!currentSong && allSongs.length > 0) {
      playSong(allSongs[0]);
      return;
    }

    if (isPlaying) {
      setIsPlaying(false);
      musicSynth.pause();
    } else {
      setIsPlaying(true);
      musicSynth.resume();
    }
  };

  const nextSong = () => {
    if (!currentSong || queue.length === 0) return;

    let nextIndex = 0;
    const currentIndex = queue.findIndex((s) => s.id === currentSong.id);

    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else {
      if (currentIndex >= 0 && currentIndex < queue.length - 1) {
        nextIndex = currentIndex + 1;
      } else {
        if (repeatMode === 'all') {
          nextIndex = 0;
        } else {
          setIsPlaying(false);
          musicSynth.stop();
          return;
        }
      }
    }

    const next = queue[nextIndex];
    if (next) {
      playSong(next);
    }
  };

  const previousSong = () => {
    if (!currentSong || queue.length === 0) return;

    if (currentTime > 5) {
      setCurrentTime(0);
      return;
    }

    const currentIndex = queue.findIndex((s) => s.id === currentSong.id);
    let prevIndex = queue.length - 1;
    if (currentIndex > 0) {
      prevIndex = currentIndex - 1;
    }

    const prevSong = queue[prevIndex];
    if (prevSong) {
      playSong(prevSong);
    }
  };

  const seek = (timeSeconds: number) => {
    setCurrentTime(timeSeconds);
  };

  const setVolume = (vol: number) => {
    setVolumeState(vol);
    musicSynth.setVolume(vol);
  };

  const setPlaybackRate = (rate: number) => {
    setPlaybackRateState(rate);
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const toggleRepeat = () => {
    if (repeatMode === 'off') setRepeatMode('all');
    else if (repeatMode === 'all') setRepeatMode('one');
    else setRepeatMode('off');
  };

  const addToQueue = (song: Song) => {
    setQueue((prev) => [...prev, song]);
  };

  const removeFromQueue = (index: number) => {
    setQueue((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <AudioContext.Provider
      value={{
        currentSong,
        isPlaying,
        currentTime,
        duration,
        volume,
        playbackRate,
        isShuffle,
        repeatMode,
        queue,
        history,
        playSong,
        togglePlay,
        nextSong,
        previousSong,
        seek,
        setVolume,
        setPlaybackRate,
        toggleShuffle,
        toggleRepeat,
        addToQueue,
        removeFromQueue,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error('useAudio must be used within AudioProvider');
  return ctx;
};
