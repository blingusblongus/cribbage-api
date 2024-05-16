export function getCombinations<T>(array: T[], combinationSize: number): T[][] {
    const results: T[][] = [];

    function helper(start: number, currentCombination: T[]) {
        if (currentCombination.length === combinationSize) {
            results.push([...currentCombination]);
            return;
        }

        for (let i = start; i < array.length; i++) {
            currentCombination.push(array[i]);
            helper(i + 1, currentCombination);
            currentCombination.pop();
        }
    }

    helper(0, []);
    return results;
}
