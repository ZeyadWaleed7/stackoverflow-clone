# API Specifications

## User APIs

- **POST** `/auth/google`
  - Authenticate using Google OAuth
- **GET** `/users/:id`
  - Get user profile

## Question APIs

- **POST** `/questions`

  - Create a question

- **GET** `/questions`

  - Fetch all questions

- **GET** `/questions/:id`

## Answer APIs

- **POST** `/questions/:id/answers`

  - Add an answer to a question

- **GET** `/questions/:id/answers`
  - Fetch answers for a question

## Vote APIs

- **POST** `/questions/:id/vote`

  - Upvote or downvote a question

- **POST** `/answers/:id/vote`
  - Upvote or downvote an answer

## Notification APIs

- **GET** `/notifications`
  - Fetch real-time notifications
