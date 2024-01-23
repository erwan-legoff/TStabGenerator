import { Request, Response } from 'express'
import { GenericalScale } from '../scales/GenericalScale'
import { PentatonicScale } from '../scales/Scales'
import { OneNoteGPToneAdaptor } from '../APIs/GPTone/Adaptors/OneNoteGPToneAdaptor'
import { GPTCompositorOneNote } from '../compositor/GPTCompositorOneNote'
import { TrackOne } from 'notes/PlayedNoteMidi'

export async function apiGetMelody(req: Request, res: Response) {
  try {
    const scale: GenericalScale = new PentatonicScale()

    const compositor = new GPTCompositorOneNote()
    const music: TrackOne = await compositor.getMusic(10, 120, scale)
    res.status(200).send(music)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}
