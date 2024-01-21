import NoteAbc from '../src/notes/abcNotation/NoteAbc'
import OperatorAbc from '../src/enums/abc/OperatorAbc'
import { NoteNameAbcFull } from '../src/enums/abc/NoteNameAbc'

describe('Notes from number', () => {
  const noteB3 = new NoteAbc(59, 4)
  const noteC4 = new NoteAbc(60, 4)
  const noteC5 = new NoteAbc(72, 4)
  const noteC6 = new NoteAbc(84, 4)

  it('the 59 midiNumber should return a B, note', () => {
    expect(noteB3.getName()).toBe('B,')
  })
  it('the 60 midiNumber should return a C note', () => {
    expect(noteC4.getName()).toBe('C')
  })
  it('the 72 midiNumber should return a c note', () => {
    expect(noteC5.getName()).toBe('c')
  })
  it('the 84 midiNumber should return a c\' note', () => {
    expect(noteC6.getName()).toBe("c'")
  })
})
