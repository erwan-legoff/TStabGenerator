import NoteOne from 'notes/NoteOne'
import { PlayedNoteOneInterface } from 'notes/playedNote/PlayedNoteOneInterface'
import { GenericalScale } from 'scales/GenericalScale'

export interface IOneNoteAdaptor {
  getOneNote(scale: GenericalScale): Promise<NoteOne>
}
