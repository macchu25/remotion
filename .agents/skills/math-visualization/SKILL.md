---
name: math-visualization
description: Building 3Blue1Brown style 2D math graphs, parametric curves, limits, and interactive geometric visualizations in React and SVG.
---

# Math Visualization Skill

Guidelines for rendering mathematical concepts, calculus, and geometry in Remotion.

## Key Principles

1. **SVG Coordinate Systems**:
   - Map mathematical coordinates $(x, y)$ to screen pixels $(X, Y)$ using linear transformations (`toScreenX`, `toScreenY`).
   - Draw function curves using SVG `<path d="..." />` cubic/quadratic Bezier curves or polyline paths.

2. **Geometric Morphing Animations**:
   - Animate parameters (e.g. $\Delta x \to 0$, $r \to 0$) frame by frame with `interpolate()`.
   - Morph secant lines smoothly into tangent lines to illustrate derivative limits.

3. **Color-Coded Math Equations**:
   - Color code variables in equations matching their corresponding visual elements on the graph (e.g. $\Delta y$ in blue, $\Delta x$ in amber).
