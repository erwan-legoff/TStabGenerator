import { Midi } from '@tonejs/midi'
import * as fs from 'fs'
import { RandomSimpleCompositor } from './compositor/RandomSimpleCompositor'
import { SimpleDownArpegeCompositor } from './compositor/SimpleDownArpegeCompositor'
import NoteOne from './notes/NoteOne'
import { PentatonicScale, AlgerianScale, MinorNaturalScale } from './scales/Scales'

// This is the object that will create our music
const compositor = new SimpleDownArpegeCompositor()
// We choose different parameters for the music composition
const music = compositor.getMusic(
  undefined,
  undefined,
  new MinorNaturalScale(),
  NoteOne.noteNameToNote('C4')
)

// Only to see the note of the music
console.log(music.toString())

// If we want to listen to the music, we have to add the track to a Midi Object
const midi = new Midi()
midi.tracks.push(music.getMidiTrack())

// write the output in a mid file wich can directly be played 
fs.writeFileSync(
  'outputs/debugTS/randomSimpleMinorNaturalScale3.mid',
  midi.toArray()
)
