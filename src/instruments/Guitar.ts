import { Instrument } from './Instrument'
import { Tuning } from '../tunings/Tuning'
import { GuitarTuning } from '../tunings/GuitarTuning'

import { FretBoardGuitar } from './fretBoards/FretBoardGuitar'
export class Guitar implements Instrument {
  private fretBoard: FretBoardGuitar
  readonly name: string
  readonly tuning: Tuning
  capo: number

  constructor(
    tuning: GuitarTuning,
    capo: number,
    fretBoard: FretBoardGuitar = new FretBoardGuitar()
  ) {
    this.name = 'Guitar'
    this.tuning = tuning
    this.capo = capo
    this.fretBoard = fretBoard
  }

  setCapo(capo: number): void {
    this.capo = capo
  }

  getTuning(): Tuning {
    return this.tuning
  }

  getName(): string {
    return this.name
  }

  getNumberOfStrings(): number {
    return this.tuning.getNotes().length
  }

  getCapo(): number {
    return this.capo
  }

  getFretBoard(): FretBoardGuitar {
    return this.fretBoard
  }
}
