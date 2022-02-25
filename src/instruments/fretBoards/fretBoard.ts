import TabLine from '../../tabLines/TabLine'

export interface fretBoard {
  constructor(tuning: string): void
  getName(): string
  getEmptyTabLines(): TabLine[]
}
