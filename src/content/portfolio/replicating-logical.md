---
published: true
title: Replicating Logical Inference via Neurosymbolic Computation
description: Implementation and evaluation of Olausson et al.'s LINC framework, combining LLMs with theorem provers for enhanced logical reasoning.
date: 2024-10-20
category: Project
skills: [Python, HuggingFace, nltk, Prover9]
---

## Overview

This coursework project for CS 6964 (Neuro-Symbolic Modeling) explores the intersection of neural networks and symbolic reasoning by replicating and extending Olausson et al.'s Logical Inference via Neurosymbolic Computation (LINC) framework. The project combines the capabilities of large language models (LLMs) with traditional theorem provers to enhance logical reasoning capabilities in AI systems.

## Key Findings

- Successfully implemented the LINC pipeline and extended it with multiple LLMs
- Beam sampling significantly reduced parsing errors compared to random sampling
- "Uncertain" outputs were common, often indicating indecision or ambiguity in reasoning
- Llama 3.1 8B Instruct achieved the best performance, comparable to GPT-3.5
- Smaller instruction-tuned models outperformed larger chat-based ones on some tasks

## Technical Implementation

- Constructed the LINC pipeline:
  - Prompt generation for candidate entailments
  - First-order logic parsing using Prover9
  - Multi-strategy evaluation with fallbacks
- Integrated multiple LLMs including Llama 2 and Llama 3 variants
- Designed evaluation framework for FOLIO and ProofWriter datasets
- Implemented random and beam sampling strategies for entailment generation
- Analyzed model performance using accuracy metrics and confusion matrices
