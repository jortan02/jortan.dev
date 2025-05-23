---
published: true
title: Anime Recommendation System
description: A sophisticated recommendation system built using data mining techniques on MyAnimeList dataset, implementing multiple recommendation algorithms.
date: 2023-03-16
category: Project
skills: [Python, pandas, NumPy]
---

![Anime Recommendation System screenshot](/images/portfolio/Anime_Recommendation.png)

### Overview

This coursework project for CS 5140 (Data Mining) focused on giving a variety of users new anime that they would enjoy. Using data from MyAnimeList, our team of three implemented and evaluated several recommendation strategies aimed at different types of users based on their level of interaction with anime content.

### Key Features

- Popular anime detection for new users using Misra-Gries algorithm
- Genre-based recommendations using Jaccard similarity
- Personalized score prediction through SVD-based matrix completion
- Adaptive recommendation based on user engagement level
- Cross-validation and RMSE evaluation for model accuracy

### Technical Implementation

- Matrix Completion: Built a user-anime matrix with predicted scores, initially filling missing values with the mean of each anime's and user's average scores. Final predictions used SVD with λ = 0.1 across 10 iterations. Hyperparameters were tuned using repeated cross-validation.
- Jaccard Similarity: Provided content-based recommendations based on genre overlap between previously watched and unseen anime, independent of user ratings.
- Misra-Gries Algorithm: Estimated the top 100 most frequently favorited anime across users with high confidence using 1,000 counters, ensuring practical accuracy for recommending popular titles.
