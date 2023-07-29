import { Guitar } from "../src/instruments/Guitar"
import NoteOne from "../src/notes/noteOnes/NoteOne"
import { StandardGuitarTuning } from "../src/tunings/StandardGuitarTuning"

describe("Guitar", () => {
  const guitar = new Guitar(new StandardGuitarTuning(), 0)
  it("should have the right number of strings", () => {
    expect(guitar.getStringCount()).toBe(6)
  })
  it("should have the right capo", () => {
    expect(guitar.getCapo()).toBe(0)
  })
  it("should have the right tuning", () => {
    expect(guitar.getTuning().getNotes()).toEqual([
      NoteOne.noteNameToNote("E2"),
      NoteOne.noteNameToNote("A2"),
      NoteOne.noteNameToNote("D3"),
      NoteOne.noteNameToNote("G3"),
      NoteOne.noteNameToNote("B3"),
      NoteOne.noteNameToNote("E4")
    ])
  })

  it("should set the capo", () => {
    guitar.setCapo(1)
    expect(guitar.getCapo()).toBe(1)
  })
})