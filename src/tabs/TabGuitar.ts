import NoteOne from '../notes/NoteOne'
import { TrackOne } from '../notes/TrackOne'
import { Tab } from './Tab'
import TabLine from '../tabLines/TabLine'
import TabNote from './TabNote'
import { ChooseTabLineStrategy } from '../tabLines/chooseTabLineStrategy/ChooseTabLineStrategy'
import { ChooseTabLineStrategySimple } from '../tabLines/chooseTabLineStrategy/ChooseTabLineStrategySimple'
import { Guitar } from '../instruments/Guitar'
import { StandardGuitarTuning } from '../tunings/StandardGuitarTuning'
import { FretBoardGuitar } from '../instruments/fretBoards/FretBoardGuitar'
import PlayedNote from '../notes/PlayedNoteOne'
import { PlayedNoteOneInterface } from '../notes/PlayedNoteOneInterface'

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

  addPlayedNote(playedNote: PlayedNoteOneInterface, fillWithSilence: boolean = true): void {
    const stringNumber = this.chooseStringNumber(
      playedNote.getNote(),
      new ChooseTabLineStrategySimple()
    )

    this.fretBoard.addPlayedNote(playedNote, stringNumber)
  }

  private fillWithSilence(): void {

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
      this.addPlayedNote(playedNote)
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
}
