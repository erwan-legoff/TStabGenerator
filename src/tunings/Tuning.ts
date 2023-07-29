import NoteOne from '../notes/noteOnes/NoteOne'

export interface Tuning {
  getNotes(): NoteOne[]
  getStringNote(stringIndex: number): NoteOne
  getName(): string
}
