import { PlayedNoteOneInterface } from '../notes/playedNote/PlayedNoteInterface'

export interface TabNoteInterface {
  getPlayedNote(): PlayedNoteOneInterface
  toString(): string
}
