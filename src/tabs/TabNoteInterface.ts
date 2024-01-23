import { PlayedNoteInterface } from '../notes/playedNote/PlayedNoteInterface'

export interface TabNoteInterface {
  getPlayedNote(): PlayedNoteInterface
  toString(): string
}
