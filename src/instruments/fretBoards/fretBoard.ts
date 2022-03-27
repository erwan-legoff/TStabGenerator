import { PlayedNoteOneInterface } from '../../notes/playedNote/PlayedNoteOneInterface'
import { PlayedNoteOneSilence } from '../../notes/playedNote/PlayedNoteOneSilence'
import TabLine from '../../tabLines/TabLine'
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
    for (const stringRoot of this.tuning.getNotes()) {
      this.tabLines.push(new TabLine(stringRoot, [], numberOfFrets))
    }
  }

  public addPlayedNote(
    playedNote: PlayedNoteOneInterface,
    stringIndex: number,
    silenceOtherStrings: boolean = false
  ): void {
    this.tabLines[stringIndex].addPlayedNote(playedNote)

    if (silenceOtherStrings) {
      const silenceDuration =
        playedNote.getDuration() + playedNote.getTimeBeforeStart()
      this.addAllSilenceButOneStringIndex(silenceDuration, stringIndex)
    }
  }
  public addAllSilence(duration: number): void {
    this.tabLines.forEach((tabLine) =>
      tabLine.addPlayedNote(new PlayedNoteOneSilence(duration))
    )
  }

  public addAllSilenceButOneStringIndex(
    duration: number,
    stringIndex: number = -1
  ): void {
    this.tabLines.forEach((tabLine, index) => {
      if (index !== stringIndex) {
        tabLine.addPlayedNote(new PlayedNoteOneSilence(duration))
      }
    })
  }

  public getLongestTabLine(): number {
    //Copie de la tabline actuelle
    const tabLinesCopy = this.tabLines.map((tabLine) => tabLine)
    //On trie les tabLines par ordre décroissant de longueur
    tabLinesCopy.sort((a, b) => b.getMelody().length - a.getMelody().length)
    //On récupère la plus longue tabLine
    const longestTabLine = tabLinesCopy[0]
    //On récupère l'index de la tabline la plus longue dans this.tabLines
    const index = this.tabLines.indexOf(longestTabLine)
    if (index === -1)
      throw new Error('Cannot find longest tabLine, this should never happen')

    return index
  }

  getNumberOfStrings(): number {
    return this.tuning.getNotes().length
  }

  getMusicTabLines(): TabLine[] {
    return this.tabLines
  }
}
