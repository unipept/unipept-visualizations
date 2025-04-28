import { Reorderer } from './Reorderer';
import { default as TreeNode } from '../cluster/TreeNode';

/**
 * This class uses the MOLO heuristics described in ftp://ftp.esat.kuleuven.be/sista/ida/reports/14-133.pdf to reorder
 * a given dendrogram.
 *
 * @author Pieter Verschaffelt
 */
export default class MoloReorderer implements Reorderer {
    private nodeMinMap;
    reorder(root: TreeNode): TreeNode;
    private sortMinimum;
}
