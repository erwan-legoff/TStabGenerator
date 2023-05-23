import { Request, Response } from 'express'

export interface GPToneResponse {
  response: string
  conversationId: string
}
