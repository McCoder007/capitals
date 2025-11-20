import type { Sentence } from '@/types';
import { SCORE_THRESHOLDS, SCORE_MESSAGES } from './constants';

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Checks if two sorted arrays are equal
 */
export function arraysEqual(arr1: number[], arr2: number[]): boolean {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((val, index) => val === arr2[index]);
}

/**
 * Checks if the user's answer is correct
 */
export function isAnswerCorrect(
    selectedIndexes: number[],
    correctIndexes: number[]
): boolean {
    const sortedSelected = [...selectedIndexes].sort((a, b) => a - b);
    const sortedCorrect = [...correctIndexes].sort((a, b) => a - b);
    return arraysEqual(sortedSelected, sortedCorrect);
}

/**
 * Gets the appropriate message based on score percentage
 */
export function getScoreMessage(percentage: number) {
    if (percentage >= SCORE_THRESHOLDS.EXCELLENT) {
        return SCORE_MESSAGES.EXCELLENT;
    }
    if (percentage >= SCORE_THRESHOLDS.GREAT) {
        return SCORE_MESSAGES.GREAT;
    }
    if (percentage >= SCORE_THRESHOLDS.GOOD) {
        return SCORE_MESSAGES.GOOD;
    }
    return SCORE_MESSAGES.DEFAULT;
}

/**
 * Capitalizes the first letter of a string
 */
export function capitalizeFirstLetter(text: string): string {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
}
