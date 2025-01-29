import { CharToDigit, defaultCharMap } from "../../utils";
import { Digit } from "./Digit";
import React, { useEffect, useState } from "react";

type DisplayType = {
  count?: number;
  height?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  color?: string;
  backgroundColor?: string;
  skew?: boolean;
  charMap?: CharToDigit;
  style?: React.CSSProperties;
};

export const Display = ({
  count = 2,
  height = 250,
  value = null,
  color = "red",
  backgroundColor,
  skew = false,
  charMap = defaultCharMap,
  style,
}: DisplayType) => {
  const [digits, setDigits] = useState([]);

  const styleFinal = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "fit-content",
    width: "fit-content",
    padding: "3px",
    ...style,
  } as React.CSSProperties;

  const displayStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "fit-content",
    width: "fit-content",
    backgroundColor: backgroundColor ? backgroundColor : "transparent",
    padding: "6px",
    color: "white",
  } as React.CSSProperties;

  useEffect(() => {
    let newDigits = value && value.toString().split("");

    if (!value || count < value.toString().length) {
      newDigits = null;
    }

    if (value && count > value.toString().length) {
      for (let i = 0; i < count - value.toString().length; i++) {
        newDigits.unshift("0");
      }
    }

    setDigits(newDigits);
  }, [count, value]);

  return (
    <div className="display" style={displayStyle}>
      <div className="display-digits" style={styleFinal}>
        {digits
          ? digits.map((digit, index) => {
              return (
                <Digit
                  key={index}
                  char={digit}
                  height={height}
                  color={color}
                  skew={skew}
                  charMap={charMap}
                />
              );
            })
          : Array.from(Array(count).keys()).map((index) => {
              return (
                <Digit
                  key={index}
                  char="-"
                  height={height}
                  color={color}
                  skew={skew}
                />
              );
            })}
      </div>
    </div>
  );
};
