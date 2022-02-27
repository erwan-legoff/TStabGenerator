import NoteOne from '../../notes/NoteOne'

export interface ChooseFretNumberStrategy {
  chooseFretNumber(
    note: NoteOneInterface,
    tonicNote: NoteOne,
    maxCaseNumber: number
  ): number
}
