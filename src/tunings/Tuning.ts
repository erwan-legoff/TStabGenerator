import NoteOne from "../notes/NoteOne";

export interface Tuning {
  getNotes(): NoteOne[]
  getStringNote(stringIndex: number): NoteOne
  getName(): string
}
