
import { ErrorGPToneRequest } from './Errors/ErrorGPToneRequest'
export class GPToneRequest {
  prompt: string
  isNewConversation?: boolean
  pseudo: string
  randomness?: number
  richness?: number
  aiPersonality?: string
  conversationId?: string

  constructor(
    prompt: string,
    pseudo: string,
    isNewConversation?: boolean,
    randomness?: number,
    richness?: number,
    aiPersonality?: string,
    conversationId?: string
  ) {
    this.prompt = prompt
    this.isNewConversation = isNewConversation
    this.pseudo = pseudo
    this.randomness = randomness
    this.richness = richness
    this.aiPersonality = aiPersonality
    if (isNewConversation && conversationId)
      throw new ErrorGPToneRequest(
        "You can't set a conversationId if you want to start a new conversation"
      )
    this.conversationId = conversationId
  }

  
}
