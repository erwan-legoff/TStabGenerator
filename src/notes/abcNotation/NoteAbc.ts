import { NoteInterface } from '../NoteInterface'
import { NoteNameAbcFull } from '../../enums/abc/NoteNameAbc'
import { MidiUtils } from '../../utils/MidiUtils'
import OperatorAbc from '../../enums/abc/OperatorAbc'

export default class NoteAbc implements NoteInterface {
  private name: string
  private midi: number
  private defaultOctave: number

  constructor(midi: number, defaultOctave?: number) {
    MidiUtils.checkMidiNumber(midi)

    this.midi = midi

    if (defaultOctave != undefined) this.defaultOctave = defaultOctave
    else this.defaultOctave = 4
    this.name = NoteAbc.convertMidiToName(midi, this.defaultOctave)
  }
  static convertMidiToName(midi: number, defaultOctave: number = 4): string {
    MidiUtils.checkMidiNumber(midi)
    const noteNames = NoteAbc.getNoteNames()
    const noteIndex = midi % 12
    const noteLetter = noteNames[noteIndex]
    const octave = MidiUtils.getOctaveFromMidi(midi)
    return NoteAbc.addOctaveToNoteName(noteLetter, octave, defaultOctave)
  }

  static addOctaveToNoteName(
    noteLetter: string,
    octave: number,
    defaultOctave: number = 4
  ): string {
    if (defaultOctave < 0) throw new Error('The default octave is negative')
    if (octave < 0) throw new Error('The octave is negative')

    const octaveDifference = octave - defaultOctave
    if (octaveDifference == 0) return noteLetter.toUpperCase()
    if (octaveDifference > 0)
      return NoteAbc.addUpperOctaveToNoteName(noteLetter, octaveDifference)

    return NoteAbc.addLowerOctaveToNoteName(noteLetter, octaveDifference)
  }

  /**
   * Adds the upper octave to the note name.
   *
   * @param noteLetter - The letter representing the note.
   * @param octaveDifference - The difference in octaves.
   * @returns The note name with the upper octave added.
   */
  private static addUpperOctaveToNoteName(
    noteLetter: string,
    octaveDifference: number
  ) {
    return NoteAbc.addStringMultipleTimes(
      octaveDifference - 1,
      noteLetter.toLowerCase(),
      OperatorAbc.UPPER_OCTAVE
    )
  }
  /**
   * Adds a lower octave to the given note name.
   *
   * @param noteLetter - The letter representing the note.
   * @param octaveDifference - The number of octaves to lower the note.
   * @returns The modified note name with the lower octave added.
   */
  static addLowerOctaveToNoteName(
    noteLetter: string,
    octaveDifference: number
  ): string {
    return NoteAbc.addStringMultipleTimes(
      Math.abs(octaveDifference),
      noteLetter.toUpperCase(),
      OperatorAbc.LOWER_OCTAVE
    )
  }

  /**
   * Adds a string multiple times to another string.
   *
   * @param repetition The number of times to repeat the string.
   * @param stringToModify The string to modify by adding the other string.
   * @param stringToAdd The string to add multiple times.
   * @returns The modified string.
   */
  private static addStringMultipleTimes(
    repetition: number,
    stringToModify: string,
    stringToAdd: string
  ) {
    for (let i = 0; i < repetition; i++) {
      stringToModify = stringToModify.concat(stringToAdd)
    }
    return stringToModify
  }

  public static convertNameToMidiNumber(
    name: string,
    defaultOctave: number = 4
  ): number {
    if (name.length === 0) throw new Error('The name is empty')

    const octave = NoteAbc.getOctave(defaultOctave, name)
    const flatCount = name.split(OperatorAbc.FLAT).length - 1
    const sharpCount = name.split(OperatorAbc.SHARP).length - 1

    const noteLetter = NoteAbc.extractNoteLetter(name)

    if (noteLetter.length === 0) throw new Error('The note name is not valid')
    if (noteLetter.length > 1)
      throw new Error(
        'The note is longer than one, it may contain unallowed characters'
      )

    const noteIndex = NoteAbc.getNoteNames().indexOf(noteLetter)

    if (noteIndex === -1) throw new Error('The note name is not valid')

    const midi = noteIndex + 12 * octave + sharpCount - flatCount

    if (midi < 0)
      throw new Error('The midi number is negative. The note name is not valid')

    return midi
  }

  /**
   * Extracts the note letter from the given name by removing any octave indicators, flats, and sharps.
   *
   * @param name - The name of the note.
   * @returns The extracted note letter.
   */
  private static extractNoteLetter(name: string) {
    return name
      .replace(OperatorAbc.LOWER_OCTAVE, '')
      .replace(OperatorAbc.UPPER_OCTAVE, '')
      .replace(OperatorAbc.FLAT, '')
      .replace(OperatorAbc.SHARP, '')
  }

  private static getOctave(defaultOctave: number, name: string) {
    let octaveCount = 0
    if (name === name.toUpperCase()) {
      octaveCount = defaultOctave
      octaveCount -= name.split(OperatorAbc.LOWER_OCTAVE).length - 1
    } else {
      octaveCount = defaultOctave + 1
      octaveCount += name.split(OperatorAbc.UPPER_OCTAVE).length - 1
    }
    return octaveCount
  }

  public static getNoteNames(): string[] {
    return Object.values(NoteNameAbcFull)
  }

  getName(): string {
    return this.name
  }
  getMidi(): number {
    return this.midi
  }
}
