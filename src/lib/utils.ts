

/**
 * Calculates a numeric hash value of a string
 * 
 * @param s string to calculate a hash from
 */
const stringHash: (s: string) => number
  = (s: string): number => {
    return s.split("").reduce((a, b) => {
      const c = ((a << 5) - a) + b.charCodeAt(0);

      return c & c;
    }, 0);
  };

/**
 * If the argument is not a function, wrap it in a function that returns that value
 */
const wrapFunction: (v: (() => any) | any) => (() => any)
  = (v: (() => any) | any): (() => any)  =>
  (typeof v === "function" ? v : ((): any => v));

/**
 * Generate an element identifier
 * Math.random = [0, 1)
 * Number.toString([radix]) 26 letters + 10 digits
 */
const generateId: (length?: number) => string
  = (length?: number): string => {
    const l: number = length || 10;

    return `${Math.random().toString(36)}`.substr(2, l);
  };



export { stringHash, wrapFunction, generateId };
