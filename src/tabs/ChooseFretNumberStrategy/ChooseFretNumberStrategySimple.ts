import NoteOne from '../../notes/NoteOne'
import { ChooseFretNumberStrategy } from './ChooseFretNumberStrategy'

export class ChooseFretNumberStrategySimple
  implements ChooseFretNumberStrategy
{
  /**
   * Ici le but est de choisir la fret avec le chiffre le plus petit qui correspond parfaitement à la note.
   * @param note
   * @param string
   * @returns
   */
  chooseFretNumber(
    note: NoteOne,
    rootNote: NoteOne,
    maxCaseNumber: number
  ): number {
    const midiNote = note.getMidi()
    const midiRoot = rootNote.getMidi()
    const maxMidiPossible = midiRoot + maxCaseNumber
    const maxFretNumber = maxMidiPossible - midiRoot
    const midiNoteSimple = midiNote % 12
    const midiStringSimple = midiRoot % 12
    const midiNoteCorrected =
      midiNoteSimple < midiStringSimple ? midiNoteSimple + 12 : midiNoteSimple

    if (midiNote > maxMidiPossible || midiNote < midiRoot) {
      if (midiNoteCorrected > midiStringSimple + maxFretNumber) {
        throw new Error(
          `The note ${note} is not reproducible on the string (not enough frets) ${rootNote.getName()}`
        )
      }

      return midiNoteCorrected - midiStringSimple
    }
    return midiNote - midiRoot
  }
}
