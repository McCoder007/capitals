import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Trophy, RotateCcw, Home } from 'lucide-react';
import { getScoreMessage } from '@/lib/helpers';
import { SENTENCES_PER_GAME } from '@/lib/constants';

export default function Results() {
    const router = useRouter();
    const { score, total } = router.query;

    const finalScore = score ? parseInt(score as string) : 0;
    const finalTotal = total ? parseInt(total as string) : SENTENCES_PER_GAME;

    const percentage = Math.round((finalScore / finalTotal) * 100);
    const { title: message, subtitle: subMessage } = getScoreMessage(percentage);

    return (
        <>
            <Head>
                <title>Results - Capital Letter Practice</title>
            </Head>
            <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-muted/50">
                <div className="w-full max-w-md space-y-8 animate-in zoom-in-95 duration-500">
                    <Card className="border-2 shadow-xl shadow-primary/10 text-center overflow-hidden">
                        <div className="bg-primary/5 p-8 flex justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
                                <Trophy className="w-24 h-24 text-primary relative z-10 drop-shadow-md" />
                            </div>
                        </div>
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold">{message}</CardTitle>
                            <CardDescription className="text-lg">
                                {subMessage}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-col items-center justify-center p-6 bg-muted/30 rounded-2xl border border-muted">
                                <span className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">Final Score</span>
                                <div className="flex items-baseline gap-2 mt-1">
                                    <span className="text-6xl font-black text-primary tracking-tighter">{finalScore}</span>
                                    <span className="text-2xl text-muted-foreground font-medium">/ {finalTotal}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-3 p-6 pt-0">
                            <Link href="/practice" className="w-full">
                                <Button size="lg" className="w-full text-lg font-bold h-14 shadow-lg shadow-primary/20">
                                    <RotateCcw className="mr-2 w-5 h-5" />
                                    Practice Again
                                </Button>
                            </Link>
                            <Link href="/" className="w-full">
                                <Button variant="ghost" size="lg" className="w-full">
                                    <Home className="mr-2 w-5 h-5" />
                                    Back to Home
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </main>
        </>
    );
}
