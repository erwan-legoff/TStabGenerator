import NoteOne from '../notes/noteOnes/NoteOne'
import { NoteOneSilence } from '../notes/NoteOneSilence'
import PlayedNote from '../notes/playedNote/playedNoteOnes/PlayedNoteOne'
import { PlayedNoteInterface } from '../notes/playedNote/PlayedNoteInterface'
import { PlayedNoteOneSilence } from '../notes/playedNote/playedNoteOnes/PlayedNoteOneSilence'
import { ChooseFretNumberStrategy } from './ChooseFretNumberStrategy/ChooseFretNumberStrategy'
import { ChooseFretNumberStrategySimple } from './ChooseFretNumberStrategy/ChooseFretNumberStrategySimple'
import TabNote from './TabNote'
import { TabNoteInterface } from './TabNoteInterface'
// this aims to deal with silence, where there is no note and no case number
export class TabNoteSilence implements TabNoteInterface {
  private note: PlayedNoteOneSilence
  constructor(note: PlayedNoteOneSilence) {
    this.note = note
  }

  getPlayedNote(): PlayedNoteInterface {
    return this.note
  }

  public toString(): string {
    return '-'
  }
}
