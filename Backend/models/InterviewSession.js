const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  question: String,
  transcript: String,
});

const FeedbackSchema = new mongoose.Schema({
  overallScore: Number,
  communication: Number,
  confidence: Number,
  strengths: [String],
  improvements: [String],
});

const InterviewSessionSchema = new mongoose.Schema({
  sessionId: String,
  answers: [AnswerSchema],
   feedback: FeedbackSchema,

completed: {
  type: Boolean,
  default: false,
},

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("InterviewSession", InterviewSessionSchema);
