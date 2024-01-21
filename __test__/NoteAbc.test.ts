import NoteAbc from '../src/notes/abcNotation/NoteAbc'
import OperatorAbc from '../src/enums/abc/OperatorAbc'
import { NoteNameAbcFull } from '../src/enums/abc/NoteNameAbc'

describe('Notes from number', () => {
  const noteB3 = new NoteAbc(59, 4)
  const noteC4 = new NoteAbc(60, 4)
  const noteC4s = new NoteAbc(61, 4)
  const noteC5 = new NoteAbc(72, 4)
  const noteC5s = new NoteAbc(73, 4)
  const noteC6 = new NoteAbc(84, 4)
  const noteC6s = new NoteAbc(85, 4)
  const noteC7 = new NoteAbc(96, 4)
  const noteC7bis = new NoteAbc(96)

  it('the 59 midiNumber should return a B, note', () => {
    expect(noteB3.getName()).toBe('B,')
  })
  it('the 60 midiNumber should return a C note', () => {
    expect(noteC4.getName()).toBe('C')
  })
  it('the 61 midiNumber should return a ^C note', () => {
    expect(noteC4s.getName()).toBe('^C')
  })
  it('the 72 midiNumber should return a c note', () => {
    expect(noteC5.getName()).toBe('c')
  })
  it('the 73 midiNumber should return a ^c note', () => {
    expect(noteC5s.getName()).toBe('^c')
  })
  it("the 84 midiNumber should return a c' note", () => {
    expect(noteC6.getName()).toBe("c'")
  })
  it("the 85 midiNumber should return a ^c' note", () => {
    expect(noteC6s.getName()).toBe("^c'")
  })
  it("the 96 midiNumber should return a c'' note", () => {
    expect(noteC7.getName()).toBe("c''")
  })
  it("the 96bis midiNumber should return a c'' note", () => {
    expect(noteC7bis.getName()).toBe("c''")
  })
})

describe('Notes from name', () => {
  it('the B note should return a midi number of 59', () => {
    expect(NoteAbc.convertNameToMidiNumber('B')).toBe(59)
  })
  it('the B, note should return a midi number of 47', () => {
    expect(NoteAbc.convertNameToMidiNumber('B,')).toBe(47)
  })
  it('the C note should return a midi number of 60', () => {
    expect(NoteAbc.convertNameToMidiNumber('C')).toBe(60)
  })

  it('the ^C note should return a midi number of 61', () => {
    expect(NoteAbc.convertNameToMidiNumber('^C')).toBe(61)
  })
  it('the _C note should return a midi number of 59', () => {
    expect(NoteAbc.convertNameToMidiNumber('_C')).toBe(59)
  })
  it('the c note should return a midi number of 72', () => {
    expect(NoteAbc.convertNameToMidiNumber('c')).toBe(72)
  })
  it("the c' note should return a midi number of 84", () => {
    expect(NoteAbc.convertNameToMidiNumber("c'")).toBe(84)
  })
  it("the c'' note should return a midi number of 96", () => {
    expect(NoteAbc.convertNameToMidiNumber("c''")).toBe(96)
  })
})

describe('Octave from name ', () => {
  it('the A note should return an octave of 3', () => {
    expect(NoteAbc.getOctave(4, 'A')).toBe(3)
  })
  it('the B note should return an octave of 3', () => {
    expect(NoteAbc.getOctave(4, 'B')).toBe(3)
  })
  it('the B, note should return an octave of 2', () => {
    expect(NoteAbc.getOctave(4, 'B,')).toBe(2)
  })
  it("the B' note should return an octave of 4", () => {
    expect(NoteAbc.getOctave(4, "B'")).toBe(4)
  })
  it('the b note should return an octave of 4', () => {
    expect(NoteAbc.getOctave(4, 'b')).toBe(4)
  })
  it("the B'' note should return an octave of 5", () => {
    expect(NoteAbc.getOctave(4, "B''")).toBe(5)
  })
  it('the C note should return an octave of 4', () => {
    expect(NoteAbc.getOctave(4, 'C')).toBe(4)
  })
  it('the c note should return an octave of 5', () => {
    expect(NoteAbc.getOctave(4, 'c')).toBe(5)
  })
  it('the c, note should return an octave of 4', () => {
    expect(NoteAbc.getOctave(4, 'c,')).toBe(4)
  })
  it("the c' note should return an octave of 6", () => {
    expect(NoteAbc.getOctave(4, "c'")).toBe(6)
  })
  it("the c'' note should return an octave of 7", () => {
    expect(NoteAbc.getOctave(4, "c''")).toBe(7)
  })
})

describe('Note name to midi conversion with default octave', () => {
  it('the B, note with default octave 4 should return a midi number of 47', () => {
    expect(NoteAbc.convertNameToMidiNumber('B,', 4)).toBe(47)
  })

  it('the C note with default octave 4 should return a midi number of 60', () => {
    expect(NoteAbc.convertNameToMidiNumber('C', 4)).toBe(60)
  })

  it('the D note with default octave 4 should return a midi number of 31', () => {
    expect(NoteAbc.convertNameToMidiNumber('D', 4)).toBe(62)
  })

  it('the c note with default octave 4 should return a midi number of 72', () => {
    expect(NoteAbc.convertNameToMidiNumber('c', 4)).toBe(72)
  })
  it("the c' note with default octave 4 should return a midi number of 84", () => {
    expect(NoteAbc.convertNameToMidiNumber("c'", 4)).toBe(84)
  })
  it("the c'' note with default octave 4 should return a midi number of 96", () => {
    expect(NoteAbc.convertNameToMidiNumber("c''", 4)).toBe(96)
  })
})

describe('Note name to midi conversion with custom default octave', () => {
  it('the B note with default octave 3 should return a midi number of 35', () => {
    expect(NoteAbc.convertNameToMidiNumber('B', 3)).toBe(47)
  })
  it('the C note with default octave 3 should return a midi number of 36', () => {
    expect(NoteAbc.convertNameToMidiNumber('C', 3)).toBe(48)
  })
  it('the c note with default octave 3 should return a midi number of 48', () => {
    expect(NoteAbc.convertNameToMidiNumber('c', 3)).toBe(60)
  })
  it("the c' note with default octave 3 should return a midi number of 60", () => {
    expect(NoteAbc.convertNameToMidiNumber("c'", 3)).toBe(72)
  })
  it("the c'' note with default octave 3 should return a midi number of 72", () => {
    expect(NoteAbc.convertNameToMidiNumber("c''", 3)).toBe(84)
  })
})

describe('Note name to midi conversion with invalid note name', () => {
  it('an empty note name should throw an error', () => {
    expect(() => {
      NoteAbc.convertNameToMidiNumber('')
    }).toThrow('The name is empty')
  })
  it('a note name longer than one should throw an error', () => {
    expect(() => {
      NoteAbc.convertNameToMidiNumber('CC')
    }).toThrow()
  })
  it('an invalid note name should throw an error', () => {
    expect(() => {
      NoteAbc.convertNameToMidiNumber('X')
    }).toThrow('The note name is not valid')
  })
})

describe('Note name to midi conversion with negative octave', () => {
  it('a negative octave should throw an error', () => {
    expect(() => {
      NoteAbc.convertNameToMidiNumber('c', -4)
    }).toThrow()
  })
})

describe('Note name to midi conversion with invalid note name', () => {
  it('an invalid note name should throw an error', () => {
    expect(() => {
      NoteAbc.convertNameToMidiNumber('X')
    }).toThrow('The note name is not valid')
  })
})

describe('Note name to midi conversion with invalid note name', () => {
  it('an invalid note name should throw an error', () => {
    expect(() => {
      NoteAbc.convertNameToMidiNumber('ù')
    }).toThrow()
  })
})
