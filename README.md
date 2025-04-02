# Stack Overflow Clone

## Overview
The Stack Overflow Clone is a web application designed as part of the Software Architecture and Design course (Phase 1). It replicates core functionalities of Stack Overflow, allowing users to sign in using Google, post questions and answers, upvote/downvote content, search for questions by keywords, and receive notifications for new answers or votes. The system is built using a microservices architecture to ensure scalability, maintainability, and fault tolerance.

This repository contains the design artifacts for Phase 1, including requirements specifications, C4 model diagrams, architecture decision records (ADRs), API specifications, and use cases.

## Key Features
- **User Authentication:** Sign in using Google OAuth2.
- **Q&A Functionality:** Post questions, submit answers, and view Q&A threads.
- **Voting:** Upvote or downvote questions and answers, with reputation tracking for users.
- **Search:** Search for questions by keywords.
- **Notifications:** Receive email notifications for new answers or votes on your questions.
- **Microservices Architecture:** Built with independent services (e.g., Question Service, Answer Service, User Service, Notification Service) for scalability and maintainability.
- **Performance Optimization:** Uses Redis for caching frequently accessed questions and MongoDB/PostgreSQL for data storage.
- **Resilience:** Designed with fault tolerance in mind (resilience strategies to be detailed in the next section).
