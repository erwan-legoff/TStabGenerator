import NoteNameEng from '../../enums/NoteNameEng'
import noteEngEnums from '../../enums/NoteNumberEng'
import { NoteInterface } from '../NoteInterface'

export default class NoteOne implements NoteInterface {
  private name: string
  private midi: number

  constructor(midiNumber: number) {
    if (midiNumber < 0)
      throw new Error('The midi number can not be negative : ' + midiNumber)
    if (midiNumber > 127)
      throw new Error(
        'The midi number can not be greater than 127 : ' + midiNumber
      )
    this.midi = midiNumber
    this.name = NoteOne.midiToNoteName(midiNumber)
  }

  public static noteNameToNote(name: string): NoteOne {
    return new NoteOne(NoteOne.noteNameToMidiNumber(name))
  }

  static noteNameToMidiNumber(name: string): number {
    let octave = -1

    const noteLetter = NoteOne.extractNoteLetter(name)
    const octaveMatch = name.match(/\d+/)
    if (octaveMatch) octave = parseInt(octaveMatch[0])
    else throw new Error('No octave found in the note name : ' + name)

    if (octave < 0) throw new Error('The note name is invalid : ' + name)

    return (
      NoteOne.noteLetterToNotePrimitiveNumber(noteLetter) + 12 * (octave + 1)
    )
  }

  /**
   * * A function to get the midi value from a note letter in string.
   * *
   * @param name the note name in string (eg. 'C', 'Ds'), it shoulf not contain a note number (eg. 'C4')
   * @returns
   */
  public static noteLetterToNotePrimitiveNumber(name: string): number {
    try {
      if (name.length > 2) throw new Error('The note name is too long')

      let noteName = name.toUpperCase()

      if (noteName.includes('#')) {
        noteName = noteName.replace('#', '')
        noteName = noteName.concat('S')
      }

      const notePrimitiveNumber =
        noteEngEnums[noteName as keyof typeof noteEngEnums]
      if (notePrimitiveNumber == undefined || notePrimitiveNumber == null) {
        throw new Error(
          `The note ${name} is not defined in the enum NoteNumberEng ! RESULT: ${notePrimitiveNumber}`
        )
      }

      return notePrimitiveNumber
    } catch (e) {
      console.log(e)
      return 0
    }
  }

  /**
   ** A function to get the note letter from a note name in string, it should also retain the sharp
   * @param name the note name in string (eg. 'C', 'Ds'), it should not contain a note number (eg. 'C4')
   * @param noteLetter
   * @returns
   */
  public static extractNoteLetter(name: string) {
    if (name.length > 3) throw new Error('The note name is too long : ' + name)
    const noteName = name.toUpperCase()
    let noteLetter = name.slice(0, 1).toUpperCase()

    if (noteName.includes('#') || noteName.includes('S'))
      noteLetter = noteLetter.concat('S')
    if (!noteLetter)
      throw new Error('No note letter found for the note name : ' + noteName)
    return noteLetter
  }

  public static midiToNoteName(midiNumber: number): string {
    if (midiNumber < 0)
      throw new Error('The midi number can not be negative : ' + midiNumber)
    if (midiNumber > 127)
      throw new Error(
        'The midi number can not be greater than 127 : ' + midiNumber
      )
    const noteNumber = midiNumber % 12
    const octave = Math.floor(midiNumber / 12) - 1
    const noteLetter =
      NoteNameEng[noteEngEnums[noteNumber] as keyof typeof noteEngEnums]

    if (noteLetter == undefined)
      throw new Error('The note number is invalid : ' + midiNumber)
    const noteName = noteLetter + octave
    if (noteName.length > 3)
      throw new Error('The note name is too long : ' + noteName)
    if (noteName.length < 2)
      throw new Error('The note name is too short : ' + noteName)

    return noteName
  }
  getName(): string {
    return this.name
  }
  getMidi(): number {
    return this.midi
  }
  getPrimitiveNumber(): number {
    return this.midi % 12
  }
}
