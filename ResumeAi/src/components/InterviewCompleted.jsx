import Confetti from "react-confetti";
import { useEffect, useState } from "react";

const InterviewCompleted = ({
  answered,
  skipped,
  onNextRound,
  feedback
}) => {
  const total = answered + skipped;
  const [showFeedback, setShowFeedback] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-pink-50 via-white to-purple-50 overflow-hidden">

      {/* 🎉 Confetti */}
      {showConfetti && (
        <Confetti numberOfPieces={180} recycle={false} gravity={0.25} />
      )}

      <div className="relative w-full h-full flex items-center justify-center">

        {/* ================= WELL DONE CARD (UNCHANGED) ================= */}
        <div
          className={`absolute transition-all duration-700 ease-in-out
          ${
            showFeedback
              ? "left-0 w-1/3 flex justify-center"
              : "left-1/2 -translate-x-1/2"
          }`}
        >
          <div className="bg-white rounded-3xl border border-pink-100 p-10 w-[440px] text-center shadow">

            <img
              src="/robot.png"
              alt="Completed"
              className="w-56 mx-auto -mt-28 mb-2 animate-float drop-shadow-md"
            />

            <h1 className="text-3xl font-bold text-gray-800 mb-1">
              Well Done 🎉
            </h1>

            <p className="text-gray-500 mb-8">
              You’ve completed Interview Round 1
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <StatCard label="Answered" value={answered} />
              <StatCard label="Skipped" value={skipped} />
              <StatCard label="Total" value={total} />
            </div>

            <div className="flex gap-4 mt-5 justify-center">
              <button
                onClick={() => setShowFeedback(prev => !prev)}
                className="py-3 px-10 rounded-full bg-pink-400 text-white text-sm font-semibold hover:bg-pink-500 transition"
              >
                {showFeedback ? "Hide Feedback" : "View Feedback"}
              </button>

              <button
                onClick={onNextRound}
                className="py-3 px-10 rounded-full border border-pink-300 text-pink-500 text-sm font-semibold hover:bg-pink-50 transition"
              >
                Retry Again
              </button>
            </div>
          </div>
        </div>

        {/* ================= RIGHT FEEDBACK PANEL ================= */}
      {/* ================= RIGHT FEEDBACK PANEL ================= */}
<div
  className={`absolute right-0 top-0 h-full w-[990px]
  transition-transform duration-700 ease-in-out
  ${showFeedback ? "translate-x-0" : "translate-x-full"}`}
>
  {!feedback ? (
    <div className="h-full flex items-center justify-center text-gray-400">
      Loading feedback...
    </div>
  ) : (
    <div className="h-full flex flex-col bg-gradient-to-br from-white via-pink-50 to-purple-50 backdrop-blur-xl border-l border-pink-200">

      {/* ===== HEADER ===== */}
      <div className="px-10 py-7 border-b border-pink-200">
        <h2 className="text-2xl font-bold text-gray-900">
          Interview Performance Review
        </h2>

        <div className="flex items-center gap-4 mt-4">
          <span
            className={`px-4 py-1.5 rounded-full text-sm font-semibold
              ${
                feedback.performance_label === "Bad"
                  ? "bg-red-100 text-red-600"
                  : feedback.performance_label === "Average"
                  ? "bg-yellow-100 text-yellow-600"
                  : feedback.performance_label === "Good"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-green-100 text-green-600"
              }`}
          >
            {feedback.performance_label} Performance
          </span>

          <span className="text-sm text-gray-500">
            AI Evaluated Feedback
          </span>
        </div>
      </div>

      {/* ===== OVERALL FEEDBACK ===== */}
      <div className="px-10 py-8 grid grid-cols-2 gap-10 border-b border-pink-200">

        {/* Text Feedback */}
        <div>
          <p className="text-sm font-semibold text-pink-600 mb-3">
            🌟 Overall Feedback
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            {feedback.overall_feedback}
          </p>
        </div>

        {/* Communication Scores */}
        <div className="space-y-5">
          <ScoreBar
            label="Confidence"
            value={feedback.communication.confidence_percentage}
            color="bg-pink-400"
          />
          <ScoreBar
            label="Clarity"
            value={feedback.communication.clarity_percentage}
            color="bg-purple-400"
          />
        </div>
      </div>

      {/* ===== IMPROVEMENT TIPS ===== */}
      <div className="px-10 py-6 border-b border-pink-200 bg-white/60">
        <p className="text-sm font-semibold text-pink-600 mb-3">
          💡 Improvement Suggestions
        </p>

        <div className="grid grid-cols-2 gap-4">
          {feedback.motivation_message.map((msg, i) => (
            <div
              key={i}
              className="bg-white border border-pink-100 rounded-xl p-4 text-sm text-gray-700 shadow-sm"
            >
              {msg}
            </div>
          ))}
        </div>
      </div>

      {/* ===== QUESTION-WISE FEEDBACK ===== */}
      <div className="flex-1 overflow-y-auto px-10 py-8 space-y-12 custom-scrollbar">

        {feedback.qa_feedback.map((item, index) => (
          <div key={index} className="relative pl-8">

            {/* Timeline Dot */}
            <span className="absolute left-0 top-1 w-3 h-3 rounded-full bg-pink-400"></span>

            <h3 className="font-semibold text-gray-900 mb-4">
              Q{index + 1}. {item.question}
            </h3>

            <div className="grid grid-cols-2 gap-6">

              {/* User Answer */}
              <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                <p className="text-xs font-semibold text-red-500 mb-2">
                  🎙 Your Answer
                </p>
                <p className="text-sm text-gray-700">
                  {item.user_answer}
                </p>
              </div>

              {/* Improved Answer */}
              <div className="bg-green-50 border border-green-100 rounded-2xl p-5">
                <p className="text-xs font-semibold text-green-600 mb-2">
                  🤖 Suggested Improvement
                </p>
                <p className="text-sm text-gray-700">
                  {item.improved_answer}
                </p>
              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  )}
</div>

      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="rounded-xl border border-pink-100 bg-pink-50/50 py-4">
    <p className="text-xs text-gray-500 font-medium">{label}</p>
    <p className="text-xl font-bold text-pink-500">{value}</p>
  </div>
);

const ScoreBar = ({ label, value, color }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold text-gray-800">{value}%</span>
    </div>
    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`h-full ${color} rounded-full transition-all duration-700`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);


export default InterviewCompleted;




