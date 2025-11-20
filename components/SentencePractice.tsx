import React, { useState, useEffect } from 'react';
import { WordChip } from './WordChip';
import { cn } from '@/lib/utils';
import { isAnswerCorrect } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import type { Sentence, WordState } from '@/types';

type SentencePracticeProps = {
    sentence: Sentence;
    currentIndex: number;
    totalSentences: number;
    onNext: (isCorrect: boolean) => void;
};

export const SentencePractice: React.FC<SentencePracticeProps> = ({
    sentence,
    currentIndex,
    totalSentences,
    onNext,
}) => {
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
    const [isChecked, setIsChecked] = useState(false);
    const [words, setWords] = useState<string[]>([]);

    useEffect(() => {
        // Reset all state when sentence changes
        const newWords = sentence.textIncorrect.split(' ');
        setWords(newWords);
        setSelectedIndexes([]);
        setIsChecked(false);
    }, [sentence.id]); // Use sentence.id to ensure clean transitions

    const toggleWord = (index: number) => {
        if (isChecked) return;

        setSelectedIndexes((prev) => {
            if (prev.includes(index)) {
                return prev.filter((i) => i !== index);
            } else {
                return [...prev, index];
            }
        });
    };

    const handleCheck = () => {
        setIsChecked(true);
    };

    const handleNext = () => {
        const correct = isAnswerCorrect(selectedIndexes, sentence.capitalWordIndexes);
        // Reset isChecked immediately to prevent flash of incorrect state on next sentence
        setIsChecked(false);
        onNext(correct);
    };

    const getWordState = (index: number): WordState => {
        if (!isChecked) {
            return selectedIndexes.includes(index) ? 'selected' : 'default';
        }

        const isSelected = selectedIndexes.includes(index);
        const shouldBeCapital = sentence.capitalWordIndexes.includes(index);

        if (isSelected && shouldBeCapital) return 'correct';
        if (isSelected && !shouldBeCapital) return 'incorrect';
        if (!isSelected && shouldBeCapital) return 'missed';
        return 'default';
    };

    const isCorrect = isChecked && isAnswerCorrect(selectedIndexes, sentence.capitalWordIndexes);

    const progress = ((currentIndex) / totalSentences) * 100;

    return (
        <div className="w-full max-w-xl mx-auto flex flex-col gap-6">
            <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium text-muted-foreground">
                    <span>Progress</span>
                    <span>{currentIndex + 1} / {totalSentences}</span>
                </div>
                <Progress value={progress} className="h-2" />
            </div>

            <Card className="border-2 shadow-sm overflow-hidden">
                <CardHeader className="bg-muted/30 pb-4">
                    <p className="text-center text-muted-foreground font-medium">
                        Tap the words that should be capitalized
                    </p>
                </CardHeader>
                <CardContent className="p-6 sm:p-8 min-h-[200px] flex items-center justify-center bg-background">
                    <div className="flex flex-wrap gap-3 justify-center content-center">
                        {words.map((word, index) => (
                            <WordChip
                                key={`${sentence.id}-${index}`}
                                text={word}
                                index={index}
                                state={getWordState(index)}
                                onClick={() => toggleWord(index)}
                                disabled={isChecked}
                            />
                        ))}
                    </div>
                </CardContent>

                {isChecked && (
                    <div className={cn(
                        "p-5 sm:p-6 border-t-2 animate-in slide-in-from-bottom-2 duration-300",
                        isCorrect ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"
                    )}>
                        <div className="flex items-start gap-3 mb-3">
                            {isCorrect ? (
                                <CheckCircle2 className="w-7 h-7 text-green-600 shrink-0 mt-0.5" />
                            ) : (
                                <XCircle className="w-7 h-7 text-red-600 shrink-0 mt-0.5" />
                            )}
                            <p className={cn(
                                "font-bold text-xl sm:text-2xl",
                                isCorrect ? "text-green-900" : "text-red-900"
                            )}>
                                {isCorrect ? "Correct!" : "Not quite"}
                            </p>
                        </div>
                        {!isCorrect && (
                            <div className="ml-10 space-y-2">
                                <p className="text-sm font-semibold text-red-800 uppercase tracking-wide">
                                    Correct Answer:
                                </p>
                                <p className="text-lg sm:text-xl font-bold text-gray-900 leading-relaxed">
                                    {sentence.textCorrect}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </Card>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200 sm:static sm:bg-transparent sm:border-0 sm:p-0 z-10">
                <div className="max-w-xl mx-auto">
                    {!isChecked ? (
                        <Button
                            onClick={handleCheck}
                            size="lg"
                            className="w-full text-base font-semibold h-14 bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors"
                        >
                            Check Answer
                        </Button>
                    ) : (
                        <Button
                            onClick={handleNext}
                            size="lg"
                            variant={isCorrect ? "default" : "secondary"}
                            className="w-full text-base font-semibold h-14 shadow-sm transition-colors"
                        >
                            Next Sentence
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    )}
                </div>
            </div>
            {/* Spacer for fixed bottom button on mobile */}
            <div className="h-20 sm:hidden" />
        </div>
    );
};
