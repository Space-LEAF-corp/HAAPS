--

Song Massage 1.0 — Concept Demo

A demonstration of how the HAAPS (Harmonic Adaptive Actuation Pattern System) language can be extended to control a remote rhythmic massage device using musical haptic patterns.

This document defines the core idea, the pattern structure, and a sample haptic‑massage track.

---

1. Overview

Song Massage 1.0 introduces a new modality where massage techniques are encoded as rhythmic haptic events, allowing:

• self‑guided routines
• adaptive recovery sessions
• or live remote therapist control


The system uses the existing HAAPS JSON pattern format, with additional massage‑specific symbols and zone targeting.

---

2. Core Principles

• A massage is a song
• A song is a sequence of haptic events
• Each event maps to a massage action
• The device interprets the pattern and performs it safely
• All intensity values are capped by the physiology engine


---

3. Massage Symbol Mapping

Each HAAPS segment uses a type field that corresponds to a massage technique.

Symbol	HAAPS Type	Massage Action	Notes	
TAP	pulse	Percussive warm‑up	Short bursts	
PRESS	ramp	Deep compression	Slow rise/fall	
GLIDE	directional	Stroke across zones	Sequential activation	
WAVE	texture	Relaxation wave	Sinusoidal intensity	
HOLD	hold	Sustained pressure	Low‑movement grounding	


Zones are device‑specific (e.g., "upper_back", "mid_back", "lower_back").

---

4. Pattern Structure

A Song Massage pattern is a standard HAAPS pattern with massage‑specific metadata.

{
  "id": "song-massage-demo-1",
  "channel": "massage",
  "description": "Song Massage 1.0 — Recovery Flow Demo",
  "segments": [
    {
      "zone": "upper_back",
      "type": "pulse",
      "intensity": 40,
      "duration": 600,
      "direction": "none"
    },
    {
      "zone": "mid_back",
      "type": "ramp",
      "intensity": 55,
      "duration": 1200,
      "direction": "down"
    },
    {
      "zone": "lower_back",
      "type": "directional",
      "intensity": 50,
      "duration": 1500,
      "direction": "up"
    },
    {
      "zone": "mid_back",
      "type": "texture",
      "intensity": 30,
      "duration": 2000,
      "direction": "wave"
    },
    {
      "zone": "upper_back",
      "type": "hold",
      "intensity": 25,
      "duration": 1800,
      "direction": "none"
    }
  ]
}


This pattern demonstrates:

• warm‑up percussion
• deep compression
• directional gliding
• rhythmic wave relaxation
• grounding hold


---

5. Intended Use

This demo pattern is designed for:

• post‑workout recovery
• general relaxation
• testing multi‑zone actuation
• validating HAAPS → device mapping


It is not a clinical protocol and includes no diagnostic claims.

---

6. Safety Notes

• All intensities must be capped by device firmware.
• Heat, pressure, and duration limits must be enforced.
• Emergency stop must override all patterns.
• Therapist live mode must require explicit user consent.


---
