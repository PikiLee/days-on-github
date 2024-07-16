export function getContributionLevel(contributionCount: number): 0 | 1 | 2 | 3 {
    if (contributionCount < 10) {
        return 0
    } else if (contributionCount < 20) {
        return 1
    } else if (contributionCount < 30) {
        return 2
    }
    return 3
}
