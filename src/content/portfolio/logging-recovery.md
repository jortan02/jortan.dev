---
published: true
title: Logging and Recovery System
description: Implementation of a robust write-ahead logging and recovery system for a B-ε tree-based key-value store with checkpointing capabilities.
date: 2024-10-18
category: Project
skills: [C++]
---

### Overview

This advanced database project for CS 6530 (Advanced Database Systems) focuses on designing a durable and crash-resilient key-value store using a B-ε tree. The system features a comprehensive write-ahead logging (WAL) mechanism, consistent checkpointing, and an automated recovery process. The goal was to ensure data consistency and minimize recovery time after system failures.

### Key Features

- Write-ahead logging with logical log records
- Configurable log flushing and checkpoint intervals
- Snapshot-based, non-fuzzy checkpointing
- Reliable crash recovery with log replay
- Object mapping for persistent tree structure

### Technical Highlights

- Developed a modular logging system that records all operations before they are applied to memory.
- Implemented a checkpointing strategy that captures the current state of the system to allow efficient recovery.
- Built a recovery mechanism that reconstructs the tree structure by replaying logs after the last checkpoint.
- Designed a consistent serialization format for logs and tree objects to enable safe disk writes and reads.
- Used custom flags and configuration parameters to simulate various crash and recovery scenarios for testing.

### Performance Analysis

- Less frequent log flushing improved runtime but risked data loss
- More frequent checkpoints reduced recovery time at a cost to performance
- Recovery from crashes was fast and accurate, typically under a few seconds

### My Contributions

- Implemented the logging subsystem and log file management
- Designed the checkpointing process and data serialization strategy
- Built the recovery logic, including object remapping and log replay
