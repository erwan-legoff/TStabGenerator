import { NoteInterface } from '../NoteInterface'
import { NoteNameAbc, NoteNameAbcFull } from '../../enums/abc/NoteNameAbc'
import { MidiUtils } from '../../utils/MidiUtils'
import OperatorAbc from '../../enums/abc/OperatorAbc'

export default class NoteAbc implements NoteInterface {
  private name: string
  private midi: number
  private defaultOctave: number
  private static readonly INDEX_OF_REFERENCE_NOTE = NoteAbc.getNoteIndexFromA(
    NoteNameAbc.C
  )

  constructor(midi: number, defaultOctave?: number) {
    MidiUtils.checkMidiNumber(midi)

    this.midi = midi

    if (defaultOctave != undefined) this.defaultOctave = defaultOctave
    else this.defaultOctave = 4
    this.name = NoteAbc.convertMidiToName(midi, this.defaultOctave)
  }
  static convertMidiToName(midi: number, defaultOctave: number = 4): string {
    MidiUtils.checkMidiNumber(midi)
    const noteNames = NoteAbc.getNoteNamesFull()
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
    if(defaultOctave < 0) throw new Error('The default octave is negative')
    const OFFSET_MIDI_NUMBER = MidiUtils.MIDI_NUMBER_OCTAVE_ZERO
    const octave = NoteAbc.getOctave(defaultOctave, name)
    const flatCount = name.split(OperatorAbc.FLAT).length - 1
    const sharpCount = name.split(OperatorAbc.SHARP).length - 1

    const noteLetter = NoteAbc.extractNoteLetter(name)

    if (noteLetter.length === 0) throw new Error('The note name is not valid')
    if (noteLetter.length > 1)
      throw new Error(
        'The note is longer than one, it may contain unallowed characters'
      )

    const noteIndex = NoteAbc.getNoteIndexFromC(noteLetter)

    if (noteIndex === -1) throw new Error('The note name is not valid')

    const midi =
      OFFSET_MIDI_NUMBER + noteIndex + 12 * octave + sharpCount - flatCount

    if (midi < 0)
      throw new Error('The midi number is negative. The note name is not valid')

    return midi
  }

  private static getNoteIndexFromC(noteLetter: string): number {
    return NoteAbc.getNoteNamesFull().indexOf(noteLetter.toUpperCase())
  }

  private static getNoteIndexFromA(name: string): number {
    return NoteAbc.getNoteNames().indexOf(name.toUpperCase())
  }

  /**
   * Extracts the note letter from the given name by removing any octave indicators, flats, and sharps.
   *
   * @param name - The name of the note.
   * @returns The extracted note letter.
   */
  private static extractNoteLetter(name: string) {
    return name
      .replaceAll(OperatorAbc.LOWER_OCTAVE, '')
      .replaceAll(OperatorAbc.UPPER_OCTAVE, '')
      .replaceAll(OperatorAbc.FLAT, '')
      .replaceAll(OperatorAbc.SHARP, '')
  }

  /**
   * Retrieves the octave number based on the given default octave and note name.
   * @param defaultOctave The default octave number.
   * @param name The note name.
   * @returns The octave number.
   * @throws Error if the name is empty or the note name is not valid.
   */
  public static getOctave(defaultOctave: number, name: string) {
    let octaveCount = defaultOctave
    if (!name) throw new Error('The name is empty')

    const noteLetter = NoteAbc.extractNoteLetter(name)
    const noteIndex = NoteAbc.getNoteIndexFromA(noteLetter)

    if (noteIndex === -1) throw new Error('The note name is not valid')
    if (noteIndex < NoteAbc.INDEX_OF_REFERENCE_NOTE) octaveCount--

    if (name === noteLetter.toLowerCase()) return ++octaveCount
    if (name === noteLetter.toUpperCase()) return octaveCount
    if (noteLetter === noteLetter.toLowerCase()) octaveCount++

    const octaveIndicator: string = name.replace(noteLetter, '')
    const octaveIndicators: string[] = octaveIndicator.split('')

    while (octaveIndicators.length > 0) {
      const indicator = octaveIndicators.pop()

      if (indicator === OperatorAbc.UPPER_OCTAVE) octaveCount++
      else octaveCount--
    }

    return octaveCount
  }

  public static getNoteNamesFull(): string[] {
    return Object.values(NoteNameAbcFull)
  }

  public static getNoteNames(): string[] {
    return Object.values(NoteNameAbc)
  }

  getName(): string {
    return this.name
  }
  getMidi(): number {
    return this.midi
  }
}
