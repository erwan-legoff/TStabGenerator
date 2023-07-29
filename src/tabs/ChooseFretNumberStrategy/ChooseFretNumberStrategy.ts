import NoteOne from '../../notes/noteOnes/NoteOne'
import { NoteInterface } from '../../notes/NoteInterface'

export interface ChooseFretNumberStrategy {
  chooseFretNumber(
    note: NoteInterface,
    rootNote: NoteOne,
    maxCaseNumber: number
  ): number
}
