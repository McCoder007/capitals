export const SENTENCES_PER_GAME = 10;

export const SCORE_THRESHOLDS = {
    EXCELLENT: 90,
    GREAT: 70,
    GOOD: 50,
} as const;

export const SCORE_MESSAGES = {
    EXCELLENT: {
        title: "Amazing work!",
        subtitle: "You're a capitalization master!",
    },
    GREAT: {
        title: "Great job!",
        subtitle: "You're getting really good at this.",
    },
    GOOD: {
        title: "Not bad!",
        subtitle: "You're on the right track.",
    },
    DEFAULT: {
        title: "Good effort!",
        subtitle: "Keep practicing to improve your score.",
    },
} as const;
