+++
date = '2026-07-11T10:45:00+08:00'
draft = false
title = 'Electromagnetism Study Notes: From Electric Fields to Power Generation'
tags = ['Physics', 'Electromagnetism', 'Study Notes']
math = true
ShowToc = true
+++

I have been systematically studying electromagnetism, tracing the full arc from electric fields, magnetic fields, and circuits through field energy, LC oscillations, and power generation. This post organises those scattered notes into a coherent framework — partly as a personal review, partly in the hope that it helps others working through the same material.

The derivations involve quite a few equations, but the core is really just one thread: **electricity and magnetism are two sides of the same coin, and energy flows through the field**.

<!--more-->

## 1. Electric Field and Field Strength

The electric field strength $E$ is an intrinsic property of the field at a point in space — it does not depend on whether a test charge is placed there. In the defining ratio, $F$ and $q$ scale together, so the ratio stays constant:

$$E = \frac{F}{q}$$

Three common calculation formulas:

$$E = \frac{F}{q} \quad(\text{definition, universal}) \qquad E = \frac{kQ}{r^2} \quad(\text{point charge}) \qquad E = \frac{U}{d} \quad(\text{parallel plates})$$

where $k = 9\times10^9\ \text{N}\cdot\text{m}^2/\text{C}^2$. When multiple fields are superimposed, they add as vectors: $\vec{E}_{\text{total}} = \vec{E}_1 + \vec{E}_2 + \cdots$.

**Why is the parallel-plate field uniform?** The charge is distributed evenly across the plates, so the field lines are parallel and equally spaced — the field strength is the same everywhere (ignoring edge effects). The physical picture behind $E = U/d$ is that the total potential difference $U$ is spread uniformly across the gap $d$, like a slope of constant gradient. The derivation is straightforward:

$$W = qEd = qU \implies E = \frac{U}{d}$$

As a side note, $E$ has two equivalent units: $\text{N/C} = \text{V/m}$; the latter expresses the meaning "potential drop per metre".

## 2. Capacitance and Permittivity

The defining relation for capacitance is $C = Q/U$, which rearranges to the familiar:

$$Q = CU$$

Note that $C$ is **uniquely determined** by geometry and material — it is independent of $Q$ and $U$. A common misconception is to read $C = Q/U$ and think "if $U$ increases, $C$ decreases". In reality, when $U$ changes, $Q$ changes proportionally and $C$ stays fixed. What truly determines the capacitance is:

$$C = \frac{\varepsilon_r \varepsilon_0 S}{d}$$

**Permittivity** describes how much a dielectric weakens the electric field. The dielectric becomes polarised in the field, producing an opposing field that reduces the internal field strength to $E = E_0/\varepsilon_r$. Therefore:

$$\varepsilon_r = \frac{E_0}{E}, \qquad \varepsilon_0 = 8.85\times10^{-12}\ \text{F/m}$$

A larger $\varepsilon_r$ means greater capacitance and stronger charge-storage ability. Water has $\varepsilon_r \approx 80$ — a strongly polarisable dielectric — a fact that becomes relevant again when discussing the theremin below.

## 3. Magnetic Field and Electromagnetic Induction

This is the heart of electromagnetism.

**Magnetic flux** $\Phi$ is the "number of field lines" passing through a surface:

$$\Phi = BS\cos\theta$$

There are three ways to change magnetic flux: change $B$, change $S$, or change the angle $\theta$ (generators use rotation to change $\theta$). Any change in flux induces an electromotive force — this is **Faraday's law**, the centrepiece of electromagnetic induction:

$$\boxed{\varepsilon = -N\frac{d\Phi}{dt}}$$

The minus sign comes from **Lenz's law**: the induced EMF (and the induced current) always *opposes* the change in flux that caused it. One word captures it: resistance. Its root is energy conservation — if there were no opposition, energy would appear from nothing.

When a conductor moves through a magnetic field and cuts field lines, a **motional EMF** is produced:

$$\varepsilon = BLv \qquad (B\perp v\perp L)$$

The induced current and total charge transferred are:

$$i = \frac{\varepsilon}{R} = \frac{1}{R}\frac{d\Phi}{dt}, \qquad q = \frac{N|\Delta\Phi|}{R}$$

Interestingly, the total charge depends only on the total change in flux, not on how fast the change occurs — which makes it useful for measuring magnetic field strength.

### Currents Also Produce Magnetic Fields

Conversely, electric currents produce magnetic fields, described by **Ampere's circuital law**:

$$\oint \vec{B}\cdot d\vec{l} = \mu_0 I$$

This law holds for any closed loop, but to actually **solve** for $B$ you need enough symmetry to reduce the left side to "$B \times \text{perimeter}$". Three standard results:

$$B = \frac{\mu_0 I}{2\pi r} \ (\text{long straight wire}) \qquad B = \frac{\mu_0 I}{2r} \ (\text{centre of circular loop}) \qquad B = \mu_0 nI \ (\text{inside solenoid})$$

The circular loop lacks sufficient symmetry and actually requires the Biot–Savart law to derive properly.

### Ampere Force and Lorentz Force

The magnetic field exerts a force on a current-carrying conductor — the **Ampere force** — and on a single moving charge — the **Lorentz force**:

$$F = BIL\sin\theta \qquad f = qvB\sin\theta$$

These are really the same magnetic force expressed at different scales: the Ampere force is the sum of Lorentz forces on all charges in the wire, connected by $I = nqAv$. The key point: the Lorentz force is always perpendicular to the velocity, so it **changes direction but does no work** — a magnetic field cannot directly change a particle's speed.

### Inductance: The "Inertia" of Current

A coil opposes changes in its own current through the chain "current $\to$ magnetic field $\to$ induced EMF opposing the change". This is **self-inductance**:

$$\varepsilon_L = -L\frac{di}{dt}, \qquad W_L = \frac{1}{2}LI^2$$

A very useful analogy: **inductance is the inertial mass of electric current**. $L$ corresponds to mass $m$, current $I$ to velocity $v$, and the stored magnetic energy $\frac{1}{2}LI^2$ to kinetic energy $\frac{1}{2}mv^2$. Self-inductance is a negative feedback that prevents current from changing abruptly, forcing it to settle gradually toward the steady-state value $\varepsilon/R$.

## 4. EMF, Voltage, and Circuits

**What is the difference between EMF and voltage?** This is the most common source of confusion.

- EMF $\varepsilon$ is the ability of the source to convert non-electrical energy into electrical energy — to actively "move" charge. It is an intrinsic property of the source, independent of the external circuit: $\varepsilon = W_{\text{source}}/q$.
- Voltage $U$ is the electrical energy released by charge across a section of the circuit; it changes with the circuit.

The water-pump analogy works well: EMF is the pump (provides the driving force), voltage is the head difference (energy release). Both are measured in volts, but one "gives" energy and the other "consumes" it.

**Why can a voltmeter not directly read EMF?** Because a real source equals an ideal EMF $\varepsilon$ plus an internal resistance $r$. Whenever current flows, the internal resistance drops $Ir$:

$$U_{\text{terminal}} = \varepsilon - Ir \leq \varepsilon$$

Only in an open circuit ($I = 0$) does the reading approach $\varepsilon$. This also gives us a method to **measure EMF and internal resistance** — take two $(U, I)$ pairs and solve simultaneously:

$$r = \frac{U_1 - U_2}{I_2 - I_1}, \qquad \varepsilon = U_1 + I_1 r$$

On a $U$–$I$ graph this is a straight line with slope $-r$ and vertical intercept $\varepsilon$.

Resistance is determined jointly by material and geometry; resistivity $\rho$ depends only on the material and temperature:

$$R = \rho\frac{L}{S}$$

Copper has $\rho \approx 1.7\times10^{-8}\ \Omega\cdot\text{m}$; rubber is about $10^{13}\ \Omega\cdot\text{m}$ — a difference of 21 orders of magnitude.

## 5. Field Energy: Where Does Energy Hide?

The formulas for electric and magnetic field energy can both be derived with the same idea: **every unit of "stored energy" equals the work done against some opposing force**.

Charging a capacitor means working against the repulsion of charges already there, adding them bit by bit:

$$dW = \frac{q}{C}\,dq \implies E_C = \frac{Q^2}{2C} = \frac{1}{2}CU^2 = \frac{1}{2}QU$$

Building up current in an inductor means working against the back-EMF, increasing the current gradually:

$$dW = L\,i\,di \implies E_L = \frac{1}{2}LI^2$$

Behind this lies an elegant **mechanics–electromagnetism analogy**:

$$\underbrace{\tfrac{1}{2}mv^2}_{\text{kinetic energy}} \longleftrightarrow \underbrace{\tfrac{1}{2}LI^2}_{\text{magnetic energy}} \qquad\qquad \underbrace{\tfrac{1}{2}kx^2}_{\text{elastic PE}} \longleftrightarrow \underbrace{\tfrac{1}{2}CU^2}_{\text{electric energy}}$$

The correspondence is $m\leftrightarrow L$, $v\leftrightarrow i$, $k\leftrightarrow 1/C$, $x\leftrightarrow q$.

Going further, the energy actually **permeates the field** and is described by energy density:

$$u_E = \frac{1}{2}\varepsilon_0 E^2, \qquad u_B = \frac{1}{2\mu_0}B^2$$

The most compelling evidence is light: electromagnetic waves carry energy through a vacuum where there are no charges at all — the energy can only reside in the field.

## 6. LC Oscillations and Electromagnetic Waves

Connect a capacitor and an inductor in a loop and you get an "electrical pendulum". Energy shuttles back and forth between the electric-field reservoir (capacitor) and the magnetic-field reservoir (inductor), in perfect analogy with the potential-kinetic energy exchange of a simple pendulum:

$$L\frac{d^2Q}{dt^2} + \frac{Q}{C} = 0$$

This is the simple-harmonic equation, giving the oscillation frequency directly:

$$\omega = \frac{1}{\sqrt{LC}}, \qquad T = 2\pi\sqrt{LC}, \qquad f = \frac{1}{2\pi\sqrt{LC}}$$

Charge and current are always $90°$ out of phase:

$$Q(t) = Q_{\max}\cos\omega t, \qquad I(t) = -I_{\max}\sin\omega t$$

**The most counter-intuitive point**: charge is maximum when current is zero, and current is maximum when charge is zero — just like a pendulum whose speed is zero at the highest point and maximum at the lowest. Energy conservation gives the current amplitude $I_{\max} = Q_{\max}/\sqrt{LC}$.

A fun application is the **theremin**: as the player's hand approaches the antenna, the high permittivity of the human body increases the effective capacitance $C$, lowering the oscillation frequency $f$ and thus the pitch — the instrument is played without any physical contact.

## 7. Power Generation: Converting Mechanical Energy to Electricity

The final topic is the application: the electric generator. A coil rotating at constant angular velocity in a uniform magnetic field sees its flux vary as a cosine, so the induced EMF varies as a sine — naturally producing alternating current:

$$\varepsilon = NBA\omega\sin\omega t, \qquad \varepsilon_0 = NBA\omega$$

**Another counter-intuitive point**: when the flux is at its maximum (coil perpendicular to the field), the EMF is zero; when the flux is changing most rapidly (coil parallel to the field), the EMF is at its maximum — because induction depends on the **rate of change** of flux, not flux itself.

The relationship between frequency, rotational speed, and the number of pole pairs ($p$ = pole pairs, $n$ = rpm):

$$f = \frac{pn}{60}$$

The relationship between RMS and peak values: $U_{\text{rms}} = U_0/\sqrt{2}$.

A few points I find particularly interesting:

- **Field excitation is not the energy source.** It merely "sets up the magnetic field conveyor belt". The actual electrical energy comes from the mechanical work of the steam turbine, water turbine, or wind turbine; excitation power is only 0.3%–3% of rated output.
- **How does the field build up from zero?** A self-excited generator relies on the weak **residual magnetism** of the iron core: once the rotor spins, a tiny EMF is induced $\to$ tiny excitation current $\to$ slightly stronger field $\to$ a positive feedback snowball that grows until magnetic saturation. If the residual magnetism is completely erased, a self-excited machine cannot start.
- **How do multiple generators synchronise to the grid?** Before connection, parameters must be matched (frequency, phase, phase sequence, and voltage amplitude must all agree — the classic three-lamp method). After connection, "synchronising torque" automatically locks the phase; the power angle $\delta$ provides negative feedback that locks all units to the same frequency and phase, with $P = \frac{EU}{X}\sin\delta$.

The "heart" of all three generation methods is the same; only the prime mover differs: thermal power uses steam, hydropower uses head $P = \rho g Q H\eta$, and wind power uses wind $P = \frac{1}{2}\rho A v^3 C_p$ (Betz limit $C_p \leq 0.593$). Finally, stepping up the voltage for transmission minimises $I^2R$ line losses.

## Closing Thoughts

Having traced the full arc from first principles to the grid, the biggest takeaway is that electromagnetism has a remarkably unified core:

1. **Electricity and magnetism are one** — current generates a magnetic field; a changing magnetic field induces current. Each is the cause of the other.
2. **Energy resides in the field** — both electric and magnetic field energy are work done against "resistance"; LC oscillations and electromagnetic waves are the proof that energy flows between fields.
3. **Analogies are everywhere** — inductance is like mass, capacitance is like a spring, induced EMF is like inertia. Grasp these analogies and many "memorise the formula" moments become "of course" moments.

From the most elementary $E = U/d$ to synchronising generators on the grid, everything sits on these three threads.
