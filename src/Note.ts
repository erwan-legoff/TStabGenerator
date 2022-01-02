import noteEngEnums from './enums/noteEngEnums'
/**
 * * A class to represent a music note.
 * * it has a midi value, and a duration, both are numbers.
 */
export default class Note {
  // declare variables
  private midi: number
  private duration: number
  private time: number

  constructor(midi: number, duration: number, time: number = 0) {
    this.midi = midi
    this.duration = duration
    this.time = time
  }
  // A constructor to create a note from its name in string and a duration in number.
  static fromString(name: string, duration: number): Note {
    const midi = Note.noteNameToMidi(name)
    return new Note(midi, duration)
  }
  // A function to get the midi value from a note name in string.
  static noteNameToMidi(name: string): number {
    const noteName = name.toUpperCase()
    const octave = parseInt(noteName.slice(-1))
    const noteLetter = noteName.slice(0, -1)
    return Note.noteLetterToMidiNumber(noteLetter) + 12 * (octave + 1)
  }
  /**
   * * A function to get the midi value from a note letter in string.
   * @param name the note name in string (eg. 'C', 'Ds')
   * @returns
   */
  private static noteLetterToMidiNumber(name: string): number {
    // use noteEngEnums to get the midi value
    return noteEngEnums[name.toUpperCase() as keyof typeof noteEngEnums]
  }
  getMidi(): number {
    return this.midi
  }
  getDuration(): number {
    return this.duration
  }
  getTime(): number {
    return this.time
  }
}
