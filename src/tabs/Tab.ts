import PlayedNote from '../notes/PlayedNoteOne'
import TabLine from '../tabLines/TabLine'

export interface Tab {
  getName(): string
  getMusic(): TabLine[]

  addPlayedNote(playedNote: PlayedNote, fillWithSilence: boolean): void
  printTab(): string
}
