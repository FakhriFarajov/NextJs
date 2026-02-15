"use client";
import { useState, useRef } from "react";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface DecryptTextProps {
  text: string;
  fontSize?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function DecryptText({ text, fontSize = "70px", as: Tag = "h1" }: DecryptTextProps) {
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
            if (index < iteration) {
              return text[index];
            }

            if (letter === " ") {
              return Math.random() > 0.5 ? " " : letters[Math.floor(Math.random() * 26)];
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
    <Tag
      onMouseEnter={handleHover}
      style={{
        fontSize,
        fontWeight: "bold",
        cursor: "pointer",
        letterSpacing: "4px",
        margin: 0,
      }}
    >
      {displayText}
    </Tag>
  );
}
