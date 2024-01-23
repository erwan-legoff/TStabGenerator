import NoteOne from '../notes/noteOnes/NoteOne'
import PlayedNote from '../notes/playedNote/playedNoteOnes/PlayedNoteOne'
import { PlayedNoteInterface } from '../notes/playedNote/PlayedNoteInterface'
import { ChooseFretNumberStrategy } from './ChooseFretNumberStrategy/ChooseFretNumberStrategy'
import { TabNoteInterface } from './TabNoteInterface'

export default class TabNote implements TabNoteInterface {
  /**
   ** A class to represent a music note but with a case number attribute that
   ** is used to know how to play the note on a particular instrument string.
   ** It has a Note object and a case number.
   */
  private playedNote: PlayedNote
  private caseNumber: number
  constructor(
    note: PlayedNote,
    root: NoteOne,
    maxCaseNumber: number,
    chooseFretNumberStrategy: ChooseFretNumberStrategy
  ) {
    if (maxCaseNumber < 12) throw new Error('you must have at least one octave')

    this.playedNote = note
    this.caseNumber = this.computeCaseNumber(
      note,
      root,
      maxCaseNumber,
      chooseFretNumberStrategy
    )
  }

  // A function to get the case number of a note thanks to the root note.
  private computeCaseNumber(
    note: PlayedNote,
    root: NoteOne,
    maxCaseNumber: number,
    chooseFretNumberStrategy: ChooseFretNumberStrategy
  ): number {
    return chooseFretNumberStrategy.chooseFretNumber(
      note.getNote(),
      root,
      maxCaseNumber
    )
  }
  getPlayedNote(): PlayedNoteInterface {
    return this.playedNote
  }
  toString(): string {
    return `${this.caseNumber}`
  }
}
