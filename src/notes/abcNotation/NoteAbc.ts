import { NoteInterface } from '../NoteInterface'
import { NoteNameAbcFull } from '../../enums/abc/NoteNameAbc'
import { checkMidiNumber } from '../../utils/checkMidiNumber'
import { getOctaveFromMidi } from '../../utils/getOctaveFromMidi'
import OperatorAbc from '../../enums/abc/OperatorAbc'

export default class NoteAbc implements NoteInterface {
  private name: string
  private midi: number
  private defaultOctave: number

  constructor(midi: number, defaultOctave?: number) {
    checkMidiNumber(midi)

    this.midi = midi

    if (defaultOctave != undefined) this.defaultOctave = defaultOctave
    else this.defaultOctave = 4
    this.name = NoteAbc.convertMidiToName(midi, this.defaultOctave)
  }
  static convertMidiToName(midi: number, defaultOctave: number = 4): string {
    checkMidiNumber(midi)
    const noteNames = NoteAbc.getNoteNames()
    const noteIndex = midi % 12
    const noteLetter = noteNames[noteIndex]
    const octave = getOctaveFromMidi(midi)
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
    if (octaveDifference === 0) return noteLetter.toUpperCase()

    if (octaveDifference > 0)
      return NoteAbc.addUpperOctaveToNoteName(noteLetter, octaveDifference)

    if (octaveDifference < 0)
      return NoteAbc.addLowerOctaveToNoteName(noteLetter, octaveDifference)

    return noteLetter.toUpperCase()
  }

  private static addUpperOctaveToNoteName(
    noteLetter: string,
    octaveDifference: number
  ) {
    let noteName = noteLetter.toLowerCase()
    const operator = OperatorAbc.UPPER_OCTAVE
    noteName = NoteAbc.addStringMultipleTimes(
      octaveDifference - 1,
      noteName,
      operator
    )
    return noteName
  }
  static addLowerOctaveToNoteName(
    noteLetter: string,
    octaveDifference: number
  ): string {
    let noteName = noteLetter.toUpperCase()
    const operator = OperatorAbc.LOWER_OCTAVE
    const octaveDifferenceAbs = Math.abs(octaveDifference)
    noteName = NoteAbc.addStringMultipleTimes(
      octaveDifferenceAbs,
      noteName,
      operator
    )
    return noteName
  }

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
      throw new Error('The note name contains unallowed characters')

    const noteIndex = NoteAbc.getNoteNames().indexOf(noteLetter)
    if (noteIndex === -1) throw new Error('The note name is not valid')

    const midi = noteIndex + 12 * octave + sharpCount - flatCount

    if (midi < 0)
      throw new Error('The midi number is negative. The note name is not valid')

    return midi
  }

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
