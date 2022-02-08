import Note from "../src/Note"

describe('E2 Note', () => {
  const note = new Note(Note.noteNameToMidi('E2'), 0.5)
  it('should be a midi number 40', () => {
    expect(note.getMidi()).toBe(40)
  })
})

describe('A0 Note', () => {
  const note = new Note(Note.noteNameToMidi('A0'), 0.5)
  it('should be a midi number 21', () => {
    expect(note.getMidi()).toBe(21)
  })
})