---
published: true
title: Examining Compositional Behavior in Large Language Models
description: A bachelor's thesis project investigating how large language models respond to in-context subtask prompting, with a focus on model behavior and prompting strategy effectiveness.
date: 2023-09-24
category: Research
skills: [Python, pandas, matplotlib, HuggingFace]
url: https://docs.google.com/presentation/d/1E8iCQb2ft1BG55gx3ug1KR_GFp9a8woTEknGuJlETbA/edit?usp=sharing
repository: compositional_task_evaluation
---

## Overview

This bachelor's thesis, supervised by Professor Vivek Srikumar, explores the compositional capabilities of large language models (LLMs). The project investigates whether in-context examples of subtasks—rather than complete tasks—can improve model performance in compositional reasoning scenarios. The research focused on tasks involving multi-digit multiplication and word list operations, analyzed under various prompting conditions using few-shot setups.

## Key Findings

- Subtask-based few-shot prompts showed limited or inconsistent gains
- Flan-T5 struggled with list-based operations more than expected
- Performance was highly sensitive to prompt format and example selection
- Models exhibited task-specific reasoning gaps, even with relevant examples

## Technical Implementation

- Independently implemented all experiments and research infrastructure
- Manually crafted and iterated on dozens of in-context prompt formats
- Designed a suite of compositional tasks for systematic testing
- Created Slurm scripts for efficient job scheduling across runs
- Developed comparison tools to measure accuracy and stability across models
- Visualized model performance trends using matplotlib

## Research Components

- Prompt engineering: manual experimentation with few-shot examples
- Data pipeline for generating task variants and model inputs
- Evaluation framework for task-specific performance metrics
- Cross-model and cross-prompt comparisons to identify behavior patterns
- Synthesis of results for academic presentation and final thesis report
