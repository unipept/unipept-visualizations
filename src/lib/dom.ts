/* Utility functions for working on the DOM
 */

const domClass: (prefix?: string) => (name: string) => string
  = (prefix?: string): (name: string) => string =>
  prefix !== undefined
  ? ((name: string): string => `${prefix}-${name}`)
  : ((name: string): string => name);

export { domClass };
