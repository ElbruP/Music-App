import React, { createContext, useState } from "react";
import tracksList from "../assets/trackslist";

const audio = new Audio();

export const AudioContext = createContext({});

const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(tracksList[0]);
  const [playing, setPlaying] = useState(false); // Изменил название стейта, чтобы не пересекалось с функцией isPlaying

  const handleToggleAudio = (track) => {
    if (currentTrack.id !== track.id) {
      setCurrentTrack(track);
      setPlaying(true);

      audio.src = track.src;
      audio.currentTime = 0;
      audio.play();

      return;
    }

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  const value = { audio, currentTrack, isPlaying: playing, handleToggleAudio }; // Исправил на "playing"

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

export default AudioProvider;
