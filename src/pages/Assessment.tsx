import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ClipboardCheck, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { assessmentQuestions } from '@/data/assessment';

const Assessment: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());

  const categories = ['All', ...Array.from(new Set(assessmentQuestions.map(q => q.category)))];

  const filteredQuestions = selectedCategory === 'All'
    ? assessmentQuestions
    : assessmentQuestions.filter(q => q.category === selectedCategory);

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswerSelect = (index: number) => {
    if (!showResult) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setShowResult(true);
      if (currentQuestion) {
        setAnsweredQuestions(new Set(answeredQuestions).add(currentQuestion.id));
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnsweredQuestions(new Set());
  };

  if (!currentQuestion) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center space-x-3">
          <ClipboardCheck className="h-8 w-8 text-violet-500" />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Assessment</h1>
            <p className="text-muted-foreground mt-1">Test your pediatric knowledge</p>
          </div>
        </div>
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            No questions available for this category.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center space-x-3">
        <ClipboardCheck className="h-8 w-8 text-violet-500" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assessment</h1>
          <p className="text-muted-foreground mt-1">Test your knowledge with MCQs and rationales</p>
        </div>
      </div>

      {/* Category Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Filter by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Question {currentQuestionIndex + 1} of {filteredQuestions.length}
            </span>
            <div className="flex items-center space-x-2">
              <span>Answered: {answeredQuestions.size}</span>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
          <div className="mt-2 w-full bg-secondary rounded-full h-2">
            <div
              className="bg-primary rounded-full h-2 transition-all"
              style={{ width: `${((currentQuestionIndex + 1) / filteredQuestions.length) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Question */}
      <Card className="border-primary/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-block px-2 py-1 text-xs rounded-full bg-primary/10 text-primary mb-2">
                {currentQuestion.category}
              </span>
              <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-base font-semibold">{currentQuestion.question}</p>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <label
                key={index}
                className={`flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedAnswer === index
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                } ${
                  showResult
                    ? index === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-500/10'
                      : selectedAnswer === index
                      ? 'border-red-500 bg-red-500/10'
                      : ''
                    : ''
                }`}
              >
                <input
                  type="radio"
                  name="answer"
                  checked={selectedAnswer === index}
                  onChange={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className="mt-1"
                />
                <div className="flex-1">
                  <span className="text-sm">{option}</span>
                  {showResult && index === currentQuestion.correctAnswer && (
                    <div className="flex items-center space-x-2 mt-2 text-green-600">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="text-xs font-semibold">Correct Answer</span>
                    </div>
                  )}
                  {showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                    <div className="flex items-center space-x-2 mt-2 text-red-600">
                      <XCircle className="h-4 w-4" />
                      <span className="text-xs font-semibold">Incorrect</span>
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>

          {!showResult && (
            <Button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="w-full"
            >
              Submit Answer
            </Button>
          )}

          {showResult && (
            <div className="space-y-4">
              <div className={`p-4 rounded-md border ${
                selectedAnswer === currentQuestion.correctAnswer
                  ? 'bg-green-500/10 border-green-500/50'
                  : 'bg-red-500/10 border-red-500/50'
              }`}>
                <h4 className="font-semibold mb-2">
                  {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect'}
                </h4>
                <p className="text-sm">{currentQuestion.explanation}</p>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  variant="outline"
                  className="flex-1"
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={currentQuestionIndex === filteredQuestions.length - 1}
                  className="flex-1"
                >
                  Next Question
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary */}
      {answeredQuestions.size === filteredQuestions.length && (
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle>Assessment Complete!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              You have answered all {filteredQuestions.length} questions in this category.
              Review your answers or try a different category to continue learning.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Assessment;
