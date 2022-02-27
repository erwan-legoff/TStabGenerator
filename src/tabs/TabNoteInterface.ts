import { PlayedNoteOneInterface } from '../notes/PlayedNoteOneInterface'

export interface TabNoteInterface {
  getPlayedNote(): PlayedNoteOneInterface
  toString(): string
}
