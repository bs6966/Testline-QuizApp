"use client";
import { useState } from "react";

// Enhanced mock data
const mockQuizData = {
  id: 60,
  title: "Genetics and Evolution",
  description: "Test your knowledge of genetics and evolution with this comprehensive quiz covering DNA replication, transcription, and evolutionary concepts.",
  correct_answer_marks: 4.0,
  negative_marks: 1.0,
  questions: [
    {
      id: 3342,
      description: "If the base sequence in DNA is 5' AAAT 3' then the base sequence in mRNA is:",
      options: [
        { id: 13379, description: "5'UUUU3'", is_correct: false },
        { id: 13380, description: "3'UUUU5'", is_correct: false },
        { id: 13381, description: "5'AAAU3'", is_correct: true },
        { id: 13382, description: "3'AAAU5'", is_correct: false }
      ]
    },
    {
      id: 3343,
      description: "Which of the following is a semi-conservative mode of DNA replication?",
      options: [
        { id: 13383, description: "Each DNA molecule contains one old and one new strand", is_correct: true },
        { id: 13384, description: "Both strands are newly synthesized", is_correct: false },
        { id: 13385, description: "Both strands are conserved", is_correct: false },
        { id: 13386, description: "None of the above", is_correct: false }
      ]
    },
    {
      id: 3344,
      description: "What is the role of DNA ligase in DNA replication?",
      options: [
        { id: 13387, description: "It unwinds the DNA double helix", is_correct: false },
        { id: 13388, description: "It joins Okazaki fragments", is_correct: true },
        { id: 13389, description: "It adds RNA primers", is_correct: false },
        { id: 13390, description: "It removes RNA primers", is_correct: false }
      ]
    },
    {
      id: 3345,
      description: "Which enzyme is responsible for adding nucleotides during DNA replication?",
      options: [
        { id: 13391, description: "DNA Polymerase", is_correct: true },
        { id: 13392, description: "RNA Polymerase", is_correct: false },
        { id: 13393, description: "Helicase", is_correct: false },
        { id: 13394, description: "Topoisomerase", is_correct: false }
      ]
    },
    {
      id: 3346,
      description: "What is the function of telomerase?",
      options: [
        { id: 13395, description: "To break down proteins", is_correct: false },
        { id: 13396, description: "To repair DNA damage", is_correct: false },
        { id: 13397, description: "To maintain chromosome ends", is_correct: true },
        { id: 13398, description: "To initiate transcription", is_correct: false }
      ]
    }
  ]
};

export default function Quiz() {
  const [quizState, setQuizState] = useState('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);

  const startQuiz = () => {
    setQuizState('in-progress');
    setCurrentQuestion(0);
    setAnswers({});
    setScore(0);
  };

  const handleAnswer = (questionId, optionId, isCorrect) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { optionId, isCorrect }
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < mockQuizData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateFinalScore();
      setQuizState('completed');
    }
  };
  const calculateFinalScore = () => {
    let totalScore = 0;
    Object.values(answers).forEach(answer => {
      if (answer.isCorrect) {
        totalScore += mockQuizData.correct_answer_marks;
      } else {
        totalScore -= mockQuizData.negative_marks;
      }
    });
    setScore(totalScore);
  };

  if (quizState === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
              <h1 className="text-4xl font-extrabold text-white mb-2">{mockQuizData.title}</h1>
              <p className="text-blue-100 text-lg">{mockQuizData.description}</p>
            </div>
            <div className="px-8 py-6">
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-blue-800 mb-4">Quiz Rules</h2>
                  <div className="space-y-3">
                    <p className="flex items-center text-gray-700">
                      <span className="mr-2">📝</span>
                      Total Questions: {mockQuizData.questions.length}
                    </p>
                    <p className="flex items-center text-green-600">
                      <span className="mr-2">✅</span>
                      Correct Answer: +{mockQuizData.correct_answer_marks} points
                    </p>
                    <p className="flex items-center text-red-600">
                      <span className="mr-2">❌</span>
                      Wrong Answer: -{mockQuizData.negative_marks} points
                    </p>
                  </div>
                </div>
                <button 
                  onClick={startQuiz}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transform transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (quizState === 'in-progress') {
    const question = mockQuizData.questions[currentQuestion];
    const currentAnswer = answers[question.id];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4">
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">
                  Question {currentQuestion + 1} of {mockQuizData.questions.length}
                </span>
                <span className="bg-white/20 text-white px-4 py-1 rounded-full">
                  {Math.round((currentQuestion / mockQuizData.questions.length) * 100)}% Complete
                </span>
              </div>
            </div>
            <div className="px-8 py-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                {question.description}
              </h2>
              <div className="space-y-4 mb-8">
                {question.options.map((option) => (
                  <div 
                    key={option.id}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      currentAnswer?.optionId === option.id 
                        ? 'border-blue-500 bg-blue-50 shadow-md' 
                        : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/50'
                    }`}
                    onClick={() => handleAnswer(question.id, option.id, option.is_correct)}
                  >
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        checked={currentAnswer?.optionId === option.id}
                        onChange={() => handleAnswer(question.id, option.id, option.is_correct)}
                        className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 text-lg">{option.description}</span>
                    </label>
                  </div>
                ))}
              </div>
              <button
                onClick={nextQuestion}
                disabled={!currentAnswer}
                className={`w-full py-4 rounded-xl text-lg font-semibold transition-all duration-200 ${
                  currentAnswer
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02]'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {currentQuestion === mockQuizData.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (quizState === 'completed') {
    const totalQuestions = mockQuizData.questions.length;
    const correctAnswers = Object.values(answers).filter(a => a.isCorrect).length;
    const wrongAnswers = totalQuestions - correctAnswers;
    const percentage = (correctAnswers / totalQuestions) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
              <h2 className="text-3xl font-bold text-white mb-2">Quiz Completed!</h2>
              <p className="text-blue-100">Here's how you performed</p>
            </div>
            <div className="px-8 py-6">
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-5xl font-bold text-blue-600 mb-2">
                    {score} points
                  </p>
                  <p className="text-gray-500">Final Score</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Accuracy</span>
                    <span className="font-semibold text-blue-600">{Math.round(percentage)}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Correct Answers</span>
                    <span className="font-semibold text-green-600">{correctAnswers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Wrong Answers</span>
                    <span className="font-semibold text-red-600">{wrongAnswers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Total Questions</span>
                    <span className="font-semibold text-blue-600">{totalQuestions}</span>
                  </div>
                </div>
                <button
                  onClick={startQuiz}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-semibold px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transform transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}