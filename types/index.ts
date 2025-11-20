export type Sentence = {
    id: number;
    textIncorrect: string;
    textCorrect: string;
    capitalWordIndexes: number[];
};

export type WordState = 'default' | 'selected' | 'correct' | 'incorrect' | 'missed';
