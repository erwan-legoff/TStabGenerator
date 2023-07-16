import NoteOne from '../notes/NoteOne'
import PlayedNote from '../notes/playedNote/PlayedNoteOne'
import { TrackOne } from '../notes/TrackOne'
import { ChromaticScale } from '../scales/Scales'
import { GenericalScale } from '../scales/GenericalScale'
import { CompositorInterface } from './CompositorInterface'
import { OneNoteGPToneAdaptor } from '../APIs/GPTone/Adaptors/OneNoteGPToneAdaptor'
/**
 * This class is used to do a simple arpege from the root note of the scale to the last note of the scale, given the number of notes to be played.
 */
export class GPTCompositorOneNote implements CompositorInterface {
  async getMusic(
    notesCount: number = 10,
    tempo: number = 120,
    scale: GenericalScale = new ChromaticScale(),
    key: NoteOne = NoteOne.noteNameToNote('C4')
  ): Promise<TrackOne> {
    const playedNotes: PlayedNote[] = []
    const notes: NoteOne[] = scale.getNotes(key, 10)
    const timeBeforeStart = 0
    const silenceProbability: number = 0.05

    for (let i = 0; i < notesCount; i++) {
      const duration = 1

      const oneNoteGPToneAdaptor = new OneNoteGPToneAdaptor()
      const note = await oneNoteGPToneAdaptor.getOneNote(scale)

      playedNotes.push(new PlayedNote(note, timeBeforeStart, duration))
      console.log(note.getName())
    }

    return new TrackOne(playedNotes, tempo)
  }
}
