---
published: true
title: Selective Unlearning of Training Data Without Complete Retraining
description: A research project exploring efficient machine unlearning techniques using ensemble models to protect user privacy while maintaining model performance.
date: 2023-06-28
category: Research
skills: [Python, PyTorch]
url: https://docs.google.com/presentation/d/1ZiuXadZMVvYtrFtaREbwJNeWGyYnZwKc-gf4cEZRP-Y/edit?usp=sharing
repository: machine_unlearning
---

## Overview

This NSF-sponsored research project investigates machine unlearning, the process of removing the influence of specific data points from trained machine learning models. This is essential for privacy-preserving systems where users may request their data to be deleted, and retraining a model from scratch is inefficient or impractical.

To address this, we propose an ensemble-based method: a collection of models, each trained on random subsets of the dataset. When unlearning is required, only the affected models are replaced, avoiding full retraining and enabling continual learning.

## Key Findings

- Ensemble models trained on randomized data subsets can support selective unlearning by retraining only a subset of the ensemble
- Achieved better validation loss and accuracy than a larger monolithic ResNet-152 model despite using fewer total parameters
- The system supports online-style learning, where data is introduced incrementally and unlearning requests can be processed efficiently
- Demonstrated that privacy compliance and model performance need not be mutually exclusive

## Technical Implementation

- Architecture: Ensemble of five ResNet-18 models (11.4M parameters each)
- Baseline Comparison: Single ResNet-152 (58.5M parameters) without unlearning
- Training Strategy:
  - Models trained on chunks of CIFAR-10 in sequence
  - Each model receives a random subset of each chunk
  - When data must be unlearned, models that trained on it are marked invalid
  - Invalid models are replaced and retrained on the latest available data
- Evaluation:
  - Validation accuracy and loss tracked after each training phase
  - Visualizations highlight ensemble progress vs. baseline
