export const XP_REWARDS: { [key in 'easy' | 'medium' | 'hard']: number } = {
    easy: 10,
    medium: 25,
    hard: 50,
};

export const PRIORITY_MULTIPLIERS: { [key in 'low' | 'medium' | 'high']: number } = {
    low: 1,
    medium: 1.2,
    high: 1.5,
};

// Calulate X{ reward for completing a task
// Formula: Base XP (difficult) * Priority Multiplier
export const calculateTaskXP = (difficulty: 'easy' | 'medium' | 'hard', priority: 'low' | 'medium' | 'high'): number => {
    const baseXP = XP_REWARDS[difficulty];
    const multiplier = PRIORITY_MULTIPLIERS[priority];
    return Math.round(baseXP * multiplier);
};

// Calculate XP required for a given level
// Formula: 100 * level^1.5
export const getXPForLevel = (level: number): number => {
    return Math.round(100 * Math.pow(level, 1.5));
};

// Calculate current level based on total XP
export const calculateLevel = (totalXP: number): number => {
    let level = 1;
    let xpNeeded = 0;

    while (totalXP >= xpNeeded) {
        level++;
        xpNeeded = getXPForLevel(level);
    }
    return level - 1;
}

// Get XP progress for current level
// Returns: { currentXP, xpForNextLevel, progress(0-100) }
export const getLevelProgress = (totalXP: number) => {
    const level = calculateLevel(totalXP);

    // XP for previous levels
    let xpForPreviousLevels = 0;
    for (let i = 1; i < level; i++) {
        xpForPreviousLevels += getXPForLevel(i);
    }

    // XP for current level
    const currentXP = totalXP - xpForPreviousLevels;

    // XP needed for next level
    const xpForNextLevel = getXPForLevel(level + 1);

    // Progress percentage
    const progress = Math.min(100, (currentXP / xpForNextLevel) * 100);

    return {
        level,
        currentXP,
        xpForNextLevel,
        progress,
    };
};