import { Request, Response } from 'express'
import { GenericalScale } from '../scales/GenericalScale'
import { PentatonicScale } from '../scales/Scales'
import { OneNoteGPToneAdaptor } from '../APIs/GPTone/Adaptors/OneNoteGPToneAdaptor'

export async function apiGetOneNote(req: Request, res: Response) {
  try {
    const scale: GenericalScale = new PentatonicScale()
    const oneNoteGPToneAdaptor = new OneNoteGPToneAdaptor()
    const note = await oneNoteGPToneAdaptor.getOneNote(scale)
    
    res.status(200).send(note)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}
