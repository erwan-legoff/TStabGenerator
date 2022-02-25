import NoteOne from '../notes/NoteOne'
import TabLine from './TabLine'

export class TabLineGuitar extends TabLine {
  constructor(tonic: NoteOne) {
    super(tonic, [], 21)
  }
}
