---
published: true
title: Replicating LINC
description: A coursework project that replicates Olausson et al.'s Logical Inference via Neurosymbolic Computation (LINC) framework.
date: 2024-10-20
category: Project
skills: [Python, NumPy, pandas, HuggingFace, Prover9]
---

A coursework project for CS 6964 (Neuro-Symbolic Modeling) that replicates Olausson et al.'s Logical Inference via Neurosymbolic Computation (LINC) framework. Logical reasoning in LLMs is important for tasks that require factually correct information derived from existing knowledge, and LINC approaches this problem by combining LLMs with theorem provers. I experimented with the Llama 2 and LLama 3 model families: in particular, Llama 2 7B Chat, Llama 2 13B Chat, Llama 3.1 8B Instruct, Llama 3.2 1B Instruct, and Llama 3.2 3B Instruct. I found that Llama 3.1 8B Instruct with LINC acheived the best accuracy with the FOLIO and ProofWriter datasets (62.6% and 91.2% respectively).
