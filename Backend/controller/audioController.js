const path = require("path");
const fs = require("fs");
const axios = require("axios");
const InterviewSession = require("../models/InterviewSession");

exports.processAudio = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Audio file missing" });
    }

    const audioPath = path.join(__dirname, "..", req.file.path);
    const question = req.body.question;
    const sessionId = req.body.sessionId;

    if (!sessionId) {
      return res.status(400).json({ error: "Session ID missing" });
    }

    console.log("🎤 Audio received:", audioPath);
    console.log("❓ Question:", question);

    // -------------------------------
    // Call Hugging Face API instead of Python Whisper
    // -------------------------------
    const HF_API_URL = "https://api-inference.huggingface.co/models/openai/whisper-small";
    const HF_API_TOKEN = process.env.HF_API_TOKEN; // store in .env

    const response = await axios.post(
      HF_API_URL,
      fs.createReadStream(audioPath),
      {
        headers: {
          Authorization: `Bearer ${HF_API_TOKEN}`,
          "Content-Type": "audio/mpeg",
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    const transcript = response.data.text || "";
    console.log("📝 Transcript:", transcript);

    // -------------------------------
    // Save transcript in MongoDB
    // -------------------------------
    let session = await InterviewSession.findOne({ sessionId });
    if (!session) {
      session = new InterviewSession({
        sessionId,
        answers: [],
      });
    }

    session.answers.push({
      question,
      transcript,
    });

    await session.save();

    // Delete the uploaded audio file
    fs.unlink(audioPath, () => {});

    return res.json({
      success: true,
      message: "Answer saved",
      transcript,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

