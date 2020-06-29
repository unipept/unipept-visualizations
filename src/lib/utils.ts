/**
 * Generate an element identifier
 * Math.random = [0, 1)
 * Number.toString([radix]) 26 letters + 10 digits
 */
const generateId: (length?: number) => string = (length?: number): string => {
  const l: number = length || 10;

  return `${Math.random().toString(36)}`.substr(2, l);
};

export { generateId };
