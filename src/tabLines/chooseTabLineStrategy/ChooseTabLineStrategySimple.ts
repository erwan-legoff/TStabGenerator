import NoteOne from '../../notes/NoteOne'
import { NoteOneSilence } from '../../notes/NoteOneSilence'

import TabLine from '../TabLine'
import { ChooseTabLineStrategy } from './ChooseTabLineStrategy'

export class ChooseTabLineStrategySimple implements ChooseTabLineStrategy {
  /**
   * This function returns the string index that is the best fit for the given TabNotes and the given TabLines given in parameters.
   * @param tabNote the tabNote you want to choose the tabLine for
   * @param tabLines the list of tabLines you want to choose from
   */
  chooseTabLine(note: NoteOneInterface, tabLines: TabLine[]): number {
    //choose the right string number according to the note to play : the string root note should be lower than the note and also the closest note
    if (note instanceof NoteOneSilence) return -1

    const midi = note.getMidi()
    let difference = tabLines[0].getRoot().getMidi() - midi
    let choosenIndex: number = 0

    for (let i = 0; i < tabLines.length; i++) {
      const tabLine = tabLines[i]
      if (tabLine.getRoot().getMidi() === midi) {
        return i
      }
    }

    choosenIndex = 0
    for (let stringNumber = 0; stringNumber < tabLines.length; stringNumber++) {
      const tabLine = tabLines[stringNumber]
      const tabLineRoot = tabLine.getRoot().getMidi()
      const currentDifference = tabLineRoot - midi
      if (
        currentDifference > 0 &&
        (difference >= currentDifference || difference < 0)
      ) {
        difference = currentDifference
        choosenIndex = stringNumber
      }
    }

    if (difference > 0) return choosenIndex

    // If no lower tabLine is found, we choose the closest tabLine even if the root is higher than the note
    difference = Math.abs(difference)
    choosenIndex = 0
    for (let stringNumber = 0; stringNumber < tabLines.length; stringNumber++) {
      const tabLine = tabLines[stringNumber]
      const tabLineRoot = tabLine.getRoot().getMidi()
      const currentDifference = Math.abs(tabLineRoot - midi)
      if (difference <= currentDifference) {
        difference = currentDifference
        choosenIndex = stringNumber
      }
    }

    return choosenIndex
  }
}
