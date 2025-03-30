export async function callGemini(prompt) {
    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );
  
    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Gemini returned no response';
  }
  