const InterviewSession = require("../models/InterviewSession");

exports.endSession = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await InterviewSession.findOne({ sessionId });
    console.log( session );

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Combine all transcripts
    const combinedText = session.answers
      .map(a => `Q: ${a.question}\nA: ${a.transcript}`)
      .join("\n\n");

    // TEMP feedback (AI later)
 const feedback = {
  overallScore: 7,
  communication: 7,
  confidence: 6,
  strengths: ["Clear answers", "Good confidence"],
  improvements: ["Be more structured"],
};


    session.feedback = feedback;
    session.completed = true;

    await session.save();

    res.json({ success: true, feedback });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to end session" });
  }
};


