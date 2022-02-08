import Note from './Note'
import TabNote from './TabNote'
/**
 ** A class to represent a group of music tabs that are played in a particular order
 ** It could be a melody oplayed on the string of a instrument, like a guitar string.
 ** it has a tonic note and a list of tabNotes.
 */
export default class TabLine {
  tonic: Note
  melody: TabNote[]
  maxCaseNumber: number
  constructor(
    tonic: Note,
    melody: Note[],
    maxCaseNumber: number,
    mustCorrectTime: boolean = false
  ) {
    this.tonic = tonic
    this.maxCaseNumber = maxCaseNumber
    this.melody = TabLine.fromNotesToTabNotes(
      melody,
      tonic,
      maxCaseNumber,
      mustCorrectTime
    )
  }
  // A function to convert a list of notes to a list of tabNotes.
  private static fromNotesToTabNotes(
    notes: Note[],
    tonic: Note,
    maxCaseNumber: number,
    mustCorrectTime: boolean = false
  ): TabNote[] {
    const tabNotes: TabNote[] = [] //  On doit ajouter le temps de chaque note précédente
    var previousNote: Note = notes[0]
    var currentNote: Note = notes[0]
    notes.forEach((note) => {
      currentNote = note
      if (currentNote.getMidi() !== previousNote.getMidi() && mustCorrectTime)
        currentNote.addTime(previousNote.getDuration() + previousNote.getTime())

      tabNotes.push(new TabNote(currentNote, tonic, maxCaseNumber))

      previousNote = new Note(
        currentNote.getMidi(),
        currentNote.getDuration(),
        currentNote.getTime()
      )
    })
    return tabNotes
  }
  addNote(note: Note): void {
    this.melody.push(new TabNote(note, this.tonic, this.maxCaseNumber))
  }
  getMelody(): TabNote[] {
    return this.melody
  }
  toString(): string {
    return this.melody.map((note) => note.toString()).join('--')
  }
}