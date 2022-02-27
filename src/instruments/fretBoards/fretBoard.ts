import PlayedNote from '../../notes/PlayedNoteOne'
import { PlayedNoteOneInterface } from '../../notes/PlayedNoteOneInterface'
import { PlayedNoteOneSilence } from '../../notes/PlayedNoteOneSilence'
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

  public addPlayedNote(
    playedNote: PlayedNoteOneInterface,
    stringIndex: number
  ): void {
    this.tabLines[stringIndex].addPlayedNote(playedNote)
  }
  public addAllSilence(duration: number): void {
    this.tabLines.forEach((tabLine) =>
      tabLine.addPlayedNote(new PlayedNoteOneSilence(duration))
    )
  }
//! L'inérêt c'est de faire en sorte de trouver la plus longue corde pour qu'on remplisse les autres cordes de silence jusqu'à arriver à la plus longue corde.l
  public getLongestTabLine(): number {
    return this.tabLines.reduce(
      (longestTabLine, tabLine) =>
        longestTabLine.getMelody().length > tabLine.getMelody().length
          ? longestTabLine
          : tabLine,
      new TabLine(new NoteOne(0), [], 0)
    ).getLength()


  getNumberOfStrings(): number {
    return this.tuning.getNotes().length
  }

  getMusicTabLines(): TabLine[] {
    return this.tabLines
  }
}
