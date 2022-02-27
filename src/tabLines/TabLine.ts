import NoteOne from '../notes/NoteOne'
import PlayedNote from '../notes/PlayedNoteOne'
import { PlayedNoteOneInterface } from '../notes/PlayedNoteOneInterface'
import { PlayedNoteOneSilence } from '../notes/PlayedNoteOneSilence'
import { ChooseFretNumberStrategySimple } from '../tabs/ChooseFretNumberStrategy/ChooseFretNumberStrategySimple'
import TabNote from '../tabs/TabNote'
import { TabNoteInterface } from '../tabs/TabNoteInterface'
import { TabNoteSilence } from '../tabs/TabNoteSilence'
/**
 ** A class to represent a group of music tabs that are played in a particular order
 ** It could be a melody oplayed on the string of a instrument, like a guitar string.
 ** it has a tonic note and a list of tabNotes.
 */
export default class TabLine {
  private tonic: NoteOne
  private melody: TabNoteInterface[]
  private maxCaseNumber: number
  private mustCorrectTime: boolean
  constructor(
    tonic: NoteOne,
    melody: PlayedNote[],
    maxCaseNumber: number,
    mustCorrectTime: boolean = false
  ) {
    this.tonic = tonic
    this.maxCaseNumber = maxCaseNumber
    this.mustCorrectTime = mustCorrectTime
    this.melody = this.fromNotesToTabNotes(
      melody,
      tonic,
      maxCaseNumber,
      mustCorrectTime
    )
  }
  // A function to convert a list of notes to a list of tabNotes.
  private fromNotesToTabNotes(
    notes: PlayedNoteOneInterface[],
    tonic: NoteOne,
    maxCaseNumber: number,
    mustCorrectTime: boolean = false
  ): TabNote[] {
    const tabNotes: TabNote[] = [] //  On doit ajouter le temps de chaque note précédente
    var previousNote: PlayedNoteOneInterface = notes[0]
    var currentNote: PlayedNoteOneInterface = notes[0]
    notes.forEach((note) => {
      currentNote = note
      if (currentNote !== previousNote && mustCorrectTime)
        currentNote.addTimeBeforeStart(
          previousNote.getDuration() + previousNote.getDuration()
        )

      this.addPlayedNote(currentNote)
      previousNote = currentNote

      if (currentNote instanceof PlayedNoteOneSilence)
        previousNote = new PlayedNoteOneSilence(
          currentNote.getDuration(),
          currentNote.getTimeBeforeStart()
        )
      else if (currentNote instanceof PlayedNote) {
        previousNote = new PlayedNote(
          currentNote.getNote(),
          currentNote.getDuration(),
          currentNote.getTimeBeforeStart()
        )
      } else {
        throw new Error(
          'The note is not a PlayedNoteOneSilence or a PlayedNote'
        )
      }
    })
    return tabNotes
  }
  public addPlayedNote(note: PlayedNoteOneInterface): void {
    if (this.mustCorrectTime) {
      note.addTimeBeforeStart(
        this.melody[this.melody.length - 1].getPlayedNote().getDuration() +
          this.melody[this.melody.length - 1]
            .getPlayedNote()
            .getTimeBeforeStart()
      )
    }
    if (note instanceof PlayedNoteOneSilence)
      this.melody.push(new TabNoteSilence(note))
    if (note instanceof PlayedNote) {
      this.melody.push(
        new TabNote(
          note,
          this.tonic,
          this.maxCaseNumber,
          new ChooseFretNumberStrategySimple()
        )
      )
    } else {
      throw new Error('The note is not a PlayedNoteOneSilence or a PlayedNote')
    }
  }

  getMelody(): TabNoteInterface[] {
    return this.melody
  }
  toString(): string {
    return this.melody.map((note) => note.toString()).join('--')
  }
  getTonic(): NoteOne {
    return this.tonic
  }
  getMaxMidiPossible(): number {
    return this.tonic.getMidi() + this.maxCaseNumber
  }
  getLastNote(): TabNoteInterface {
    return this.melody[this.melody.length - 1]
  }
}
