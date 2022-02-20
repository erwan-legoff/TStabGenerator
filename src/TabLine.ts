import NoteOne from './notes/NoteOne'
import PlayedNote from './notes/PlayedNoteOne'
import TabNote from './TabNote'
/**
 ** A class to represent a group of music tabs that are played in a particular order
 ** It could be a melody oplayed on the string of a instrument, like a guitar string.
 ** it has a tonic note and a list of tabNotes.
 */
export default class TabLine {
  tonic: NoteOne
  melody: TabNote[]
  maxCaseNumber: number
  mustCorrectTime: boolean
  constructor(
    tonic: NoteOne,
    melody: PlayedNote[],
    maxCaseNumber: number,
    mustCorrectTime: boolean = false
  ) {
    this.tonic = tonic
    this.maxCaseNumber = maxCaseNumber
    this.mustCorrectTime = mustCorrectTime
    this.melody = TabLine.fromNotesToTabNotes(
      melody,
      tonic,
      maxCaseNumber,
      mustCorrectTime
    )
  }
  // A function to convert a list of notes to a list of tabNotes.
  private static fromNotesToTabNotes(
    notes: PlayedNote[],
    tonic: NoteOne,
    maxCaseNumber: number,
    mustCorrectTime: boolean = false
  ): TabNote[] {
    const tabNotes: TabNote[] = [] //  On doit ajouter le temps de chaque note précédente
    var previousNote: PlayedNote = notes[0]
    var currentNote: PlayedNote = notes[0]
    notes.forEach((note) => {
      currentNote = note
      if (currentNote !== previousNote && mustCorrectTime)
        currentNote.addTimeBeforeStart(
          previousNote.getDuration() + previousNote.getDuration()
        )

      tabNotes.push(new TabNote(currentNote, tonic, maxCaseNumber))

      previousNote = new PlayedNote(
        currentNote.getNote(),
        currentNote.getDuration(),
        currentNote.getTimeBeforeStart()
      )
    })
    return tabNotes
  }
  addNote(note: PlayedNote): void {
    if (this.mustCorrectTime) {
      note.addTimeBeforeStart(
        this.melody[this.melody.length - 1].getNote().getDuration() +
          this.melody[this.melody.length - 1].getNote().getTimeBeforeStart()
      )

      this.melody.push(new TabNote(note, this.tonic, this.maxCaseNumber))
    }
  }
  getMelody(): TabNote[] {
    return this.melody
  }
  toString(): string {
    return this.melody.map((note) => note.toString()).join('--')
  }
}
