import TabLine from '../../tabLines/TabLine'

export interface fretBoard {
  constructor(tuning: string): void
  getName(): string
  getEmptyTabLines(): TabLine[]
}

//* implement fretBoard . En gros on veut qu'un instrument ait un fretboard et qu'un fretboard soit initialisé grace à un tuning avec un tableau de tabLines, c'est en fait le fretboard qui va recevoir les tabNotes de la tablature.
//*C'est la tablature qui aura le contrôle de la position des tabNotes grâce à la stratégie de choix des string line, mais aussi grâce à la stratégie de choix des fret (à ajouter)
//? Est ce qu'une tabline deviendrait une corde ?
