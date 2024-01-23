import { NoteOneSilence } from '../../noteOnes/NoteOneSilence'
import { PlayedNoteInterface } from '../PlayedNoteInterface'

export class PlayedNoteOneSilence implements PlayedNoteInterface {
  duration: number
  timeBeforeStart: number
  silenceNote: NoteOneSilence
  // To simulate silence we use a note with a duration of 0 and a timeBeforeStart equal to the duration of the silence
  constructor(duration: number = 1, timeBeforeStart: number = 0) {
    this.duration = 0
    this.timeBeforeStart = duration + timeBeforeStart
    this.silenceNote = new NoteOneSilence()
  }

  getNote(): NoteOneSilence {
    return new NoteOneSilence()
  }
  getTimeBeforeStart(): number {
    return this.timeBeforeStart
  }
  getDuration(): number {
    return this.duration
  }
  addTimeBeforeStart(timeBeforeStart: number): void {
    this.timeBeforeStart += timeBeforeStart
  }
  getMidi(): number {
    return this.silenceNote.getMidi()
  }
  getNoteName(): string {
    return this.silenceNote.getName()
  }
}
