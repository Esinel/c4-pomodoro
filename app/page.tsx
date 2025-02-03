"use client";

import LetterGlitch from "./components/blocks/LetterGlitch/LetterGlitch";
import { useEffect, useState } from "react";
import { ACTIVATED_BOMB_COLORS, DEACTIVATED_BOMB_COLORS } from "./constants";
import useSound from "use-sound";
import { Bomb } from "./components/bomb/Bomb";
import Image from "next/image";
import { useAudioManager } from "./components/audio-manager/AudioManager";
import { TodoDrawer } from "./components/todo-drawer/TodoDrawer";

export default function Home() {
  const [bombIsPlanted, setBombIsPlanted] = useState(false);
  const [bombExploded, setBombExploded] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  // eslint-disable-next-line
  const { initialized } = useAudioManager();

  // SOUNDS
  const [playLetsGo] = useSound("/sounds/letsgo.mp3");
  const [playExplosion] = useSound("/sounds/explosion.mp3");
  const [playTicking] = useSound("/sounds/tick.mp3");

  // TIMER
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

  // BOMB EXPLOSION
  useEffect(() => {
    if (bombExploded) {
      playExplosion();
      setTimeout(() => {
        setBombExploded(false);
      }, 1000);
    }
  }, [bombExploded, playExplosion]);

  // TICKING SOUND AT THE END
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (bombIsPlanted && seconds < 10 && minutes === 0) {
      timer = setTimeout(() => {
        playTicking();
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [seconds, minutes, playTicking, bombIsPlanted]);

  // TICKING SOUND 5 MINUTE
  useEffect(() => {
    let fiveMinuteInterval: NodeJS.Timeout;

    if (bombIsPlanted) {
      fiveMinuteInterval = setInterval(() => {
        playTicking();
      }, 300000);
    }

    return () => {
      clearInterval(fiveMinuteInterval);
    };
  }, [playTicking, bombIsPlanted]);

  function plantBomb() {
    if (seconds > 0 || minutes > 0) {
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

        <div className="absolute z-2 flex items-center justify-center w-full h-full">
          {bombExploded ? (
            <Image
              src="/explosion.webp"
              width="600"
              height="600"
              alt="explosion"
              className="z-2 absolute flex justify-center items-center"
            />
          ) : (
            <Bomb
              minutes={minutes}
              seconds={seconds}
              onSetMinutes={(m) => setMinutes(m)}
              onSetSeconds={(s) => setSeconds(s)}
              onActivate={plantBomb}
              isActive={bombIsPlanted}
            />
          )}

          <div className="absolute z-4 m-auto bottom-5 left-0 right-0 w-200 w-[100px]">
            <TodoDrawer />
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        {/* About */}
      </footer>
    </>
  );
}
