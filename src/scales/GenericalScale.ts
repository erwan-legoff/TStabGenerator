import NoteOne from '../notes/NoteOne'
import { getPositiveInterval as getPositiveMinimumInterval } from '../utils/getPositiveInterval'

export class GenericalScale {
  protected intervals: Array<number>
  protected name: string

  constructor(intervals: Array<number>, name: string) {
    if (!intervals.includes(0)) intervals.push(0)
    if (intervals.includes(12))
      intervals = intervals.filter((interval) => interval != 12)
    intervals = intervals.sort((a, b) => a - b)
    this.intervals = intervals
    this.name = name
  }

  public getNotes(
    root: NoteOne,
    numberOfNotes: number = this.intervals.length
  ): Array<NoteOne> {
    const notes = []
    let nbOfOctave = 0
    for (let i = 0; i < numberOfNotes; i++) {
      nbOfOctave = Math.floor(i / this.intervals.length)
      const midiNumber = this.intervals[i % this.intervals.length] + root.getMidi() + 12 * nbOfOctave
      const currentNote = new NoteOne(midiNumber)
      notes.push(currentNote)
    }
    return notes
  }

  public getNextNote(note: NoteOne, root: NoteOne): NoteOne {
    const minimumInterval = getPositiveMinimumInterval(root, note) //* We make sure that the difference in semi-tones with the root is positive
    const interval = note.getMidi() - root.getMidi()
    const nbOfOctave = interval % 12
    const currentNoteIndex =
      minimumInterval == 0 ? interval : this.intervals.indexOf(minimumInterval) //* If we've reached the root, we come back to the root
    if (currentNoteIndex == -1)
      throw new Error(
        'The note ' +
          note.getName() +
          ' is not in the scale ' +
          this.name +
          ' with root ' +
          root.getName()
      )
    const nextNoteIndex = (currentNoteIndex + 1) % this.intervals.length
    const nextNoteMidi =
      root.getMidi() + this.intervals[nextNoteIndex] + 12 * nbOfOctave
    return new NoteOne(nextNoteMidi)
  }
}
