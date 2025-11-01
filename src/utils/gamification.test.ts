/**
 * Integration Tests for Gamification System
 *
 * These tests verify the entire gamification flow including:
 * - XP reward calculations
 * - Level progression
 * - XP requirements per level
 * - Progress tracking within levels
 */

import {
  calculateTaskXP,
  getXPForLevel,
  calculateLevel,
  getLevelProgress,
  XP_REWARDS,
  PRIORITY_MULTIPLIERS,
} from './gamification';

describe('Gamification System Integration Tests', () => {

  // ============================================================================
  // XP REWARD CALCULATIONS
  // ============================================================================

  describe('calculateTaskXP', () => {
    describe('Base XP rewards (with low priority)', () => {
      it('should award 10 XP for easy tasks', () => {
        expect(calculateTaskXP('easy', 'low')).toBe(10);
      });

      it('should award 25 XP for medium tasks', () => {
        expect(calculateTaskXP('medium', 'low')).toBe(25);
      });

      it('should award 50 XP for hard tasks', () => {
        expect(calculateTaskXP('hard', 'low')).toBe(50);
      });
    });

    describe('Priority multipliers', () => {
      it('should apply 1.2x multiplier for medium priority', () => {
        expect(calculateTaskXP('easy', 'medium')).toBe(12);   // 10 * 1.2 = 12
        expect(calculateTaskXP('medium', 'medium')).toBe(30);  // 25 * 1.2 = 30
        expect(calculateTaskXP('hard', 'medium')).toBe(60);    // 50 * 1.2 = 60
      });

      it('should apply 1.5x multiplier for high priority', () => {
        expect(calculateTaskXP('easy', 'high')).toBe(15);      // 10 * 1.5 = 15
        expect(calculateTaskXP('medium', 'high')).toBe(38);    // 25 * 1.5 = 37.5, rounded to 38
        expect(calculateTaskXP('hard', 'high')).toBe(75);      // 50 * 1.5 = 75
      });
    });

    describe('All combinations', () => {
      it('should calculate correct XP for all difficulty/priority combinations', () => {
        // Easy tasks
        expect(calculateTaskXP('easy', 'low')).toBe(10);
        expect(calculateTaskXP('easy', 'medium')).toBe(12);
        expect(calculateTaskXP('easy', 'high')).toBe(15);

        // Medium tasks
        expect(calculateTaskXP('medium', 'low')).toBe(25);
        expect(calculateTaskXP('medium', 'medium')).toBe(30);
        expect(calculateTaskXP('medium', 'high')).toBe(38);

        // Hard tasks
        expect(calculateTaskXP('hard', 'low')).toBe(50);
        expect(calculateTaskXP('hard', 'medium')).toBe(60);
        expect(calculateTaskXP('hard', 'high')).toBe(75);
      });
    });

    describe('Rounding behavior', () => {
      it('should round to nearest integer', () => {
        // 25 * 1.2 = 30 (exact)
        expect(calculateTaskXP('medium', 'medium')).toBe(30);

        // 25 * 1.5 = 37.5 (should round to 38)
        expect(calculateTaskXP('medium', 'high')).toBe(38);
      });
    });
  });

  // ============================================================================
  // LEVEL REQUIREMENTS
  // ============================================================================

  describe('getXPForLevel', () => {
    it('should calculate XP required for each level increment', () => {
      expect(getXPForLevel(1)).toBe(100);    // 100 * 1^1.5 = 100
      expect(getXPForLevel(2)).toBe(283);    // 100 * 2^1.5 ≈ 282.84, rounded to 283
      expect(getXPForLevel(3)).toBe(520);    // 100 * 3^1.5 ≈ 519.61, rounded to 520
      expect(getXPForLevel(4)).toBe(800);    // 100 * 4^1.5 = 800
      expect(getXPForLevel(5)).toBe(1118);   // 100 * 5^1.5 ≈ 1118.03
    });

    it('should show exponential growth pattern', () => {
      const level2XP = getXPForLevel(2);
      const level3XP = getXPForLevel(3);
      const level4XP = getXPForLevel(4);

      // Each level should require significantly more XP than the previous
      expect(level3XP).toBeGreaterThan(level2XP);
      expect(level4XP).toBeGreaterThan(level3XP);

      // The difference should increase (exponential growth)
      const diff2to3 = level3XP - level2XP;
      const diff3to4 = level4XP - level3XP;
      expect(diff3to4).toBeGreaterThan(diff2to3);
    });

    it('should handle higher levels correctly', () => {
      expect(getXPForLevel(10)).toBe(3162);  // 100 * 10^1.5 ≈ 3162.27
      expect(getXPForLevel(20)).toBe(8944);  // 100 * 20^1.5 ≈ 8944.27
      expect(getXPForLevel(50)).toBe(35355); // 100 * 50^1.5 ≈ 35355.33
    });
  });

  // ============================================================================
  // LEVEL CALCULATION
  // ============================================================================

  describe('calculateLevel', () => {
    describe('Starting levels', () => {
      it('should start at level 1 with 0 XP', () => {
        expect(calculateLevel(0)).toBe(1);
      });

      it('should stay at level 1 until reaching level 2 requirement', () => {
        expect(calculateLevel(50)).toBe(1);
        expect(calculateLevel(99)).toBe(1);
      });
    });

    describe('Level progression', () => {
      it('should reach level 2 at 283 XP (not 100)', () => {
        // getXPForLevel(2) = 283, so need 283 total XP to reach level 2
        expect(calculateLevel(283)).toBe(2);
        expect(calculateLevel(282)).toBe(1); // Just under
      });

      it('should reach level 3 at 520 XP', () => {
        // getXPForLevel(3) = 520
        expect(calculateLevel(520)).toBe(3);
        expect(calculateLevel(519)).toBe(2);
      });

      it('should reach level 4 at 800 XP', () => {
        // getXPForLevel(4) = 800
        expect(calculateLevel(800)).toBe(4);
        expect(calculateLevel(799)).toBe(3);
      });

      it('should reach level 5 at 1118 XP', () => {
        // getXPForLevel(5) = 1118
        expect(calculateLevel(1118)).toBe(5);
        expect(calculateLevel(1117)).toBe(4);
      });
    });

    describe('Edge cases', () => {
      it('should handle exact level boundaries', () => {
        expect(calculateLevel(283)).toBe(2);   // Exactly level 2
        expect(calculateLevel(520)).toBe(3);   // Exactly level 3
        expect(calculateLevel(800)).toBe(4);   // Exactly level 4
      });

      it('should handle XP just below level boundaries', () => {
        expect(calculateLevel(282)).toBe(1);   // 1 XP short of level 2
        expect(calculateLevel(519)).toBe(2);   // 1 XP short of level 3
        expect(calculateLevel(799)).toBe(3);   // 1 XP short of level 4
      });

      it('should handle large XP amounts', () => {
        expect(calculateLevel(10000)).toBeGreaterThan(10);
        expect(calculateLevel(50000)).toBeGreaterThan(20);
      });
    });
  });

  // ============================================================================
  // LEVEL PROGRESS TRACKING
  // ============================================================================

  describe('getLevelProgress', () => {
    describe('At level boundaries', () => {
      it('should show 0 progress at start of level 1', () => {
        const progress = getLevelProgress(0);
        expect(progress.level).toBe(1);
        expect(progress.currentXP).toBe(0);
        expect(progress.xpForNextLevel).toBe(283); // Need 283 XP total to reach level 2
        expect(progress.progress).toBe(0);
      });

      it('should show full progress just before level 2', () => {
        const progress = getLevelProgress(282);
        expect(progress.level).toBe(1);
        expect(progress.currentXP).toBe(282);
        expect(progress.xpForNextLevel).toBe(283);
        expect(Math.round(progress.progress)).toBe(100); // 99.6% rounds to 100
      });

      it('should have progress at level 2 boundary', () => {
        // At 283 XP, we reach level 2 but already have progress!
        // This is because the cumulative system: 100 XP for "level 1", then 283 to "reach level 2"
        const progress = getLevelProgress(283);
        expect(progress.level).toBe(2);
        expect(progress.currentXP).toBe(183); // 283 - 100 (level 1) = 183
        expect(progress.xpForNextLevel).toBe(520); // Need 520 for level 3
        expect(Math.round(progress.progress)).toBe(35); // 183/520 ≈ 35%
      });
    });

    describe('Mid-level progress', () => {
      it('should show progress at level 1 midpoint', () => {
        const progress = getLevelProgress(141); // Half of 283
        expect(progress.level).toBe(1);
        expect(progress.currentXP).toBe(141);
        expect(progress.xpForNextLevel).toBe(283);
        expect(Math.round(progress.progress)).toBe(50);
      });

      it('should track progress correctly at level 2', () => {
        // At level 2: Cumulative XP includes level 1 (100) + amount into level 2
        // Level 1 requirement: 100 XP
        // At 300 total XP: 300 - 100 = 200 XP into level 2
        const progress = getLevelProgress(300);
        expect(progress.level).toBe(2);
        expect(progress.currentXP).toBe(200); // 300 - 100
        expect(progress.xpForNextLevel).toBe(520);
        expect(Math.round(progress.progress)).toBe(38); // 200/520 ≈ 38%
      });
    });

    describe('Progress percentage capping', () => {
      it('should never exceed 100% progress', () => {
        const testXP = [0, 50, 100, 500, 1000, 5000];
        testXP.forEach(xp => {
          const progress = getLevelProgress(xp);
          expect(progress.progress).toBeLessThanOrEqual(100);
        });
      });
    });

    describe('Real gameplay scenarios', () => {
      it('should track progress after completing easy tasks', () => {
        // Complete 5 easy/low tasks (10 XP each = 50 XP total)
        const progress = getLevelProgress(50);
        expect(progress.level).toBe(1);
        expect(progress.currentXP).toBe(50);
        expect(Math.round(progress.progress)).toBe(18); // 50/283 ≈ 17.67%
      });

      it('should track progress after completing hard tasks', () => {
        // Complete 4 hard/high tasks (75 XP each = 300 XP total)
        const progress = getLevelProgress(300);
        expect(progress.level).toBe(2); // Reached level 2 at 283 XP
        expect(progress.currentXP).toBe(200); // 300 - 100 (level 1 XP) = 200
        expect(progress.xpForNextLevel).toBe(520);
        expect(Math.round(progress.progress)).toBe(38); // 200/520 ≈ 38.5%
      });

      it('should track multi-level progression', () => {
        // Simulate earning 1000 XP from various tasks
        // Cumulative for levels 1-3: 100 + 283 + 520 = 903
        const progress = getLevelProgress(1000);
        expect(progress.level).toBe(4); // Level 4 starts at 800 XP (threshold)
        expect(progress.currentXP).toBe(97); // 1000 - 903 = 97 XP into level 4
        expect(progress.xpForNextLevel).toBe(1118); // Need 1118 for level 5
        expect(Math.round(progress.progress)).toBe(9); // 97/1118 ≈ 8.7%
      });
    });
  });

  // ============================================================================
  // INTEGRATION SCENARIOS
  // ============================================================================

  describe('Complete User Journey Integration Tests', () => {
    it('should simulate a realistic progression path', () => {
      let totalXP = 0;

      // Day 1: Complete 3 easy/low tasks
      totalXP += calculateTaskXP('easy', 'low') * 3; // +30 XP
      expect(totalXP).toBe(30);
      expect(calculateLevel(totalXP)).toBe(1);

      // Day 2: Complete 2 medium/medium tasks
      totalXP += calculateTaskXP('medium', 'medium') * 2; // +60 XP
      expect(totalXP).toBe(90);
      expect(calculateLevel(totalXP)).toBe(1);

      // Day 3-10: Complete many hard/high tasks - LEVEL UP!
      totalXP += calculateTaskXP('hard', 'high') * 4; // +300 XP
      expect(totalXP).toBe(390);
      expect(calculateLevel(totalXP)).toBe(2); // Reached level 2 at 283 XP

      // Check progress at level 2
      const progress = getLevelProgress(totalXP);
      expect(progress.level).toBe(2);
      expect(progress.currentXP).toBe(290); // 390 - 100 (level 1) = 290
      expect(progress.xpForNextLevel).toBe(520);
    });

    it('should demonstrate XP values match the constants', () => {
      // Verify XP_REWARDS are used correctly
      expect(calculateTaskXP('easy', 'low')).toBe(XP_REWARDS.easy * PRIORITY_MULTIPLIERS.low);
      expect(calculateTaskXP('medium', 'low')).toBe(XP_REWARDS.medium * PRIORITY_MULTIPLIERS.low);
      expect(calculateTaskXP('hard', 'low')).toBe(XP_REWARDS.hard * PRIORITY_MULTIPLIERS.low);
    });

    it('should show consistent level progression across functions', () => {
      // For a given total XP, all functions should agree
      const totalXP = 500;

      const level = calculateLevel(totalXP);
      const progress = getLevelProgress(totalXP);

      expect(progress.level).toBe(level);

      // The next level XP should match getXPForLevel
      expect(progress.xpForNextLevel).toBe(getXPForLevel(level + 1));
    });

    it('should handle a power user achieving high levels', () => {
      // Simulate completing many tasks to reach high levels
      const totalXP = calculateTaskXP('hard', 'high') * 10; // 750 XP

      const level = calculateLevel(totalXP);
      expect(level).toBeGreaterThanOrEqual(3);

      const progress = getLevelProgress(totalXP);
      expect(progress.level).toBe(level);
      expect(progress.xpForNextLevel).toBeGreaterThan(0);

      // Verify progress is within valid range for this reasonable XP amount
      expect(progress.progress).toBeGreaterThanOrEqual(0);
      expect(progress.progress).toBeLessThanOrEqual(100);
      expect(progress.currentXP).toBeGreaterThanOrEqual(0);
    });

    it('should validate the entire leveling curve', () => {
      // Check first 10 levels for consistency

      for (let level = 1; level <= 10; level++) {
        const xpNeeded = getXPForLevel(level);

        // XP should always be positive
        expect(xpNeeded).toBeGreaterThan(0);

        // Should be at correct level just before threshold
        expect(calculateLevel(xpNeeded - 1)).toBeLessThanOrEqual(level);

        // Should reach this level at exact XP threshold
        expect(calculateLevel(xpNeeded)).toBe(level);
      }
    });
  });

  // ============================================================================
  // EDGE CASES & ERROR HANDLING
  // ============================================================================

  describe('Edge Cases', () => {
    it('should handle zero XP', () => {
      expect(calculateLevel(0)).toBe(1);
      const progress = getLevelProgress(0);
      expect(progress.level).toBe(1);
      expect(progress.currentXP).toBe(0);
      expect(progress.progress).toBe(0);
    });

    it('should handle negative XP gracefully', () => {
      // In a real app, you might prevent negative XP
      // But the functions should still work without crashing
      expect(() => calculateLevel(-10)).not.toThrow();
      expect(() => getLevelProgress(-10)).not.toThrow();
    });

    it('should handle very large XP values', () => {
      const hugeXP = 1000000;
      expect(() => calculateLevel(hugeXP)).not.toThrow();
      expect(() => getLevelProgress(hugeXP)).not.toThrow();

      const progress = getLevelProgress(hugeXP);
      expect(progress.level).toBeGreaterThan(0);
      expect(progress.progress).toBeLessThanOrEqual(100);
    });
  });

  // ============================================================================
  // PERFORMANCE TESTS
  // ============================================================================

  describe('Performance', () => {
    it('should calculate levels efficiently for high XP values', () => {
      const startTime = performance.now();

      // Calculate level for very high XP
      calculateLevel(100000);

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should complete in less than 10ms
      expect(duration).toBeLessThan(10);
    });

    it('should handle many sequential calculations quickly', () => {
      const startTime = performance.now();

      // Simulate checking progress 1000 times
      for (let i = 0; i < 1000; i++) {
        getLevelProgress(i * 10);
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should complete 1000 calculations in less than 100ms
      expect(duration).toBeLessThan(100);
    });
  });
});
