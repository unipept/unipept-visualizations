/**
 * Generic styling
 */
import * as d3 from "d3";

import * as Data from "./data";
import { arcLength, interval, rad2deg } from "./math";
import { Node } from "./node";

const displayableFromAncestor: (ancestor: d3.HierarchyNode<Node>,
                                child: d3.HierarchyNode<Node>,
                                maxGeneration: number) => boolean
  = (ancestor: d3.HierarchyNode<Node>,
     child: d3.HierarchyNode<Node>,
     maxGeneration: number): boolean =>
  (child.depth < maxGeneration) &&
  (Data.ancestorOf(ancestor, child)
   .orElse(Infinity) < maxGeneration);


/// Labels
interface IStyleConstraints {
  maxDepth: number;
  labelOffset: number;
  nodeSizeThreshold: number;
  minFontSize: number;
  maxFontSize: number;
}

const constraints: (userConstraints: object) => IStyleConstraints
  = (userConstraints: object): IStyleConstraints => {
    const defaults: IStyleConstraints = {maxDepth: 0,
                                         labelOffset: 0,
                                         nodeSizeThreshold: 0,
                                         minFontSize: 0,
                                         maxFontSize: 0};
    Object.assign(defaults, userConstraints);

    return defaults;
  };

const labelTransform: (angularScale: d3.ScaleLinear<number, number>,
                       radialScale: d3.ScaleLinear<number, number>,
                       d: d3.HierarchyRectangularNode<Node>) => string
  = (angularScale: d3.ScaleLinear<number, number>,
     radialScale: d3.ScaleLinear<number, number>,
     d: d3.HierarchyRectangularNode<Node>): string => {
    const direction: number = rad2deg(angularScale((d.x0 + d.x1) / 2)) - 90;
    const radius: number = radialScale(d.y0);

    return `rotate(${direction}) translate(${radius}) rotate(${direction > 90 ? -180 : 0})`;
  };


const labelOpacity: (d: d3.HierarchyRectangularNode<Node>,
                     angularScale: d3.ScaleLinear<number, number>,
                     radialScale: d3.ScaleLinear<number, number>,
                     labelLength: number,
                     constraints: IStyleConstraints) => number
  = (d: d3.HierarchyRectangularNode<Node>,
     angularScale: d3.ScaleLinear<number, number>,
     radialScale: d3.ScaleLinear<number, number>,
     labelLength: number,
     constraint: IStyleConstraints): number => {
    const radialSpace: number = radialScale(d.y1) - radialScale(d.y0);

    if ((d.depth < constraint.maxDepth)
        && ((labelLength + constraint.labelOffset) < radialSpace)) {
      const area: number = (angularScale(d.x1) - angularScale(d.x0)) * radialSpace;

      return area < constraint.nodeSizeThreshold ? 0 : 1;
    }

    return 0;
  };

const labelAnchor: (scale: d3.ScaleLinear<number, number>,
                    d: d3.HierarchyRectangularNode<Node>) => string
  = (scale: d3.ScaleLinear<number, number>,
     d: d3.HierarchyRectangularNode<Node>): string =>
    scale((d.x0 + d.x1) / 2) > Math.PI ? "end" : "start";

const labelOffset: (scale: d3.ScaleLinear<number, number>,
                    d: d3.HierarchyRectangularNode<Node>,
                    constraints: IStyleConstraints) => string
  = (scale: d3.ScaleLinear<number, number>,
     d: d3.HierarchyRectangularNode<Node>,
     constraint: IStyleConstraints): string =>
  scale((d.x0 + d.x1) / 2) > Math.PI ? `-${constraint.labelOffset}px` : `${constraint.labelOffset}px`;

const labelFontSize: (d: d3.HierarchyRectangularNode<Node>,
                      angularScale: d3.ScaleLinear<number, number>,
                      radialScale: d3.ScaleLinear<number, number>,
                      constraints: IStyleConstraints) => string
  = (d: d3.HierarchyRectangularNode<Node>,
     angularScale: d3.ScaleLinear<number, number>,
     radialScale: d3.ScaleLinear<number, number>,
     constraint: IStyleConstraints): string => {
    const angle: number = angularScale(d.x1) - angularScale(d.x0);
    const radius: number = Math.max(2, radialScale(d.y0));
    const angularSpace: number = arcLength(radius, angle);
    const size: number
      = Math.round(interval(angularSpace, constraint.minFontSize, constraint.maxFontSize));

    return `${size}px`;
  };


/// Nodes

export { IStyleConstraints,
         constraints,
         displayableFromAncestor,
         labelAnchor,
         labelFontSize,
         labelOffset,
         labelOpacity,
         labelTransform };
