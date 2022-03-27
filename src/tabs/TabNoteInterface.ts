import { PlayedNoteOneInterface } from '../notes/playedNote/PlayedNoteOneInterface'

export interface TabNoteInterface {
  getPlayedNote(): PlayedNoteOneInterface
  toString(): string
}
