import NoteOne from '../notes/NoteOne'
import PlayedNote from '../notes/playedNote/PlayedNoteOne'
import { TrackOne } from '../notes/TrackOne'
import { ChromaticScale } from '../scales/Scales'
import { GenericalScale } from '../scales/GenericalScale'
import { CompositorInterface } from './CompositorInterface'
import { OneNoteMemoryGPToneAdaptor } from '../APIs/GPTone/Adaptors/OneNoteMemoryGPToneAdaptor'
import { IOneNoteAdaptor } from '../APIs/GPTone/Adaptors/IOneNoteAdaptor'
/**
 * It's used to compose with GPT one note at a time
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
    const oneNoteGPToneAdaptor: IOneNoteAdaptor =
      new OneNoteMemoryGPToneAdaptor()

    for (let i = 0; i < notesCount; i++) {
      const duration = 1

      const note = await oneNoteGPToneAdaptor.getOneNote(scale)

      playedNotes.push(new PlayedNote(note, timeBeforeStart, duration))
      console.log(note.getName())
    }

    return new TrackOne(playedNotes, tempo)
  }
}
