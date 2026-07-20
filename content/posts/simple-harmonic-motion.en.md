+++
date = '2026-07-11T11:00:00+08:00'
draft = false
title = 'From Infinite Subdivision to Rotation Matrices: How I Derived the Equation of Simple Harmonic Motion by Hand'
tags = ['Physics', 'Maths', 'Simple Harmonic Motion', "Euler's Formula"]
math = true
ShowToc = true
+++

High-school physics tells us that the displacement in simple harmonic motion (SHM) is a sinusoidal function. But textbooks never explain *why* — they assume a solution of the form $x(t)=\sin(\cdots)$, substitute it into the equation, verify that it works, and call it a day. That is a **working backwards from the unknown to the known** approach, and it has always left me uneasy.

So I decided to do the opposite: starting from Hooke's law as the sole axiom, I would analyse the evolution of velocity step by step and see whether I could **derive the unknown from the known** — letting that sine (or cosine) emerge on its own. This post records my two attempts: the first using brute-force infinite subdivision, the second using matrices and geometry. From complicated to clean, I ended up colliding head-on with Euler's formula.

<!--more-->

## First Attempt: Subdividing Time Infinitely

For simplicity, set the spring constant $k$ and the particle mass $m$ both equal to 1, with the particle starting at the equilibrium position with initial velocity $v$.

The core idea is: assume there is an infinitesimally short time step $t$, during which the acceleration and velocity **have no time to change** — they update only at the very end of the step. SHM is thus broken into a sequence of discrete updates:

- $v$ changes the position by $x$ (i.e.\ $x \mathrel{+}= vt$);
- $x$ determines the acceleration via Hooke's law: $a = -x$;
- $a$ changes the velocity (i.e.\ $v \mathrel{+}= at$);
- one step ends, the next begins — repeat.

Starting from the initial state and iterating by hand:

$$\text{Initial:}\quad x=0,\quad a=0,\quad v=v$$

$$\text{After }t:\quad x=vt,\quad a=-vt,\quad v=v-vt^2$$

$$\text{After another }t:\quad x=2vt-vt^3,\quad v=v-3vt^2+vt^4$$

$$\text{After another }t:\quad x=3vt-4vt^3+vt^5,\quad v=v-6vt^2+5vt^4-vt^6$$

$$\text{After another }t:\quad x=4vt-10vt^3+6vt^5-vt^7,\quad v=v-10vt^2+15vt^4-7vt^6+vt^8$$

## The Pattern Hidden in the Coefficients

Look closely at how $v$ evolves from one step to the next:

$$v$$
$$v-vt^2$$
$$v-3vt^2+vt^4$$
$$v-6vt^2+5vt^4-vt^6$$
$$v-10vt^2+15vt^4-7vt^6+vt^8$$

Two things stand out immediately: **the signs alternate**, and **each successive term carries one more power of $t^2$**. Strip away $v$ and $t$, keep only the absolute values of the coefficients, and you get a triangle:

$$
\begin{array}{ccccc}
1 \\
1 & 1 \\
1 & 3 & 1 \\
1 & 6 & 5 & 1 \\
1 & 10 & 15 & 7 & 1
\end{array}
$$

This triangle extends forever. Why does it look this way? Because $v = v_0 + at$, so $a$ "shifts one place" when it accumulates into $v$; and since $x = vt$, $a = -x$, the quantity $a$ already carries one extra factor of $t$ relative to $v$, so it adds directly into $a$'s own column. The two sequences accumulate into each other, rolling out the entire triangle.

## Each Column Is a Polynomial

Reading **vertically** column by column, each entry can be unpacked as a running sum of the previous column. Look at the second column:

$$1=1$$
$$3=1+(1+1)$$
$$6=1+(1+1)+(1+1+1)$$
$$10=1+(1+1)+(1+1+1)+(1+1+1+1)$$

(I deliberately write $1, 2, 3, 4$ as sums of $1$s to unify the notation with later columns.) The third column works the same way:

$$1=1$$
$$5=1+(1+3)$$
$$15=1+(1+3)+(1+3+6)$$

Treat each column as a sequence and apply finite differences: the first column needs no differencing to give $1$; the second column gives $1$ after differencing twice; the third gives $1$ after differencing four times… The pattern is **column $n$ yields all $1$s after $2n-2$ differences**.

The key insight: when we want the velocity at time $mt$ (i.e.\ at row $m$) and let $m \to +\infty$, we can approximate the discrete sequence as a continuous function and treat neighbouring differences as differentials. "Differencing $2n-2$ times gives the constant $1$" translates to "differentiating $2n-2$ times gives $1$" — meaning column $n$ is a polynomial whose leading term is

$$\frac{1}{(2n-2)!}\,m^{2n-2}$$

**Here is the key move**: this polynomial was built up by an enormous number of accumulations, so its lower-degree terms are extremely complicated; but because $m \to \infty$, we can safely drop every term except the leading one.

## Running Into the Cosine Series

Restoring the factors of $v$, $t^{2n-2}$, and the alternating sign $(-1)^{n+1}$ that were set aside earlier, the monomial at row $m$, column $n$ is:

$$(-1)^{n+1}\frac{1}{(2n-2)!}\,v\,m^{2n-2}\,t^{2n-2}$$

The velocity at time $mt$ is the sum of all $m$ such monomials in row $m$:

$$v_{mt}=\sum_{n=1}^{m}(-1)^{n+1}\frac{1}{(2n-2)!}\,v\,(mt)^{2n-2}=v-\frac{v(mt)^2}{2!}+\frac{v(mt)^4}{4!}-\frac{v(mt)^6}{6!}+\cdots$$

At this point I suddenly realised — this is exactly the Taylor series for $\cos$!

$$v(mt)=v\cos(mt)$$

**In simple harmonic motion, velocity satisfies a cosine relationship with time.** This was derived step by step from Hooke's law alone, with no trigonometric functions assumed at any point. (Setting $k = m = 1$ earlier was purely for convenience; the conclusion is identical with their full values.)

## Second Attempt: Packing $x$ and $v$ into a Vector

The first approach was rigorous, but the mutual accumulation of $x$ and $v$ made the algebra extremely heavy. I later realised: since $x$ and $v$ influence each other, why not treat them as two components of a single vector and convert the algebraic entanglement into **matrix multiplication**?

When $t \to 0$, one update step reads $x_{\text{new}} = x + vt$, $v_{\text{new}} = v + at = v - xt$, which in matrix form is:

$$\begin{bmatrix} x_{\text{new}} \\ v_{\text{new}} \end{bmatrix}=\begin{bmatrix} 1 & t \\ -t & 1 \end{bmatrix}\begin{bmatrix} x \\ v \end{bmatrix}$$

After elapsed time $mt$ we simply raise the transfer matrix to the $m$-th power and multiply by the initial state $x = 0$, $v = v_0$:

$$\begin{bmatrix} x \\ v \end{bmatrix}=\begin{bmatrix} 1 & t \\ -t & 1 \end{bmatrix}^m\begin{bmatrix} 0 \\ v_0 \end{bmatrix}$$

## A Matrix That Behaves Like the Imaginary Unit $i$

How do we compute the $m$-th power of this matrix? Notice it splits into the identity matrix plus $t$ times another matrix:

$$\begin{bmatrix} 1 & t \\ -t & 1 \end{bmatrix}=\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}+t\begin{bmatrix} 0 & 1 \\ -1 & 0 \end{bmatrix}=I+tA$$

Call the second matrix $A$. Why isolate it? Because the powers of $A$ follow a striking pattern:

$$A^2=\begin{bmatrix} -1 & 0 \\ 0 & -1 \end{bmatrix}=-I,\quad A^3=-A,\quad A^4=I,\quad A^5=A$$

$A$ behaves just like the imaginary unit $i$: squaring gives $-I$, the fourth power returns to $I$, cycling with period four. Since the transfer matrix is $I + tA$ and we are raising it to the $m$-th power with $m \to \infty$, we can apply the binomial theorem directly:

$$(I+tA)^m=I+mtA+\frac{m(m-1)}{2!}t^2A^2+\frac{m(m-1)(m-2)}{3!}t^3A^3+\cdots$$

Since $m \to \infty$, we have $\frac{m(m-1)\cdots}{k!} \approx \frac{m^k}{k!}$. Substituting $A^2 = -I$, $A^3 = -A$, $A^4 = I$:

$$=I+mtA-\frac{1}{2!}(mt)^2 I-\frac{1}{3!}(mt)^3 A+\frac{1}{4!}(mt)^4 I+\cdots$$

## Running Into $\cos$ and $\sin$ Again

Separating terms that contain $A$ from those that do not:

$$\Big(I-\frac{1}{2!}(mt)^2+\frac{1}{4!}(mt)^4-\cdots\Big)+A\Big(mt-\frac{1}{3!}(mt)^3+\cdots\Big)=I\cos(mt)+A\sin(mt)$$

There they are again — $\cos$ and $\sin$! Substituting back the matrices:

$$I\cos(mt)+A\sin(mt)=\begin{bmatrix} \cos(mt) & \sin(mt) \\ -\sin(mt) & \cos(mt) \end{bmatrix}$$

This is a **rotation matrix**! Plugging it into the original expression:

$$\begin{bmatrix} x \\ v \end{bmatrix}=\begin{bmatrix} \cos(mt) & \sin(mt) \\ -\sin(mt) & \cos(mt) \end{bmatrix}\begin{bmatrix} 0 \\ v_0 \end{bmatrix}=\begin{bmatrix} v_0\sin(mt) \\ v_0\cos(mt) \end{bmatrix}$$

Displacement is a sine, velocity is a cosine — fully consistent with the first approach, but the calculation is far cleaner.

## The Most Elegant Step: It Is Really Circular Motion

While staring at this method, I noticed something strange. The derivative of the state vector is:

$$\begin{bmatrix} x' \\ v' \end{bmatrix}=\begin{bmatrix} v \\ -x \end{bmatrix}$$

This is obvious ($x' = v$, $v' = a = -x$). But if you plot $\begin{bmatrix} x \\ v \end{bmatrix}$ in the Cartesian plane, you find that $\begin{bmatrix} v \\ -x \end{bmatrix}$ is exactly the result of rotating it **90° clockwise**!

This immediately explains why the powers of $A$ cycle so neatly — because **$A$ is fundamentally a 90° rotation**.

What does this mean? The derivative of the state vector $\begin{bmatrix} x \\ v \end{bmatrix}$ is **always perpendicular to itself and has the same magnitude**. A vector whose velocity is always perpendicular to itself and proportional in magnitude to itself — that is precisely the definition of **uniform circular motion**. The angular velocity is 1, so after time $mt$ the vector has rotated clockwise by angle $mt$:

$$\begin{bmatrix} x \\ v \end{bmatrix}=\begin{bmatrix} \cos(mt) & \sin(mt) \\ -\sin(mt) & \cos(mt) \end{bmatrix}\begin{bmatrix} x_0 \\ v_0 \end{bmatrix}$$

From a purely geometric perspective, this result is **obvious**. The essence of simple harmonic motion is a point tracing a circle at constant speed in phase space.

## Epilogue: Euler's Formula Was There All Along

From the first attempt — splitting $x$ and $v$ apart and hunting for patterns via accumulation — to the second — packing them into a vector and solving with matrices and geometry — I consider this genuine progress.

What is amusing is that all of this seems unrelated to Euler's formula $e^{i\theta} = \cos\theta + i\sin\theta$, yet it was being used implicitly the entire time:

- Expanding $(I + tA)^m$ via the binomial theorem is essentially a re-proof of the Taylor series for $e^x$.
- Splitting the result naturally into terms with $A$ and terms without $A$ is exactly decomposing $e^{i\theta}$ into its real and imaginary parts.
- The final geometric insight exploits precisely the fact that the derivative of $e^{i\theta}$ is $ie^{i\theta}$ — that is, "rotate yourself by 90°."

Textbooks substitute $\sin$ directly into the equation and verify it works — that is working backwards from the unknown. Here, starting from Hooke's law as the sole axiom and pressing forward until $\cos$ and $\sin$ emerge naturally — that is working forwards from the known. It is far more laborious, but also far more rigorous, and far more faithful to how reasoning actually works.

And on that note, this epic research concludes.
