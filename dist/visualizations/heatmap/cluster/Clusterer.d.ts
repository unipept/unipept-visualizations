import { default as TreeNode } from './TreeNode';
import { default as ClusterElement } from './ClusterElement';

export interface Clusterer {
    cluster(data: ClusterElement[]): TreeNode;
}
