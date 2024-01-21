export class MidiUtils {
  static checkMidiNumber(midi: number) {
    if (midi < 0)
      throw new Error('The midi number can not be negative : ' + midi)
    if (midi > 127)
      throw new Error('The midi number can not be greater than 127 : ' + midi)
  }
  static getOctaveFromMidi(midi: number) {
    return Math.floor(midi / 12) - 1
  }
}
