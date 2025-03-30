import axios from 'axios';

export async function callOpenAI(userInput) {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: `You are an expert Automotive Assistant named AutoFix Pro. Only answer questions related to cars, vehicle issues, repairs, diagnostics, and maintenance. If a question is unrelated (e.g., cooking, movies, coding), reply politely: "I'm an Automotive expert, and I'm not trained to answer that topic."` },
        { role: 'user', content: userInput },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data.choices[0].message.content;
}