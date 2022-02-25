import NoteOne from "../notes/NoteOne";

export interface Tuning {
  getNotes(): NoteOne[]
  getName(): string
}
