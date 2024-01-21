import PlayedNote from '../notes/playedNote/playedNoteOnes/PlayedNoteOne'
import TabLine from '../tabLines/TabLine'

export interface Tab {
  getName(): string
  getMusic(): TabLine[]

  addPlayedNote(playedNote: PlayedNote, fillWithSilence: boolean): void
  printTab(): string
}
