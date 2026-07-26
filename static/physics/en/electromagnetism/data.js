// Electromagnetism knowledge graph — knowledge-point node data
// schema:
//   id        unique identifier (kebab-case), referenced by edges
//   title     knowledge-point name
//   layer     basic|electric|magnetic|induction
//   oneLine   one-sentence definition (top of card + graph)
//   body      HTML content; formulas use MathJax. Note: in JS strings, LaTeX backslashes must be doubled \\
//   edges     [{to, type}]  linking relations; type: interacts|defines|determines|special case|inverse use|does work|bridges|excites|reacts on|provides|application|unifies
//   sources   [{label, href}]
//   coverage  ok=exam core | partial=advanced (aiming for full marks)

window.KG_LAYERS = [
  { id:"basic",     label:"Basic concepts",     color:"#5eead4", desc:"The field viewpoint and charge — where everything begins" },
  { id:"electric",  label:"Electric field",     color:"#38bdf8", desc:"Electrostatic field: one derivation chain from force to energy" },
  { id:"magnetic",  label:"Magnetic field",     color:"#fb7185", desc:"Magnetic field: how the Lorentz force forces out uniform circular motion" },
  { id:"induction", label:"EM induction · unification", color:"#a78bfa", desc:"Changing flux generates electricity; the unification of electricity and magnetism" },
];

const SRC = [{ label:"Static overview · six-dimension architecture", href:"assets/overview.svg" }];

window.KG_NODES = [

// ==================== Basic concepts ====================
{
  id:"field-view", title:"The field viewpoint", layer:"basic", coverage:"ok",
  oneLine:"A charge does not act directly across empty space; it first excites an 'electric field' in the surrounding space, and the field then exerts force on charges within it.",
  body:`
    <p>This is the <b>conceptual bedrock</b> for understanding all of electromagnetism. The interaction between two charges is not "action at a distance" transmitted instantaneously, but happens in two steps:</p>
    <ul>
      <li>Charge A <b>excites an electric field</b> in the surrounding space (the field is an invisible but truly existing form of matter);</li>
      <li>Charge B sits in this field and <b>feels the force of the field</b>.</li>
    </ul>
    <p>Thus "force" is broken into "<b>source charge → field → charge experiencing the force</b>". The reason for introducing the field is that it can be described independently as <b>a property of space itself</b> (see "Electric field strength"), without having to mention the other charge each time.</p>
    <blockquote>The field is a vector field: every point has a magnitude and a direction; fields from multiple sources add as vectors.</blockquote>
  `,
  edges:[ {to:"charge",type:"interacts"}, {to:"coulomb",type:"echoes"}, {to:"field-strength",type:"defines"} ],
  sources:SRC,
},
{
  id:"charge", title:"Charge · conservation · elementary charge", layer:"basic", coverage:"ok",
  oneLine:"Nature has only two kinds of charge, positive and negative; charge is conserved; the smallest unit is the elementary charge e.",
  body:`
    <p>Charge is the <b>origin</b> of electromagnetic phenomena.</p>
    <ul>
      <li><b>Two kinds of charge</b>: positive and negative. Like charges repel, unlike charges attract.</li>
      <li><b>Elementary charge</b> $e = 1.6\\times10^{-19}\\ \\mathrm{C}$; the charge of any charged body is an integer multiple of e (charge quantization).</li>
      <li><b>Law of conservation of charge</b>: charge can neither be created nor destroyed, only transferred. The three ways to charge a body — friction, contact, induction — are all fundamentally the transfer of electrons.</li>
    </ul>
  `,
  edges:[ {to:"coulomb",type:"interacts"}, {to:"field-view",type:"excites"} ],
  sources:SRC,
},

// ==================== Electric field ====================
{
  id:"coulomb", title:"Coulomb's law", layer:"electric", coverage:"ok",
  oneLine:"The interaction force between two point charges in vacuum, F=kq₁q₂/r², is the foundation of all electricity. The constant k hides the vacuum permittivity ε₀.",
  body:`
    <h4>Basic expression</h4>
    <p>$$F = k\\dfrac{q_1 q_2}{r^2}$$</p>
    <p>The direction is along the line joining the two charges; like charges repel, unlike charges attract. <b>Conditions of validity: point charges in vacuum</b> (or uniformly charged spheres, using the distance between centers).</p>
    <h4>Electrostatic constant k</h4>
    <p>$k = 8.99\\times10^{9}\\ \\mathrm{N\\cdot m^2/C^2}$ (often approximated as $9\\times10^9$).</p>
    <h4>Relation between k and the vacuum permittivity ε₀ <span style="color:#fbbf24">⭐ Advanced</span></h4>
    <p>The constant k does not come from nowhere; it is determined by the <b>vacuum permittivity</b> $\\varepsilon_0$:</p>
    <p>$$k = \\dfrac{1}{4\\pi\\varepsilon_0}\\,,\\qquad \\varepsilon_0 \\approx 8.85\\times10^{-12}\\ \\mathrm{C^2/(N\\cdot m^2)}$$</p>
    <p>So Coulomb's law is also often written as $F=\\dfrac{q_1 q_2}{4\\pi\\varepsilon_0 r^2}$. That $4\\pi$ comes from "the field of a point charge spreading out uniformly in all directions" (spherical area $4\\pi r^2$).</p>
    <h4>Coulomb force in a medium · relative permittivity εᵣ <span style="color:#fbbf24">⭐ Advanced</span></h4>
    <p>If the two charges are not in vacuum but in some medium, the force is <b>weakened</b>:</p>
    <p>$$F = \\dfrac{q_1 q_2}{4\\pi\\varepsilon r^2}\\,,\\qquad \\varepsilon = \\varepsilon_0\\,\\varepsilon_r$$</p>
    <ul>
      <li>$\\varepsilon$: the <b>(absolute) permittivity</b> of the medium;</li>
      <li>$\\varepsilon_r$: the <b>relative permittivity</b> (the factor relative to vacuum), $\\varepsilon_r>1$;</li>
      <li>the medium reduces the force to $1/\\varepsilon_r$ of its value in vacuum (e.g. for water $\\varepsilon_r\\approx80$, the force drops sharply).</li>
    </ul>
    <blockquote>This chain of constants strings together: Coulomb force → k → ε₀ → medium εᵣ into one complete thread, and also explains why ε shows up later in the capacitor formulas.</blockquote>
  `,
  edges:[ {to:"charge",type:"interacts"}, {to:"field-strength",type:"defines"}, {to:"point-field",type:"determines"}, {to:"capacitor",type:"affects"} ],
  sources:SRC,
},
{
  id:"field-strength", title:"Electric field strength E=F/q", layer:"electric", coverage:"ok",
  oneLine:"Define the strength of the field using a test charge: E=F/q, independent of the test charge, a vector describing the 'force' property of the electric field.",
  body:`
    <h4>Defining equation (universal)</h4>
    <p>$$E = \\dfrac{F}{q}$$</p>
    <p>Place a <b>test charge</b> q at a point in the field and measure the force F it feels; the ratio $F/q$ is the field strength at that point. Key point: this ratio is <b>independent of q</b> (larger q means larger force too), so it reflects the property of <b>the field itself</b> at that point.</p>
    <ul>
      <li><b>Vector</b>, direction = the direction of the force on a positive charge at that point; unit $\\mathrm{N/C}$.</li>
      <li>This is the archetype of the "ratio-definition method" (same idea as $B=F/(IL)$ later).</li>
    </ul>
    <h4>The division of labor among the three E formulas (don't mix them up!)</h4>
    <table>
      <tr><th>Formula</th><th>Role</th><th>Applies to</th></tr>
      <tr><td>$E=F/q$</td><td>defining equation</td><td>any electric field, universal</td></tr>
      <tr><td>$E=kQ/r^2$</td><td>determining equation</td><td>field produced by a point charge Q</td></tr>
      <tr><td>$E=U/d$</td><td>relational equation</td><td>uniform field only, links to potential</td></tr>
    </table>
    <p>The defining equation says "how to measure it", the determining equation says "what produces it and how large it is", and the relational equation says "how to convert to and from potential".</p>
  `,
  edges:[ {to:"coulomb",type:"defined from"}, {to:"point-field",type:"determines"}, {to:"uniform-field",type:"special case"}, {to:"field-line",type:"represents"}, {to:"electric-force",type:"inverse use"} ],
  sources:SRC,
},
{
  id:"point-field", title:"Point-charge field E=kQ/r²", layer:"electric", coverage:"ok",
  oneLine:"The field strength excited by a point charge Q at distance r; it is a 'determining equation' — set by the source charge and the position.",
  body:`
    <p>Divide Coulomb's law $F=k\\dfrac{Qq}{r^2}$ by the test charge q; q cancels out, giving the field produced by the point charge itself:</p>
    <p>$$E = k\\dfrac{Q}{r^2} = \\dfrac{Q}{4\\pi\\varepsilon_0 r^2}$$</p>
    <p>where the electrostatic constant $k = 8.99\\times10^{9}\\ \\mathrm{N\\cdot m^2/C^2}$ (often approximated as $9\\times10^9$), and the vacuum permittivity $\\varepsilon_0 \\approx 8.85\\times10^{-12}\\ \\mathrm{C^2/(N\\cdot m^2)}$.</p>
    <ul>
      <li>Direction: a positive source charge points radially <b>outward</b>, a negative source charge points radially <b>inward</b>;</li>
      <li>It is a <b>determining equation</b>: E is set by the source charge Q and the distance r, independent of whether a test charge is present;</li>
      <li>Difference from the defining equation $E=F/q$: $E=F/q$ is "how to measure any field", whereas $E=kQ/r^2$ is "how large this specific field of a point charge is".</li>
    </ul>
  `,
  edges:[ {to:"coulomb",type:"determines"}, {to:"field-strength",type:"is"}, {to:"field-line",type:"represents"} ],
  sources:SRC,
},
{
  id:"field-line", title:"Field lines · superposition principle", layer:"electric", coverage:"ok",
  oneLine:"A vivid description of the field: the tangent sets the direction, the density sets the magnitude; fields from multiple sources add as vectors.",
  body:`
    <h4>Field lines</h4>
    <ul>
      <li>The <b>tangent direction</b> at a point = the direction of the field strength there; the <b>density</b> = the magnitude of the field strength.</li>
      <li>They start on positive charges and end on negative charges (or at infinity), and are <b>never closed, never intersecting</b>.</li>
      <li>The field lines of a <b>uniform field</b> are a family of <b>parallel, equally-spaced</b> straight lines (as inside parallel plates).</li>
    </ul>
    <h4>Superposition principle</h4>
    <p>The field produced jointly by several charges equals the <b>vector sum</b> of the fields produced by each charge alone: $\\vec{E}=\\vec{E_1}+\\vec{E_2}+\\cdots$. This lets the field of a complex charge system be computed piece by piece.</p>
  `,
  edges:[ {to:"field-strength",type:"represents"}, {to:"uniform-field",type:"special case"} ],
  sources:SRC,
},
{
  id:"uniform-field", title:"Uniform field & E=U/d", layer:"electric", coverage:"ok",
  oneLine:"In a uniform field E=U/d, which directly buckles together the 'field strength E of force' and the 'potential difference U of energy' — one of the most under-taught relations.",
  body:`
    <h4>What is a uniform electric field</h4>
    <p>An electric field with the <b>same magnitude and direction everywhere</b> (typical: the interior of a parallel-plate capacitor, ignoring edge effects). The field lines are parallel and equally spaced.</p>
    <h4>Core relation</h4>
    <p>$$E = \\dfrac{U}{d}$$</p>
    <p><b>This equation holds only for a uniform field</b>, and <b>d must be the distance between two points along the field direction</b> (not any direction, and not any arbitrary plate spacing).</p>
    <h4>Where it comes from (derivation)</h4>
    <p>In a uniform field, the electric force $F=qE$ is constant. Move the charge a distance d along the field direction:</p>
    <ul>
      <li>from the "energy" view, the work done is $W=qU$;</li>
      <li>from the "force" view, the work done is $W=Fd=qEd$;</li>
      <li>setting them equal $\\Rightarrow qU=qEd \\Rightarrow U=Ed \\Rightarrow E=\\dfrac{U}{d}$.</li>
    </ul>
    <h4>Why the two units of field strength are the same</h4>
    <p>From $E=F/q$ the unit is $\\mathrm{N/C}$; from $E=U/d$ the unit is $\\mathrm{V/m}$. They are <b>completely equivalent in value and dimension</b>: $\\mathrm{V/m}=\\mathrm{N/C}$. The same "field strength", defined once from force and once from energy, arrives at the same place by different routes.</p>
    <h4>A deeper physical meaning <span style="color:#fbbf24">⭐ Advanced</span></h4>
    <p>$E=U/d$ shows that <b>field strength = the rate of change of potential along the field direction</b> (i.e. the spatial gradient of the potential). So <b>E always points in the direction of steepest decrease of potential</b>, with a magnitude equal to "how many volts the potential drops per meter". This foreshadows the college-level $\\vec{E}=-\\nabla\\varphi$.</p>
    <blockquote>In one sentence: E=U/d is the exchange rate between the "language of force (E)" and the "language of energy (U)" in an electric field.</blockquote>
  `,
  edges:[ {to:"field-strength",type:"special case"}, {to:"potential",type:"bridges"}, {to:"work-energy",type:"derives"}, {to:"mag-apps",type:"application"} ],
  sources:SRC,
},
{
  id:"electric-force", title:"Electric force F=qE", layer:"electric", coverage:"ok",
  oneLine:"Find the force given the field: F=qE. A positive charge follows E, a negative charge opposes E; a stationary charge feels the force just the same.",
  body:`
    <p>$$F = qE$$</p>
    <p>This is the <b>inverse use</b> of $E=F/q$: once the field strength E at a point is known, any charge q placed there feels the force $qE$.</p>
    <ul>
      <li>The force on a positive charge is <b>along E</b>, on a negative charge <b>opposite to E</b>;</li>
      <li><b>Independent of motion: a stationary charge feels the force too</b> (this is precisely the most essential difference from the Lorentz force — the Lorentz force requires the charge to move).</li>
    </ul>
  `,
  edges:[ {to:"field-strength",type:"inverse use"}, {to:"work-energy",type:"does work"}, {to:"motion-e",type:"provides"}, {to:"lorentz",type:"contrast"} ],
  sources:SRC,
},
{
  id:"work-energy", title:"Work done by the electric force W=qU", layer:"electric", coverage:"ok",
  oneLine:"W=qU, determined only by the potential difference between start and end points and independent of path ⟹ the electric force is a conservative force (the energy hub).",
  body:`
    <p>$$W_{AB} = qU_{AB} = q(\\varphi_A - \\varphi_B)$$</p>
    <ul>
      <li><b>Independent of path</b>, depending only on the potential difference between the start and end points;</li>
      <li>This is exactly the criterion for a "<b>conservative force</b>" — <b>only with a conservative force can potential energy be defined</b>. This step is the <b>hub</b> crossing from the "force description (E)" to the "energy description (φ, U)".</li>
      <li>In a uniform field $W=qEd$ (d along the field direction).</li>
    </ul>
  `,
  edges:[ {to:"electric-force",type:"does work"}, {to:"potential-energy",type:"defines potential energy"}, {to:"uniform-field",type:"derives"} ],
  sources:SRC,
},
{
  id:"potential-energy", title:"Electric potential energy Ep=qφ", layer:"electric", coverage:"ok",
  oneLine:"The potential energy defined because the electric force is conservative: Ep=qφ; work done by the electric force = decrease in electric potential energy.",
  body:`
    <p>$$E_p = q\\varphi\\,,\\qquad W_{AB} = E_{pA} - E_{pB}$$</p>
    <ul>
      <li>When the electric force does positive work, the electric potential energy decreases (analogous to work done by gravity and gravitational potential energy);</li>
      <li>A positive charge moving from high potential to low potential: the electric force does positive work, $E_p$ decreases; a negative charge is the opposite;</li>
      <li>The sign of $E_p$ must be judged together with the sign of q.</li>
    </ul>
  `,
  edges:[ {to:"work-energy",type:"defined from"}, {to:"potential",type:"defines"} ],
  sources:SRC,
},
{
  id:"potential", title:"Potential φ / potential difference U / equipotential surface", layer:"electric", coverage:"ok",
  oneLine:"The potential φ describes the 'energy' property of the field (φ=Ep/q); the potential difference U=φA−φB; equipotential surfaces ⊥ field lines.",
  body:`
    <p>$$\\varphi = \\dfrac{E_p}{q}\\,,\\qquad U_{AB} = \\varphi_A - \\varphi_B$$</p>
    <ul>
      <li>The potential φ is a <b>scalar</b>, having only magnitude and sign, describing the "energy" property of the field (complementary to the vector E that describes "force");</li>
      <li>Along the direction of the field lines, the potential <b>decreases</b>;</li>
      <li><b>Equipotential surface</b>: a surface of equal potential, always <b>perpendicular to the field lines</b>; moving a charge along an equipotential surface, the electric force does <b>no work</b>.</li>
    </ul>
  `,
  edges:[ {to:"potential-energy",type:"defined from"}, {to:"uniform-field",type:"bridges"}, {to:"work-energy",type:"determines"} ],
  sources:SRC,
},
{
  id:"motion-e", title:"Motion of charged particles in an electric field", layer:"electric", coverage:"ok",
  oneLine:"Along the field → uniformly accelerated straight line; entering perpendicular to the field → projectile-like motion. The principle of oscilloscope deflection.",
  body:`
    <ul>
      <li><b>Entering along the field direction</b>: uniformly accelerated straight-line motion; during acceleration $qU=\\tfrac12 mv^2$ (work-energy theorem).</li>
      <li><b>Entering a uniform field perpendicular to the field direction</b>: projectile-like motion. Uniform velocity along the initial-velocity direction, uniform acceleration along the field direction, with a parabolic trajectory.</li>
      <li>Solution routine: <b>decompose</b> into "along the field" and "perpendicular to the field" and apply kinematics to each separately.</li>
      <li>Application: the deflection of the electron beam in an oscilloscope.</li>
    </ul>
  `,
  edges:[ {to:"electric-force",type:"experiences force"}, {to:"uniform-field",type:"depends on"}, {to:"capacitor",type:"application"} ],
  sources:SRC,
},
{
  id:"capacitor", title:"Capacitor C=Q/U", layer:"electric", coverage:"partial",
  oneLine:"A component that stores charge: C=Q/U; the permittivity ε is hidden right inside the parallel-plate capacitance formula.",
  body:`
    <p>$$C = \\dfrac{Q}{U}$$</p>
    <p>The capacitance C represents the "ability to store charge", independent of Q and U (it is a property of the component).</p>
    <h4>Parallel-plate capacitor <span style="color:#fbbf24">⭐ Advanced</span></h4>
    <p>$$C = \\dfrac{\\varepsilon S}{4\\pi k d} = \\dfrac{\\varepsilon_0 \\varepsilon_r S}{d}$$</p>
    <p>The larger the plate area S, the smaller the spacing d, and the larger the medium's $\\varepsilon_r$, the greater the capacitance. <b>The ε here is exactly the permittivity from Coulomb's law</b> — the chain of constants closes the loop here.</p>
    <h4>Dynamic analysis (common pitfall)</h4>
    <ul>
      <li><b>Always connected to the source</b>: U stays fixed. Changing d or the medium changes Q and E accordingly ($E=U/d$).</li>
      <li><b>Disconnected after charging</b>: Q stays fixed. Changing d changes U accordingly, but $E=U/d=Q/(\\varepsilon_0\\varepsilon_r S)$ is independent of d.</li>
    </ul>
  `,
  edges:[ {to:"potential",type:"depends on"}, {to:"uniform-field",type:"application"}, {to:"coulomb",type:"shares ε"}, {to:"e-field-energy",type:"stores energy"} ],
  sources:SRC,
},
{
  id:"e-field-energy", title:"Electric field energy", layer:"electric", coverage:"partial",
  oneLine:"The electric field itself stores energy: a capacitor stores ½CU²; the energy is spread through space, with density ½ε₀E². Completely symmetric with magnetic field energy.",
  body:`
    <h4>First distinguish: electric field energy ≠ electric potential energy</h4>
    <ul>
      <li><b>Electric potential energy</b> $E_p=q\\varphi$: the energy possessed by "a <b>charge</b> in an electric field";</li>
      <li><b>Electric field energy</b>: the energy stored by "the <b>electric field itself</b>" — the energy spread through the space where the field exists, not attached to any particular charge.</li>
    </ul>
    <p>The two are concepts at different levels; don't mix them. Here we discuss the latter.</p>
    <h4>Energy stored in a capacitor</h4>
    <p>Charging a capacitor means storing energy in the form of an electric field between the two plates:</p>
    <p>$$W = \\dfrac{1}{2}CU^2 = \\dfrac{1}{2}QU = \\dfrac{Q^2}{2C}$$</p>
    <p>During discharge this energy is released (camera flashes and defibrillators both rely on the capacitor releasing energy instantly).</p>
    <h4>Energy density: the energy lives in the "field" <span style="color:#fbbf24">⭐ Advanced</span></h4>
    <p>More fundamentally, the energy is not stored on the plates but <b>spread throughout the space where the electric field exists</b>, with the energy stored per unit volume (energy density):</p>
    <p>$$u = \\dfrac{1}{2}\\varepsilon_0 E^2$$</p>
    <p>Wherever the electric field E is stronger, the energy stored there is denser. This shows that <b>the field is the carrier of energy</b>, and energy can detach from charge and exist independently in space.</p>
    <blockquote>It is completely symmetric with magnetic field energy $\\tfrac12 LI^2$, $u=\\dfrac{B^2}{2\\mu_0}$ — capacitor ↔ inductor, E ↔ B. Electromagnetic waves are precisely these two kinds of field energy alternately stored in space and propagating forward.</blockquote>
  `,
  edges:[ {to:"capacitor",type:"stored in"}, {to:"potential-energy",type:"distinguish"}, {to:"b-field-energy",type:"symmetric"}, {to:"em-unify",type:"propagates"} ],
  sources:SRC,
},

// ==================== Magnetic field ====================
{
  id:"mag-source", title:"The source of the magnetic field", layer:"magnetic", coverage:"ok",
  oneLine:"Moving charges/currents excite a magnetic field; there is no magnetic monopole, so magnetic field lines are closed; the direction is found with Ampère's (right-hand) rule.",
  body:`
    <ul>
      <li><b>Source</b>: moving charges, currents (and magnets, which are fundamentally still molecular currents). A stationary charge produces no magnetic field.</li>
      <li><b>No magnetic monopole</b>: the magnetic field has no "beginning" or "end", so <b>magnetic field lines are closed curves</b> (unlike field lines, which start on positive and end on negative charges).</li>
      <li><b>Direction rule — Ampère's (right-hand screw) rule</b>: for a straight wire, grip it with the right hand, the thumb pointing along the current, and the curl of the fingers is the magnetic field direction; for a solenoid, the thumb points to the N pole.</li>
    </ul>
  `,
  edges:[ {to:"mag-B",type:"excites"}, {to:"lorentz",type:"acts on moving charge"} ],
  sources:SRC,
},
{
  id:"mag-B", title:"Magnetic flux density B / magnetic flux Φ", layer:"magnetic", coverage:"ok",
  oneLine:"B=F/(IL) describes the strength of the magnetic field (a vector); the field lines passing through an area are measured by the magnetic flux Φ=BS.",
  body:`
    <h4>Magnetic flux density B</h4>
    <p>$$B = \\dfrac{F}{IL}$$</p>
    <p>Defined by borrowing "the force on a current-carrying wire" (the ratio-definition method, same idea as $E=F/q$): when B⊥I, B equals the Ampère force on a wire of unit current and unit length. A <b>vector</b>, with the unit <b>tesla T</b>.</p>
    <h4>Magnetic flux Φ</h4>
    <p>$$\\Phi = BS$$</p>
    <p>A <b>scalar</b>, representing the "number of field lines" passing through an area S (S taken as the area perpendicular to B). It is the protagonist of electromagnetic induction later — <b>once Φ changes, electricity is generated</b>.</p>
  `,
  edges:[ {to:"mag-source",type:"defined from"}, {to:"ampere",type:"reacts on"}, {to:"lorentz",type:"reacts on"}, {to:"flux",type:"provides Φ"} ],
  sources:SRC,
},
{
  id:"ampere", title:"Ampère force F=BIL", layer:"magnetic", coverage:"ok",
  oneLine:"The force of a magnetic field on a current-carrying wire, F=BIL, direction by the left-hand rule — the principle of the electric motor.",
  body:`
    <p>$$F = BIL\\quad(B\\perp I)\\,,\\qquad \\text{in general}\\ F = BIL\\sin\\theta$$</p>
    <ul>
      <li><b>Direction: left-hand rule</b> — the field lines pierce the palm, the fingers point along the current, and the thumb points in the direction of the force.</li>
      <li>Applications: the <b>electric motor</b>, the moving-coil meter (converting current into rotation).</li>
      <li>The Ampère force <b>can do work</b> (pushing the wire), realizing electrical ↔ mechanical energy conversion — this is also the other side of energy conversion in electromagnetic induction.</li>
    </ul>
  `,
  edges:[ {to:"mag-B",type:"set by B"}, {to:"mag-apps",type:"application"}, {to:"lorentz",type:"macroscopic manifestation"}, {to:"motional-emf",type:"dual (motor/generator)"} ],
  sources:SRC,
},
{
  id:"lorentz", title:"Lorentz force F=qvB", layer:"magnetic", coverage:"ok",
  oneLine:"The force of a magnetic field on a moving charge, F=qvB, always perpendicular to the velocity ⟹ does no work, changing only the direction, not the speed.",
  body:`
    <p>$$F = qvB\\quad(v\\perp B)\\,,\\qquad \\text{in general}\\ F = qvB\\sin\\theta$$</p>
    <ul>
      <li><b>Direction: left-hand rule</b> (for a positive charge the fingers point along v; for a negative charge, the opposite).</li>
      <li><b>The charge must be moving</b> and its velocity must have a component perpendicular to the magnetic field to feel a force (exactly opposite to the electric force, which acts even on a stationary charge).</li>
      <li><b>Key causality: $F\\perp v$</b> ⟹ the Lorentz force <b>never does work</b> ⟹ the kinetic energy stays constant ⟹ <b>the speed stays constant, only the direction changes</b>.</li>
      <li>It is the <b>microscopic essence</b> of the Ampère force (the macroscopic resultant of the Lorentz forces on the many moving electrons in the wire = the Ampère force).</li>
    </ul>
  `,
  edges:[ {to:"mag-B",type:"set by B"}, {to:"circular",type:"provides centripetal force"}, {to:"electric-force",type:"contrast"}, {to:"mag-apps",type:"application"} ],
  sources:SRC,
},
{
  id:"circular", title:"Uniform circular motion r=mv/(qB)", layer:"magnetic", coverage:"ok",
  oneLine:"When v⊥B the Lorentz force acts as the centripetal force, producing uniform circular motion; the period T=2πm/(qB) is independent of speed!",
  body:`
    <h4>Why it is uniform circular motion</h4>
    <p>The Lorentz force is constant in magnitude ($v$ is constant) and always perpendicular to the velocity, pointing to the same side — exactly the condition for uniform circular motion. So it acts as the <b>centripetal force</b>:</p>
    <p>$$qvB = \\dfrac{mv^2}{r}$$</p>
    <h4>Solving for radius and period</h4>
    <p>$$r = \\dfrac{mv}{qB}\\,,\\qquad T = \\dfrac{2\\pi m}{qB}$$</p>
    <ul>
      <li><b>The period T is independent of both the speed v and the radius r</b>, set only by the charge-to-mass ratio $q/m$ and B — this is the fundamental reason the cyclotron can keep accelerating at a fixed frequency.</li>
      <li>The charge-to-mass ratio $\\dfrac{q}{m}$ is the central quantity in magnetic-field problems.</li>
      <li>If v is oblique to B: decompose into $v_\\parallel$ (uniform) + $v_\\perp$ (circular) → combining into a <b>helix</b>.</li>
    </ul>
  `,
  edges:[ {to:"lorentz",type:"provides centripetal force"}, {to:"mag-apps",type:"application"} ],
  sources:SRC,
},
{
  id:"mag-apps", title:"Magnetic-field applications: mass spectrometer / cyclotron / velocity selector", layer:"magnetic", coverage:"ok",
  oneLine:"Joint applications of electric and magnetic fields; the velocity selector qE=qvB is the meeting point of the two fields.",
  body:`
    <h4>Velocity selector (electric field × magnetic field meet)</h4>
    <p>Make the electric force and the Lorentz force <b>opposite in direction and equal in magnitude</b>:</p>
    <p>$$qE = qvB \\;\\Rightarrow\\; v = \\dfrac{E}{B}$$</p>
    <p>Only particles whose speed is exactly $v=E/B$ are in force balance and pass straight through; the rest are deflected and filtered out. This is the classic example of the electric and magnetic fields "cooperating".</p>
    <h4>Mass spectrometer</h4>
    <p>After selecting the speed, the particle enters a pure magnetic field and moves in a circle, $r=\\dfrac{mv}{qB}$; from r one back-solves the mass/charge-to-mass ratio, used to distinguish isotopes.</p>
    <h4>Cyclotron <span style="color:#fbbf24">⭐ Advanced</span></h4>
    <p>Exploiting the fact that <b>T is independent of v</b>, a fixed-frequency alternating voltage accelerates the particle again and again at the gap between the two D-shaped dees, and the radius grows larger and larger.</p>
  `,
  edges:[ {to:"circular",type:"depends on"}, {to:"lorentz",type:"depends on"}, {to:"ampere",type:"same kind"}, {to:"uniform-field",type:"meets (qE=qvB)"} ],
  sources:SRC,
},

// ==================== EM induction · unification ====================
{
  id:"flux", title:"Changing flux → induced EMF ε=nΔΦ/Δt", layer:"induction", coverage:"ok",
  oneLine:"As soon as the magnetic flux through a loop changes, an induced EMF is produced (Faraday's law of electromagnetic induction).",
  body:`
    <h4>Faraday's law of electromagnetic induction</h4>
    <p>$$\\varepsilon = n\\dfrac{\\Delta\\Phi}{\\Delta t}$$</p>
    <p>The induced EMF is proportional to the <b>rate of change of the magnetic flux</b> (n is the number of turns). Note it is the "rate of change", not the flux itself — <b>if Φ does not change, no electricity is generated</b>.</p>
    <h4>Three ways for the flux to change</h4>
    <ul>
      <li>B changes (a changing magnetic field);</li>
      <li>S changes (the loop area changes);</li>
      <li>the angle between B and S changes (the coil rotates, the principle of the generator).</li>
    </ul>
    <h4>Motional EMF</h4>
    <p>A conducting rod cutting field lines: $$\\varepsilon = BLv$$ (when B, L, v are mutually perpendicular). It is fundamentally the free charges inside the conductor being driven by the <b>Lorentz force</b> — linking the magnetic field and the electric field together again.</p>
  `,
  edges:[ {to:"mag-B",type:"from ΔΦ"}, {to:"lenz",type:"sets direction"}, {to:"lorentz",type:"essence"}, {to:"motional-emf",type:"incl. motional"}, {to:"em-unify",type:"unifies"} ],
  sources:SRC,
},
{
  id:"motional-emf", title:"Motional EMF ε=BLv · rail model", layer:"induction", coverage:"ok",
  oneLine:"A conducting rod cutting field lines produces ε=BLv; it is precisely the 'back-EMF' in a motor, with loop current I=(εsource−BLv)/R. The hub between generating and motoring.",
  body:`
    <h4>Motional EMF</h4>
    <p>A conducting rod of length L moving with velocity v in a magnetic field B (B, L, v mutually perpendicular), cutting field lines, produces an EMF:</p>
    <p>$$\\varepsilon = BLv$$</p>
    <p>The direction is found with the right-hand rule: open the right hand, let the field lines pierce the palm, the thumb pointing in the direction of the rod's motion, and the fingers give the direction of the induced current.</p>
    <h4>Microscopic essence: still the Lorentz force</h4>
    <p>Once the rod moves, the free charges inside it acquire the velocity v along with the rod, and so are pushed by the <b>Lorentz force</b> $qvB$ along the rod; the charges pile up at the two ends of the rod and form a potential difference — this is the origin of the EMF. So $\\varepsilon=BLv$ is fundamentally still the Lorentz force, except this time it drives the charges <b>along the rod</b>.</p>
    <h4>Back-EMF (in a motor)</h4>
    <p>When a current-carrying wire is pushed into motion by the Ampère force, as it moves it generates $BLv$. By Lenz's law, this EMF <b>always opposes the original current</b>, and is therefore called the <b>back-EMF</b>; it weakens the net EMF of the loop.</p>
    <h4>Rail model: how to compute the current</h4>
    <p>A conducting rod + rails + source (EMF $\\varepsilon_0$) + total loop resistance R; the closed-circuit equation:</p>
    <p>$$\\varepsilon_0 - BLv = IR \\;\\Rightarrow\\; I = \\dfrac{\\varepsilon_0 - BLv}{R}$$</p>
    <ul>
      <li>At the instant of starting $v=0$: the current is maximum $I_0=\\dfrac{\\varepsilon_0}{R}$;</li>
      <li>the faster the rod moves → the larger $BLv$ → the smaller I → the smaller the Ampère force $F=BIL$;</li>
      <li>final no-load state: $BLv=\\varepsilon_0$, the current is 0, reaching the maximum speed $v_{\\max}=\\dfrac{\\varepsilon_0}{BL}$;</li>
      <li>with a load (friction/weight): at steady state the Ampère force exactly balances the load, and the current settles at the corresponding value.</li>
    </ul>
    <h4>Conservation of energy</h4>
    <p>Multiply both sides of the circuit equation by I:</p>
    <p>$$\\varepsilon_0 I = I^2 R + BLv\\cdot I$$</p>
    <p>The three terms are: <b>power output by the source</b> = <b>resistive heat dissipation</b> + <b>mechanical power of the Ampère force</b>. Here $BLv\\cdot I$ (back-EMF × current) is precisely the part the magnetic field "hands over" into mechanical energy — the magnetic field acts only as an intermediary and contributes no energy of its own.</p>
    <blockquote>Cutting to generate ($\\varepsilon=BLv$, generator) and carrying current to feel a force ($F=BIL$, motor) are the two faces of the same rod, strung together by conservation of energy. The rail model is the core carrier of the last, hardest electromagnetic-induction problem on the Shanghai exam; be sure to practice it until fluent.</blockquote>
  `,
  edges:[ {to:"flux",type:"belongs to"}, {to:"lorentz",type:"microscopic essence"}, {to:"ampere",type:"dual (motor/generator)"}, {to:"lenz",type:"sets direction"}, {to:"mag-B",type:"depends on B"} ],
  sources:SRC,
},
{
  id:"b-field-energy", title:"Magnetic field energy", layer:"induction", coverage:"partial",
  oneLine:"The magnetic field itself stores energy: an inductor stores ½LI²; density B²/(2μ₀). Stored and retrieved via electromagnetic induction, with the magnetic force never doing work. Symmetric with electric field energy.",
  body:`
    <h4>Energy stored in an inductor</h4>
    <p>When a current is passed through an inductor coil and a magnetic field is established, energy is stored in the form of a <b>magnetic field</b>:</p>
    <p>$$W = \\dfrac{1}{2}LI^2$$</p>
    <p>When the current is cut off the magnetic field vanishes and this energy is released — <b>this is why breaking a circuit with a large inductor produces a spark</b> (the stored magnetic energy is released instantly, producing a very high self-induced EMF).</p>
    <h4>Energy density <span style="color:#fbbf24">⭐ Advanced</span></h4>
    <p>The energy is spread throughout the space where the magnetic field exists, stored per unit volume as:</p>
    <p>$$u = \\dfrac{B^2}{2\\mu_0}$$</p>
    <p>where the vacuum permeability $\\mu_0 = 4\\pi\\times10^{-7}\\ \\mathrm{T\\cdot m/A}$. The stronger B, the denser the stored energy.</p>
    <h4>Key clarification: the magnetic force does no work, yet the magnetic field can store energy?</h4>
    <p>There is no contradiction. The difference lies in whether the magnetic field <b>changes</b>:</p>
    <ul>
      <li><b>Steady magnetic field</b> (a motor, a coil in a uniform field): the field does not change → the magnetic energy does not change → the magnetic field acts only as a "conveyor belt", handing electrical energy over into mechanical energy, its own energy store untouched.</li>
      <li><b>Changing magnetic field</b> (inductor switching on/off, a transformer): the magnetic energy is genuinely being stored and retrieved.</li>
    </ul>
    <p>And the storage/retrieval of magnetic energy is <b>not done by the magnetic force doing work</b> (the Lorentz force never does work), but by <b>electromagnetic induction</b> — the <b>electric field</b> induced by the changing magnetic field does work on the charges and transports the energy. So "the magnetic force does no work" and "the magnetic field stores energy" remain self-consistent throughout.</p>
    <blockquote>It is completely symmetric with electric field energy $\\tfrac12 CU^2$, $u=\\tfrac12\\varepsilon_0 E^2$ — inductor ↔ capacitor, B ↔ E.</blockquote>
  `,
  edges:[ {to:"mag-B",type:"energy stored in B"}, {to:"lorentz",type:"magnetic force does no work"}, {to:"flux",type:"stored via induction"}, {to:"e-field-energy",type:"symmetric"}, {to:"em-unify",type:"propagates"} ],
  sources:SRC,
},
{
  id:"lenz", title:"Lenz's law / right-hand rule", layer:"induction", coverage:"ok",
  oneLine:"The direction of the induced current always 'opposes' the change in flux that causes it; for cutting, use the right-hand rule.",
  body:`
    <h4>Lenz's law (setting the direction)</h4>
    <p>The effect of the induced current <b>always resists the change in magnetic flux</b>: if the flux increases, the field of the induced current opposes it ("increase → oppose"); if the flux decreases, it reinforces it in the same direction ("decrease → same").</p>
    <h4>Right-hand rule (for the cutting case)</h4>
    <p>Open the right hand, let the field lines pierce the palm, the thumb pointing in the direction of the conductor's motion, and the fingers give the direction of the induced current.</p>
    <h4>The energy perspective</h4>
    <p>The essence of "opposing" is <b>conservation of energy</b>: to sustain the change in flux, work must be done against the resistance, so mechanical energy is thereby converted into electrical energy. The stronger the opposition, the more electrical energy is produced.</p>
    <p><span style="color:#fbbf24">⭐ Advanced</span>: self-induction and eddy currents are both extensions of Lenz's law.</p>
  `,
  edges:[ {to:"flux",type:"sets direction"}, {to:"em-unify",type:"unifies"} ],
  sources:SRC,
},
{
  id:"em-unify", title:"Electromagnetic field · electromagnetic wave", layer:"induction", coverage:"partial",
  oneLine:"A changing magnetic field generates electricity, a changing electric field generates magnetism — electricity and magnetism unify into the electromagnetic field, which, when it propagates, is the electromagnetic wave.",
  body:`
    <p>Electromagnetic induction tells us: <b>a changing magnetic field can produce an electric field</b>. Maxwell went further and proposed the symmetric other half: <b>a changing electric field can also produce a magnetic field</b>.</p>
    <ul>
      <li>So the electric field and the magnetic field are no longer two separate things, but two faces of the same <b>electromagnetic field</b>;</li>
      <li>the changing electric and magnetic fields excite each other and propagate outward in alternation — this is the <b>electromagnetic wave</b> (a transverse wave), with speed in vacuum</li>
    </ul>
    <p>$$c = \\dfrac{1}{\\sqrt{\\varepsilon_0 \\mu_0}} \\approx 3\\times10^8\\ \\mathrm{m/s}$$</p>
    <p>where the vacuum permeability $\\mu_0 = 4\\pi\\times10^{-7}\\ \\mathrm{T\\cdot m/A}$ and the vacuum permittivity $\\varepsilon_0 \\approx 8.85\\times10^{-12}\\ \\mathrm{C^2/(N\\cdot m^2)}$.</p>
    <blockquote>Note that the <b>vacuum permittivity ε₀</b> appears again in the expression for c (the same one as in Coulomb's law) — this is precisely the mark of the unification of electricity, magnetism, and light. <span style="color:#fbbf24">⭐ Advanced</span></blockquote>
  `,
  edges:[ {to:"flux",type:"from"}, {to:"lenz",type:"from"}, {to:"coulomb",type:"shares ε₀"}, {to:"e-field-energy",type:"field energy propagates"}, {to:"b-field-energy",type:"field energy propagates"} ],
  sources:SRC,
},

];
