// import { NoteInterface } from 'notes/NoteInterface'
// import { NoteNameAbcFull } from '../../enums/abc/NoteNameAbc'
// import { checkMidiNumber } from '../../utils/checkMidiNumber'

// export default class NoteAbc implements NoteInterface {
//   private name: string
//   private midi: number

//   constructor(midi: number) {
//     checkMidiNumber(midi)

//     this.midi = midi
//     this.name = NoteAbc.convertMidiToName(midi)
//   }
//   static convertMidiToName(midi: number): NoteNameAbc {
//     checkMidiNumber(midi)
//     const noteLetter = NoteAbc.convertMidiToNoteLetter(midi)

//     return NoteNameAbc.C
//   }

//   private static convertMidiToNoteLetter(midi: number): string {
//     const primitiveNumber = (midi - 12) % 12

//     return NoteAbc.convertNoteLetterToNoteName(noteLetter)
//   }

//   public static getNoteNames(): string[] {
//     return Object.values(NoteNameAbcFull)
//   }

//   getName(): string {
//     return this.name
//   }
//   getMidi(): number {
//     return this.midi
//   }
// }
