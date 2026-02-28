import mongoose from 'mongoose';

const questionSchema = mongoose.Schema({
    domain: { type: String, required: true },
    difficulty: { type: String, required: true },
    question: { type: String, required: true },
    idealAnswer: { type: String },
    keywords: [{ type: String }]
}, { timestamps: true });

const Question = mongoose.model('Question', questionSchema);
export default Question;
