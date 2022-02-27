import NoteOne from '../src/notes/NoteOne'
import { ChooseTabLineStrategySimple } from '../src/tabLines/chooseTabLineStrategy/ChooseTabLineStrategySimple'
import { TabLineGuitar } from '../src/tabLines/TabLineGuitar'

describe('ChooseTabLineStrategySimple', () => {
  const strategy = new ChooseTabLineStrategySimple()
  const tabLineGuitarE2 = new TabLineGuitar(NoteOne.noteNameToNote('E2'))
  const tabLineGuitarA2 = new TabLineGuitar(NoteOne.noteNameToNote('A2'))
  const tabLines = [tabLineGuitarE2, tabLineGuitarA2]

  it('should choose the E2 string for E3 note', () => {
    const noteE3 = NoteOne.noteNameToNote('E4')
    const choosenStringIndex = strategy.chooseTabLine(noteE3, tabLines)
    const choosenTabLine = tabLines[choosenStringIndex]
    expect(choosenTabLine.getTonic()).toBe(tabLineGuitarE2.getTonic())
  })
  // it('should choose the A2 string for A3 note', () => {
  //   const noteA3 = NoteOne.noteNameToNote('A3')
  //   const choosenStringIndex = strategy.chooseTabLine(noteA3, tabLines)
  //   const choosenTabLine = tabLines[choosenStringIndex]

  //   expect(choosenTabLine.getTonic()).toBe(tabLineGuitarA2.getTonic())
  // })
  // it('should choose the E2 string for E1 note', () => {
  //   const noteE1 = NoteOne.noteNameToNote('E1')
  //   const choosenStringIndex = strategy.chooseTabLine(noteE1, tabLines)
  //   const choosenTabLine = tabLines[choosenStringIndex]
  //   expect(choosenTabLine.getTonic()).toBe(tabLineGuitarE2.getTonic())
  // })
  // it('should choose the A2 string for the A2 note', () => {
  //   const noteA2 = NoteOne.noteNameToNote('A2')
  //   const choosenStringIndex = strategy.chooseTabLine(noteA2, tabLines)
  //   const choosenTabLine = tabLines[choosenStringIndex]
  //   expect(choosenTabLine.getTonic()).toBe(tabLineGuitarA2.getTonic())
  // })
  // it('should return the A2 string for the G2 note', () => {
  //   const noteG2 = NoteOne.noteNameToNote('G2')
  //   const choosenStringIndex = strategy.chooseTabLine(noteG2, tabLines)
  //   const choosenTabLine = tabLines[choosenStringIndex]
  //   expect(choosenTabLine.getTonic()).toBe(tabLineGuitarA2.getTonic())
  // })
})
