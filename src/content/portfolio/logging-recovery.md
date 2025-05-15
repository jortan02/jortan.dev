---
published: true
title: Logging and Recovery
description: A coursework project for CS 6530 (Advanced Database Systems) aimed at creating write-ahead logging, checkpointing, and recovery for a B-ε tree-based key-value store.
date: 2024-10-18
category: Project
skills: [C++]
---

A coursework project for CS 6530 (Advanced Database Systems) aimed at creating write-ahead logging, checkpointing, and recovery for a B-ε tree-based key-value store. We used a logical format for the log records, where each record captures what operation was performed (insertions/deletions). We used a non-fuzzy checkpointing strategy to ensure a consistent snapshot was created, reducing the overhead of recoverying from log records. We analyzed trade-offs between logging granularity and correctness, finding that less frequent flushing of logs led to faster runtimes, but at the cost of losing some operations in the event of a crash.
