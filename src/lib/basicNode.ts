/**
 * Defines an standard interface for the basic Unipept Visualisation data structure.
 */

interface BasicNode {
  name: string;           // Value for plotted label.
  children?: BasicNode[]; // Child nodes in the hierarchy.
}

/**
 * Default initialise a `BasicNode`.
 */
const emptyBasicNode: () => BasicNode
  = (): BasicNode => { return {name: ""}; };

export { BasicNode, emptyBasicNode };
