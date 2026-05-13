---

Song Massage 1.0 — README

A demonstration of how the HAAPS (Harmonic Adaptive Actuation Pattern System) format can be used to drive a remote rhythmic massage device using musical haptic patterns.

Song Massage 1.0 introduces a new modality where massage techniques are encoded as rhythmic events, allowing both self‑guided routines and live therapist performance.

This README explains the concept, symbol mapping, safety model, and how to run the included demo pattern.

---

1. What Is Song Massage

Song Massage treats a massage as a song composed of haptic events.
Each event corresponds to a massage action (e.g., percussion, compression, glide), and each action is mapped to a device zone.

The HAAPS engine interprets these events and performs them through:

• vibration
• compression
• directional motion
• heat
• rhythmic modulation


This enables:

• post‑workout recovery
• relaxation routines
• adaptive rhythmic therapy
• remote therapist live‑mode


---

2. Symbol Mapping

Song Massage extends HAAPS with massage‑specific semantics.

Symbol	HAAPS Type	Massage Action	Use Case	
TAP	pulse	Percussive warm‑up	Circulation, activation	
PRESS	ramp	Deep compression	Muscle sinking, tension release	
GLIDE	directional	Stroke across zones	Flow, Swedish‑style movement	
WAVE	texture	Rhythmic wave	Relaxation, breath syncing	
HOLD	hold	Sustained pressure	Grounding, calming	


Zones are device‑specific (e.g., "upper_back", "mid_back", "lower_back").

---

3. Demo Pattern

The included file song-massage-demo-1.json demonstrates:

• warm‑up percussion
• deep compression
• directional gliding
• rhythmic wave relaxation
• grounding hold


It is intended for testing multi‑zone actuation and validating HAAPS → device mapping.

---

4. Running the Demo

1. Load the JSON file into the HAAPS engine.
2. Select a compatible massage‑capable device (pad, chair, harness).
3. Ensure safety caps are enabled (pressure, heat, duration).
4. Play the pattern through the device controller.
5. Observe zone transitions, intensity curves, and rhythmic flow.


---

5. Safety Model

Song Massage patterns must respect:

• pressure limits (hardware‑enforced)
• heat limits
• duration caps
• injury‑zone lockout
• emergency stop override


Live therapist mode requires explicit user consent before activation.

---

6. Intended Use

Song Massage 1.0 is designed for:

• post‑workout recovery
• general relaxation
• rhythmic therapy exploration
• HAAPS device testing


It is not a clinical protocol and makes no diagnostic claims.

---

7. Future Extensions

Planned enhancements include:

• adaptive rhythm intelligence
• therapist live‑performance interface
• physiology‑driven auto‑scaling
• multi‑device choreography
• advanced symbol sets for specialized techniques


---
