---
published: true
title: Replicating SelfExplain Architecture
description: Implementation and evaluation of Rajagopal et al.'s SelfExplain architecture for interpretable text classification with concept-level explanations.
date: 2023-11-30
category: Project
skills: [Python, pandas, PyTorch, HuggingFace]
---

## Overview

A coursework project for CS 6957 (NLP with Deep Learning), focused on implementing core components of Rajagopal et al.’s SelfExplain architecture. The model produces interpretable predictions by identifying constituent concepts from input sentences and measuring their influence on classification outcomes. Concepts were extracted using parse trees and embedded in the training data to enable explanation-driven classification using a RoBERTa encoder and a Locally Interpretable Layer (LIL).

## Key Achievements

- Replicated the SelfExplain concept attribution strategy without building a full training pipeline
- Achieved 94.8% validation accuracy on the SST2 sentiment classification task
- Extracted interpretable concept spans from parse trees and embedded them into input features
- Measured concept influence using score differences with masked concept representations

## Technical Implementation

- Generated constituency parse trees to identify phrase-level concepts
- Embedded extracted spans into model input for interpretability
- Built a custom PyTorch model combining RoBERTa with a Locally Interpretable Layer (LIL)
- Measured the influence of each concept by masking and comparing prediction deltas
- Evaluated interpretability through concept-level attribution and sparsity analysis
