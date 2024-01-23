import { NoteInterface } from '../NoteInterface'

export interface PlayedNoteInterface {
  getNote(): NoteInterface
  getTimeBeforeStart(): number
  getDuration(): number
  addTimeBeforeStart(timeBeforeStart: number): void
  getMidi(): number
  getNoteName(): string
}
