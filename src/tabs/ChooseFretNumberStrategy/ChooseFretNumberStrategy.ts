import NoteOne from '../../notes/NoteOne'

export interface ChooseFretNumberStrategy {
  chooseFretNumber(
    note: NoteOneInterface,
    rootNote: NoteOne,
    maxCaseNumber: number
  ): number
}
