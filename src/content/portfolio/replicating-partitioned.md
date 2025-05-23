---
published: true
title: Replicating Partitioned Learned Bloom Filter
description: Implementation of Vaidya et al.'s PLBF for significant space efficiency improvements to traditional bloom filters.
date: 2024-03-23
category: Project
skills: [Python, pandas, NumPy, scikit-learn]
---

### Overview

This coursework project for CS 4964 (Manage Data for & with ML) replicates and evaluates the Partitioned Learned Bloom Filter (PLBF) proposed by Vaidya et al. The PLBF architecture integrates machine learning models into Bloom Filters to reduce memory usage while preserving filtering performance. This implementation explores how different classifiers impact accuracy, space efficiency, and latency across varying filter designs and datasets.

### Key Findings

- Traditional Bloom Filters provided the highest accuracy and fastest queries but consumed the most memory
- Learned Bloom Filters using perceptrons significantly reduced memory usage with minimal accuracy loss
- More complex models like neural nets and ensembles improved accuracy but increased latency
- Classifier choice enables tuning of space-performance trade-offs for specific applications

### Technical Implementation

- Implemented a traditional Bloom Filter for baseline comparison
- Trained ML models including Perceptron, Bagged Perceptron, Random Forest, and Neural Network
- Partitioned data and integrated model predictions into filtering logic
- Built preprocessing and evaluation pipelines for the URL and EMBER datasets
- Measured memory usage, false positive rates, query latency, and training time
