---
published: true
title: Package Query Experiment
description: Implementation and comparison of multiple approaches for efficient package query execution, including an adaptation of the SketchRefine technique.
date: 2025-03-01
category: Project
skills: [Python, HuggingFace, PuLP]
---

### Overview

This coursework project for CS 6964 (Neuro-Symbolic Modeling) explores and implements various strategies for efficient package query execution, with a focus on optimizing query performance through innovative approaches. The project involved replicating and extending Brucato et al.'s SketchRefine technique for package queries, implementing multiple execution strategies, and comparing their performance on test data. The work focused on solving the complex problem of evaluating queries that require global conditions across result sets.

### Key Achievements

- Implemented three distinct query execution strategies
- Achieved 75.9% faster execution with SketchRefine approach
- Successfully formulated complex queries as integer linear programs (ILPs)
- Demonstrated significant performance improvements over brute-force methods

### Technical Implementation

- Developed a brute-force package query executor for baseline comparison
- Implemented an ILP-based query strategy using PuLP
- Adapted and simplified the SketchRefine technique for improved performance
