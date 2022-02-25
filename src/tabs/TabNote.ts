import NoteOne from '../notes/NoteOne'
import PlayedNote from '../notes/PlayedNoteOne'

export default class TabNote {
  /**
   ** A class to represent a music note but with a case number attribute that
   ** is used to know how to play the note on a particular instrument string.
   ** It has a Note object and a case number.
   */
  private note: PlayedNote
  private caseNumber: number
  constructor(note: PlayedNote, tonic: NoteOne, maxCaseNumber: number) {
    if (maxCaseNumber < 12) throw new Error('you must have at least one octave')

    this.note = note
    this.caseNumber = this.computeCaseNumber(note, tonic, maxCaseNumber)
  }

  // A function to get the case number of a note thanks to the tonic note.
  private computeCaseNumber(
    note: PlayedNote,
    tonic: NoteOne,
    maxCaseNumber: number
  ): number {
    const midi = note.getMidi()
    const tonicMidi = tonic.midi
    var caseNumber = midi - tonicMidi
    while (caseNumber < 0) {
      caseNumber += 12
    }
    while (caseNumber > maxCaseNumber) {
      caseNumber -= 12
    }
    return caseNumber
  }
  getNote(): PlayedNote {
    return this.note
  }
  toString(): string {
    return `${this.caseNumber}`
  }
}
