import mongoose from 'mongoose';

const answerSchema = mongoose.Schema({
    interviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'InterviewSession', required: true },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    answerText: { type: String, required: true },
    technicalScore: { type: Number, required: true, min: 0, max: 10 },
    clarityScore: { type: Number, required: true, min: 0, max: 10 },
    depthScore: { type: Number, required: true, min: 0, max: 10 },
    feedback: { type: String, required: true },
}, { timestamps: true });

const Answer = mongoose.model('Answer', answerSchema);
export default Answer;
