import Image from "next/image";
import { Display } from "../retro-counter";

export function Bomb({
  minutes,
  seconds,
  onSetMinutes,
  onSetSeconds,
  onActivate,
  isActive,
}: BombProps) {
  function handleSetMinutes() {
    if (isActive) return;

    const minutes = Number(prompt("Set minutes (0-99)"));

    if (isNaN(minutes) || minutes < 0 || minutes > 99) {
      alert("Value has to be a number between 0 - 99");
      return;
    }

    onSetMinutes(minutes);
  }

  function handleSetSeconds() {
    if (isActive) return;

    const seconds = Number(prompt("Set minutes (0-59)"));

    if (isNaN(seconds) || seconds < 0 || seconds > 59) {
      alert("Value has to be a number between 0 - 59");
      return;
    }

    onSetSeconds(seconds);
  }

  return (
    <>
      <div className="absolute z-2 flex items-center justify-center w-full h-full">
        <Image
          src="/dynamite-no-bg.png"
          width="600"
          height="600"
          alt="c4-bomb"
        />
      </div>

      <div
        className="absolute z-3 flex"
        style={{
          left: "48.5vw",
          top: "47vh",
          background: "black",
          width: "125px",
        }}
      >
        {/* minutes */}
        <div onClick={handleSetMinutes}>
          <Display value={minutes} count={2} height={30} />
        </div>
        {/* seconds */}
        <div onClick={handleSetSeconds}>
          <Display value={seconds} count={2} height={30} />
        </div>
      </div>

      <div
        className="relative z-4"
        style={{ left: "44vw", top: "41vh", width: "40px", height: "40px" }}
        onClick={onActivate}
      />
    </>
  );
}

type BombProps = {
  minutes: number;
  seconds: number;
  onSetMinutes: (m: number) => void;
  onSetSeconds: (s: number) => void;
  onActivate: () => void;
  isActive: boolean;
};
