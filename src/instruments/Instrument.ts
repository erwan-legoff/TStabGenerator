import { Tuning } from '../tunings/Tuning'
import { FretBoardGuitar } from './fretBoards/FretBoardGuitar';

export interface Instrument {
  name: string
  tuning: Tuning
  capo: number

  setCapo(capo: number): void
  getTuning(): Tuning
  getName(): string
  getNumberOfStrings(): number
  getCapo(): number
  getFretBoard(): FretBoardGuitar
}
