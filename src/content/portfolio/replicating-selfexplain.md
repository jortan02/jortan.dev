---
published: true
title: Replicating SelfExplain
description: A coursework project that replicates a part of Rajagopal et. al's SelfExplain architecture.
date: 2023-11-30
category: Project
skills: [Python, NumPy, pandas, HuggingFace]
slug: replicating-selfexplain
---

A coursework project for CS 6957 (NLP w/ Deep Learning) that replicates a part of Rajagopal et. al's SelfExplain architecture. This text classifier explains what constituent concepts from the input contributed to a prediction. Parse trees were created to obtain concepts and a layer for classifying representations of sentences without certain concepts. A large difference from the actual prediction scores meant a concept was relevant. With the RoBERTa model, the SelfExplain model achieved 94.8% validation accuracy on the SST2 dataset with scores for relevant concepts.
