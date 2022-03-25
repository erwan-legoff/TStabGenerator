import NoteOne from '../notes/NoteOne'
import { getPositiveInterval } from '../utils/getPositiveInterval'

export class GenericalScale {
  protected intervals: Array<number>
  protected name: string

  constructor(intervals: Array<number>, name: string) {

    if (!intervals.includes(0)) intervals.push(0)
    if (intervals.includes(12)) intervals = intervals.filter(interval => interval != 12)
    intervals = intervals.sort((a, b) => a - b)
    this.intervals = intervals
    this.name = name
  
  }

  public getNotes(
    root: NoteOne,
    numberOfNotes: number = this.intervals.length
  ): Array<NoteOne> {
    const notes = []
    let currentNote = root
    for (let i = 0; i < numberOfNotes; i++) {
      notes.push(currentNote)
      currentNote = this.getNextNote(currentNote, root)
    }
    return notes
  }

  public getNextNote(note: NoteOne, root: NoteOne): NoteOne {
    const interval = getPositiveInterval(root, note) //* We make sure that the difference in semi-tones with the root is positive
    const currentNoteIndex =
      interval == 0 ? 0 : this.intervals.indexOf(interval) //* If we've reached the root, we come back to the root
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
    const nextNoteMidi = root.getMidi() + this.intervals[nextNoteIndex]
    return new NoteOne(nextNoteMidi)
  }
}
