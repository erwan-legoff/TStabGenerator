import { GPToneConnector } from '../APIs/GPTone/GPToneConnector'
import { Request, Response } from 'express'
import PromptEnum from '../APIs/GPTone/Types/Enums/PromptEnum'
import SystemEnum from '../APIs/GPTone/Types/Enums/SystemEnum'

export async function apiGetMelody(req: Request, res: Response) {
  try {
    const prompt = PromptEnum.ROCK_V0
    const pseudo = 'Pseudo'
    const randomness = 0.5
    const richness = 0.5
    const aiPersonality = SystemEnum.COMPOSITOR_V1

    const GPT_ONE_URL = process.env.GPT_ONE_URL || 'http://localhost:5000'

    const isNewConversation = true

    const connector = new GPToneConnector(GPT_ONE_URL)

    const response = await connector.fetchAPI({
      prompt,
      pseudo,
      randomness,
      richness,
      aiPersonality,
      isNewConversation,
    })

    res.send(response)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}
