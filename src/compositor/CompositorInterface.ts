import NoteOne from '../notes/noteOnes/NoteOne'
import { TrackOne } from '../notes/TrackOne'
import { GenericalScale } from '../scales/GenericalScale'
import { StyleOptions } from './StyleOptions'

export interface CompositorInterface {
  getMusic(
    notesCount?: number,
    tempo?: number,
    scale?: GenericalScale,
    key?: NoteOne,
    styleOptions?: StyleOptions
  ): Promise<TrackOne>
}
