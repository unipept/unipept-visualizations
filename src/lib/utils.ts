

/**
 * Calculates a numeric hash value of a string
 * 
 * @param s string to calculate a hash from
 */
export function stringHash(s: string): number {
  return s.split("").reduce(function(a, b) {
    const c = ((a << 5) - a) + b.charCodeAt(0);
    return c & c;
  }, 0);
}

export function functor(v: Function | any): Function {
  return typeof v === "function" ? v : function() { return v; };
}
