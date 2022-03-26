import NoteOne from '../notes/NoteOne'
import PlayedNote from '../notes/PlayedNoteOne'
import { TrackOne } from '../notes/TrackOne'
import { ChromaticScale } from '../scales/ChromaticScale'
import { GenericalScale } from '../scales/GenericalScale'
import { CompositorInterface } from './CompositorInterface'
/**
 * This class is used to do a simple arpege from the root note of the scale to the last note of the scale, given the number of notes to be played.
 */
export class SimpleDownArpegeCompositor implements CompositorInterface {
  getMusic(
    nbOfNotes?: number,
    tempo: number = 120,
    scale: GenericalScale = new ChromaticScale(),
    key: NoteOne = NoteOne.noteNameToNote('C4')
  ): TrackOne {
    const playedNotes: PlayedNote[] = []
    const scaleNotes = scale.getNotes(key, nbOfNotes) // If nbOfNotes is not defined, it will return one octave.
    let timeSpent = 0
    for (let i = 0; i < scaleNotes.length; i++) {
      const note = scaleNotes[i]
      const time = 0
      const duration = 1
      playedNotes.push(new PlayedNote(note, time, duration))
    }

    return new TrackOne(playedNotes, tempo)
  }
}
