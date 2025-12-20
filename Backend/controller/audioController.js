const { exec } = require("child_process");
const path = require("path");
const InterviewSession = require("../models/InterviewSession");


// OPTIONAL: later you can add LLaMA here
// const evaluateAnswer = async (question, answer) => { ... }

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

    // Call Python Whisper script
    exec(
      `python whisper_transcribe.py "${audioPath}"`,
      async (error, stdout, stderr) => {
        if (error) {
          console.error("Whisper error:", error);
          return res.status(500).json({ error: "Transcription failed" });
        }

        const transcript = stdout.trim() || "";
        console.log("📝 Transcript:", transcript);
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

const fs = require("fs");

fs.unlink(audioPath, () => {});

return res.json({
  success: true,
  message: "Answer saved",
});

      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
