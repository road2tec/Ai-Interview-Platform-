import Question from '../models/Question.js';
import Answer from '../models/Answer.js';
import InterviewSession from '../models/InterviewSession.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const startSession = async (req, res) => {
    try {
        const { domain, duration } = req.body;
        const newSession = await InterviewSession.create({
            userId: req.user.id,
            domain,
            duration,
        });

        let questionCount = duration === 10 ? 5 : 8;
        const questions = await Question.aggregate([
            { $match: { domain } },
            { $sample: { size: questionCount } }
        ]);

        res.status(201).json({ session: newSession, questions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const evaluateAnswer = async (req, res) => {
    try {
        const { interviewId, questionId, question, userAnswer } = req.body;

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

        const prompt = `You are an expert technical interviewer evaluating a candidate's answer.
Evaluate the following answer to the interview question based on:
1. Technical correctness (0-10)
2. Clarity (0-10)
3. Depth (0-10)

Question: ${question}
User Answer: ${userAnswer}

If the user's answer is blank, totally irrelevant, or explicitly states they do not know, give 0s for the scores. Give actionable and professional feedback explaining why they got the score they did, and what they could improve.

Return EXACTLY a JSON string with the following structure (no markdown markup like \`\`\`json, no backticks, just raw JSON text):
{
  "technicalScore": <number>,
  "clarityScore": <number>,
  "depthScore": <number>,
  "feedback": "<string>"
}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const rawContent = response.text().trim();

        // Clean up markdown in case Gemini adds it despite instructions
        const jsonContent = rawContent.replace(/^```json/, '').replace(/```$/, '').trim();
        const evaluation = JSON.parse(jsonContent);

        const answer = await Answer.create({
            interviewId,
            questionId,
            answerText: userAnswer || "No answer provided",
            ...evaluation
        });

        res.status(201).json({ evaluation, answer });
    } catch (error) {
        console.error("Gemini Evaluation Error:", error);
        res.status(500).json({ error: error.message });
    }
}

export const endSession = async (req, res) => {
    try {
        const { interviewId } = req.body;
        const answers = await Answer.find({ interviewId });

        let totalScore = 0;
        if (answers.length > 0) {
            const sum = answers.reduce((acc, ans) => acc + (ans.technicalScore + ans.clarityScore + ans.depthScore) / 3, 0);
            totalScore = sum / answers.length; // Average score out of 10
        }

        const updatedSession = await InterviewSession.findByIdAndUpdate(
            interviewId,
            { totalScore: parseFloat(totalScore.toFixed(1)) },
            { new: true }
        );
        res.status(200).json({ success: true, session: updatedSession });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const submitAlert = async (req, res) => {
    try {
        const { interviewId, message } = req.body;
        await InterviewSession.findByIdAndUpdate(interviewId, {
            $inc: { alertCount: 1 },
            $push: { alerts: { time: new Date(), message } }
        });
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getDashboardData = async (req, res) => {
    try {
        const sessions = await InterviewSession.find({ userId: req.user.id }).sort({ createdAt: -1 });

        const totalInterviews = sessions.length;
        const bestScore = totalInterviews > 0 ? Math.max(...sessions.map(s => s.totalScore)) : 0;
        const avgScore = totalInterviews > 0 ? sessions.reduce((acc, s) => acc + s.totalScore, 0) / totalInterviews : 0;
        const totalAlerts = sessions.reduce((acc, s) => acc + s.alertCount, 0);

        // Prepare chart data
        const performanceData = sessions.slice(0, 10).reverse().map((s, i) => ({
            name: `Int ${sessions.length - i}`,
            score: s.totalScore
        }));

        const domainStats = {};
        sessions.forEach(s => {
            if (!domainStats[s.domain]) domainStats[s.domain] = { total: 0, count: 0 };
            domainStats[s.domain].total += s.totalScore;
            domainStats[s.domain].count += 1;
        });

        const domainData = Object.keys(domainStats).map(d => ({
            domain: d,
            avgScore: parseFloat((domainStats[d].total / domainStats[d].count).toFixed(1))
        }));

        res.json({
            stats: {
                totalInterviews,
                avgScore: parseFloat(avgScore.toFixed(1)),
                bestScore: parseFloat(bestScore.toFixed(1)),
                totalAlerts
            },
            recentInterviews: sessions.slice(0, 5).map(s => ({
                id: s._id,
                domain: s.domain,
                createdAt: s.createdAt,
                totalScore: s.totalScore,
                alertCount: s.alertCount
            })),
            performanceData,
            domainData
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getInterviewDetails = async (req, res) => {
    try {
        const interview = await InterviewSession.findOne({ _id: req.params.id, userId: req.user.id });
        if (!interview) return res.status(404).json({ error: 'Interview not found' });

        const answers = await Answer.find({ interviewId: interview._id }).populate('questionId');

        const evaluations = answers.map(ans => ({
            question: ans.questionId ? ans.questionId.question : "Unknown Question",
            result: {
                technicalScore: ans.technicalScore,
                clarityScore: ans.clarityScore,
                depthScore: ans.depthScore,
                feedback: ans.feedback
            }
        }));

        res.json({ interview, evaluations });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
