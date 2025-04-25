# Q&A Service

The Q&A microservice is responsible for the core feature of the application: managing questions and answers. In this service, users can post questions, add answers to questions, and post comments on questions.

This microservice is implemented through multiple stages using HTTP methods and database endpoints.

## Features

- **Post Questions**: Users can post new questions.
- **Add Answers**: Users can add answers to existing questions.
- **Post Comments**: Users can post comments on questions.

## Implementation Steps

1. **Connecting to MongoDB**: Establish a connection to the MongoDB database.
2. **Creating Database Models**: Define Mongoose models for each feature (question, answer, comment).
3. **Nested Documents**: Add two empty nested MongoDB documents within each question to hold associated answers and comments.
4. **Generating Unique IDs**: When a user posts a question, a unique ID is generated and inserted into the MongoDB document.
5. **Associating Answers and Comments**: When posting an answer or comment, the document requires an existing question ID. The answers and comments are inserted into both their respective collections and the nested objects within the questions' collection.

## Usage

- **Post a Question**: Send a POST request to the questions endpoint to create a new question.
- **Post an Answer**: Send a POST request to the answers endpoint, including the question ID to associate the answer with the correct question.
- **Post a Comment**: Send a POST request to the comments endpoint, including the question ID (and optionally the answer ID) to associate the comment with the correct question or answer.

