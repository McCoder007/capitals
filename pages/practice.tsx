import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SentencePractice } from '@/components/SentencePractice';
import { shuffleArray } from '@/lib/helpers';
import { SENTENCES_PER_GAME } from '@/lib/constants';
import sentencesData from '@/data/sentences.json';
import type { Sentence } from '@/types';

export default function Practice() {
    const router = useRouter();
    const [sentences, setSentences] = useState<Sentence[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const shuffled = shuffleArray(sentencesData as Sentence[]);
        setSentences(shuffled.slice(0, SENTENCES_PER_GAME));
        setLoading(false);
    }, []);

    const handleNext = (isCorrect: boolean) => {
        if (isCorrect) {
            setScore((prev) => prev + 1);
        }

        const isLastSentence = currentIndex >= sentences.length - 1;

        if (isLastSentence) {
            const finalScore = isCorrect ? score + 1 : score;
            router.push({
                pathname: '/results',
                query: { score: finalScore, total: sentences.length },
            });
        } else {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    if (loading) return null;

    return (
        <>
            <Head>
                <title>Practice - Capital Letter Practice</title>
            </Head>
            <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
                <div className="w-full max-w-lg">
                    <div className="mb-6 flex justify-between items-center px-2">
                        <button
                            onClick={() => router.push('/')}
                            className="text-sm text-gray-500 hover:text-gray-900"
                        >
                            ← Quit
                        </button>
                        <div className="text-sm font-medium text-gray-500">
                            Score: {score}
                        </div>
                    </div>

                    {sentences.length > 0 && (
                        <SentencePractice
                            sentence={sentences[currentIndex]}
                            currentIndex={currentIndex}
                            totalSentences={sentences.length}
                            onNext={handleNext}
                        />
                    )}
                </div>
            </main>
        </>
    );
}
