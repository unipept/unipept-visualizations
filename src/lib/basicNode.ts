export interface BasicNode {
  name: string;
  children?: BasicNode[];
}

export function emptyBasicNode(): BasicNode {
  return {
    name: "",
  };
}
