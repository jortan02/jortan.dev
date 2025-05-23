---
published: true
title: TankWars
description: A real-time multiplayer tank battle game featuring client-server architecture, synchronized gameplay, and MVC design principles.
date: 2021-12-02
category: Desktop App
skills: [C#, WinForms, TCP, JSON]
---

![TankWars screenshot](/images/portfolio/TankWars.png)

### Overview

TankWars is a real-time multiplayer tank battle game developed as a pair programming project for CS 3500 (Software Design I) at the University of Utah. It showcases advanced concepts in software architecture, network synchronization, and game development. The game enables players to engage in competitive tank combat, supported by a robust client-server model and real-time event handling.

### Key Features

- Real-time multiplayer gameplay across multiple clients
- Client-server architecture for centralized control and consistency
- Synchronized game state to ensure fairness
- Interactive tank movement and combat mechanics
- Dynamic events and real-time score tracking

### Technical Implementation

- Followed MVC architecture for modular, maintainable code
- Built a TCP-based client-server model for game synchronization
- Server maintained the authoritative game state and validated player actions
- Clients rendered game state and sent input events to the server
- Designed a synchronized game loop and entity tracking system
- Implemented event-driven logic for collisions and scorekeeping
- Serialized game events and world updates using JSON
- Developed the game interface with WinForms for real-time rendering
