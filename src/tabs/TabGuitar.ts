import NoteOne from '../notes/NoteOne'
import { TrackOne } from '../notes/TrackOne'
import { Tab } from './Tab'
import TabLine from '../tabLines/TabLine'
import { TabLineGuitar } from '../tabLines/TabLineGuitar'
import TabNote from './TabNote'
import { ChooseTabLineStrategy } from '../tabLines/chooseTabLineStrategy/ChooseTabLineStrategy'
import { ChooseTabLineStrategySimple } from '../tabLines/chooseTabLineStrategy/ChooseTabLineStrategySimple'
import { Guitar } from '../instruments/Guitar'
import { StandardGuitarTuning } from '../tunings/StandardGuitarTuning'

class TabGuitar implements Tab {
  // readonly numberOfStrings: number = 6
  private music: TabLineGuitar[]
  private strategy: ChooseTabLineStrategy
  constructor(readonly name: string, musicNotes: TrackOne, guitar: Guitar = new Guitar(new StandardGuitarTuning, 0), strategy: ChooseTabLineStrategy = new ChooseTabLineStrategySimple()) {
    this.music = guitar.getFretBoard().get/// renvoyer les cordes
    this.generateMusicFromNotes(musicNotes)
  }

  addNote(note: NoteOne, stringNumber: number): void {
    throw new Error('Method not implemented.')
  }
  addTabNote(tabNote: TabNote): void {
    throw new Error('Method not implemented.')
  }
  getName(): string {
    return this.name
  }
  getMusic(): TabLine[] {
    return this.music
  }

  private chooseTabLine(
    note: NoteOne,
    strategy: ChooseTabLineStrategy
  ): TabLineGuitar {
    //choose the right string number according to the note to play
    return strategy.chooseTabLine(note, this.music)
  }
  private generateMusicFromNotes(musicNotes: TrackOne) {
    musicNotes.getPlayedNotes().forEach((playedNote) => {
      const note = playedNote.getNote()
      const tabLine = this.chooseTabLine(
        note,
        new ChooseTabLineStrategySimple()
      )
      tabLine.addNote(playedNote)
    })
  }

  printTab(): string {
    let tab = ''
    this.music.forEach((tabLine) => {
      tab += tabLine.toString()
    })
    return tab
  }

}
