export function speak(text) {
  // Stop any previous speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = "en-US";
  utterance.rate = 0.95;
  utterance.pitch = 1;
  utterance.volume = 1;

  // Try to use a female English voice if available
  const voices = window.speechSynthesis.getVoices();

  const femaleVoice = voices.find(
    (voice) =>
      voice.lang.startsWith("en") &&
      (
        voice.name.toLowerCase().includes("female") ||
        voice.name.toLowerCase().includes("zira") ||
        voice.name.toLowerCase().includes("samantha") ||
        voice.name.toLowerCase().includes("aria")
      )
  );

  if (femaleVoice) {
    utterance.voice = femaleVoice;
  }

  window.speechSynthesis.speak(utterance);
}