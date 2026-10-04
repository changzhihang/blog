+++
date = '2026-10-04T17:24:00+08:00'
draft = false
title = 'From Circles to General Conics: Why the Tangent Substitution Works'
description = 'Derive tangent equations for ellipses, hyperbolas, parabolas, and general quadratic curves by preserving the value at the point of contact and scaling every differential equally.'
tags = ['Maths', 'Conic Sections', 'Tangents', 'Differentials']
math = true
ShowToc = true
+++

The tangent equations for circles, ellipses, and hyperbolas share a noticeable pattern: replace one factor in each squared term with the corresponding coordinate of the point of contact, and the quadratic equation becomes a tangent line. Why does this work? How should we handle the linear term in a parabola, or the mixed term in a general quadratic curve? I want to start with a circle and work out the rule step by step.

<!--more-->

## 1. Starting with a circle

Let $P=(x_0,y_0)$ lie on the circle

$$
x^2+y^2=r^2,\qquad r>0.
$$

The tangent at this point is

$$
\boxed{x_0x+y_0y=r^2}.
$$

Vectors give a direct proof. Let the origin $O$ be the center, and take any point $Q=(x,y)$ on the tangent. The radius $OP$ is perpendicular to the tangent, so

$$
\overrightarrow{OP}\cdot\overrightarrow{PQ}=0.
$$

Expanding gives

$$
x_0(x-x_0)+y_0(y-y_0)=0.
$$

Since the point of contact lies on the circle,

$$
x_0x+y_0y=x_0^2+y_0^2=r^2.
$$

Conversely, this equation describes the line through the point of contact perpendicular to the radius, so it is the tangent.

Algebraically, it looks as though we have simply replaced $x^2$ with $x_0x$ and $y^2$ with $y_0y$.

## 2. Testing the same idea on an ellipse

Consider the ellipse

$$
\frac{x^2}{a^2}+\frac{y^2}{b^2}=1,\qquad a,b>0.
$$

If $P=(x_0,y_0)$ lies on it, the circle formula suggests the tangent

$$
\boxed{\frac{x_0x}{a^2}+\frac{y_0y}{b^2}=1}.
$$

This line clearly passes through the point of contact. It remains to prove that **its direction agrees with the tangent direction of the ellipse at that point**.

The segment from the center of an ellipse to a point of contact is generally not perpendicular to the tangent, so the radius argument cannot be copied directly. We could also [scale the ellipse into a circle](/en/posts/ellipse-to-circle-geometry/), but here I want to understand the substitution from the equation itself.

Solving explicitly for one coordinate before differentiating introduces a square root and positive and negative branches. Instead, we can keep the symmetric equation and examine coordinate differences between nearby points.

Suppose $(x_0+\Delta x,y_0+\Delta y)$ is another point on the ellipse. Then

$$
\frac{(x_0+\Delta x)^2}{a^2}
+\frac{(y_0+\Delta y)^2}{b^2}=1.
$$

Subtracting the equation satisfied by the point of contact gives the exact identity

$$
\begin{aligned}
\frac{2x_0}{a^2}\Delta x+\frac{2y_0}{b^2}\Delta y
&=-\frac{(\Delta x)^2}{a^2}
-\frac{(\Delta y)^2}{b^2}.
\end{aligned}
$$

Intuitively, the quadratic terms on the right approach zero faster than the displacement does, leaving the linear terms to determine the tangent direction. We must not simply delete the quadratic terms and still treat the resulting equation as an exact identity for finite coordinate differences.

To see the limit precisely, let the displacement length be

$$
\rho=\sqrt{(\Delta x)^2+(\Delta y)^2}.
$$

Divide both sides by this nonzero length:

$$
\begin{aligned}
\frac{2x_0}{a^2}\frac{\Delta x}{\rho}
+\frac{2y_0}{b^2}\frac{\Delta y}{\rho}
&=-\frac{1}{\rho}\left(
\frac{(\Delta x)^2}{a^2}
+\frac{(\Delta y)^2}{b^2}\right).
\end{aligned}
$$

The quantity in parentheses is at most $\max(a^{-2},b^{-2})\rho^2$. The absolute value of the right-hand side is therefore at most $\max(a^{-2},b^{-2})\rho$, which does approach zero.

On the left, $\Delta x/\rho$ and $\Delta y/\rho$ are the components of the secant's unit direction. If they approach $u$ and $v$ along a limiting direction, then

$$
\frac{2x_0}{a^2}u+\frac{2y_0}{b^2}v=0.
$$

The ellipse is smooth, and the two coefficients cannot both vanish, so this condition determines the tangent direction.

In differential notation, the same direction condition is

$$
\frac{2x_0}{a^2}\,dx+\frac{2y_0}{b^2}\,dy=0.
$$

Here $dx$ and $dy$ describe first-order tangential changes, distinguished from the finite coordinate differences above. **A differential extracts the linear part**. For example,

$$
\Delta(x^2)=2x\Delta x+(\Delta x)^2,
\qquad d(x^2)=2x\,dx.
$$

Now consider the proposed line. Its direction condition is

$$
\frac{x_0}{a^2}\,dx+\frac{y_0}{b^2}\,dy=0.
$$

Multiplying this entire equation by two gives the tangent direction condition for the ellipse. The line has the correct direction and passes through the point of contact, so the conjectured tangent equation is correct.

We have not divided by $dx$, so vertical tangents are included. At $(a,0)$, for example, the direction condition gives $dx=0$, while the tangent equation directly gives $x=a$. Saying that the tangent directions agree also covers cases where there is no finite slope.

## 3. Why halving every differential preserves direction

The agreement between those two equations is not a coincidence.

Keep the point of contact fixed and compare the original square with its linear replacement at $x=x_0$:

$$
\left.d(x^2)\right|_{x=x_0}=2x_0\,dx,
\qquad d(x_0x)=x_0\,dx.
$$

Their values agree at the point of contact, while the second differential is half the first. The same holds for the other coordinate:

$$
\left.d(y^2)\right|_{y=y_0}=2y_0\,dy,
\qquad d(y_0y)=y_0\,dy.
$$

Thus, at the point of contact, the original relation

$$
\frac{d(x^2)}{a^2}=-\frac{d(y^2)}{b^2}
$$

is equivalent to

$$
\frac{d(x_0x)}{a^2}=-\frac{d(y_0y)}{b^2}.
$$

The key is that **we use the same $dx$ and $dy$ throughout; their coefficients change**. We do not halve the coordinate changes and then compare their ratio. We multiply the entire first-order zero equation by the same nonzero constant, leaving the set of allowed directions unchanged.

The substitution therefore does three things at once: it preserves the value at the point of contact, reduces the quadratic expression to a linear one, and preserves the tangent direction.

## 4. Hyperbolas and the linear term in a parabola

For the hyperbola

$$
\frac{x^2}{a^2}-\frac{y^2}{b^2}=1,\qquad a,b>0,
$$

the minus sign does not affect the argument that every differential is halved. Its tangent at a point $(x_0,y_0)$ on the curve is therefore

$$
\boxed{\frac{x_0x}{a^2}-\frac{y_0y}{b^2}=1}.
$$

But the parabola

$$
y^2=2px,\qquad p\ne0
$$

has no square on the right. What should replace the linear term?

Following the same approach, replace $y^2$ on the left with $y_0y$. This halves its differential at the point of contact. On the right, we need an affine function $h(x)$ satisfying

$$
h(x_0)=2px_0,
\qquad h'(x_0)=p.
$$

The derivative condition halves the differential, while the value condition keeps the point on the new line. With the slope determined, we only need to add the right constant:

$$
h(x)=px+px_0=p(x+x_0).
$$

The tangent equation is consequently

$$
\boxed{y_0y=p(x+x_0)}.
$$

The point of contact satisfies this equation, and the first-order direction conditions obey

$$
2y_0\,dy=2p\,dx
\quad\Longleftrightarrow\quad
y_0\,dy=p\,dx.
$$

Both requirements are satisfied.

### Making linear terms match the quadratic terms

Replacing $x$ with

$$
\lambda x+(1-\lambda)x_0
$$

preserves its value $x_0$ at the point of contact and multiplies its differential by $\lambda$. Setting $\lambda=1/2$ gives

$$
x\longmapsto\frac{x+x_0}{2}.
$$

This explains the compensating constant in the parabola formula: to match our replacement of the square, the linear term must also halve its differential while preserving its value at the point.

This is a convenient choice, but it is not the only way to reduce the degree. In my initial attempt,

$$
nx^2+(1-n)x_0x,
$$

the quadratic term disappears only when $n=0$. That observation applies to this particular family of expressions; it does not prove that every linear replacement must halve the differential. For example,

$$
x^2\longmapsto 2x_0x-x_0^2
$$

also preserves the value at the point of contact, while retaining the original differential. The benefit of choosing $x_0x$ is its simplicity and the uniform rule that every differential is halved.

## 5. The mixed term in a general quadratic curve

Now consider

$$
Ax^2+By^2+Cxy+Dx+Ey+F=0.
$$

The coefficients are constants, and the point of contact $P=(x_0,y_0)$ lies on the curve. We already know how to handle squares and linear terms:

$$
\begin{aligned}
x^2&\longmapsto x_0x, & y^2&\longmapsto y_0y,\\
x&\longmapsto\frac{x+x_0}{2}, & y&\longmapsto\frac{y+y_0}{2}.
\end{aligned}
$$

The constant $F$ must remain. Its differential is zero, but it affects the equation's value at the point of contact. Making no contribution when differentiating does not mean it can be deleted when constructing the new equation.

The remaining term is $Cxy$.

The full increment of the product is

$$
\Delta(xy)=x\Delta y+y\Delta x+\Delta x\Delta y.
$$

Extracting its first-order part gives

$$
d(Cxy)=C(x\,dy+y\,dx).
$$

At the point of contact, this becomes

$$
\left.d(Cxy)\right|_P=C(x_0\,dy+y_0\,dx).
$$

This suggests trying the linear expression

$$
Cx_0y+Cy_0x.
$$

Its differential agrees with that of the original mixed term at the point of contact, but its value there is twice the original value. Dividing the whole expression by two therefore meets both requirements:

$$
Cxy\longmapsto\frac C2(x_0y+y_0x).
$$

The new expression still has value $Cx_0y_0$ at the point of contact, and its differential is half the original differential. The mixed term has also been reduced to degree one.

## 6. A unified tangent equation

Collecting all the substitutions gives

$$
\begin{aligned}
x^2&\longmapsto x_0x,\\
y^2&\longmapsto y_0y,\\
xy&\longmapsto\frac{x_0y+y_0x}{2},\\
x&\longmapsto\frac{x+x_0}{2},\\
y&\longmapsto\frac{y+y_0}{2},\\
F&\longmapsto F.
\end{aligned}
$$

The original equation becomes

$$
\begin{aligned}
&Ax_0x+By_0y+\frac C2(x_0y+y_0x)\\
&\quad+\frac D2(x+x_0)+\frac E2(y+y_0)+F=0.
\end{aligned}
$$

Multiply by two and collect the coordinate terms:

$$
\boxed{
\begin{aligned}
&(2Ax_0+Cy_0+D)x\\
&\quad +(2By_0+Cx_0+E)y\\
&\quad +Dx_0+Ey_0+2F=0.
\end{aligned}
}
$$

This is the general tangent equation. It applies at a **regular point** of the curve, where the two first-order coefficients do not both vanish:

$$
(2Ax_0+Cy_0+D,\;2By_0+Cx_0+E)\ne(0,0).
$$

Every point on an ordinary nondegenerate circle, ellipse, hyperbola, or parabola satisfies this condition. For an arbitrary quadratic equation, it must be stated explicitly. Two intersecting lines, for example, can have all first-order terms vanish at their intersection; a zero differential then cannot determine a unique tangent.

## 7. The principle behind the substitutions

Let $f(x,y)$ be the left-hand side of the original equation, and let $g(x,y)$ be the substituted expression before multiplying the whole equation by two. Our construction satisfies

$$
f(P)=g(P)=0,
\qquad dg_P=\frac12\,df_P.
$$

The first condition makes the new line pass through the point of contact. The second makes the two first-order zero equations describe the same direction. Provided the original differential is nonzero and the new expression is affine, these conditions determine the tangent.

More generally, multiplying the entire differential by any fixed nonzero constant preserves the direction condition. That is why these substitutions work.

The pattern first noticed in the circle formula has become a general construction: **preserve the value at the point, retain the equation's first-order information, and express it with a line.** From this principle, the compensating constant for a parabola, the treatment of a mixed term, and the need to retain the constant term all follow naturally.
