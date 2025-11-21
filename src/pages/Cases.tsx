import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FileText, CheckCircle2, XCircle } from 'lucide-react';
import { clinicalCases } from '@/data/cases';

const Cases: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleCaseSelect = (id: number) => {
    setSelectedCase(id);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(false);
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setShowResult(true);
    }
  };

  const currentCase = clinicalCases.find(c => c.id === selectedCase);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center space-x-3">
        <FileText className="h-8 w-8 text-teal-500" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clinical Cases</h1>
          <p className="text-muted-foreground mt-1">Interactive pediatric case scenarios</p>
        </div>
      </div>

      {/* Case Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select a Clinical Case</CardTitle>
          <CardDescription>Practice applying pediatric knowledge to realistic scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {clinicalCases.map(c => (
              <Button
                key={c.id}
                variant={selectedCase === c.id ? 'default' : 'outline'}
                onClick={() => handleCaseSelect(c.id)}
                className="w-full justify-start h-auto py-3"
              >
                <div className="text-left">
                  <div className="font-semibold">Case {c.id}: {c.title}</div>
                  <div className="text-xs opacity-75 mt-1">{c.category}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Case Display */}
      {currentCase && (
        <div className="space-y-6">
          {/* Scenario */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Case {currentCase.id}: {currentCase.title}</CardTitle>
                  <CardDescription className="mt-2">
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                      {currentCase.category}
                    </span>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed">{currentCase.scenario}</p>
            </CardContent>
          </Card>

          {/* Question and Options */}
          <Card className="border-primary/50">
            <CardHeader>
              <CardTitle>Question</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base font-semibold">{currentCase.question}</p>

              <div className="space-y-3">
                {currentCase.options.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-start space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedAnswer === index
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    } ${
                      showResult
                        ? index === currentCase.correctAnswer
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
                      {showResult && index === currentCase.correctAnswer && (
                        <div className="flex items-center space-x-2 mt-2 text-green-600">
                          <CheckCircle2 className="h-4 w-4" />
                          <span className="text-xs font-semibold">Correct Answer</span>
                        </div>
                      )}
                      {showResult && selectedAnswer === index && index !== currentCase.correctAnswer && (
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
                    selectedAnswer === currentCase.correctAnswer
                      ? 'bg-green-500/10 border-green-500/50'
                      : 'bg-red-500/10 border-red-500/50'
                  }`}>
                    <h4 className="font-semibold mb-2">
                      {selectedAnswer === currentCase.correctAnswer ? 'Correct!' : 'Incorrect'}
                    </h4>
                    <p className="text-sm">{currentCase.explanation}</p>
                  </div>

                  <Button
                    onClick={() => {
                      setSelectedAnswer(null);
                      setShowResult(false);
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Try Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {!currentCase && (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Select a case above to begin</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Cases;
