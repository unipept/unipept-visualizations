export declare function sleep(ms: number): Promise<unknown>;
/**
 * This function waits a specified amount of time for promises to be fullfilled before returning.
 *
 * @param ms How many ms should we wait before continueing test execution?
 */
export declare function waitForPromises(ms: number): Promise<void>;
/**
 * This function returns only when the given condition evaluates to true, or when the given timeout has been exceeded.
 *
 * @param condition
 * @param timeout
 * @param interval
 */
export declare function waitForCondition(condition: () => boolean, timeout?: number, interval?: number): Promise<void>;
