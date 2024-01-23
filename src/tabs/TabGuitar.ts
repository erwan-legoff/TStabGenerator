import { FretBoardGuitar } from '../instruments/fretBoards/FretBoardGuitar'
import { Guitar } from '../instruments/Guitar'
import { NoteOneInterface } from '../notes/NoteOneInterface'
import { PlayedNoteInterface } from '../notes/playedNote/PlayedNoteInterface'
import { TrackOne } from '../notes/PlayedNoteMidi'
import { ChooseTabLineStrategy } from '../tabLines/chooseTabLineStrategy/ChooseTabLineStrategy'
import { ChooseTabLineStrategySimple } from '../tabLines/chooseTabLineStrategy/ChooseTabLineStrategySimple'
import TabLine from '../tabLines/TabLine'
import { StandardGuitarTuning } from '../tunings/StandardGuitarTuning'
import { Tab } from './Tab'

export class TabGuitar implements Tab {
  // readonly numberOfStrings: number = 6
  private fretBoard: FretBoardGuitar
  private strategy: ChooseTabLineStrategy
  constructor(
    readonly name: string,
    musicNotes: TrackOne,
    guitar: Guitar = new Guitar(new StandardGuitarTuning(), 0),
    strategy: ChooseTabLineStrategy = new ChooseTabLineStrategySimple()
  ) {
    this.fretBoard = guitar.getFretBoard()
    this.strategy = strategy
    this.generateMusicFromNotes(musicNotes)
  }

  addPlayedNote(
    playedNote: PlayedNoteInterface,
    fillWithSilence: boolean = true
  ): void {
    const stringNumber = this.chooseStringNumber(
      playedNote.getNote(),
      new ChooseTabLineStrategySimple()
    )

    this.fretBoard.addPlayedNote(playedNote, stringNumber, fillWithSilence)
  }

  getName(): string {
    return this.name
  }
  getMusic(): TabLine[] {
    return this.fretBoard.getMusicTabLines()
  }

  private chooseStringNumber(
    note: NoteOneInterface,
    strategy: ChooseTabLineStrategy
  ): number {
    //choose the right string number according to the note to play
    return strategy.chooseTabLine(note, this.fretBoard.getMusicTabLines())
  }

  private generateMusicFromNotes(musicNotes: TrackOne) {
    musicNotes.getPlayedNotes().forEach((playedNote) => {
      this.addPlayedNote(playedNote, true)
    })
  }

  printTab(): string {
    let tab = ''
    this.fretBoard.getMusicTabLines().forEach((tabLine) => {
      tab += tabLine.toString()
      tab += '\n'
    })
    return tab
  }

  toString(): string {
    return this.printTab()
  }
}
