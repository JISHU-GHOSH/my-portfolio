/**
 * soundEffects.js — Pure Web Audio API Sound Synthesizer
 *
 * No external mp3/wav files required. Zero network latency, instant playback.
 * Generates warm, luxury, tactile audio feedback.
 */

let audioCtx = null;
let isMuted = false;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

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
