import NoteOne from 'notes/noteOnes/NoteOne'
import { PlayedNoteOneInterface } from 'notes/playedNote/PlayedNoteInterface'
import { GenericalScale } from 'scales/GenericalScale'

export interface IOneNoteAdaptor {
  getOneNote(scale: GenericalScale): Promise<NoteOne>
}