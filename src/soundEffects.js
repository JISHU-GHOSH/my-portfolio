/**
 * soundEffects.js — Pure Web Audio API Sound Synthesizer
 *
 * No external mp3/wav files required. Zero network latency, instant playback.
 * Generates warm, luxury, tactile audio feedback.
 */

// Audio is disabled per user preference for silent luxury browsing.
let isMuted = true;

/**
 * Play a gentle, luxury interface chime/pop when the character speaks.
 */
export function playChimeSound() {
  // Completely silenced per user request
  return;
}


export function playHyperSound() {
  return;
}

export function toggleAudio() {
  isMuted = !isMuted;
  return isMuted;
}

export function getMuteState() {
  return isMuted;
}
