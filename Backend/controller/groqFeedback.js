const axios = require("axios");

exports.generateGroqFeedback= async(combinedText) =>{

const prompt = `
You are an AI Interview Feedback Evaluator.

INPUT:
${combinedText}

IMPORTANT INSTRUCTIONS:
1. MUST RETURN ONLY JSON in EXACT schema below. No extra text, no explanations.
2. Use the schema strictly:

{
  "performance_label": "Extraordinary | Good | Average | Bad",
  "attempted_questions": number,
  "skipped_questions": number,
  "communication": {
    "confidence_percentage": number,
    "clarity_percentage": number
  },
  "overall_feedback": string,
  "motivation_message": [string, string, string],
  "qa_feedback": [
    {
      "question": string,
      "user_answer": string,
      "improved_answer": string
    }
  ]
}

3. Ensure all fields exist and types are correct.
4. Do not add explanations, markdown, or extra keys.
5. If unsure, regenerate JSON strictly following the schema.

---

Evaluate the interview responses in combinedText and return JSON exactly as above.
`;


const response = await axios.post( "https://api.groq.com/openai/v1/chat/completions",
     {
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      timeout: 30000, // ⏱️ safety
    }
)

const raw=response.data.choices[0].message.content

const start =raw.indexOf('{');
const end=raw.lastIndexOf('}');

if(start==-1 || end==-1) throw new Error("Invalid AI Response format");

return JSON.parse(raw.slice(start,end+1));
}