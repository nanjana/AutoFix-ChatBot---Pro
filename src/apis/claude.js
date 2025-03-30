export async function callClaude(prompt) {
    const apiKey = process.env.REACT_APP_CLAUDE_API_KEY;
  
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229', // Or any Claude model you prefer
        max_tokens: 1024,
        messages: [
          { role: 'user', content: prompt },
        ],
      }),
    });
  
    const data = await response.json();
    return data?.content?.[0]?.text || 'Claude returned no response';
  }
  