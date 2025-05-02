

import OpenAI from "openai";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// const openai = new OpenAIApi(
//   new Configuration({ apiKey: process.env.OPENAI_API_KEY })
// );


const openai = new OpenAI({
  apiKey: null});
 

app.post("/api/generate", async (req, res) => {
  const { topic } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an article writing assistant." },
        { role: "user", content: `Write a short article about: ${topic}` }
      ],
    });

    console.log(response.choices[0].message.content);

    const article = response.choices[0].message.content;
    res.json({ article });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send("Failed to generate article");
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
