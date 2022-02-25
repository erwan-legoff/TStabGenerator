
import NoteOne from '../notes/NoteOne'
import { GuitarTuning } from './GuitarTuning'

export class StandardGuitarTuning implements GuitarTuning {
  getNotes(): NoteOne[] {
    return [
      NoteOne.noteNameToNote('E2'),
      NoteOne.noteNameToNote('A2'),
      NoteOne.noteNameToNote('D3'),
      NoteOne.noteNameToNote('G3'),
      NoteOne.noteNameToNote('B3'),
      NoteOne.noteNameToNote('E4')
    ]
  }

  getName(): string {
    return 'Standard Guitar Tuning'
  }
}
