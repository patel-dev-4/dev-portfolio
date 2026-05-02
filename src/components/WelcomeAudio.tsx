"use client";

import { useEffect } from "react";

export default function WelcomeAudio() {
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    const speak = () => {
      if (sessionStorage.getItem("welcomePlayed")) return;

      const message = "Welcome to the Dev Patel Portfolio";
      const utterance = new SpeechSynthesisUtterance(message);

      utterance.pitch = 1;
      utterance.rate = 0.9;
      utterance.volume = 1;

      // Wait until voices are loaded properly
      const setVoiceAndSpeak = () => {
        const voices = synth.getVoices();

        const voice =
          voices.find((v) => v.lang === "en-IN") ||
          voices.find((v) => v.lang === "en-US") ||
          voices[0];

        if (voice) utterance.voice = voice;

        synth.cancel();
        synth.speak(utterance);

        sessionStorage.setItem("welcomePlayed", "true");
      };

      if (synth.getVoices().length > 0) {
        setVoiceAndSpeak();
      } else {
        synth.onvoiceschanged = setVoiceAndSpeak;
      }
    };

    // ✅ ONLY trigger on user interaction
    const handleInteraction = () => {
      speak();
    };

    window.addEventListener("click", handleInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleInteraction);
    };
  }, []);

  return null;
}
