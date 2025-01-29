"use client";

import LetterGlitch from "./components/blocks/LetterGlitch/LetterGlitch";
import { useEffect, useState } from "react";
import { ACTIVATED_BOMB_COLORS, DEACTIVATED_BOMB_COLORS } from "./constants";
import useSound from "use-sound";
import { Bomb } from "./components/bomb/Bomb";
import Image from "next/image";

export default function Home() {
  const [bombIsPlanted, setBombIsPlanted] = useState(false);
  const [bombExploded, setBombExploded] = useState(false);
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);

  // sounds
  const [playLetsGo, setPlayLetsGo] = useSound("/letsgo.mp3");

  useEffect(() => {
    if (bombIsPlanted) {
      const timer = setInterval(() => {
        if (seconds === 0 && minutes === 0) {
          setBombIsPlanted(false);
          setBombExploded(true);
          return;
        }

        if (seconds === 0) {
          setMinutes((_prev) => _prev - 1);
          setSeconds(60);
        }

        setSeconds((_prev) => _prev - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [bombIsPlanted, minutes, seconds]);

  useEffect(() => {
    if (bombExploded) {
      setTimeout(() => {
        setBombExploded(false);
      }, 1000);
    }
  }, [bombExploded]);

  function plantBomb() {
    if (seconds > 0) {
      playLetsGo();
      setBombIsPlanted(true);
    }
  }

  const glitchSpeed = bombIsPlanted ? 1000 : Number.POSITIVE_INFINITY;
  const glitchColors = bombIsPlanted
    ? ACTIVATED_BOMB_COLORS
    : DEACTIVATED_BOMB_COLORS;

  return (
    <>
      <main>
        <LetterGlitch glitchSpeed={glitchSpeed} glitchColors={glitchColors} />

        {bombExploded ? (
          <Image
            src="/explosion.webp"
            width="600"
            height="600"
            alt="explosion"
            className="z-2 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center"
          />
        ) : (
          <Bomb
            minutes={minutes}
            seconds={seconds}
            onSetMinutes={(m) => setMinutes(m)}
            onSetSeconds={(s) => setSeconds(s)}
            onActivate={plantBomb}
          />
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {/* About */}
      </footer>
    </>
  );
}
