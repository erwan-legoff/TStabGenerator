import NoteOne from './NoteOne'
import { PlayedNoteOneInterface } from './PlayedNoteOneInterface'

export default class PlayedNote implements PlayedNoteOneInterface{
  private note: NoteOne
  private timeBeforeStart: number
  private duration: number
  /**
   * 
   * @param note the note to play
   * @param timeBeforeStartRelativeToBeat in percentage of the beat (1 = 100%)
   * @param durationRelativeToBeat in percentage of the beat (1 = 100%)
   */
  constructor(
    note: NoteOne,
    timeBeforeStartRelativeToBeat: number = 0,
    durationRelativeToBeat: number = 1
  ) {
    this.note = note
    this.timeBeforeStart = timeBeforeStartRelativeToBeat // in percentage of the beat
    this.duration = durationRelativeToBeat // in percentage of the beat
  }
  getNoteName(): string {
    return this.note.getName()
  }
  /**
   * * A function to get the played note from a note letter in string.
   * @param noteName eg. 'C4'
   * @param timeBeforeStart percentage of the beat (1 = 100%)
   * @param duration percentage of the beat (1 = 100%)
   * @returns
   */
  static getPlayedNoteFromNoteName(
    noteName: string = 'A4',
    timeBeforeStart: number = 1,
    duration = 1
  ): PlayedNote {
    return new PlayedNote(
      NoteOne.noteNameToNote(noteName),
      timeBeforeStart,
      duration
    )
  }

  addTimeBeforeStart(timeBeforeStart: number): void {
    this.timeBeforeStart += timeBeforeStart
  }
  getTimeBeforeStart(): number {
    return this.timeBeforeStart
  }
  getDuration(): number {
    return this.duration
  }

  getMidi(): number {
    return this.note.getMidi()
  }
  getNote(): NoteOne {
    return this.note
  }

}
