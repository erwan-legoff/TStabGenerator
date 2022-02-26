import NoteOne from '../notes/NoteOne'
import PlayedNote from '../notes/PlayedNoteOne'
import { ChooseFretNumberStrategy } from './ChooseFretNumberStrategy/ChooseFretNumberStrategy'

export default class TabNote {
  /**
   ** A class to represent a music note but with a case number attribute that
   ** is used to know how to play the note on a particular instrument string.
   ** It has a Note object and a case number.
   */
  private note: PlayedNote
  private caseNumber: number
  constructor(note: PlayedNote, tonic: NoteOne, maxCaseNumber: number, chooseFretNumberStrategy: ChooseFretNumberStrategy) {
    if (maxCaseNumber < 12) throw new Error('you must have at least one octave')

    this.note = note
    this.caseNumber = this.computeCaseNumber(note, tonic, maxCaseNumber, chooseFretNumberStrategy)
  }

  // A function to get the case number of a note thanks to the tonic note.
  private computeCaseNumber(
    note: PlayedNote,
    tonic: NoteOne,
    maxCaseNumber: number,
    chooseFretNumberStrategy: ChooseFretNumberStrategy
  ): number {
    
    return chooseFretNumberStrategy.chooseFretNumber(note.getNote(), tonic, maxCaseNumber)
  }
  getNote(): PlayedNote {
    return this.note
  }
  toString(): string {
    return `${this.caseNumber}`
  }
}
