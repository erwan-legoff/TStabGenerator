import PlayedNote from '../../notes/PlayedNoteOne'
import TabLine from '../../tabLines/TabLine'
import TabNote from '../../tabs/TabNote'
import { Tuning } from '../../tunings/Tuning'
//* implement fretBoard . En gros on veut qu'un instrument ait un fretboard et qu'un fretboard soit initialisé grace à un tuning avec un tableau de tabLines, c'est en fait le fretboard qui va recevoir les tabNotes de la tablature.
//*C'est la tablature qui aura le contrôle de la position des tabNotes grâce à la stratégie de choix des string line, mais aussi grâce à la stratégie de choix des fret (à ajouter)
//? Est ce qu'une tabline deviendrait une corde ?
//? Dans le futur une tablature pourrait être composé de "measureTab" qui serait chacune une seule mesure de tablature.
//? Cela permettrait de facilement gérer le graphisme de la tablature et d'incorporer une notion de temps.

export class FretBoard {
  private tabLines: TabLine[]
  private tuning: Tuning
  constructor(tuning: Tuning, numberOfFrets: number = 24) {
    this.tuning = tuning
    this.tabLines = []
    this.initTabLines(numberOfFrets)
  }
  private initTabLines(numberOfFrets: number) {
    for (const stringTonic of this.tuning.getNotes()) {
      this.tabLines.push(new TabLine(stringTonic, [], numberOfFrets))
    }
  }

  public addPlayedNote(playedNote: PlayedNote, stringIndex: number): void {
    this.tabLines[stringIndex].addNote(playedNote)
  }

  getNumberOfStrings(): number {
    return this.tuning.getNotes().length
  }

  getMusicTabLines(): TabLine[] {
    return this.tabLines
  }

}
