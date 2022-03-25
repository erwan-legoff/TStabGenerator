import NoteOne from "../../notes/NoteOne";
import TabNote from "../../tabs/TabNote";
import TabLine from "../TabLine";

export interface ChooseTabLineStrategy {
  /**
   ** This function returns the tabLine that is the best fit for the given note and the given TabLines given in parameters.
   * @param note the note you want to choose the tabLine for
   * @param tabLines the list of tabLines you want to choose from
   */
  chooseTabLine(note: NoteOneInterface, tabLines: TabLine[]): number
}