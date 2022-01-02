import Note from "./Note"
import TabNote from "./TabNote"
/**
 ** A class to represent a group of music tabs that are played in a particular order
 ** It could be a melody oplayed on the string of a instrument, like a guitar string.
  ** it has a tonic note and a list of tabNotes.
 */
export default class TabLine {
  tonic: Note
  melody: TabNote[]
  maxCaseNumber: number
  constructor(tonic: Note, melody: Note[], maxCaseNumber: number) {
    this.tonic = tonic
    this.maxCaseNumber = maxCaseNumber
    this.melody = TabLine.fromNotesToTabNotes(melody, tonic, maxCaseNumber)
  }
 // A function to convert a list of notes to a list of tabNotes.
  private static fromNotesToTabNotes(notes: Note[], tonic: Note, maxCaseNumber: number): TabNote[] {
    return notes.map((note) => new TabNote(note, tonic, maxCaseNumber))
  }
  addNote(note: Note): void {
    this.melody.push(new TabNote(note, this.tonic, this.maxCaseNumber))
  }
  getMelody(): TabNote[] {
    return this.melody
  }

}