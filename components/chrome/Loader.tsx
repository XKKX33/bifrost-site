"use client";

import { useEffect, useState } from "react";
import { getUi } from "@/content/i18n";
import { useLocale } from "./useUi";

const STORAGE_KEY = "bifrost-loader-seen";
/** Per-word dwell; 5 words ≈ 1.6s + bridge/exit ≈ 2.1s total */
const WORD_MS = 320;
const EXIT_MS = 320;
const BRIDGE_MS = 520;

type Phase = "pending" | "words" | "bridge" | "exit" | "done";

function shouldSkipLoader(): boolean {
  if (typeof window === "undefined") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return true;
  }
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function Loader() {
  const locale = useLocale();
  const ui = getUi(locale);
  const [phase, setPhase] = useState<Phase>("pending");
  const [wordIndex, setWordIndex] = useState(0);
  const [showFinal, setShowFinal] = useState(false);

  useEffect(() => {
    if (shouldSkipLoader()) {
      setPhase("done");
      return;
    }

    setPhase("words");
    setWordIndex(0);
    const words = ui.loaderWords;
    let idx = 0;
    const timers: number[] = [];

    const wordTimer = window.setInterval(() => {
      idx += 1;
      if (idx >= words.length) {
        window.clearInterval(wordTimer);
        setShowFinal(true);
        setPhase("bridge");
        timers.push(
          window.setTimeout(() => {
            setPhase("exit");
            try {
              window.sessionStorage.setItem(STORAGE_KEY, "1");
            } catch {
              /* private mode */
            }
            timers.push(
              window.setTimeout(() => setPhase("done"), EXIT_MS),
            );
          }, BRIDGE_MS),
        );
        return;
      }
      setWordIndex(idx);
    }, WORD_MS);

    return () => {
      window.clearInterval(wordTimer);
      for (const t of timers) window.clearTimeout(t);
    };
  }, [ui.loaderWords]);

  if (phase === "done") {
    return null;
  }

  const word = ui.loaderWords[wordIndex] ?? ui.loaderWords[0];
  const isExiting = phase === "exit";
  const showWord = phase === "words" || phase === "bridge" || phase === "exit";

  return (
    <div
      className={`chrome-loader${isExiting ? " is-exiting" : ""}`}
      role="status"
      aria-live="polite"
      aria-busy={!isExiting}
      aria-label={ui.loaderFinal}
    >
      <div className="chrome-loader__stage">
        {showWord ? (
          <p key={word} className="chrome-loader__word is-active">
            {word}
          </p>
        ) : (
          <p className="chrome-loader__word is-active" aria-hidden>
            {ui.brand}
          </p>
        )}
        <div
          className={`bridge-light${phase === "bridge" || phase === "exit" ? " is-open" : ""}`}
          aria-hidden
        />
        <p className={`chrome-loader__final${showFinal ? " is-visible" : ""}`}>
          {ui.loaderFinal}
        </p>
      </div>
    </div>
  );
}
