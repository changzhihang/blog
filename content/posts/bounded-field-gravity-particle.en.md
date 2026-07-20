+++
date = '2026-07-16T11:50:00+08:00'
draft = false
title = 'Bounded Magnetic Field with Gravity: Two Solutions for the "Just-Exits" Condition'
tags = ['electromagnetism', 'physics', 'charged particle', 'magnetic field', 'cycloid']
math = true
ShowToc = true
+++

A classic high-school physics problem: a charged particle enters a bounded uniform magnetic field perpendicularly, and we ask how strong the field must be so the particle "just exits through the right boundary." The standard solution ignores gravity, and the trajectory is a clean circular arc. But what happens if **gravity is included and the problem is flipped — the field is given, and the width is what we seek**? The answer is: the circle becomes a **cycloid**, and the problem can still be solved elegantly — in two quite different ways. This post documents that extended problem (B6 Extension) and its two solutions.

<!--more-->

## Background: The Original Version Without Gravity

The original problem reads: a positive particle of mass $m$ and charge $q$ enters a uniform magnetic field of width $d$ **perpendicularly through the left boundary** at speed $v$ (field directed into the page), with gravity neglected.

With only the Lorentz force, the particle moves in uniform circular motion with radius $R = \dfrac{mv}{qB}$. The critical condition for "just exiting through the right boundary" is that the maximum horizontal penetration equals the width, i.e., $R = d$, giving

$$B=\frac{mv}{qd},\qquad t=\frac{T}{4}=\frac{\pi m}{2qB}=\frac{\pi d}{2v}$$

Clean and simple. **Why can gravity be ignored?** For a charged particle, gravity $mg$ is roughly $10^{12}$ times smaller than the Lorentz force $qvB$, making it entirely negligible. But as a conceptual extension, forcing gravity into the picture reveals a remarkably rich structure.

## The Extended Problem (B6 Extension)

> The setup is the same as the original (positive charge $m$, $q$, entering perpendicularly through the left boundary at speed $v$, field into the page), but this time **gravity is not neglected** (vertically downward, perpendicular to the initial velocity, with gravitational acceleration $g$), and **the magnetic flux density $B$ is given instead of the width $d$**. The particle **just exits through the right boundary** (trajectory is tangent to the right boundary). Find: (1) the width $d$ of the field region; (2) the time $t$ from entry to reaching the right boundary.

## Common Starting Point: Coordinate System and Tangency Condition

Set up a Cartesian coordinate system with the entry point as the origin, the horizontal rightward direction (perpendicular to the boundary) as the positive $x$-axis, and vertically upward as the positive $y$-axis. Initial velocity: $v_x(0)=v$, $v_y(0)=0$; the field points along $-z$ (into the page). Newton's second law yields the coupled equations:

$$m\frac{dv_x}{dt}=-qBv_y\qquad(\text{Eq. 1})$$

$$m\frac{dv_y}{dt}=qBv_x-mg\qquad(\text{Eq. 2})$$

**"Just exits through the right boundary" = trajectory is tangent to the right boundary = the horizontal velocity $v_x = 0$ when the particle reaches $x = d$** (velocity is purely vertical, parallel to the boundary at that instant). Both solutions start from this condition and simply take different paths to the answer.

## Solution 1: Drift Decomposition (Reducing to a Cycloid)

**Core idea**: Find a particular steady drift speed $v_{\text{drift}}$ such that the magnetic force exactly balances gravity:

$$q\,v_{\text{drift}}B=mg\;\Longrightarrow\;v_{\text{drift}}=\frac{mg}{qB}\quad(\text{horizontal direction})$$

Decompose the velocity into "this drift plus the remainder." The remainder experiences only the magnetic force and undergoes **uniform circular motion** at angular frequency $\omega=\dfrac{qB}{m}$. Superimposed, the trajectory is a **cycloid** (like the path traced by a point on the rim of a rolling wheel):

$$v_x(t)=v_{\text{drift}}+(v-v_{\text{drift}})\cos\omega t,\qquad x(t)=v_{\text{drift}}\,t+\frac{v-v_{\text{drift}}}{\omega}\sin\omega t$$

**Tangency condition** $v_x(t^{*})=0$:

$$\cos\omega t^{*}=-\frac{v_{\text{drift}}}{v-v_{\text{drift}}}=-\frac{mg}{qvB-mg}$$

**Time**, solved directly:

$$t=\frac{m}{qB}\arccos\!\left(\frac{-mg}{qvB-mg}\right)$$

**Width** $d=x(t^{*})$; substituting and simplifying yields an explicit expression in terms of fundamental quantities:

$$\boxed{\,d=\frac{m}{q^{2}B^{2}}\left[\,mg\,\arccos\!\left(\frac{-mg}{qvB-mg}\right)+\sqrt{\,qBv\,(qBv-2mg)\,}\,\right]}$$

The advantage of this approach is that it **writes down the entire trajectory** (the cycloid) upfront, and the condition plugs in directly.

## Solution 2: Integral Method + Work–Energy Theorem

This approach has more of a "physics feel" — instead of writing out the full trajectory, it **integrates the equations of motion** and combines them with the **work–energy theorem**, extracting the key quantities one by one.

**Step 1: Integrate Eq. 1 to find the height $y$ at the tangency point.**

$$\int_0^t m\,dv_x=\int_0^t -qB\,v_y\,dt\;\Longrightarrow\;m(v_x-v)=-qB\,y$$

(Here we used $\int_0^t v_y\,dt=y$, the vertical displacement.) At tangency, $v_x=0$:

$$-mv=-qB\,y\;\Longrightarrow\;y=\frac{mv}{qB}$$

Remarkably: **the height gained at the tangency point, $y=\dfrac{mv}{qB}$, is independent of $g$.**

**Step 2: Use the work–energy theorem to find the vertical speed $v_y$ at the tangency point.**

The Lorentz force is always perpendicular to the velocity and **does no work**; throughout the motion only gravity does (negative) work. At tangency, only the vertical component $v_y$ remains:

$$-mgy=\frac12 mv_y^{2}-\frac12 mv^{2}\;\Longrightarrow\;v_y=\sqrt{\,v^{2}-\frac{2mgv}{qB}\,}$$

(The square root requires $qvB\ge 2mg$: the Lorentz force must be strong enough for the particle to curve noticeably and become tangent; otherwise the particle simply falls to the lower right.)

**Step 3: Integrate Eq. 2 to find the width $d$.**

$$\int_0^t m\,dv_y=\int_0^t(qBv_x-mg)\,dt\;\Longrightarrow\;m\,v_y=qB\,x-mg\,t$$

Setting $x=d$:

$$d=\frac{m\,v_y+mg\,t}{qB}$$

**Step 4: Solve the differential equation system to find time $t$.** Let $\omega=\dfrac{qB}{m}$; the solution is

$$v_x(t)=\frac{g}{\omega}+\left(v-\frac{g}{\omega}\right)\cos\omega t$$

Setting $v_x=0$:

$$\cos\omega t=\frac{mg}{mg-qvB}\;\Longrightarrow\;t=\frac{m}{qB}\arccos\!\left(\frac{mg}{mg-qvB}\right)$$

**Combining** $v_y$ and $t$ back into Step 3:

$$\boxed{\,d=\frac{m}{qB}\sqrt{\,v^{2}-\frac{2mgv}{qB}\,}+\frac{m^{2}g}{q^{2}B^{2}}\arccos\!\left(\frac{mg}{mg-qvB}\right)}$$

$$\boxed{\,t=\frac{m}{qB}\arccos\!\left(\frac{mg}{mg-qvB}\right)}$$

## Both Paths Lead to the Same Answer

The two solutions yield **exactly the same result**:

- The $\arccos$ arguments for the time agree: $\dfrac{mg}{mg-qvB}=-\dfrac{mg}{qvB-mg}$;
- For the width, Solution 2's $\dfrac{m}{qB}\sqrt{v^{2}-\frac{2mgv}{qB}}$ equals Solution 1's $\dfrac{1}{q^{2}B^{2}}\sqrt{qBv(qBv-2mg)}\cdot m$; they are identically equal.

The difference lies in **approach**: Solution 1 writes the cycloid trajectory directly and applies the tangency condition; Solution 2 never writes the full trajectory, instead using integration of the equations of motion to get $y$ and the work–energy theorem to get $v_y$, extracting the key quantities elegantly. The former leans on "kinematic geometry," the latter on "dynamics plus work–energy relations."

## Verification: Let $g\to0$ and Recover the Original Problem

When gravity vanishes:

- Time: $t\to\dfrac{m}{qB}\arccos 0=\dfrac{\pi m}{2qB}=\dfrac{T}{4}$, exactly the original result of "turning $90^{\circ}$, one quarter-period";
- Width: $d\to\dfrac{m}{qB}\sqrt{v^{2}}=\dfrac{mv}{qB}=r$, exactly the original critical condition $r=d$.

Both solutions recover the classical result perfectly.

## An Interesting Aside: Forward–Inverse Asymmetry

The most elegant aspect of this problem is the **asymmetry between forward and inverse directions**:

- **Given $B$, find $d$**: As shown above, $d=f(B)$ is an explicit function — just substitute and evaluate;
- **Conversely, given $d$, find $B$**: $B$ appears inside and outside $\arccos$ and $\sqrt{\phantom{x}}$ simultaneously, so inverting this function yields a **transcendental equation** with no elementary closed-form solution in general — only numerical methods work.

The same problem is "one-step" in one direction and "analytically unsolvable" in the other — a hallmark of transcendental equations (just as $y=x+\sin x$ is trivial given $x$, but solving for $x$ given $y$ is hard). The original problem could be set as "given $d$, find $B$" with a clean answer precisely because it **ignored gravity** — once gravity enters, the inverse direction loses its elegance.

## Summary

- With gravity included, the trajectory of the charged particle changes from a **circle** to a **cycloid** (uniform circular motion plus a horizontal drift $v_{\text{drift}}=\frac{mg}{qB}$);
- The tangency condition for "just exiting the right boundary" is $v_x=0$ at the deepest penetration point — the key shared by both solutions;
- **Solution 1 (drift decomposition)** writes the cycloid directly and applies the tangency condition; **Solution 2 (integration + work–energy theorem)** extracts the key quantities by integrating the equations of motion and using work–energy relations — both paths lead to the same destination;
- Given $B$, both $t$ and $d$ have **explicit closed-form solutions**, and taking $g\to0$ perfectly recovers the classical $t=\frac{T}{4}$, $d=r=\frac{mv}{qB}$; the inverse direction (given $d$, find $B$) is a transcendental equation, dramatically harder.

A problem that might seem "beyond the syllabus" threads together the cycloid, a tangency condition, two contrasting solution styles, a limiting-case check, and the forward–inverse asymmetry of transcendental equations into one beautiful arc. That is exactly why it is worth recording.
