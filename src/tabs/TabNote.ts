import NoteOne from '../notes/NoteOne'
import PlayedNote from '../notes/PlayedNoteOne'
import { PlayedNoteOneInterface } from '../notes/PlayedNoteOneInterface'
import { PlayedNoteOneSilence } from '../notes/PlayedNoteOneSilence'
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
    tonic: NoteOne,
    maxCaseNumber: number,
    chooseFretNumberStrategy: ChooseFretNumberStrategy
  ) {
    if (maxCaseNumber < 12) throw new Error('you must have at least one octave')

    this.playedNote = note
    this.caseNumber = this.computeCaseNumber(
      note,
      tonic,
      maxCaseNumber,
      chooseFretNumberStrategy
    )
  }

  // A function to get the case number of a note thanks to the tonic note.
  private computeCaseNumber(
    note: PlayedNote,
    tonic: NoteOne,
    maxCaseNumber: number,
    chooseFretNumberStrategy: ChooseFretNumberStrategy
  ): number {
    return chooseFretNumberStrategy.chooseFretNumber(
      note.getNote(),
      tonic,
      maxCaseNumber
    )
  }
  getPlayedNote(): PlayedNoteOneInterface {
    return this.playedNote
  }
  toString(): string {
    return `${this.caseNumber}`
  }
}
