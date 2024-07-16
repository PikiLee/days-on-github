import { describe, test, expect } from 'vitest';
import { getContributionLevel } from './getContributionLevel';

describe('getContributionLevel', () => {
    test.each([
        [0, 0],
        [5, 0],
        [9, 0],
        [10, 1],
        [15, 1],
        [19, 1],
        [20, 2],
        [25, 2],
        [29, 2],
        [30, 3],
        [35, 3],
        [40, 3],
        [100, 3],
    ])('for contribution count %i returns %i ', (contributionCount, expectedLevel) => {
        expect(getContributionLevel(contributionCount)).toBe(expectedLevel);
    });
});
