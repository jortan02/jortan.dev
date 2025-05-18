---
published: true
title: Package Query Experiment
description: A homework assignment  for CS 4964 (Manage Data for & with ML) that replicates part of Brucato et al.'s SketchRefine technique for package queries.
date: 2025-03-01
category: Project
skills: [Python, PuLP, ILP]
---

A homework assignment for CS 6964 (Neuro-Symbolic Modeling) that replicates part of Brucato et al.'s SketchRefine technique for package queries. Package queries are queries that return a collection of tuples that meet certain global conditions. However, they are difficult to implement because the conditions apply to the entire set of results, not just individual tuples. I experimented with three different executor strategies for evaluating package queries over an ingredient dataset. I implemented brute-force, ILP, and a simplified SketchRefine approach, formulating the latter two as integer linear programs using PuLP. The SketchRefine method achieved significantly faster runtimes, outperforming brute-force and achieving 75.9% faster execution compared to the ILP solution.
