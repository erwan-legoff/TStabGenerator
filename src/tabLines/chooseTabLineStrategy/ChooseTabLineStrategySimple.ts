import NoteOne from '../../notes/NoteOne'

import TabLine from '../TabLine'
import { ChooseTabLineStrategy } from './ChooseTabLineStrategy'

export class ChooseTabLineStrategySimple implements ChooseTabLineStrategy {
  /**
   * This function returns the tabLine that is the best fit for the given TabNotes and the given TabLines given in parameters.
   * @param tabNote the tabNote you want to choose the tabLine for
   * @param tabLines the list of tabLines you want to choose from
   */
  chooseTabLine(note: NoteOne, tabLines: TabLine[]): TabLine {
    //choose the right string number according to the note to play : the string tonic note should be lower than the note and also the closest note
    const midi = note.getMidi()
    let difference = tabLines[0].getTonic().getMidi() - midi
    let nearestTabLine: TabLine = tabLines[0]
    // we choose the tabLine if the tonic is the same as the note
    tabLines.forEach((tabLine) => {
      if (tabLine.getTonic().getMidi() === midi) return tabLine
    })
    // we choose the closest tabLine with a lower tonic
    tabLines.forEach((tabLine) => {
      const tabLineTonic = tabLine.getTonic().getMidi()
      const currentDifference = tabLineTonic - midi
      if (
        currentDifference > 0 &&
        (difference >= currentDifference || difference < 0)
      ) {
        difference = currentDifference
        nearestTabLine = tabLine
      }
    })
    if (difference > 0) return nearestTabLine

    // If no lower tabLine is found, we choose the closest tabLine even if the tonic is higher than the note
    difference = Math.abs(difference)

    tabLines.forEach((tabLine) => {
      const tabLineTonic = tabLine.getTonic().getMidi()
      const currentDifference = Math.abs(tabLineTonic - midi)
      if (difference <= currentDifference) {
        difference = currentDifference
        nearestTabLine = tabLine
      }
    })
    return nearestTabLine
  }
}
