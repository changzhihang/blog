+++
date = '2026-09-19T23:09:00+08:00'
draft = false
title = 'Turning an Ellipse into a Circle: Tangents and Chord Lengths'
description = 'Use coordinate scaling to derive tangent points and a sum-of-squared-distances identity, while keeping track of which geometric properties survive.'
tags = ['Maths', 'Ellipses', 'Analytic Geometry', 'Coordinate Transformations']
math = true
ShowToc = true
+++

When working on an ellipse problem, I sometimes pause to ask: would this become simpler if I compressed the ellipse into a circle? A circle has familiar geometric relationships between tangents, radii, and chord midpoints. With a suitable change of coordinates, those relationships can also help us solve problems about ellipses.

<!--more-->

Here are two examples from my notes: finding a tangent point through the geometry of a circle, and explaining a sum of squared distances using a chord midpoint and the Pythagorean theorem. Throughout, we need to distinguish the original coordinates from the transformed ones and account for how lengths change.

## 1. Turning the ellipse into a circle

Consider the ellipse

$$
\frac{x^2}{a^2}+\frac{y^2}{b^2}=1,\qquad a>b>0.
$$

Set

$$
X=\frac{x}{a},\qquad Y=\frac{y}{b}.
$$

The ellipse becomes the unit circle

$$
X^2+Y^2=1.
$$

This transformation divides the horizontal and vertical coordinates by $a$ and $b$, respectively. It is invertible, so intersections between a line and the ellipse correspond one-to-one to intersections between the transformed line and the circle. In particular, tangency is preserved.

If the original line is

$$
y=kx+m,
$$

substituting $x=aX$ and $y=bY$ gives

$$
Y=\frac{a}{b}kX+\frac{m}{b}.
$$

The new slope and vertical intercept are therefore

$$
\boxed{k'=\frac{a}{b}k},\qquad
\boxed{m'=\frac{m}{b}}.
$$

One detail deserves care: **slope is a ratio of coordinate differences**, $k=\Delta y/\Delta x$. We can use $y/x$ directly only when the line passes through the origin. Using differences makes the scaling rule clear:

$$
k'=\frac{\Delta y/b}{\Delta x/a}=\frac{a}{b}k.
$$

## 2. Finding a tangent point using a radius

Suppose $y=kx+m$ is tangent to the ellipse. Its image is tangent to the unit circle. Write the transformed line as

$$
-akX+bY=m.
$$

The distance from the origin to this line equals the radius, $1$:

$$
\frac{|m|}{\sqrt{a^2k^2+b^2}}=1.
$$

Thus the tangency condition is

$$
\boxed{m^2=a^2k^2+b^2}.
$$

To find the point of contact, use the fact that the radius is perpendicular to the tangent. The vector $(-ak,b)$ is normal to the transformed line, so the point of contact $T'$ on the unit circle has the form

$$
T'=\lambda(-ak,b).
$$

Substituting into the line equation gives

$$
\lambda(a^2k^2+b^2)=m.
$$

The tangency condition then gives $\lambda=1/m$. Here $m\ne0$, since $a^2k^2+b^2>0$. Consequently,

$$
T'=\left(-\frac{ak}{m},\frac{b}{m}\right).
$$

Multiply the coordinates back by $a$ and $b$ to obtain the point of contact on the ellipse:

$$
\boxed{T=\left(-\frac{a^2k}{m},\frac{b^2}{m}\right)}.
$$

Writing $D=\sqrt{a^2k^2+b^2}$, the two parallel tangents with a prescribed slope $k$ correspond to

$$
\begin{aligned}
m=D:&\quad T_+=\left(-\frac{a^2k}{D},\frac{b^2}{D}\right),\\
m=-D:&\quad T_-=\left(\frac{a^2k}{D},-\frac{b^2}{D}\right).
\end{aligned}
$$

**These points belong to two different tangent lines.** For a particular line $y=kx+m$, the sign of $m$ determines which point applies.

This formula includes $k=0$, giving the tangents $y=\pm b$. Vertical tangents cannot be written as $y=kx+m$ and must be included separately: they are $x=\pm a$, with points of contact $(\pm a,0)$.

## 3. A sum of squared distances: see the structure on a circle

Another idea in my notes concerns an ellipse whose major-to-minor axis ratio is $2$ and a line of slope $1/2$. Isolating the relevant assumptions, let the ellipse be

$$
\frac{x^2}{4b^2}+\frac{y^2}{b^2}=1.
$$

Let $y=\tfrac12x+m$ meet the ellipse at two distinct points $A,B$, and let $C$ be its intersection with the $x$-axis. Consider $AC^2+BC^2$.

This time, divide only the horizontal coordinate by $2$:

$$
X=\frac{x}{2},\qquad Y=y.
$$

The ellipse becomes a circle of radius $b$, and the slope changes from $1/2$ to $1$:

$$
X^2+Y^2=b^2,\qquad Y=X+m.
$$

Denote the corresponding points by $A',B',C'$. Drop a perpendicular from the center $O$ to the line containing the chord, with foot $H$.

![Horizontal compression turns the ellipse into a circle. On the right, OH bisects chord A'B', and OH and HC' have equal lengths.](/posts/ellipse-to-circle-geometry/ellipse-circle.svg)

*The diagram uses $b=1$ and $m=0.6$. Dividing the horizontal coordinates on the left by $2$ produces the right-hand diagram. Perpendicularity is used in the circle on the right.*

A perpendicular from the center of a circle to a chord bisects the chord, so

$$
A'H=B'H.
$$

The chord line has slope $1$ and therefore makes an angle of $45^\circ$ with the horizontal axis. The right triangle $OHC'$ is isosceles, giving

$$
OH=HC'.
$$

When $m=0$, we have $H=C'=O$, and this equality still holds.

Since $H$ is the chord midpoint,

$$
A'C'^2+B'C'^2=2A'H^2+2HC'^2.
$$

This identity does not require $C'$ to lie inside the chord. Using a signed coordinate along the line with origin $H$, assign coordinates $s,-s,t$ to $A',B',C'$. The identity is simply

$$
(s-t)^2+(-s-t)^2=2s^2+2t^2.
$$

Now substitute $HC'=OH$ and apply the Pythagorean theorem to $OA'H$:

$$
\begin{aligned}
A'C'^2+B'C'^2
&=2(A'H^2+OH^2)\\
&=2OA'^2\\
&=\boxed{2b^2}.
\end{aligned}
$$

An expression that initially seems to invite lengthy expansion reduces to a chord midpoint, an isosceles right triangle, and the Pythagorean theorem.

## 4. Transforming the lengths back

The value $2b^2$ belongs to the **transformed circle**. It is not yet the answer for the original ellipse.

On the circle, the line has slope $1$, so the coordinate difference along any segment of this line can be written as $(u,u)$. Transforming back changes it to $(2u,u)$. The squared lengths are therefore

$$
\ell'^2=u^2+u^2=2u^2,\qquad
\ell^2=(2u)^2+u^2=5u^2.
$$

Every squared length along this line is multiplied by $5/2$. Hence

$$
\boxed{AC^2+BC^2=\frac52\cdot2b^2=5b^2}.
$$

Since $a=2b$ in this example, we can also write

$$
\boxed{AC^2+BC^2=a^2+b^2}.
$$

There is no single length scale factor for the entire plane. What matters here is that **$AC$ and $BC$ lie on the same line and therefore share the same directional length scale factor**.

## 5. Which properties survive the transformation?

Coordinate scaling is an invertible linear transformation, and hence an affine transformation. It preserves collinearity, parallelism, intersections, tangency, and ratios of segments on the same line. Midpoints are therefore preserved as well.

In general, however, it **does not preserve lengths, angles, or perpendicularity**. The fact that a radius is perpendicular to a tangent must be applied on the transformed circle. Back on the ellipse, the segment from the center to the point of contact is generally not perpendicular to the tangent. Lengths must also be converted according to their directions, as in the example above.

A hyperbola can be simplified by coordinate scaling too, but

$$
\frac{x^2}{a^2}-\frac{y^2}{b^2}=1
\quad\longrightarrow\quad
X^2-Y^2=1.
$$

The minus sign remains. A hyperbola cannot be transformed into a circle by the real invertible linear transformations used here, so the same circle geometry cannot simply be transferred to it.

## A final reflection

I originally recorded these ideas as geometric intuition. Working through the details showed me that, once the transformation rules and assumptions are explicit, they become rigorous arguments.

When I next encounter tangents, chords, or midpoints on an ellipse, I will consider turning it into a circle first. Seeing the structure there, then carefully converting coordinates and lengths back, can save a surprising amount of calculation.
