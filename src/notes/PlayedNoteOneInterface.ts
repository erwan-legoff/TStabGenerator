import { NoteOneInterface } from "./NoteOneInterface"

export interface PlayedNoteOneInterface {
  getNote(): NoteOneInterface
  getTimeBeforeStart(): number
  getDuration(): number
  addTimeBeforeStart(timeBeforeStart: number): void
  getMidi(): number
  getNoteName(): string
}