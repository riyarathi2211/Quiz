const axios = require('axios');

const OPENAI_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_KEY) console.warn('OPENAI_API_KEY not set in environment');

async function generateQuizFromPrompt(prompt, numQuestions = 5) {
  const system = `You are a helpful assistant that outputs valid JSON only.\nReturn a JSON array named questions of exactly ${numQuestions} multiple-choice questions on the provided topic. Each question must have exactly 4 options and an "answer" field that equals one of the options. Example: [{"question":"...","options":["a","b","c","d"],"answer":"b"}, ...]`;

  const user = `Topic: ${prompt}`;

  try {
    const res = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user }
        ],
        temperature: 0.7,
        max_tokens: 800
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const text = res.data.choices[0].message.content;
    console.log("OpenAI raw response:", text); // debug logging

    // SAFE JSON parsing
    let questions = [];
    try {
      const jsonStart = text.indexOf('[');
      const jsonEnd = text.lastIndexOf(']') + 1; // get the end of JSON array
      const jsonText = jsonStart !== -1 && jsonEnd !== -1 ? text.slice(jsonStart, jsonEnd) : '';
      questions = JSON.parse(jsonText);
    } catch (e) {
      console.error("Failed to parse JSON from OpenAI:", text);
      throw new Error("OpenAI returned invalid JSON");
    }

    // sanitize: ensure options length 4
    const clean = questions.map((q) => ({
      question: q.question || q.prompt || '',
      options: (q.options || q.choices || []).slice(0, 4).map(String),
      answer: String(q.answer)
    }));

    return clean;
  } catch (err) {
    console.error('OpenAI error', err?.response?.data || err.message);
    throw new Error('Failed to generate quiz');
  }
}

module.exports = { generateQuizFromPrompt };
