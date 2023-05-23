import NoteOne from '../notes/NoteOne'

export class GenericalScale {
  protected intervals: Array<number>
  protected name: string
  /**
   *
   * @param intervals the note differences with the root
   * @param name name of the scale
   */
  constructor(intervals: Array<number>, name: string) {
    if (!intervals.includes(0)) intervals.push(0) // A scale should always have the root
    intervals = intervals.filter((interval) => interval <= 12) // A scale should have less than one octave
    intervals = intervals.sort((a, b) => a - b)
    this.intervals = intervals
    this.name = name
  }
  /**
   ** It will give all notes of the current scale
   * @param root the root of the scale
   * @param numberOfNotes
   * @returns
   */
  public getNotes(
    root: NoteOne,
    numberOfNotes: number = this.intervals.length + 1 // +1 to include the root at the second octave
  ): Array<NoteOne> {
    const notes = []

    for (let i = 0; i < numberOfNotes; i++) {
      const intervalsCount = this.intervals.length
      const octave = Math.floor(i / intervalsCount)
      const currentInterval = this.intervals[i % intervalsCount] // We make sure not to go out of the table with the modulo
      const rootWithOctave = root.getMidi() + 12 * octave
      const midiNumber = currentInterval + rootWithOctave

      notes.push(new NoteOne(midiNumber))
    }
    return notes
  }

  getName(): string {
    return this.name
  }
}
