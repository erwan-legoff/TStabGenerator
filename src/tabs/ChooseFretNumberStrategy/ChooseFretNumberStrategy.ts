import NoteOne from '../../notes/NoteOne'

export interface ChooseFretNumberStrategy {
  chooseFretNumber(
    note: NoteOne,
    tonicNote: NoteOne,
    maxCaseNumber: number
  ): number
}
