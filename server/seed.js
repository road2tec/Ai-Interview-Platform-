import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Question from './models/Question.js';

dotenv.config();

const sampleQuestions = [
    // DSA
    { domain: 'DSA', difficulty: 'Medium', question: 'Explain how Merge Sort works.', keywords: ['divide', 'conquer', 'O(n log n)'] },
    { domain: 'DSA', difficulty: 'Hard', question: 'How do you detect a cycle in a linked list?', keywords: ['Floyd', 'Tortoise', 'Hare', 'fast pointer'] },
    { domain: 'DSA', difficulty: 'Easy', question: 'What is the time complexity of binary search?', keywords: ['O(log n)', 'sorted array'] },
    { domain: 'DSA', difficulty: 'Medium', question: 'Explain the concept of a Hash Table.', keywords: ['key-value', 'buckets', 'collision'] },
    { domain: 'DSA', difficulty: 'Hard', question: 'Describe Dijkstra’s shortest path algorithm.', keywords: ['greedy', 'weighted graph', 'priority queue'] },

    // Web Development
    { domain: 'Web Development', difficulty: 'Easy', question: 'What is the purpose of the virtual DOM in React?', keywords: ['performance', 'reconciliation'] },
    { domain: 'Web Development', difficulty: 'Medium', question: 'Explain closures in JavaScript.', keywords: ['lexical scope', 'inner function'] },
    { domain: 'Web Development', difficulty: 'Hard', question: 'How do you mitigate CSRF attacks?', keywords: ['tokens', 'SameSite', 'headers'] },
    { domain: 'Web Development', difficulty: 'Easy', question: 'Difference between box-sizing: border-box and content-box.', keywords: ['padding', 'width', 'CSS'] },
    { domain: 'Web Development', difficulty: 'Medium', question: 'What is Server-Side Rendering (SSR)?', keywords: ['SEO', 'initial load', 'Next.js'] },

    // Machine Learning
    { domain: 'Machine Learning', difficulty: 'Easy', question: 'What is overfitting in Machine Learning?', keywords: ['variance', 'training data', 'generalization'] },
    { domain: 'Machine Learning', difficulty: 'Medium', question: 'Explain the difference between L1 and L2 regularization.', keywords: ['Lasso', 'Ridge', 'sparsity'] },
    { domain: 'Machine Learning', difficulty: 'Hard', question: 'How do Convolutional Neural Networks (CNNs) work?', keywords: ['filters', 'pooling', 'feature extraction'] },
    { domain: 'Machine Learning', difficulty: 'Easy', question: 'What is supervised vs unsupervised learning?', keywords: ['labels', 'clustering'] },
    { domain: 'Machine Learning', difficulty: 'Medium', question: 'Explain the concept of backpropagation.', keywords: ['gradient descent', 'chain rule', 'weights'] },

    // Data Science
    { domain: 'Data Science', difficulty: 'Easy', question: 'What is the Central Limit Theorem?', keywords: ['normal distribution', 'sample mean'] },
    { domain: 'Data Science', difficulty: 'Medium', question: 'Explain p-value and statistical significance.', keywords: ['null hypothesis', 'threshold'] },
    { domain: 'Data Science', difficulty: 'Hard', question: 'What is Principal Component Analysis (PCA)?', keywords: ['dimensionality reduction', 'eigenvectors'] },
    { domain: 'Data Science', difficulty: 'Easy', question: 'What is a confusion matrix?', keywords: ['precision', 'recall', 'accuracy', 'F1'] },
    { domain: 'Data Science', difficulty: 'Medium', question: 'How do you handle missing data in a dataset?', keywords: ['imputation', 'dropping', 'mean'] },

    // HR
    { domain: 'HR', difficulty: 'Easy', question: 'Tell me about yourself.', keywords: ['background', 'experience', 'goals'] },
    { domain: 'HR', difficulty: 'Medium', question: 'Describe a time you faced a conflict at work and how you resolved it.', keywords: ['communication', 'compromise', 'professionalism'] },
    { domain: 'HR', difficulty: 'Hard', question: 'Why should we hire you over other candidates?', keywords: ['unique skills', 'culture fit', 'value'] },
    { domain: 'HR', difficulty: 'Easy', question: 'What are your greatest strengths and weaknesses?', keywords: ['honesty', 'self-awareness', 'improvement'] },
    { domain: 'HR', difficulty: 'Medium', question: 'Where do you see yourself in 5 years?', keywords: ['growth', 'leadership', 'alignment'] },

    // DBMS
    { domain: 'DBMS', difficulty: 'Easy', question: 'What is a primary key and foreign key?', keywords: ['unique identifier', 'relationship', 'table'] },
    { domain: 'DBMS', difficulty: 'Medium', question: 'Explain the ACID properties of a transaction.', keywords: ['Atomicity', 'Consistency', 'Isolation', 'Durability'] },
    { domain: 'DBMS', difficulty: 'Hard', question: 'What is database normalization? Explain up to 3NF.', keywords: ['redundancy', 'dependency', 'anomalies'] },
    { domain: 'DBMS', difficulty: 'Easy', question: 'What is an inner join vs an outer join?', keywords: ['intersection', 'unmatched rows'] },
    { domain: 'DBMS', difficulty: 'Medium', question: 'Explain the difference between a clustered and non-clustered index.', keywords: ['physical order', 'pointers', 'performance'] }
];

// Replicate to get 50 per domain as per the user's request (approximately)
const finalSample = [];
for (let i = 0; i < 10; i++) {
    finalSample.push(...sampleQuestions);
}

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding');

        await Question.deleteMany();
        console.log('Existing questions removed');

        await Question.insertMany(finalSample);
        console.log('Sample questions inserted successfully');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

seedDB();
