import mongoose from 'mongoose';

const alertSchema = mongoose.Schema({
    time: { type: Date, default: Date.now },
    message: { type: String, required: true }
});

const sessionSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    domain: { type: String, required: true },
    duration: { type: Number, required: true }, // in minutes
    totalScore: { type: Number, default: 0 },
    alertCount: { type: Number, default: 0 },
    alerts: [alertSchema],
}, { timestamps: true });

const InterviewSession = mongoose.model('InterviewSession', sessionSchema);
export default InterviewSession;
