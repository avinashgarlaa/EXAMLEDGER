import React, { useState } from 'react';
import { Clock, Send } from 'lucide-react';

function ExamInterface({ subject, onSubmit }) {
  const [answers, setAnswers] = useState({});
  
  const mockQuestions = {
    mathematics: [
      {
        id: 1,
        question: 'What is the derivative of x²?',
        options: ['x', '2x', '2x²', 'x/2'],
        correct: '2x',
      },
      {
        id: 2,
        question: 'What is the value of π (pi) to 2 decimal places?',
        options: ['3.14', '3.15', '3.16', '3.13'],
        correct: '3.14',
      },
    ],
    programming: [
      {
        id: 1,
        question: 'Which data structure uses LIFO?',
        options: ['Queue', 'Stack', 'Tree', 'Graph'],
        correct: 'Stack',
      },
      {
        id: 2,
        question: 'What is the time complexity of binary search?',
        options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
        correct: 'O(log n)',
      },
    ],
    science: [
      {
        id: 1,
        question: 'What is the chemical symbol for gold?',
        options: ['Au', 'Ag', 'Fe', 'Cu'],
        correct: 'Au',
      },
      {
        id: 2,
        question: 'What is the speed of light in vacuum?',
        options: ['299,792 km/s', '300,000 km/s', '299,792,458 m/s', '300,000,000 m/s'],
        correct: '299,792,458 m/s',
      },
    ],
  };

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  const questions = mockQuestions[subject] || [];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 capitalize">{subject} Exam</h2>
          <div className="flex items-center text-gray-600">
            <Clock className="h-5 w-5 mr-2" />
            <span>Time remaining: 30:00</span>
          </div>
        </div>

        <div className="space-y-6">
          {questions.map((q, index) => (
            <div key={q.id} className="border-b pb-6 last:border-b-0">
              <p className="font-medium text-gray-800 mb-4">
                {index + 1}. {q.question}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {q.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswerSelect(q.id, option)}
                    className={`p-4 rounded-lg text-left transition-colors ${
                      answers[q.id] === option
                        ? 'bg-indigo-100 border-2 border-indigo-500'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            className="flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Send className="h-5 w-5 mr-2" />
            Submit Exam
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExamInterface;