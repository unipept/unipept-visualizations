/**
 * Generic styling
 */
import * as d3 from "d3";
import { clamp } from "ramda";

import * as Data from "./data";
import { arcLength, rad2deg } from "./math";
import { Node } from "./node";

/**
 * Checks that `child` is within the hierarchial depth limit and is within
 * the same (sub-)tree as `ancestor`.
 * @param maxGeneration The (absolute) hierarchial depth limit.
 * @return true iff the above conditions are satisfied.
 */
const displayableFromAncestor: (
  ancestor: d3.HierarchyNode<Node>,
  child: d3.HierarchyNode<Node>,
  maxGeneration: number,
) => boolean = (
  ancestor: d3.HierarchyNode<Node>,
  child: d3.HierarchyNode<Node>,
    maxGeneration: number): boolean =>
    (child.depth < maxGeneration) &&
  Data.ancestorOf(ancestor, child).orElse(Infinity) < maxGeneration;

/// Styling constraints
interface IStyleConstraints {
  maxDepth: number; // Hierarchial depth limit
  labelOffset: number; // Offset from anchor.
  areaThreshold: number; // Minimum area.
  minFontSize: number;
  maxFontSize: number;
  fadedOpacity: number;
  visibleOpacity: number;
}

/**
 * IStyleConstraints data constructor
 * Use with care!
 */
const constraints: (userConstraints: object) => IStyleConstraints = (
  userConstraints: object,
): IStyleConstraints => {
  const defaults: IStyleConstraints = {
    maxDepth: 0,
      labelOffset: 0,
      areaThreshold: 0,
    minFontSize: 0,
      maxFontSize: 0,
      fadedOpacity: 0,
      visibleOpacity: 1 };
  };
  Object.assign(defaults, userConstraints);

  return defaults;
};

/**
 * Label styling functions
 */
namespace label {
  /**
   * Transform a label onto a radial axis.
   */
  export const transform: (
    angularScale: d3.ScaleLinear<number, number>,
    radialScale: d3.ScaleLinear<number, number>,
    d: d3.HierarchyRectangularNode<Node>,
  ) => string = (
    angularScale: d3.ScaleLinear<number, number>,
      radialScale: d3.ScaleLinear<number, number>,
      d: d3.HierarchyRectangularNode<Node>): string => {
    const direction: number = rad2deg(angularScale((d.x0 + d.x1) / 2)) - 90;
    const radius: number = radialScale(d.y0);

    return `rotate(${direction}) translate(${radius}) rotate(${
      direction > 90 ? -180 : 0
    })`;
  };

  /**
   * Set label visibility according to available space.
   */
  export const opacity: (
    d: d3.HierarchyRectangularNode<Node>,
    angularScale: d3.ScaleLinear<number, number>,
    radialScale: d3.ScaleLinear<number, number>,
    labelLength: number,
    constraint: IStyleConstraints,
  ) => number = (
    d: d3.HierarchyRectangularNode<Node>,
    angularScale: d3.ScaleLinear<number, number>,
    radialScale: d3.ScaleLinear<number, number>,
      labelLength: number,
      constraint: IStyleConstraints): number => {
    const radialSpace: number = radialScale(d.y1) - radialScale(d.y0);

    if (
      d.depth < constraint.maxDepth &&
      labelLength + constraint.labelOffset < radialSpace
    ) {
      const area: number =
        (angularScale(d.x1) - angularScale(d.x0)) * radialSpace;

      return area < constraint.areaThreshold ? 0 : 1;
    }

    return 0;
  };

  /**
   * Set the anchor point for a label according to rotation.
   */
  export const anchor: (
    scale: d3.ScaleLinear<number, number>,
    d: d3.HierarchyRectangularNode<Node>,
  ) => string = (
    scale: d3.ScaleLinear<number, number>,
      d: d3.HierarchyRectangularNode<Node>): string =>
      scale((d.x0 + d.x1) / 2) > Math.PI ? "end" : "start";

  /**
   * Spacing between the label and the anchor point.
   */
  export const offset: (
    scale: d3.ScaleLinear<number, number>,
    d: d3.HierarchyRectangularNode<Node>,
    constraints: IStyleConstraints,
  ) => string = (
    scale: d3.ScaleLinear<number, number>,
      d: d3.HierarchyRectangularNode<Node>,
      constraint: IStyleConstraints): string =>
      scale((d.x0 + d.x1) / 2) > Math.PI
      ? `-${constraint.labelOffset}px`
      : `${constraint.labelOffset}px`;

  /**
   * Set the font size accordinf to available space.
   */
  export const fontSize: (
    d: d3.HierarchyRectangularNode<Node>,
    angularScale: d3.ScaleLinear<number, number>,
    radialScale: d3.ScaleLinear<number, number>,
    constraints: IStyleConstraints,
  ) => string = (
    d: d3.HierarchyRectangularNode<Node>,
    angularScale: d3.ScaleLinear<number, number>,
    radialScale: d3.ScaleLinear<number, number>,
      constraint: IStyleConstraints): string => {
    const angle: number = angularScale(d.x1) - angularScale(d.x0);
    const radius: number = Math.max(2, radialScale(d.y0));
    const angularSpace: number = arcLength(radius, angle);
    const size: number = Math.round(
      clamp(constraint.minFontSize, constraint.maxFontSize, angularSpace),
    );

    return `${size}px`;
  };
}

/// Nodes
namespace node {
  /**
   * Set some nodes (beyond a threshold within the hierarchy) to fade.
   */
  export const opacity: (
    d: d3.HierarchyRectangularNode<Node>,
    threshold: number,
    constraints: IStyleConstraints,
  ) => number = (
    d: d3.HierarchyRectangularNode<Node>,
      threshold: number, constraint: IStyleConstraints): number =>
      d.depth >= threshold ? constraint.fadedOpacity : constraint.visibleOpacity;
}

export { IStyleConstraints, constraints, displayableFromAncestor, label, node };
