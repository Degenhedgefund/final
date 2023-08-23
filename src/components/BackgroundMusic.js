import React, { useState, useRef } from 'react';

function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <button className='btn-primary' onClick={togglePlay}>
      {isPlaying ? '🔊' : '🔇'}
      </button>
      <audio ref={audioRef} loop>
          <source src="./background-music.mp3" type="audio/mp3" />
      </audio>
    </div>
  );
}

export default BackgroundMusic;
