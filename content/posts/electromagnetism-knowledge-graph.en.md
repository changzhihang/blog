+++
date = '2026-07-25T19:24:00+08:00'
draft = false
title = 'Electromagnetism Knowledge Graph: From the Electric Field to EM Waves'
tags = ['Physics', 'Electromagnetism', 'Knowledge Graph', 'Gaokao']
math = true
ShowToc = true
+++

Compiled from the electromagnetism knowledge-graph project [gaokao-kg](https://github.com/haha1903/gaokao-kg) ([interactive version](https://haha1903.github.io/gaokao-kg/)): 25 knowledge points across four layers — Basics → Electric Field → Magnetic Field → Induction & Unification. Items marked ⭐ are advanced extensions.

<!--more-->

## 1. Basics

The field viewpoint and electric charge — the starting point of everything.

### The Field Viewpoint

> Charges don't act on each other directly across empty space; a charge first excites an *electric field* in the surrounding space, and the field then exerts force on other charges in it.

This is the **conceptual bedrock** of all electromagnetism. The interaction between two charges is not an "action-at-a-distance" transmitted instantly, but happens in two steps:

- Charge A **excites an electric field** in the surrounding space (a field is an invisible but genuinely real form of matter);
- Charge B sits in that field and **feels a force from the field**.

So "force" is decomposed into "**source charge → field → charged body feeling the force**". The reason for introducing the field is that it can be described independently as a **property of space itself** (see "Electric Field Strength"), without having to refer to the other charge each time.

A field is a vector field: every point has a magnitude and direction; fields from multiple sources add as vectors.

### Charge · Conservation · Elementary Charge

> Nature has only two kinds of charge, positive and negative; charge is conserved; the smallest unit is the elementary charge e.

Charge is the **origin** of electromagnetic phenomena.

- **Two kinds of charge**: positive and negative. Like charges repel, unlike charges attract.
- **Elementary charge** $e = 1.6\times10^{-19}\ \mathrm{C}$; the charge of any charged body is an integer multiple of $e$ (charge quantization).
- **Conservation of charge**: charge can neither be created nor destroyed, only transferred. The three ways of charging — friction, contact, induction — are all fundamentally transfers of electrons.

## 2. Electric Field

Electrostatics: a derivation chain from force to energy.

### Coulomb's Law

> The interaction force between two point charges in vacuum, F=kq₁q₂/r², is the foundation of all of electrostatics. The constant k hides the vacuum permittivity ε₀.

**Basic expression**:

$$F = k\dfrac{q_1 q_2}{r^2}$$

The direction is along the line joining the charges; like charges repel, unlike charges attract. **Valid for: point charges in vacuum** (or uniformly charged spheres, using the center-to-center distance).

**Electrostatic constant k**: $k = 8.99\times10^{9}\ \mathrm{N\cdot m^2/C^2}$ (often approximated as $9\times10^9$).

**⭐ Relation between k and the vacuum permittivity ε₀**: the constant $k$ does not come out of nowhere — it is determined by the **vacuum permittivity** $\varepsilon_0$:

$$k = \dfrac{1}{4\pi\varepsilon_0}\,,\qquad \varepsilon_0 \approx 8.85\times10^{-12}\ \mathrm{C^2/(N\cdot m^2)}$$

So Coulomb's law is also often written $F=\dfrac{q_1 q_2}{4\pi\varepsilon_0 r^2}$. That $4\pi$ comes from "a point charge's field spreading evenly in all directions" (sphere area $4\pi r^2$).

**⭐ Coulomb force in a medium · relative permittivity εᵣ**: if the two charges are in a medium rather than vacuum, the force is **weakened**:

$$F = \dfrac{q_1 q_2}{4\pi\varepsilon r^2}\,,\qquad \varepsilon = \varepsilon_0\,\varepsilon_r$$

- $\varepsilon$: the **(absolute) permittivity** of the medium;
- $\varepsilon_r$: the **relative permittivity** (multiple relative to vacuum), $\varepsilon_r>1$;
- the medium reduces the force to $1/\varepsilon_r$ of its vacuum value (e.g. water $\varepsilon_r\approx80$, a steep drop).

This chain of constants threads Coulomb force → k → ε₀ → medium εᵣ into one continuous line, and also explains why an ε later shows up in the capacitor formula.

### Electric Field Strength E=F/q

> Define the strength of the field using a test charge: E=F/q, independent of the test charge, a vector describing the *force* aspect of the field.

**Definition (universal)**:

$$E = \dfrac{F}{q}$$

Place a **test charge** $q$ at a point in the field, measure the force $F$ on it; the ratio $F/q$ is the field strength there. Key point: this ratio is **independent of $q$** (larger $q$, larger force), so it reflects a property of **the field itself** at that point.

- **Vector**, direction = the force direction on a positive charge there; unit $\mathrm{N/C}$.
- This is the classic "ratio definition" method (same idea as $B=F/(IL)$ later).

**The division of labor among the three E formulas (don't mix them up!)**:

| Formula | Role | Applies to |
| --- | --- | --- |
| $E=F/q$ | definition | any field, universal |
| $E=kQ/r^2$ | determining formula | field produced by a point charge Q |
| $E=U/d$ | relation | uniform field only, links to potential |

The definition says "how to measure it," the determining formula says "who produces it and how big," the relation says "how to convert to and from potential."

### Point-Charge Field E=kQ/r²

> The field strength a point charge Q excites at distance r; it's a *determining formula* — set by the source charge and the position.

Divide Coulomb's law $F=k\dfrac{Qq}{r^2}$ by the test charge $q$; $q$ cancels, giving the field the point charge itself produces:

$$E = k\dfrac{Q}{r^2} = \dfrac{Q}{4\pi\varepsilon_0 r^2}$$

where the electrostatic constant $k = 8.99\times10^{9}\ \mathrm{N\cdot m^2/C^2}$ and the vacuum permittivity $\varepsilon_0 \approx 8.85\times10^{-12}\ \mathrm{C^2/(N\cdot m^2)}$.

- Direction: radially **outward** for a positive source, radially **inward** for a negative source;
- It is a **determining formula**: $E$ is set by the source charge $Q$ and distance $r$, regardless of whether a test charge is present;
- Difference from the definition $E=F/q$: $E=F/q$ is "how to measure any field," $E=kQ/r^2$ is "how big this particular point-charge field is."

### Field Lines · Superposition Principle

> A visual description of the field: the tangent gives direction, density gives magnitude; fields from multiple sources add as vectors.

**Field lines**:

- The **tangent** at a point = the field direction there; **density** = field magnitude.
- They start on positive charges and end on negative charges (or at infinity); they **don't close and don't cross**.
- A **uniform field**'s field lines are a family of **parallel, equally spaced** straight lines (as inside parallel plates).

**Superposition principle**: the field produced jointly by several charges equals the **vector sum** of the fields each produces alone: $\vec{E}=\vec{E_1}+\vec{E_2}+\cdots$. This lets the field of a complex charge system be broken down and computed piece by piece.

### Uniform Field & E=U/d

> In a uniform field E=U/d, tying the *force-side field strength E* directly to the *energy-side potential difference U* — one of the most often glossed-over relations.

**What a uniform field is**: a field with the **same magnitude and direction everywhere** (typically the interior of a parallel-plate capacitor, ignoring edges). Field lines are parallel and equally spaced.

**Core relation**:

$$E = \dfrac{U}{d}$$

**This formula holds only for a uniform field**, and **d must be the distance between two points along the field direction** (not any direction, not just any plate separation).

**Where it comes from (derivation)**: in a uniform field the electric force $F=qE$ is constant. Move a charge a distance $d$ along the field:

- from the "energy" view, the work is $W=qU$;
- from the "force" view, the work is $W=Fd=qEd$;
- equating them $\Rightarrow qU=qEd \Rightarrow U=Ed \Rightarrow E=\dfrac{U}{d}$.

**Why the two units of field strength are the same**: $E=F/q$ gives the unit $\mathrm{N/C}$; $E=U/d$ gives $\mathrm{V/m}$. They are **numerically and dimensionally equivalent**: $\mathrm{V/m}=\mathrm{N/C}$. The same "field strength," defined once from force and once from energy, arriving at the same place.

**⭐ Deeper meaning**: $E=U/d$ shows that **field strength = the rate of change of potential along the field direction** (the spatial gradient of potential). So **E always points in the direction of steepest decrease of potential**, with magnitude equal to "how many volts the potential drops per meter." This foreshadows the university-level $\vec{E}=-\nabla\varphi$.

In one line: E=U/d is the exchange rate between the "language of force (E)" and the "language of energy (U)" in an electric field.

### Electric Force F=qE

> Given the field, find the force: F=qE. Positive charges along E, negative charges against E; a charge feels the force even at rest.

$$F = qE$$

This is the **inverse use** of $E=F/q$: once the field $E$ at a point is known, any charge $q$ placed there feels a force $qE$.

- Positive charges feel a force **along E**, negative charges **against E**;
- **Independent of motion: a charge at rest still feels the force** (this is exactly the essential difference from the Lorentz force — the Lorentz force requires the charge to move).

### Work Done by the Electric Force W=qU

> W=qU, determined only by the potential difference between start and end points and independent of path ⟹ the electric force is conservative (the energy hub).

$$W_{AB} = qU_{AB} = q(\varphi_A - \varphi_B)$$

- **Independent of path**, depending only on the potential difference between start and end;
- This is precisely the test of a **conservative force** — only with a conservative force can potential energy be defined. This step is the **hub** crossing from the "force description (E)" to the "energy description (φ, U)";
- In a uniform field $W=qEd$ ($d$ along the field).

### Electric Potential Energy Ep=qφ

> Potential energy defined because the electric force is conservative: Ep=qφ; work done by the electric force = decrease in potential energy.

$$E_p = q\varphi\,,\qquad W_{AB} = E_{pA} - E_{pB}$$

- When the electric force does positive work, potential energy decreases (analogous to gravity's work and gravitational PE);
- A positive charge moving from high to low potential: the electric force does positive work, $E_p$ decreases; opposite for a negative charge;
- The sign of $E_p$ must be judged together with the sign of $q$.

### Potential φ / Potential Difference U / Equipotential Surfaces

> Potential φ describes the *energy* aspect of the field (φ=Ep/q); potential difference U=φA−φB; equipotential surfaces ⊥ field lines.

$$\varphi = \dfrac{E_p}{q}\,,\qquad U_{AB} = \varphi_A - \varphi_B$$

- Potential $\varphi$ is a **scalar**, with only magnitude and sign, describing the "energy" aspect of the field (complementary to the vector $E$ describing "force");
- Along a field line, potential **decreases**;
- **Equipotential surface**: a surface of equal potential, always **perpendicular to field lines**; moving a charge along an equipotential surface, the electric force does **no work**.

### Charged Particle Motion in an Electric Field

> Along the field → uniformly accelerated straight line; entering perpendicular → projectile-like. The principle behind oscilloscope deflection.

- **Entering along the field**: uniformly accelerated straight-line motion; acceleration obeys $qU=\tfrac12 mv^2$ (work-energy theorem).
- **Entering a uniform field perpendicular to it**: projectile-like. Uniform along the initial velocity, uniformly accelerated along the field, the path is a parabola.
- Standard approach: **decompose** into "along the field" and "perpendicular to the field" and apply kinematics to each.
- Application: deflection of the electron beam in an oscilloscope.

### Capacitor C=Q/U

> A component that stores charge: C=Q/U; the permittivity ε is hidden inside the parallel-plate capacitance formula.

$$C = \dfrac{Q}{U}$$

The capacitance $C$ measures the "ability to store charge," independent of $Q$ and $U$ (it's a property of the component).

**⭐ Parallel-plate capacitor**:

$$C = \dfrac{\varepsilon S}{4\pi k d} = \dfrac{\varepsilon_0 \varepsilon_r S}{d}$$

The larger the plate area $S$, the smaller the separation $d$, and the larger the medium's $\varepsilon_r$, the larger the capacitance. **This ε is exactly the permittivity from Coulomb's law** — the chain of constants closes here.

**Dynamic analysis (error-prone)**:

- **Always connected to the source**: $U$ is fixed. Change $d$ or the medium, and $Q$, $E$ change accordingly ($E=U/d$).
- **Charged then disconnected**: $Q$ is fixed. Change $d$, and $U$ changes, but $E=U/d=Q/(\varepsilon_0\varepsilon_r S)$ is independent of $d$.

### Electric-Field Energy

> The electric field itself stores energy: a capacitor stores ½CU²; energy is spread through space with density ½ε₀E². Perfectly symmetric with magnetic-field energy.

**First distinguish: field energy ≠ potential energy**

- **Potential energy** $E_p=q\varphi$: the energy of "a **charge** in an electric field";
- **Field energy**: the energy stored by "**the field itself**" — spread through the space where the field exists, not attached to any particular charge.

These are concepts at different levels; don't mix them. Here we mean the latter.

**Capacitor energy storage**: charging a capacitor stores energy between the plates in the form of an electric field:

$$W = \dfrac{1}{2}CU^2 = \dfrac{1}{2}QU = \dfrac{Q^2}{2C}$$

On discharge this energy is released (camera flashes and defibrillators both rely on a capacitor's sudden discharge).

**⭐ Energy density: energy lives in the "field"**: more fundamentally, the energy is not on the plates but **spread through the space where the field exists**, with energy per unit volume (energy density):

$$u = \dfrac{1}{2}\varepsilon_0 E^2$$

The stronger the field $E$ somewhere, the denser the stored energy there. This shows **the field is the carrier of energy**, and energy can exist in space independently of charges.

It is perfectly symmetric with magnetic-field energy $\tfrac12 LI^2$, $u=\dfrac{B^2}{2\mu_0}$ — capacitor ↔ inductor, E ↔ B. Electromagnetic waves are precisely these two field energies stored alternately in space and propagating forward.

## 3. Magnetic Field

The magnetic field: how the Lorentz force forces uniform circular motion.

### Sources of the Magnetic Field

> Moving charges / currents excite magnetic fields; there are no magnetic monopoles, so field lines close on themselves; direction from Ampère's rule.

- **Source**: moving charges, currents (and magnets, which are fundamentally molecular currents). A charge at rest produces no magnetic field.
- **No magnetic monopoles**: the field has no "source" or "sink," so **magnetic field lines are closed curves** (unlike electric field lines, which start on positive and end on negative).
- **Direction — Ampère's right-hand rule**: for a straight wire, grip it with the right hand, thumb along the current, curled fingers give the field direction; for a solenoid the thumb points to the N pole.

### Magnetic Flux Density B / Magnetic Flux Φ

> B=F/(IL) describes the strength of the magnetic field (a vector); the flux Φ=BS measures the field lines through an area.

**Magnetic flux density B**:

$$B = \dfrac{F}{IL}$$

Defined via "the force on a current-carrying wire" (a ratio definition, same idea as $E=F/q$): when $B\perp I$, $B$ equals the Ampère force per unit current per unit length. A **vector**, unit **tesla T**.

**Magnetic flux Φ**:

$$\Phi = BS$$

A **scalar**, the "number" of field lines through an area $S$ ($S$ taken perpendicular to $B$). It is the protagonist of induction later — **once Φ changes, electricity is generated**.

### Ampère Force F=BIL

> The force a magnetic field exerts on a current-carrying wire, F=BIL, direction from the left-hand rule — the principle of the electric motor.

$$F = BIL\quad(B\perp I)\,,\qquad \text{in general}\ F = BIL\sin\theta$$

- **Direction: left-hand rule** — field lines through the palm, fingers along the current, thumb gives the force direction.
- Applications: the **electric motor**, moving-coil meters (converting current into rotation).
- The Ampère force **can do work** (pushing the wire), realizing electrical ↔ mechanical energy conversion — the other side of energy conversion in induction.

### Lorentz Force F=qvB

> The force a magnetic field exerts on a moving charge, F=qvB, always perpendicular to the velocity ⟹ does no work, changes only direction, not speed.

$$F = qvB\quad(v\perp B)\,,\qquad \text{in general}\ F = qvB\sin\theta$$

- **Direction: left-hand rule** (fingers along $v$ for a positive charge; opposite for negative).
- The charge **must be moving** and have a velocity component perpendicular to the field to feel a force (the exact opposite of the electric force, which acts even at rest).
- **Key causation: $F\perp v$** ⟹ the Lorentz force **never does work** ⟹ kinetic energy is unchanged ⟹ **speed unchanged, only direction changes**.
- It is the **microscopic essence** of the Ampère force (the macroscopic resultant of the Lorentz forces on the many moving electrons in a wire = the Ampère force).

### Uniform Circular Motion r=mv/(qB)

> When v⊥B the Lorentz force acts as the centripetal force, giving uniform circular motion; the period T=2πm/(qB) is independent of speed!

**Why it's uniform circular motion**: the Lorentz force is constant in magnitude ($v$ unchanged) and always perpendicular to the velocity, pointing to the same side — exactly the condition for uniform circular motion. So it serves as the **centripetal force**:

$$qvB = \dfrac{mv^2}{r}$$

**Solving for radius and period**:

$$r = \dfrac{mv}{qB}\,,\qquad T = \dfrac{2\pi m}{qB}$$

- **The period T is independent of speed v and radius r**, set only by the charge-to-mass ratio $q/m$ and $B$ — the fundamental reason a cyclotron can keep accelerating at a fixed frequency.
- The charge-to-mass ratio $\dfrac{q}{m}$ is the central quantity in magnetic-field problems.
- If $v$ is oblique to $B$: decompose into $v_\parallel$ (uniform) + $v_\perp$ (circular) → a combined **helix**.

### Magnetic-Field Applications: Mass Spectrometer / Cyclotron / Velocity Selector

> Joint applications of electric and magnetic fields; the velocity selector qE=qvB is where the two fields meet.

**Velocity selector (where electric × magnetic meet)**: make the electric force and the Lorentz force **opposite in direction and equal in magnitude**:

$$qE = qvB \;\Rightarrow\; v = \dfrac{E}{B}$$

Only particles with exactly $v=E/B$ are balanced and pass straight through; the rest are deflected out. A textbook case of the electric and magnetic fields "cooperating."

**Mass spectrometer**: after velocity selection, particles enter a pure magnetic field and move in a circle, $r=\dfrac{mv}{qB}$; from $r$ one back-solves the mass / charge-to-mass ratio, used to distinguish isotopes.

**⭐ Cyclotron**: exploiting **T being independent of v**, a fixed-frequency alternating voltage accelerates particles again and again across the gap between two D-shaped chambers, with an ever-growing radius.

## 4. Induction & Unification

Changing flux generates electricity; the unification of electricity and magnetism.

### Changing Flux → Induced EMF ε=nΔΦ/Δt

> Once the flux through a loop changes, an induced EMF appears (Faraday's law of induction).

**Faraday's law of induction**:

$$\varepsilon = n\dfrac{\Delta\Phi}{\Delta t}$$

The induced EMF is proportional to the **rate of change of flux** ($n$ = number of turns). Note it's the "rate of change," not the flux itself — **if Φ doesn't change, no electricity is generated**.

**Three ways the flux can change**:

- $B$ changes (a changing field);
- $S$ changes (the loop area changes);
- the angle between $B$ and $S$ changes (the coil rotates — the principle of the generator).

**Motional EMF**: a rod cutting field lines gives $\varepsilon = BLv$ (when $B$, $L$, $v$ are mutually perpendicular). Fundamentally it is the free charges in the conductor being driven by the **Lorentz force** — linking magnetic and electric fields again.

### Motional EMF ε=BLv · The Rail Model

> A rod cutting field lines produces ε=BLv; it is the *back-EMF* inside a motor, with loop current I=(ε_source−BLv)/R. The hub between generating and motoring.

**Motional EMF**: a rod of length $L$ moving at speed $v$ in a field $B$ ($B$, $L$, $v$ mutually perpendicular), cutting field lines, produces an EMF:

$$\varepsilon = BLv$$

Direction from the right-hand rule: open the right hand, field lines through the palm, thumb along the rod's motion, fingers give the induced-current direction.

**Microscopic essence: still the Lorentz force**: once the rod moves, its free charges acquire the rod's velocity $v$, so they feel a **Lorentz force** $qvB$ pushing them along the rod; charge piles up at the ends and forms a potential difference — that is the origin of the EMF. So $\varepsilon=BLv$ is fundamentally still the Lorentz force, only this time it drives charge **along the rod**.

**Back-EMF (inside a motor)**: once a current-carrying wire is pushed into motion by the Ampère force, its very motion produces $BLv$. By Lenz's law this EMF **always opposes the original current**, hence "back-EMF," and it weakens the net EMF of the loop.

**The rail model: how to compute the current**: rod + rails + source (EMF $\varepsilon_0$) + total loop resistance $R$, the closed-circuit equation:

$$\varepsilon_0 - BLv = IR \;\Rightarrow\; I = \dfrac{\varepsilon_0 - BLv}{R}$$

- At the instant of starting $v=0$: current is maximal $I_0=\dfrac{\varepsilon_0}{R}$;
- as the rod speeds up → $BLv$ grows → $I$ shrinks → the Ampère force $F=BIL$ shrinks;
- final no-load state: $BLv=\varepsilon_0$, current is 0, reaching the maximum speed $v_{\max}=\dfrac{\varepsilon_0}{BL}$;
- with a load (friction / weight): at steady state the Ampère force exactly balances the load and the current settles at the corresponding value.

**Energy conservation**: multiply both sides of the circuit equation by $I$:

$$\varepsilon_0 I = I^2 R + BLv\cdot I$$

The three terms are: **source output power** = **resistive heat loss** + **Ampère-force mechanical power**. The term $BLv\cdot I$ (back-EMF × current) is exactly the part the magnetic field "hands off" into mechanical energy — the field is only an intermediary, contributing no energy of its own.

Cutting to generate ($\varepsilon=BLv$, the generator) and carrying current to feel a force ($F=BIL$, the motor) are two faces of the same rod, tied together by energy conservation. The rail model is the core vehicle of the hardest induction problems on the Shanghai exam — practice it thoroughly.

### Magnetic-Field Energy

> The magnetic field itself stores energy: an inductor stores ½LI²; density B²/(2μ₀). Storing and releasing is done via induction, and the magnetic force never does work. Symmetric with electric-field energy.

**Inductor energy storage**: energizing an inductor coil and building up its field stores energy in the form of a **magnetic field**:

$$W = \dfrac{1}{2}LI^2$$

When the circuit is broken the field collapses and this energy is released — **this is why breaking a large-inductance circuit produces a spark** (the stored magnetic energy is released in an instant, producing a very high self-induced EMF).

**⭐ Energy density**: energy is spread through the space where the field exists, storing per unit volume:

$$u = \dfrac{B^2}{2\mu_0}$$

where the vacuum permeability $\mu_0 = 4\pi\times10^{-7}\ \mathrm{T\cdot m/A}$. The stronger $B$, the denser the stored energy.

**Key clarification: the magnetic force does no work, yet the field stores energy?** No contradiction. The difference is whether the field **changes**:

- **Steady field** (a motor, a coil in a uniform field): the field is unchanged → magnetic energy is unchanged → the field is just a "conveyor belt," handing electrical energy off into mechanical energy, its own energy store untouched.
- **Changing field** (an inductor being energized / de-energized, a transformer): magnetic energy is genuinely being stored and released.

And the storing/releasing of magnetic energy is **not done by the magnetic force** (the Lorentz force never does work), but by **induction** — the **electric field** induced by the changing magnetic field does work on charges and carries the energy. So "the magnetic force does no work" and "magnetic-field energy is stored and released" remain consistent.

It is perfectly symmetric with electric-field energy $\tfrac12 CU^2$, $u=\tfrac12\varepsilon_0 E^2$ — inductor ↔ capacitor, B ↔ E.

### Lenz's Law / Right-Hand Rule

> The induced current's direction always *opposes* the change in flux that causes it; use the right-hand rule for cutting.

**Lenz's law (finding direction)**: the effect of the induced current **always opposes the change in flux** — if flux increases, the induced current's field opposes it ("increase → oppose"); if flux decreases, it reinforces in the same direction ("decrease → reinforce").

**Right-hand rule (cutting case)**: open the right hand, field lines through the palm, thumb along the conductor's motion, fingers give the induced-current direction.

**Energy view**: the essence of "opposing" is **energy conservation** — sustaining the flux change requires doing work against a resisting force, so mechanical energy is converted into electrical energy. The stronger the opposition, the more electrical energy produced. (⭐ Self-induction and eddy currents are extensions of Lenz's law.)

### Electromagnetic Field · Electromagnetic Waves

> A changing magnetic field generates an electric field, a changing electric field generates a magnetic field — electricity and magnetism unify into the electromagnetic field, which propagating outward is the electromagnetic wave.

Induction tells us: **a changing magnetic field can produce an electric field**. Maxwell went further with the symmetric other half: **a changing electric field can also produce a magnetic field**.

- So the electric and magnetic fields are no longer two separate things, but two faces of a single **electromagnetic field**;
- the changing electric and magnetic fields mutually excite each other and propagate outward in turn — that is the **electromagnetic wave** (a transverse wave), with vacuum speed

$$c = \dfrac{1}{\sqrt{\varepsilon_0 \mu_0}} \approx 3\times10^8\ \mathrm{m/s}$$

where the vacuum permeability $\mu_0 = 4\pi\times10^{-7}\ \mathrm{T\cdot m/A}$ and the vacuum permittivity $\varepsilon_0 \approx 8.85\times10^{-12}\ \mathrm{C^2/(N\cdot m^2)}$.

**⭐** Note that the **vacuum permittivity ε₀** appears again in the expression for $c$ (the same one as in Coulomb's law) — this is the very hallmark of the unification of electricity, magnetism, and light.
