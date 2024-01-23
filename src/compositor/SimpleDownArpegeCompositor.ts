import NoteOne from '../notes/noteOnes/NoteOne'
import PlayedNote from '../notes/playedNote/playedNoteOnes/PlayedNoteOne'
import { TrackOne } from '../notes/PlayedNoteMidi'
import { ChromaticScale } from '../scales/Scales'
import { GenericalScale } from '../scales/GenericalScale'
import { CompositorInterface } from './CompositorInterface'
/**
 * This class is used to do a simple arpege from the root note of the scale to the last note of the scale, given the number of notes to be played.
 */
export class SimpleDownArpegeCompositor implements CompositorInterface {
  getMusic(
    notesCount?: number,
    tempo: number = 120,
    scale: GenericalScale = new ChromaticScale(),
    key: NoteOne = NoteOne.noteNameToNote('C4')
  ): Promise<TrackOne> {
    const playedNotes: PlayedNote[] = []
    const scaleNotes = scale.getNotes(key, notesCount) // If notesCount is not defined, it will return one octave.
    let timeSpent = 0
    for (let i = 0; i < scaleNotes.length; i++) {
      const note = scaleNotes[i]
      const time = 0
      const duration = 1
      playedNotes.push(new PlayedNote(note, time, duration))
    }

    return Promise.resolve(new TrackOne(playedNotes, tempo))
  }
}
