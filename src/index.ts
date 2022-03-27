import { Midi } from '@tonejs/midi'
import * as fs from 'fs'
import { RandomSimpleCompositor } from './compositor/RandomSimpleCompositor'
import { SimpleDownArpegeCompositor } from './compositor/SimpleDownArpegeCompositor'
import NoteOne from './notes/NoteOne'
import { PentatonicScale } from './scales/PentatonicScale'

// This is the object that will create our music
const compositor = new RandomSimpleCompositor()
// We choose different parameters for the music composition
const music = compositor.getMusic(30, undefined, new PentatonicScale(), NoteOne.noteNameToNote('E4'))

// Only to see the note of the music
console.log(music.toString())

// If we want to listen to the music, we have to add the track to a Midi Object
const midi = new Midi()
midi.tracks.push(music.getMidiTrack())

// write the output in a mid file wich can directly be played 
fs.writeFileSync('outputs/debugTS/randomSimplePentatonic1.mid', midi.toArray())
