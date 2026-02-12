"use client";
import { useState, useRef } from "react";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function DecryptText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleHover = () => {
    let iteration = 0;

    clearInterval(intervalRef.current!);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (letter === " ") return " ";

            if (index < iteration) {
              return text[index];
            }

            return letters[Math.floor(Math.random() * 26)];
          })
          .join("")
      );

      iteration += 0.72;

      if (iteration >= text.length) {
        clearInterval(intervalRef.current!);
        setDisplayText(text);
      }
    }, 30);
  };

  return (
    <h1
      onMouseEnter={handleHover}
      style={{
        fontSize: "70px",
        fontWeight: "bold",
        cursor: "pointer",
        letterSpacing: "6px",
      }}
    >
      {displayText}
    </h1>
  );
}
