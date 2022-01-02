import Note from "./Note"

export default class TabNote {
  /**
   ** A class to represent a music note but with a case number attribute that 
    ** is used to know how to play the note on a particular instrument string.
    ** It has a Note object and a case number.
   */
  private note: Note
  private caseNumber: number
  constructor(note: Note, tonic: Note, maxCaseNumber: number) {
    this.note = note
    this.caseNumber = this.getCaseNumber(note, tonic, maxCaseNumber)
  }

  // A function to get the case number of a note thanks to the tonic note.
  private getCaseNumber(note: Note, tonic: Note, maxCaseNumber: number): number {
    const midi = note.getMidi()
    const tonicMidi = tonic.getMidi()
    var caseNumber = midi - tonicMidi
    while (caseNumber < 0) {
      caseNumber += 12
    } 
    while (caseNumber > maxCaseNumber) {
      caseNumber -= 12
    }
      return caseNumber
  }
  getNote(): Note {
    return this.note
  }
}
  
