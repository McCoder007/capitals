import React from 'react';
import { cn } from '@/lib/utils';
import { capitalizeFirstLetter } from '@/lib/helpers';
import type { WordState } from '@/types';

type WordChipProps = {
    text: string;
    index: number;
    state: WordState;
    onClick: () => void;
    disabled: boolean;
};

export const WordChip: React.FC<WordChipProps> = ({
    text,
    state,
    onClick,
    disabled,
}) => {
    const displayText = (state === 'selected' || state === 'correct')
        ? capitalizeFirstLetter(text)
        : text;

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "relative px-4 py-2.5 rounded-lg text-lg font-medium transition-all duration-150 select-none",
                "border active:scale-[0.97] touch-manipulation",
                state === 'default' && "bg-white border-gray-300 text-gray-900 hover:border-blue-400 hover:bg-blue-50/50",
                state === 'selected' && "bg-blue-600 border-blue-600 text-white shadow-md",
                state === 'correct' && "bg-emerald-500 border-emerald-500 text-white shadow-sm",
                state === 'incorrect' && "bg-red-500 border-red-500 text-white",
                state === 'missed' && "bg-amber-50 border-amber-400 text-amber-900 border-dashed",
                disabled && "cursor-default active:scale-100"
            )}
        >
            {displayText}
        </button>
    );
};
