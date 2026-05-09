const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();

app.use(cors({
  origin: '*' // すべてのオリジンを許可
}));
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/chat', async (req, res) => {
  const { messages, systemPrompt } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt || 'あなたはTRPGのゲームマスターです。' },
        ...messages
      ]
    });
    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));