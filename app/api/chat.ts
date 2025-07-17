// pages/api/chat.ts

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  // You can add logic here: embedding, vector search, LLM call, etc.
  const response = `You said: ${message}`; // temporary placeholder

  return res.status(200).json({ reply: response });
}