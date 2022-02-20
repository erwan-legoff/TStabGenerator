import NoteOne from './notes/NoteOne'
import { TrackOne } from './notes/TrackOne'
import { Tab } from './Tab'
import TabLine from './TabLine'
import { TabLineGuitar } from './TabLineGuitar'
import TabNote from './TabNote'

class TabGuitar implements Tab {
  readonly numberOfStrings: number = 6
  private music: TabLineGuitar[] = []
  constructor(readonly name: string, musicNotes: TrackOne) {
    this.music = TabGuitar.getTabLinesFromNotes(musicNotes)
  }

  addNote(note: NoteOne, stringNumber: number): void {
    throw new Error('Method not implemented.')
  }
  addTabNote(tabNote: TabNote): void {
    throw new Error('Method not implemented.')
  }
  getName(): string {
    return this.name
  }
  getMusic(): TabLine[] {
    return this.music
  }

  public static getTabLinesFromNotes(musicNotes: TrackOne): TabLineGuitar[] {
    const tabLines: TabLineGuitar[] = []
    const tabLine: TabLineGuitar = new TabLineGuitar(
      NoteOne.noteNameToNote('E4')
    )
    let previousNote: NoteOne = null
    let previousTimeBeforeStart: number = 0
    let previousDuration: number = 0
    for (const playedNote of musicNotes.playedNotes) {
      const note = playedNote.note
      const timeBeforeStart = playedNote.timeBeforeStart
      const duration = playedNote.duration
      if (previousNote !== null) {
        if (previousNote.midi === note.midi) {
          previousDuration += duration
        } else {
          tabLine.addTabNote(
            new TabNote(previousNote, previousTimeBeforeStart, previousDuration)
          )
          previousTimeBeforeStart = timeBeforeStart
          previousDuration = duration
          previousNote = note
        }
      } else {
        previousNote = note
        previousTimeBeforeStart = timeBeforeStart
        previousDuration = duration
      }
    }
    tabLines.push(tabLine)
    return tabLines
  }
}
