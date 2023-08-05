import { checkMidiNumber } from './checkMidiNumber'

export function getOctaveFromMidi(midi: number) {
  return Math.floor(midi / 12) - 1
}
