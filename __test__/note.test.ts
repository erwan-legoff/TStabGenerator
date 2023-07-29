import NoteOne from '../src/notes/noteOnes/NoteOne'

describe('Notes from number', () => {
  const noteB3 = new NoteOne(59)
  const noteC4s = new NoteOne(60)
  it('the 59 midiNumber should return a B3 note', () => {
    expect(noteB3.getName()).toBe('B3')
  })
  it('the 60 midiNumber should return a C4 note', () => {
    expect(noteC4s.getName()).toBe('C4')
  })
  it('the 61 midiNumber should return a C#4 note', () => {
    expect(new NoteOne(61).getName()).toBe('C#4')
  })
})
describe('midiNumber from noteName', () => {
  const midiB3 = NoteOne.noteNameToMidiNumber('B3')
  const midiC4s = NoteOne.noteNameToMidiNumber('C4s')
  const midiC4 = NoteOne.noteNameToMidiNumber('C4')
  const midiC4s2 = NoteOne.noteNameToMidiNumber('C#4')
  it('the B3 note should return a 59 midiNumber', () => {
    expect(midiB3).toBe(59)
  })
  it('the C4s note should return a 61 midiNumber', () => {
    expect(midiC4s).toBe(61)
  })
  it('the C4 note should return a 60 midiNumber', () => {
    expect(midiC4).toBe(60)
  })
  it('the C#4 note should return a 61 midiNumber', () => {
    expect(midiC4s2).toBe(61)
  })
})

describe('extractNoteLetter', () => {
  it('the B3 note should return a B', () => {
    expect(NoteOne.extractNoteLetter('B3')).toBe('B')
  })
  it('the C4s note should return a CS', () => {
    expect(NoteOne.extractNoteLetter('C4s')).toBe('CS')
  })
  it('the C4 note should return a C', () => {
    expect(NoteOne.extractNoteLetter('C4')).toBe('C')
  })
})

describe('noteNumber from noteLetter', () => {
  const noteB = NoteOne.noteLetterToNotePrimitiveNumber('B')
  const noteCs = NoteOne.noteLetterToNotePrimitiveNumber('CS')
  it('the B note should return a 11 note number', () => {
    expect(noteB).toBe(11)
  })
  it('the Cs note should return a 1 note number', () => {
    expect(noteCs).toBe(1)
  })
})
