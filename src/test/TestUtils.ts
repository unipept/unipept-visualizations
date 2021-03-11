const flushPromises = require("flush-promises");

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * This function waits a specified amount of time for promises to be fullfilled before returning.
 *
 * @param ms How many ms should we wait before continueing test execution?
 */
export async function waitForPromises(ms: number) {
    await sleep(ms);
    await flushPromises();
}

/**
 * This function returns only when the given condition evaluates to true, or when the given timeout has been exceeded.
 *
 * @param condition
 * @param timeout
 * @param interval
 */
export async function waitForCondition(condition: () => boolean, timeout = 1000, interval = 100) {
    let totalSleep = 0;
    await waitForPromises(interval);
    while (!condition() && totalSleep <= timeout) {
        await waitForPromises(interval);
        totalSleep += interval;
    }
}
