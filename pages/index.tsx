import Head from 'next/head';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Type } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Head>
        <title>Capital Letter Practice</title>
        <meta name="description" content="Practice capitalization for ESL learners" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="w-full max-w-md space-y-10">
          <div className="text-center space-y-5">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-2 shadow-lg shadow-blue-200">
              <Type className="w-10 h-10" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Capital Letter Practice
            </h1>
            <p className="text-xl text-gray-600 max-w-sm mx-auto leading-relaxed">
              Master English capitalization rules with interactive practice
            </p>
          </div>

          <Card className="border-2 border-gray-100 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4 space-y-2">
              <CardTitle className="text-2xl font-bold text-gray-900">Ready to start?</CardTitle>
              <CardDescription className="text-base text-gray-600">
                Practice with 10 random sentences. Tap words that need capitalization.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2 pb-6">
              <Link href="/practice" className="w-full block">
                <Button
                  size="lg"
                  className="w-full text-lg font-semibold h-14 text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Start Practice
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
