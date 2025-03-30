import { callOpenAI } from '../apis/openai';
import { callClaude } from '../apis/claude';
import { callGemini } from '../apis/gemini';

export async function queryLLM(input) {
  const provider = process.env.REACT_APP_LLM_PROVIDER;

  switch (provider) {
    case 'openai':
      return await callOpenAI(input);
    case 'claude':
      return await callClaude(input);
    case 'gemini':
      return await callGemini(input);
    default:
      throw new Error('Unsupported LLM provider');
  }
}

